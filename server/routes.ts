import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import multer from "multer";
import path from "path";
import fs from "fs";
import { eventManager, runEventUpdateTask, filterUpcomingEvents, getUpcomingEvents } from "./utils/eventManager";
import validator from "validator";
import rateLimit from "express-rate-limit";

// Security: HTML escape function to prevent XSS attacks in emails
function escapeHtml(text: string): string {
  if (!text) return '';
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.toString().replace(/[&<>"']/g, m => map[m]);
}

// Security: Sanitize string input (trim and limit length)
function sanitizeString(text: string, maxLength: number = 500): string {
  if (!text) return '';
  return text.toString().trim().slice(0, maxLength);
}

// Rate limiter for business submissions (prevent spam)
const businessSubmissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 submissions per hour per IP
  message: {
    success: false,
    error: "Too many submissions. Please try again in an hour."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Initialize Resend if API key is configured
let resend: Resend | null = null;
if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim() !== '') {
  resend = new Resend(process.env.RESEND_API_KEY);
  console.log("✅ Resend email service initialized");
} else {
  console.log("ℹ️  Resend not configured - emails will use SMTP if configured");
}

// Configure multer for file uploads
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (JPEG, PNG, GIF, WebP)'));
    }
  }
});

// Only initialize OpenAI if API keys are configured
// This allows the app to run without AI features
let openai: any = null;
if (process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY) {
  try {
    const OpenAI = require("openai").default;
    openai = new OpenAI({
      baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY
    });
    console.log("OpenAI client initialized successfully");
  } catch (error) {
    console.log("OpenAI not configured - AI features disabled");
    openai = null;
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Restaurants API
  app.get("/api/restaurants", async (req, res) => {
    try {
      const { category, search } = req.query;
      let restaurants;

      if (search && typeof search === "string") {
        restaurants = await storage.searchRestaurants(search);
      } else if (category && typeof category === "string") {
        restaurants = await storage.getRestaurantsByCategory(category as any);
      } else {
        restaurants = await storage.getRestaurants();
      }

      res.json({ success: true, data: restaurants });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch restaurants" });
    }
  });

  app.get("/api/restaurants/:id", async (req, res) => {
    try {
      const restaurant = await storage.getRestaurantById(req.params.id);
      if (!restaurant) {
        return res.status(404).json({ success: false, error: "Restaurant not found" });
      }
      res.json({ success: true, data: restaurant });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch restaurant" });
    }
  });

  // Events API
  app.get("/api/events", async (req, res) => {
    try {
      const { category, date, search } = req.query;
      let events;

      if (search && typeof search === "string") {
        events = await storage.searchEvents(search);
      } else if (date && typeof date === "string") {
        events = await storage.getEventsByDate(date);
      } else if (category && typeof category === "string") {
        events = await storage.getEventsByCategory(category as any);
      } else {
        events = await storage.getEvents();
      }

      res.json({ success: true, data: events });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch events" });
    }
  });

  // Event Management API - Analytics and Automation
  // Note: These routes must come BEFORE /api/events/:id to avoid route conflicts
  app.get("/api/events/analytics", async (req, res) => {
    try {
      const analytics = eventManager.getEventAnalytics();
      res.json({
        success: true,
        data: analytics
      });
    } catch (error) {
      console.error("Event analytics error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch event analytics"
      });
    }
  });

  // Get only upcoming events (filters out past events)
  app.get("/api/events/upcoming", async (req, res) => {
    try {
      const { days } = req.query;
      const allEvents = await storage.getEvents();

      let upcomingEvents;
      if (days && typeof days === "string") {
        upcomingEvents = getUpcomingEvents(allEvents, parseInt(days));
      } else {
        upcomingEvents = filterUpcomingEvents(allEvents);
      }

      res.json({
        success: true,
        data: upcomingEvents
      });
    } catch (error) {
      console.error("Upcoming events error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch upcoming events"
      });
    }
  });

  // Manually trigger event update task (for admin use)
  app.post("/api/events/update", async (req, res) => {
    try {
      console.log("🔄 Manual event update triggered");

      // Run the update task in the background
      runEventUpdateTask().catch(error => {
        console.error("Background event update failed:", error);
      });

      res.json({
        success: true,
        message: "Event update task started. Check server logs for progress."
      });
    } catch (error) {
      console.error("Event update trigger error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to trigger event update"
      });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const event = await storage.getEventById(req.params.id);
      if (!event) {
        return res.status(404).json({ success: false, error: "Event not found" });
      }
      res.json({ success: true, data: event });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch event" });
    }
  });

  // Activities API
  app.get("/api/activities", async (req, res) => {
    try {
      const { category, audience, search } = req.query;
      let activities;

      if (search && typeof search === "string") {
        activities = await storage.searchActivities(search);
      } else if (audience && typeof audience === "string") {
        activities = await storage.getActivitiesByAudience(audience as any);
      } else if (category && typeof category === "string") {
        activities = await storage.getActivitiesByCategory(category as any);
      } else {
        activities = await storage.getActivities();
      }

      res.json({ success: true, data: activities });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch activities" });
    }
  });

  app.get("/api/activities/:id", async (req, res) => {
    try {
      const activity = await storage.getActivityById(req.params.id);
      if (!activity) {
        return res.status(404).json({ success: false, error: "Activity not found" });
      }
      res.json({ success: true, data: activity });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch activity" });
    }
  });

  // Autism Programs API
  app.get("/api/programs", async (req, res) => {
    try {
      const { search } = req.query;
      let programs;

      if (search && typeof search === "string") {
        programs = await storage.searchPrograms(search);
      } else {
        programs = await storage.getAutismPrograms();
      }

      res.json({ success: true, data: programs });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch programs" });
    }
  });

  app.get("/api/programs/:id", async (req, res) => {
    try {
      const program = await storage.getProgramById(req.params.id);
      if (!program) {
        return res.status(404).json({ success: false, error: "Program not found" });
      }
      res.json({ success: true, data: program });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch program" });
    }
  });

  // Social Groups API
  app.get("/api/groups", async (req, res) => {
    try {
      const { category, search } = req.query;
      let groups;

      if (search && typeof search === "string") {
        groups = await storage.searchGroups(search);
      } else if (category && typeof category === "string") {
        groups = await storage.getGroupsByCategory(category);
      } else {
        groups = await storage.getSocialGroups();
      }

      res.json({ success: true, data: groups });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch groups" });
    }
  });

  app.get("/api/groups/:id", async (req, res) => {
    try {
      const group = await storage.getGroupById(req.params.id);
      if (!group) {
        return res.status(404).json({ success: false, error: "Group not found" });
      }
      res.json({ success: true, data: group });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch group" });
    }
  });

  // Businesses API
  app.get("/api/businesses", async (req, res) => {
    try {
      const { category, search } = req.query;
      let businesses;

      if (search && typeof search === "string") {
        businesses = await storage.searchBusinesses(search);
      } else if (category && typeof category === "string") {
        businesses = await storage.getBusinessesByCategory(category as any);
      } else {
        businesses = await storage.getBusinesses();
      }

      res.json({ success: true, data: businesses });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch businesses" });
    }
  });

  app.get("/api/businesses/:id", async (req, res) => {
    try {
      const business = await storage.getBusinessById(req.params.id);
      if (!business) {
        return res.status(404).json({ success: false, error: "Business not found" });
      }
      res.json({ success: true, data: business });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch business" });
    }
  });

  // Business Submission API with Email Notification
  app.post("/api/submit-business", businessSubmissionLimiter, (req, res, next) => {
    // Multer error handling wrapper
    upload.single('logo')(req, res, (err) => {
      if (err) {
        console.error("Multer error:", err);
        return res.status(400).json({
          success: false,
          error: err.message || "File upload failed",
        });
      }
      next();
    });
  }, async (req, res) => {
    try {
      console.log("Business submission received");
      console.log("Body:", Object.keys(req.body));
      console.log("File:", req.file ? req.file.originalname : "No file");

      // Sanitize all input fields
      const name = sanitizeString(req.body.name, 100);
      const category = sanitizeString(req.body.category, 50);
      const description = sanitizeString(req.body.description, 1000);
      const address = sanitizeString(req.body.address, 200);
      const phone = sanitizeString(req.body.phone, 20);
      const email = sanitizeString(req.body.email, 100);
      const website = sanitizeString(req.body.website, 200);
      const hours = sanitizeString(req.body.hours, 200);
      const ownerName = sanitizeString(req.body.ownerName, 100);
      const ownerEmail = sanitizeString(req.body.ownerEmail, 100);
      const ownerPhone = sanitizeString(req.body.ownerPhone, 20);

      // Parse features from JSON string (sent from FormData)
      let features: string[] = [];
      try {
        features = req.body.features ? JSON.parse(req.body.features) : [];
        // Sanitize each feature
        features = features.map(f => sanitizeString(f, 50)).filter(f => f.length > 0);
      } catch (e) {
        console.error("Error parsing features:", e);
        features = [];
      }

      // Get uploaded file info
      const logoFile = req.file;

      console.log("Validating fields:", { name, category, description, address });

      // Validate required fields
      if (!name || !category || !description || !address || !ownerEmail) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields: name, category, description, address, and your email are required",
        });
      }

      // Enhanced validation using validator library
      if (!validator.isEmail(ownerEmail)) {
        return res.status(400).json({
          success: false,
          error: "Please provide a valid email address",
        });
      }

      // Validate optional email
      if (email && !validator.isEmail(email)) {
        return res.status(400).json({
          success: false,
          error: "Please provide a valid business email address",
        });
      }

      // Validate website URL if provided
      if (website && !validator.isURL(website, { require_protocol: false })) {
        return res.status(400).json({
          success: false,
          error: "Please provide a valid website URL",
        });
      }

      // Validate length limits
      if (name.length < 2) {
        return res.status(400).json({
          success: false,
          error: "Business name must be at least 2 characters",
        });
      }

      if (description.length < 10) {
        return res.status(400).json({
          success: false,
          error: "Description must be at least 10 characters",
        });
      }

      // Create email content
      const submissionDate = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Business Submission - Hello Erie
          </h1>
          <p style="color: #666; font-size: 14px;">Submitted on: ${submissionDate}</p>

          ${logoFile ? `
          <div style="margin: 24px 0; padding: 16px; background: #f8fafc; border-radius: 8px; text-align: center;">
            <h3 style="color: #333; margin: 0 0 12px 0;">Uploaded Logo/Image</h3>
            <img src="cid:business-logo" alt="Business Logo" style="max-width: 200px; max-height: 200px; border-radius: 8px; border: 1px solid #e2e8f0;" />
            <p style="color: #666; font-size: 12px; margin: 8px 0 0 0;">File: ${escapeHtml(logoFile.originalname)}</p>
          </div>
          ` : ''}

          <h2 style="color: #333; margin-top: 24px;">Business Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #f8fafc;">
              <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Business Name</td>
              <td style="padding: 12px; border: 1px solid #e2e8f0;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Category</td>
              <td style="padding: 12px; border: 1px solid #e2e8f0;">${escapeHtml(category)}</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Description</td>
              <td style="padding: 12px; border: 1px solid #e2e8f0;">${escapeHtml(description)}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Address</td>
              <td style="padding: 12px; border: 1px solid #e2e8f0;">${escapeHtml(address)}</td>
            </tr>
            ${phone ? `<tr style="background: #f8fafc;"><td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Phone</td><td style="padding: 12px; border: 1px solid #e2e8f0;">${escapeHtml(phone)}</td></tr>` : ""}
            ${email ? `<tr><td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Business Email</td><td style="padding: 12px; border: 1px solid #e2e8f0;">${escapeHtml(email)}</td></tr>` : ""}
            ${website ? `<tr style="background: #f8fafc;"><td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Website</td><td style="padding: 12px; border: 1px solid #e2e8f0;"><a href="${escapeHtml(website)}">${escapeHtml(website)}</a></td></tr>` : ""}
            ${hours ? `<tr><td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Hours</td><td style="padding: 12px; border: 1px solid #e2e8f0;">${escapeHtml(hours)}</td></tr>` : ""}
            ${features && features.length > 0 ? `<tr style="background: #f8fafc;"><td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Features</td><td style="padding: 12px; border: 1px solid #e2e8f0;">${features.map(f => escapeHtml(f)).join(", ")}</td></tr>` : ""}
          </table>

          <h2 style="color: #333; margin-top: 24px;">Owner Contact Info</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #f8fafc;">
              <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Name</td>
              <td style="padding: 12px; border: 1px solid #e2e8f0;">${escapeHtml(ownerName || "Not provided")}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Email</td>
              <td style="padding: 12px; border: 1px solid #e2e8f0;"><a href="mailto:${escapeHtml(ownerEmail)}">${escapeHtml(ownerEmail)}</a></td>
            </tr>
            ${ownerPhone ? `<tr style="background: #f8fafc;"><td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Phone</td><td style="padding: 12px; border: 1px solid #e2e8f0;">${escapeHtml(ownerPhone)}</td></tr>` : ""}
          </table>

          <div style="margin-top: 24px; padding: 16px; background: #f0f9ff; border-radius: 8px;">
            <p style="margin: 0; color: #0369a1;">
              <strong>Action Required:</strong> Review this submission and reply to <a href="mailto:${escapeHtml(ownerEmail)}">${escapeHtml(ownerEmail)}</a> once approved.
            </p>
          </div>
        </div>
      `;

      const emailText = `
New Business Submission - Hello Erie
========================================
Submitted on: ${submissionDate}

${logoFile ? `UPLOADED LOGO: ${logoFile.originalname} (see attachment)\n` : ''}
BUSINESS DETAILS
----------------
Business Name: ${name}
Category: ${category}
Description: ${description}
Address: ${address}
${phone ? `Phone: ${phone}` : ""}
${email ? `Business Email: ${email}` : ""}
${website ? `Website: ${website}` : ""}
${hours ? `Hours: ${hours}` : ""}
${features && features.length > 0 ? `Features: ${features.join(", ")}` : ""}

OWNER CONTACT INFO
------------------
Name: ${ownerName || "Not provided"}
Email: ${ownerEmail}
${ownerPhone ? `Phone: ${ownerPhone}` : ""}

---
Please review this submission and contact the owner at ${ownerEmail}.
      `;

      // Try to send email notification (Resend first, then SMTP fallback)
      const recipientEmail = process.env.SUBMISSION_EMAIL || process.env.RESEND_FROM || "hello@helloerie.xyz";
      let emailSent = false;

      // Option 1: Try Resend (recommended)
      if (resend && !emailSent) {
        try {
          console.log("📧 Attempting to send email via Resend...");

          const emailPayload: any = {
            from: process.env.RESEND_FROM || "Hello Erie <submissions@helloerie.xyz>",
            to: recipientEmail,
            reply_to: ownerEmail,
            subject: `[Hello Erie] New Business Submission: ${name}`,
            html: emailHtml,
          };

          // Add logo as attachment if uploaded
          if (logoFile) {
            const logoContent = fs.readFileSync(logoFile.path);
            const logoBase64 = logoContent.toString('base64');
            emailPayload.attachments = [
              {
                filename: logoFile.originalname,
                content: logoBase64,
              }
            ];
          }

          await resend.emails.send(emailPayload);
          console.log(`✅ Email sent successfully via Resend for: ${name}`);
          emailSent = true;
        } catch (emailError: any) {
          console.error(`❌ Resend failed:`, emailError.message);
        }
      }

      // Option 2: Fallback to SMTP if Resend didn't work
      const smtpConfigured =
        process.env.SMTP_USER &&
        process.env.SMTP_USER.trim() !== '' &&
        process.env.SMTP_PASS &&
        process.env.SMTP_PASS.trim() !== '';

      if (!emailSent && smtpConfigured) {
        try {
          console.log("📧 Attempting to send email via SMTP...");

          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 10000,
          });

          const mailOptions: any = {
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: recipientEmail,
            replyTo: ownerEmail,
            subject: `[Hello Erie] New Business Submission: ${name}`,
            text: emailText,
            html: emailHtml,
          };

          if (logoFile) {
            mailOptions.attachments = [
              {
                filename: logoFile.originalname,
                path: logoFile.path,
                cid: 'business-logo'
              }
            ];
          }

          await transporter.sendMail(mailOptions);
          console.log(`✅ Email sent successfully via SMTP for: ${name}`);
          emailSent = true;
        } catch (emailError: any) {
          console.error(`❌ SMTP failed:`, emailError.message);
        }
      }

      // Log final status
      if (!emailSent) {
        console.log(`📝 Business submission received (no email service configured): ${name}`);
        console.log(`💡 Tip: Add RESEND_API_KEY to environment variables to enable email notifications`);
      }

      res.json({
        success: true,
        message: "Thank you! Your business has been submitted for review. We'll add it to the directory shortly.",
      });
    } catch (error: any) {
      console.error("Business submission error:", error.message);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to submit your business listing. Please try again later.",
      });
    }
  });

  // AI Recommendation API
  app.post("/api/ai/recommend", async (req, res) => {
    try {
      // Check if AI is configured
      if (!openai) {
        return res.status(503).json({
          success: false,
          error: "AI features are not currently available",
          message: "The AI assistant is temporarily unavailable. Please browse our directory manually to find what you're looking for!"
        });
      }

      const { query } = req.body;

      if (!query || typeof query !== "string") {
        return res.status(400).json({ success: false, error: "Query is required" });
      }

      // Get current date/time in Erie timezone
      const now = new Date();
      const erieTime = now.toLocaleString("en-US", {
        timeZone: "America/New_York",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
      });

      // Get all data for context
      const [restaurants, events, activities] = await Promise.all([
        storage.getRestaurants(),
        storage.getEvents(),
        storage.getActivities()
      ]);

      const systemPrompt = `You are a helpful local guide for Erie, Pennsylvania. Your job is to help visitors and residents discover restaurants, events, and activities in Erie based on their preferences.

Current date and time in Erie, PA: ${erieTime}

You have access to the following data about Erie:

RESTAURANTS (${restaurants.length} total):
${restaurants.map(r => `- ${r.name}: ${r.category} cuisine, ${r.priceRange}, Rating: ${r.rating}/5. ${r.description}`).join('\n')}

UPCOMING EVENTS (${events.length} total):
${events.map(e => `- ${e.title}: ${e.category} on ${e.date} at ${e.time} at ${e.venue}. ${e.isFree ? 'FREE' : e.price || 'Paid'}. ${e.description}`).join('\n')}

ACTIVITIES (${activities.length} total):
${activities.map(a => `- ${a.name}: ${a.category} for ${a.audience.join(', ')}. ${a.description}`).join('\n')}

Based on the user's query, provide personalized recommendations. Be friendly, conversational, and specific. If they ask about dining, suggest 2-3 restaurants that match their criteria. If they ask about events, mention relevant upcoming events. Always provide helpful context like hours, prices, and what makes each place special.

Respond in JSON format:
{
  "message": "Your conversational response with recommendations",
  "recommendations": {
    "restaurants": [array of restaurant IDs that match, max 3],
    "events": [array of event IDs that match, max 3],
    "activities": [array of activity IDs that match, max 3]
  }
}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query }
        ],
        response_format: { type: "json_object" },
        max_completion_tokens: 1024,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error("No response from AI");
      }

      const parsed = JSON.parse(content);

      // Map IDs to full objects
      const recommendedRestaurants = parsed.recommendations?.restaurants
        ? restaurants.filter(r => parsed.recommendations.restaurants.includes(r.id))
        : [];

      const recommendedEvents = parsed.recommendations?.events
        ? events.filter(e => parsed.recommendations.events.includes(e.id))
        : [];

      const recommendedActivities = parsed.recommendations?.activities
        ? activities.filter(a => parsed.recommendations.activities.includes(a.id))
        : [];

      res.json({
        success: true,
        message: parsed.message,
        recommendations: {
          restaurants: recommendedRestaurants,
          events: recommendedEvents,
          activities: recommendedActivities
        }
      });
    } catch (error) {
      console.error("AI recommendation error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to generate recommendation",
        message: "I'm sorry, I couldn't process your request right now. Please try again."
      });
    }
  });

  return httpServer;
}
