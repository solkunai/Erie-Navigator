# Erie Community Directory - Design Guidelines

## Design Approach

**Reference-Based with System Foundation**: Draw inspiration from **Yelp** (directory/filtering), **Eventbrite** (event discovery), and **Airbnb** (local exploration) while maintaining Material Design principles for consistency and accessibility. This community resource prioritizes findability and ease of use while showcasing Erie's vibrant local culture.

## Typography

**Font Families**:
- Primary: Inter (headings, navigation, buttons) - weights 400, 600, 700
- Secondary: System UI (body text, descriptions) - weights 400, 500

**Hierarchy**:
- Hero Headlines: text-5xl to text-6xl, font-bold
- Section Headers: text-3xl to text-4xl, font-semibold
- Category Titles: text-xl to text-2xl, font-semibold
- Body Text: text-base to text-lg, font-normal
- Metadata (hours, dates): text-sm, font-medium

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 8, 12, 16** (e.g., p-4, gap-8, mb-12, py-16)

**Grid Structure**:
- Container: max-w-7xl with px-4 to px-8
- Restaurant/Event Cards: 3-column desktop (lg:grid-cols-3), 2-column tablet (md:grid-cols-2), single-column mobile
- Filters sidebar: Fixed 280px width on desktop, collapsible drawer on mobile
- Content sections: Consistent py-16 vertical rhythm

## Component Library

### Navigation
- **Header**: Sticky navigation with logo left, primary links center, search/AI assistant right
- **Category Navigation**: Horizontal pill tabs (Restaurants, Events, Things to Do, Programs, Social Groups) with active state indicators
- **Filter Panel**: Vertical sidebar with collapsible category groups, checkboxes for multi-select, clear/apply buttons

### Cards & Listings
- **Restaurant Cards**: Image (16:9 ratio), title, cuisine type badge, rating stars, price range ($-$$$$), quick info (hours, distance)
- **Event Cards**: Event image, date badge overlay (top-left corner), title, venue, time, ticket info
- **Program Cards**: Icon or image, organization name, description, contact button, accessibility indicators

### Interactive Elements
- **Category Filter Pills**: Rounded-full, px-4 py-2, hover lift effect
- **Search Bar**: Large, prominent with icon, rounded-lg, shadow on focus
- **AI Assistant Panel**: Slide-out drawer from right side, chat interface with message bubbles, suggestion chips
- **Calendar View**: Month grid with date cells showing event count dots, expandable day details

### Data Display
- **Real-time Clock**: Prominent display showing current Erie time (HH:MM AM/PM EST), date below, updates every second
- **Results Counter**: "Showing X of Y results" with sort dropdown
- **Quick Stats**: Icon + number + label (e.g., "150+ Restaurants", "50+ Weekly Events")

### Forms & Inputs
- **Filter Checkboxes**: Material-style with labels, grouped by category
- **Search Input**: Large hero search on homepage, compact header search on other pages
- **AI Chat Input**: Text area with send button, voice input option

## Images Strategy

### Hero Section
**Large Hero Image**: Full-width, 60vh height, showcasing Erie waterfront or Presque Isle. Overlay with semi-transparent gradient (bottom-to-top) for text readability. Hero content includes:
- Main headline: "Discover Erie, PA"
- Subheading: "Your complete guide to restaurants, events, and community"
- Search bar with AI assistant toggle
- Blurred background buttons (not for hover states)

### Category Images
- **Restaurant listings**: High-quality food photography (2:3 aspect ratio cards)
- **Event listings**: Event venue/activity photos (16:9 landscape)
- **Things to Do**: Activity-specific imagery (families, attractions, outdoor scenes)
- **Program Cards**: Use icons or small representative images (1:1 square)

### Placeholder Strategy
- Restaurant cards without images: Cuisine-specific gradient backgrounds with large cuisine type icon
- Events without images: Category-based illustrations (music, sports, arts icons)

## AI Assistant Interface

**Chat Panel Design**:
- Slide-out drawer (400px wide) with chat messages
- User messages: Right-aligned, rounded bubbles
- AI responses: Left-aligned with restaurant/event cards embedded inline
- Suggested queries as clickable chips: "Mexican food tonight", "Family activities this weekend", "Autism-friendly events"
- Real-time typing indicator during AI processing

## Calendar Integration

**Event Calendar Component**:
- Month view as default with mini event previews
- Day cells show colored dots (max 3) representing event categories
- Click to expand day details in modal
- Filter by category with visual legend
- "Today" highlight with pulsing indicator
- Real-time clock display above calendar (EST timezone, updating)

## Accessibility & Performance

- High contrast ratios for text (WCAG AA minimum)
- Focus indicators on all interactive elements (2px outline)
- Autism programs section: Quiet, low-stimulation visual design with clear icons
- Mobile-first responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Lazy load images below fold
- Skeleton loaders for async content

## Special Sections

**Autism Programs**: Clean, organized cards with sensory-friendly design—minimal decoration, clear headings, prominent contact information, accessibility badges

**Social Groups**: List view with organization logos, meeting schedules, contact info, filter by interest area

This design balances Erie's local character with modern directory functionality, ensuring residents and visitors can quickly discover what the city offers.