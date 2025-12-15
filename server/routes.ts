import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
// This is using Replit's AI Integrations service, which provides OpenAI-compatible API access without requiring your own API key.
const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
});

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

  // AI Recommendation API
  app.post("/api/ai/recommend", async (req, res) => {
    try {
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
