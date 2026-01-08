import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";

// Only initialize OpenAI if API keys are configured
// This allows the app to run without AI features
let openai: any = null;
if (process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY) {
  const OpenAI = require("openai").default;
  openai = new OpenAI({
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
    apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY
  });
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

  // Business Submission API with Email Notification
  app.post("/api/submit-business", async (req, res) => {
    try {
      const {
        listingType,
        businessName,
        category,
        description,
        address,
        phone,
        email,
        website,
        hours,
        priceRange,
        contactName,
        additionalInfo,
      } = req.body;

      // Validate required fields
      if (!listingType || !businessName || !description || !email) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields: listing type, business name, description, and email are required",
        });
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: "Please provide a valid email address",
        });
      }

      // Format the listing type for display
      const listingTypeLabels: Record<string, string> = {
        restaurant: "Restaurant",
        event: "Event",
        activity: "Activity / Things to Do",
        program: "Community Service / Program",
        group: "Social Group",
      };

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
            New Business Submission - Discover Erie
          </h1>

          <p style="color: #666; font-size: 14px;">
            Submitted on: ${submissionDate}
          </p>

          <h2 style="color: #333; margin-top: 24px;">Listing Details</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #f8fafc;">
              <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold; width: 35%;">Listing Type</td>
              <td style="padding: 12px; border: 1px solid #e2e8f0;">${listingTypeLabels[listingType] || listingType}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Business Name</td>
              <td style="padding: 12px; border: 1px solid #e2e8f0;">${businessName}</td>
            </tr>
            ${category ? `
            <tr style="background: #f8fafc;">
              <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Category</td>
              <td style="padding: 12px; border: 1px solid #e2e8f0;">${category}</td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Description</td>
              <td style="padding: 12px; border: 1px solid #e2e8f0;">${description}</td>
            </tr>
            ${address ? `
            <tr style="background: #f8fafc;">
              <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Address</td>
              <td style="padding: 12px; border: 1px solid #e2e8f0;">${address}</td>
            </tr>
            ` : ""}
            ${phone ? `
            <tr>
              <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Phone</td>
              <td style="padding: 12px; border: 1px solid #e2e8f0;">${phone}</td>
            </tr>
            ` : ""}
            <tr style="background: #f8fafc;">
              <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Contact Email</td>
              <td style="padding: 12px; border: 1px solid #e2e8f0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${website ? `
            <tr>
              <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Website</td>
              <td style="padding: 12px; border: 1px solid #e2e8f0;"><a href="${website}">${website}</a></td>
            </tr>
            ` : ""}
            ${hours ? `
            <tr style="background: #f8fafc;">
              <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Hours</td>
              <td style="padding: 12px; border: 1px solid #e2e8f0;">${hours}</td>
            </tr>
            ` : ""}
            ${priceRange ? `
            <tr>
              <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Price Range</td>
              <td style="padding: 12px; border: 1px solid #e2e8f0;">${priceRange}</td>
            </tr>
            ` : ""}
            ${contactName ? `
            <tr style="background: #f8fafc;">
              <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Contact Name</td>
              <td style="padding: 12px; border: 1px solid #e2e8f0;">${contactName}</td>
            </tr>
            ` : ""}
            ${additionalInfo ? `
            <tr>
              <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Additional Info</td>
              <td style="padding: 12px; border: 1px solid #e2e8f0;">${additionalInfo}</td>
            </tr>
            ` : ""}
          </table>

          <div style="margin-top: 24px; padding: 16px; background: #f0f9ff; border-radius: 8px;">
            <p style="margin: 0; color: #0369a1;">
              <strong>Action Required:</strong> Review this submission and reply to the submitter at
              <a href="mailto:${email}">${email}</a> once approved or if more information is needed.
            </p>
          </div>

          <p style="color: #999; font-size: 12px; margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
            This email was sent from the Discover Erie directory submission form.
          </p>
        </div>
      `;

      const emailText = `
New Business Submission - Discover Erie
========================================

Submitted on: ${submissionDate}

LISTING DETAILS
---------------
Listing Type: ${listingTypeLabels[listingType] || listingType}
Business Name: ${businessName}
${category ? `Category: ${category}` : ""}
Description: ${description}
${address ? `Address: ${address}` : ""}
${phone ? `Phone: ${phone}` : ""}
Contact Email: ${email}
${website ? `Website: ${website}` : ""}
${hours ? `Hours: ${hours}` : ""}
${priceRange ? `Price Range: ${priceRange}` : ""}
${contactName ? `Contact Name: ${contactName}` : ""}
${additionalInfo ? `Additional Info: ${additionalInfo}` : ""}

---
Please review this submission and contact the submitter at ${email}.
      `;

      // Create transporter - using environment variables for SMTP configuration
      // For Gmail: Use App Password (not regular password)
      // Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in environment variables
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Recipient email for submissions
      const recipientEmail = process.env.SUBMISSION_EMAIL || "eriedirectory@gmail.com";

      // Send email
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@discoverie.com",
        to: recipientEmail,
        replyTo: email, // So you can easily reply to the submitter
        subject: `[Discover Erie] New ${listingTypeLabels[listingType] || listingType} Submission: ${businessName}`,
        text: emailText,
        html: emailHtml,
      });

      console.log(`Business submission email sent for: ${businessName}`);

      res.json({
        success: true,
        message: "Your submission has been received. We'll review it and get back to you soon!",
      });
    } catch (error) {
      console.error("Business submission error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to submit your business listing. Please try again later.",
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
