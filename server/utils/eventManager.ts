/**
 * Event Manager - Automated Event Checking System
 *
 * This utility provides the foundation for automatically managing events:
 * - Filter out past events
 * - Fetch new events from various sources
 * - Validate and format event data
 * - Provide APIs for event management
 */

import { Event } from "@shared/schema";
import { events } from "../erieData";

/**
 * Check if an event date has passed
 */
export function isPastEvent(eventDate: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset to start of day

  const eventDateObj = new Date(eventDate);
  eventDateObj.setHours(0, 0, 0, 0);

  return eventDateObj < today;
}

/**
 * Filter out past events from an event list
 */
export function filterUpcomingEvents(eventList: Event[]): Event[] {
  return eventList.filter(event => !isPastEvent(event.date));
}

/**
 * Get events happening within the next N days
 */
export function getUpcomingEvents(eventList: Event[], daysAhead: number = 30): Event[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + daysAhead);

  return eventList.filter(event => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today && eventDate <= futureDate;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/**
 * Event source interfaces for future implementation
 */
export interface EventSource {
  name: string;
  url: string;
  fetchEvents(): Promise<Event[]>;
}

/**
 * Base class for event scrapers/fetchers
 * Extend this class to implement specific event sources
 */
export abstract class BaseEventFetcher implements EventSource {
  abstract name: string;
  abstract url: string;

  abstract fetchEvents(): Promise<Event[]>;

  /**
   * Validate event data structure
   */
  protected validateEvent(event: Partial<Event>): event is Event {
    return !!(
      event.id &&
      event.title &&
      event.category &&
      event.date &&
      event.time &&
      event.venue &&
      event.address &&
      event.description &&
      typeof event.isFree === 'boolean'
    );
  }

  /**
   * Sanitize and format event data
   */
  protected sanitizeEvent(event: Event): Event {
    return {
      ...event,
      title: event.title.trim(),
      description: event.description.trim(),
      venue: event.venue.trim(),
      address: event.address.trim(),
      price: event.price?.trim(),
      ticketUrl: event.ticketUrl?.trim(),
      imageUrl: event.imageUrl?.trim(),
    };
  }
}

/**
 * Example: Erie Events Board Fetcher
 * This is a template - implement actual scraping logic based on the source
 */
export class ErieEventsBoardFetcher extends BaseEventFetcher {
  name = "Erie Events Board";
  url = "https://www.erieeventsboard.com"; // Example URL

  async fetchEvents(): Promise<Event[]> {
    try {
      // TODO: Implement actual web scraping or API calls
      // This is a placeholder for future implementation
      console.log(`Fetching events from ${this.name}...`);

      // Example implementation would involve:
      // 1. Fetch HTML or call API
      // 2. Parse event data
      // 3. Transform to Event schema
      // 4. Validate and sanitize

      return [];
    } catch (error) {
      console.error(`Error fetching events from ${this.name}:`, error);
      return [];
    }
  }
}

/**
 * Example: Visit Erie Fetcher
 */
export class VisitErieFetcher extends BaseEventFetcher {
  name = "Visit Erie";
  url = "https://www.visiterie.com/events";

  async fetchEvents(): Promise<Event[]> {
    try {
      // TODO: Implement actual web scraping or API calls
      console.log(`Fetching events from ${this.name}...`);
      return [];
    } catch (error) {
      console.error(`Error fetching events from ${this.name}:`, error);
      return [];
    }
  }
}

/**
 * Event Manager - Orchestrates event fetching and management
 */
export class EventManager {
  private sources: EventSource[] = [];

  constructor() {
    // Register event sources
    this.sources.push(new ErieEventsBoardFetcher());
    this.sources.push(new VisitErieFetcher());
  }

  /**
   * Add a custom event source
   */
  addSource(source: EventSource): void {
    this.sources.push(source);
  }

  /**
   * Fetch events from all registered sources
   */
  async fetchAllEvents(): Promise<Event[]> {
    console.log(`Fetching events from ${this.sources.length} sources...`);

    const eventPromises = this.sources.map(source => source.fetchEvents());
    const results = await Promise.allSettled(eventPromises);

    const allEvents: Event[] = [];
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`✅ ${this.sources[index].name}: ${result.value.length} events`);
        allEvents.push(...result.value);
      } else {
        console.error(`❌ ${this.sources[index].name} failed:`, result.reason);
      }
    });

    // Remove duplicates based on title and date
    const uniqueEvents = this.deduplicateEvents(allEvents);
    console.log(`Total unique events fetched: ${uniqueEvents.length}`);

    return uniqueEvents;
  }

  /**
   * Remove duplicate events
   */
  private deduplicateEvents(events: Event[]): Event[] {
    const seen = new Set<string>();
    return events.filter(event => {
      const key = `${event.title.toLowerCase()}-${event.date}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  /**
   * Get current upcoming events (filters past events)
   */
  getCurrentEvents(): Event[] {
    return filterUpcomingEvents(events);
  }

  /**
   * Get analytics about events
   */
  getEventAnalytics() {
    const allEvents = events;
    const upcomingEvents = filterUpcomingEvents(events);
    const pastEvents = allEvents.length - upcomingEvents.length;

    const categoryCounts = upcomingEvents.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: allEvents.length,
      upcoming: upcomingEvents.length,
      past: pastEvents,
      categoryCounts,
      nextSevenDays: getUpcomingEvents(upcomingEvents, 7).length,
      nextThirtyDays: getUpcomingEvents(upcomingEvents, 30).length,
    };
  }
}

// Singleton instance
export const eventManager = new EventManager();

/**
 * Scheduled task runner
 * Call this function on a schedule (e.g., daily via cron job or scheduled task)
 */
export async function runEventUpdateTask() {
  console.log("🔄 Running automated event update task...");

  try {
    // Get analytics before update
    const beforeAnalytics = eventManager.getEventAnalytics();
    console.log("📊 Current event stats:", beforeAnalytics);

    // Fetch new events from all sources
    const newEvents = await eventManager.fetchAllEvents();

    if (newEvents.length > 0) {
      console.log(`✅ Found ${newEvents.length} new events`);

      // TODO: Implement logic to:
      // 1. Merge new events with existing events
      // 2. Update the erieData.ts file
      // 3. Send notifications about new events
      // 4. Archive past events

      console.log("💡 To implement: Update erieData.ts with new events");
    } else {
      console.log("ℹ️ No new events found");
    }

    console.log("✅ Event update task completed");
  } catch (error) {
    console.error("❌ Event update task failed:", error);
  }
}
