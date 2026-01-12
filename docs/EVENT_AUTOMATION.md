# Event Automation System

This document describes the automated event checking and management system for Hello Erie.

## Overview

The event automation system provides:
- **Automatic filtering** of past events
- **Analytics** about event data
- **Framework** for fetching events from multiple sources
- **API endpoints** for event management
- **Foundation** for scheduled updates

## Architecture

### Components

1. **EventManager** (`server/utils/eventManager.ts`)
   - Core orchestrator for event operations
   - Manages multiple event sources
   - Provides analytics and filtering

2. **BaseEventFetcher** (Abstract class)
   - Template for implementing event scrapers
   - Built-in validation and sanitization
   - Error handling

3. **API Endpoints** (`server/routes.ts`)
   - `/api/events/analytics` - Event statistics
   - `/api/events/upcoming` - Filtered upcoming events
   - `/api/events/update` - Manual update trigger

## Usage

### Get Event Analytics

Get statistics about current events:

```bash
curl http://localhost:5000/api/events/analytics
```

Response:
```json
{
  "success": true,
  "data": {
    "total": 10,
    "upcoming": 8,
    "past": 2,
    "categoryCounts": {
      "Music": 3,
      "Arts": 2,
      "Sports": 1,
      "Food & Drink": 2
    },
    "nextSevenDays": 3,
    "nextThirtyDays": 8
  }
}
```

### Get Upcoming Events

Get only events that haven't passed:

```bash
# All upcoming events
curl http://localhost:5000/api/events/upcoming

# Events in next 7 days
curl http://localhost:5000/api/events/upcoming?days=7

# Events in next 30 days
curl http://localhost:5000/api/events/upcoming?days=30
```

### Trigger Manual Update

Manually trigger the event update task:

```bash
curl -X POST http://localhost:5000/api/events/update
```

## Implementing Event Sources

To add a new event source, extend the `BaseEventFetcher` class:

```typescript
import { BaseEventFetcher } from "./eventManager";
import { Event } from "@shared/schema";

export class MyEventSourceFetcher extends BaseEventFetcher {
  name = "My Event Source";
  url = "https://example.com/events";

  async fetchEvents(): Promise<Event[]> {
    try {
      // 1. Fetch data from your source (web scraping, API call, etc.)
      const response = await fetch(this.url);
      const data = await response.json();

      // 2. Transform to Event schema
      const events: Event[] = data.map(item => ({
        id: item.id || `event-${Date.now()}`,
        title: item.title,
        category: item.category || "Community",
        date: item.date,
        time: item.time,
        venue: item.venue,
        address: item.address,
        description: item.description,
        isFree: item.isFree || false,
        price: item.price,
        ticketUrl: item.ticketUrl,
        imageUrl: item.imageUrl,
      }));

      // 3. Validate and sanitize
      return events
        .filter(event => this.validateEvent(event))
        .map(event => this.sanitizeEvent(event));
    } catch (error) {
      console.error(`Error fetching from ${this.name}:`, error);
      return [];
    }
  }
}

// Register your source
import { eventManager } from "./eventManager";
eventManager.addSource(new MyEventSourceFetcher());
```

## Scheduling Automated Updates

### Option 1: Node.js Scheduler (node-cron)

Install node-cron:
```bash
npm install node-cron
```

Add to `server/index.ts`:
```typescript
import cron from 'node-cron';
import { runEventUpdateTask } from './utils/eventManager';

// Run daily at 3 AM
cron.schedule('0 3 * * *', () => {
  console.log('Running scheduled event update...');
  runEventUpdateTask();
});
```

### Option 2: System Cron Job (Linux/macOS)

Create a script `scripts/update-events.sh`:
```bash
#!/bin/bash
cd /path/to/Erie-Navigator
curl -X POST http://localhost:5000/api/events/update
```

Add to crontab:
```bash
# Edit crontab
crontab -e

# Add this line (runs daily at 3 AM)
0 3 * * * /path/to/Erie-Navigator/scripts/update-events.sh >> /var/log/erie-events.log 2>&1
```

### Option 3: GitHub Actions (Cloud-based)

Create `.github/workflows/update-events.yml`:
```yaml
name: Update Events
on:
  schedule:
    - cron: '0 3 * * *'  # Daily at 3 AM UTC
  workflow_dispatch:  # Allow manual trigger

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger event update
        run: |
          curl -X POST https://your-domain.com/api/events/update
```

### Option 4: Render Cron Jobs (Recommended for Render.com)

In your Render dashboard:
1. Go to your web service
2. Add a new "Cron Job"
3. Command: `curl -X POST http://localhost:5000/api/events/update`
4. Schedule: `0 3 * * *` (daily at 3 AM)

## Event Sources to Implement

Suggested Erie-area event sources:

1. **Visit Erie** - https://www.visiterie.com/events
2. **Erie Events** - https://www.erieevents.com
3. **Erie Times News Events** - https://www.goerie.com/events
4. **Mercyhurst Events** - https://www.mercyhurst.edu/events
5. **Penn State Behrend** - https://behrend.psu.edu/events
6. **Erie Philharmonic** - https://www.eriephil.org
7. **Erie Art Museum** - https://erieartmuseum.org
8. **Warner Theatre** - https://www.erieevents.com/venues/warner-theatre
9. **Facebook Events** - Facebook Graph API
10. **Eventbrite** - Eventbrite API

## Future Enhancements

Planned improvements:

- [ ] Implement actual web scrapers for Erie event sources
- [ ] Add event image downloading and storage
- [ ] Create admin dashboard for event approval
- [ ] Add email notifications for new events
- [ ] Implement duplicate detection across sources
- [ ] Add event categorization using AI
- [ ] Create event submission form for community members
- [ ] Add calendar export (iCal format)
- [ ] Implement event reminders
- [ ] Add event popularity tracking

## Testing

Test the system:

```bash
# Get analytics
curl http://localhost:5000/api/events/analytics

# Get upcoming events
curl http://localhost:5000/api/events/upcoming

# Trigger update
curl -X POST http://localhost:5000/api/events/update

# Check server logs for results
```

## Troubleshooting

### No events showing
- Check if events in `erieData.ts` have future dates
- Verify date format is YYYY-MM-DD
- Check server logs for errors

### Update task fails
- Verify event source URLs are accessible
- Check for network issues
- Review implementation of `fetchEvents()` methods

### Analytics incorrect
- Ensure event dates are properly formatted
- Check timezone handling
- Verify event data structure matches schema

## Contributing

To contribute new event sources:

1. Create a new fetcher class extending `BaseEventFetcher`
2. Implement the `fetchEvents()` method
3. Test locally with `runEventUpdateTask()`
4. Submit PR with documentation

## Security Considerations

- Rate limit the `/api/events/update` endpoint in production
- Add authentication for admin endpoints
- Sanitize all external data before storage
- Validate URLs and prevent SSRF attacks
- Monitor for scraping abuse from your server
