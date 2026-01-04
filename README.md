# Discover Erie, PA 🌊

Your complete guide to restaurants, events, activities, programs, and community groups in Erie, PA and the surrounding area.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the site.

### Build for Production

```bash
# Build static site
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
Erie-Navigator/
├── client/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components (Home, Restaurants, Events, etc.)
│   │   ├── lib/            # Utilities and data loading
│   │   ├── data/           # JSON data files (restaurants, events, etc.)
│   │   └── types/          # TypeScript type definitions
│   ├── public/             # Static assets (images, favicon)
│   └── index.html          # HTML entry point
├── netlify.toml            # Netlify deployment config
├── vite.config.ts          # Vite build configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Tech Stack

- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite
- **Deployment**: Netlify (static site)

## 📊 Data Management

All business and event data is stored in JSON files located in `client/src/data/`:

- `restaurants.json` - Restaurant listings with categories, addresses, hours
- `events.json` - Upcoming events and activities
- `activities.json` - Family-friendly activities and attractions
- `programs.json` - Autism support programs
- `groups.json` - Social groups and community organizations

To add or update listings, simply edit these JSON files and rebuild the site.

## 🌐 Deployment

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Select branch: `claude/analyze-erie-navigator-UF2bj`
3. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build-output`
4. Deploy!

The site is configured via `netlify.toml` with automatic redirects for SPA routing.

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

## 🤖 AI Chat Feature

The AI chat assistant is currently **disabled** to avoid API costs. When clicked, it shows a "Coming Soon" message.

To enable it in the future:
1. Add your OpenAI API key
2. Uncomment the API call in `client/src/components/ai-chat.tsx`
3. Update the server endpoint or implement serverless function

## 📝 Business Submissions

Users can submit their businesses via the `/submit-business` page. Submissions are handled by Netlify Forms (free tier includes 100 submissions/month).

View submissions in Netlify dashboard under **Forms**.

## 🎯 Features

- 🍽️ **Restaurant Directory** - Browse by cuisine type, price range
- 📅 **Events Calendar** - Upcoming community events
- 🎪 **Things to Do** - Activities for families and kids
- 🧩 **Autism Programs** - Support programs and resources
- 👥 **Social Groups** - Community groups and meetups
- 🔍 **Search** - Find anything across all categories
- 💬 **AI Assistant** - Coming soon!

## 💰 Cost

- **Hosting**: $0/month (Netlify free tier)
- **Forms**: $0/month (100 submissions included)
- **AI Chat**: Disabled (enable when ready with OpenAI API)

**Total**: $0/month

## 🛠️ Development

```bash
# Type checking
npm run check

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 📄 License

MIT

## 🤝 Contributing

Want to add your business to the directory? Visit [your-site-url]/submit-business

---

Built with ❤️ for the Erie, PA community
