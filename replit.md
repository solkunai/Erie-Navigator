# Erie Community Directory

## Overview

A community discovery platform for Erie, PA that helps residents and visitors find restaurants, events, activities, autism programs, and social groups. The application features an AI-powered assistant for natural language queries, real-time clock display, and comprehensive filtering/search capabilities across all content categories.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, React useState for local state
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Build Tool**: Vite with custom plugins for Replit integration

**Design Pattern**: Component-based architecture with page-level components in `/client/src/pages/` and reusable UI components in `/client/src/components/`. The design follows guidelines inspired by Yelp, Eventbrite, and Airbnb for directory and discovery UX.

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints under `/api/` prefix
- **AI Integration**: OpenAI-compatible API via Replit's AI Integrations service for the chat assistant

**Key Endpoints**:
- `/api/restaurants` - Restaurant listings with category/search filtering
- `/api/events` - Event listings with date/category filtering
- `/api/activities` - Activities by category and audience type
- `/api/autism-programs` - Autism support programs
- `/api/social-groups` - Social groups and organizations
- `/api/chat` - AI assistant endpoint

### Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: `/shared/schema.ts` contains type definitions and database schemas
- **Current Storage**: In-memory storage using static data in `/server/erieData.ts` (database tables defined but data seeding may be needed)

**Shared Types**: The `/shared/` directory contains schemas and types used by both frontend and backend, ensuring type safety across the stack.

### Build System
- **Development**: `tsx` for TypeScript execution with Vite dev server
- **Production**: Custom build script (`/script/build.ts`) using esbuild for server bundling and Vite for client bundling
- **Output**: Compiled to `/dist/` with static files in `/dist/public/`

## External Dependencies

### AI Services
- **OpenAI API**: Accessed through Replit's AI Integrations (`AI_INTEGRATIONS_OPENAI_BASE_URL`, `AI_INTEGRATIONS_OPENAI_API_KEY`)
- Used for natural language chat assistant to help users discover local content

### Database
- **PostgreSQL**: Required via `DATABASE_URL` environment variable
- **Session Storage**: `connect-pg-simple` for Express session management

### UI Component Library
- **shadcn/ui**: Pre-built accessible components based on Radix UI primitives
- **Radix UI**: Underlying headless component library (accordion, dialog, dropdown, tabs, etc.)

### Key Runtime Dependencies
- `express` - HTTP server
- `drizzle-orm` / `drizzle-zod` - Database ORM and validation
- `@tanstack/react-query` - Data fetching and caching
- `wouter` - Client-side routing
- `tailwindcss` - Utility-first CSS
- `date-fns` - Date manipulation
- `zod` - Schema validation