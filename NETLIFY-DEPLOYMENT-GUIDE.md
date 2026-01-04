# Netlify Deployment Guide - Erie Navigator

## ✅ Pre-Deployment Checklist

Your static site is ready! Here's what's confirmed working:
- ✅ Production build completes successfully
- ✅ All JSON data files are present (restaurants, events, activities, programs, groups)
- ✅ All images and assets are bundled correctly
- ✅ Netlify configuration file (`netlify.toml`) is set up
- ✅ Code is committed and pushed to `claude/analyze-erie-navigator-UF2bj` branch

---

## 🚀 Step-by-Step Netlify Deployment

### Step 1: Create New Site on Netlify

1. Go to [netlify.com](https://netlify.com) and log in
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** as your Git provider
4. Authorize Netlify to access your GitHub account

### Step 2: Select Repository and Branch

**⚠️ CRITICAL: Make sure you select the correct branch!**

- **Repository**: `solkunai/Erie-Navigator` (or your repo name)
- **Branch to deploy**: `claude/analyze-erie-navigator-UF2bj` ← **THIS IS IMPORTANT!**

### Step 3: Configure Build Settings

Netlify should auto-detect these from your `netlify.toml`, but verify:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 20 (set in netlify.toml)

### Step 4: Deploy

Click **"Deploy site"** and wait for the build to complete (usually 2-3 minutes).

---

## 🔧 Troubleshooting "Wrong Site" Issue

If you're seeing the wrong site (old version, different content, etc.), try these solutions:

### Solution 1: Verify Branch Selection

**Most Common Issue!**

1. Go to Netlify dashboard
2. Click on your site
3. Go to **Site settings** → **Build & deploy** → **Continuous deployment**
4. Under "Branch" - make sure it shows: `claude/analyze-erie-navigator-UF2bj`
5. If it shows a different branch (like `main` or `static-site-conversion`):
   - Click **Edit settings**
   - Change branch to `claude/analyze-erie-navigator-UF2bj`
   - Save and trigger a new deploy

### Solution 2: Clear Cache and Redeploy

1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Clear cache and deploy site**
3. Wait for fresh build to complete

### Solution 3: Check Build Logs

1. Go to **Deploys** tab
2. Click on the most recent deploy
3. Click **"Deploy log"**
4. Look for any errors or warnings
5. Verify you see:
   ```
   Build command from netlify.toml: npm run build
   Publish directory: dist
   ```

### Solution 4: Verify Build Output

In the deploy log, you should see:
```
vite v5.4.20 building for production...
✓ 1739 modules transformed.
✓ built in ~8s
```

If you see errors mentioning server, database, or Express, the wrong branch was deployed.

### Solution 5: Delete and Redeploy

If nothing else works:
1. Delete the site from Netlify
2. Create a new site from scratch
3. **Carefully** select `claude/analyze-erie-navigator-UF2bj` branch
4. Deploy again

---

## 🌐 Connecting Your Porkbun Domain

Once your Netlify site is working correctly:

### Option A: Use Porkbun DNS (Recommended)

1. In Netlify, go to **Domain settings** → **Add custom domain**
2. Enter your domain (e.g., `erienavigator.com`)
3. Netlify will provide DNS records to add
4. Go to Porkbun dashboard → Your domain → DNS Records
5. Add these records:
   - **A Record**: `@` → Netlify's IP (they'll provide it)
   - **CNAME Record**: `www` → `your-site.netlify.app`
6. Wait for DNS propagation (can take up to 48 hours, usually 10-30 minutes)

### Option B: Use Netlify DNS

1. In Netlify, go to **Domain settings** → **Add custom domain**
2. Choose **"Use Netlify DNS"**
3. Copy the nameservers Netlify provides
4. Go to Porkbun → Your domain → Nameservers
5. Change nameservers to Netlify's
6. Wait for propagation

---

## 🔍 How to Verify It's the Correct Site

Once deployed, check these to confirm you're seeing the static site:

### ✅ Checklist:
1. **AI Chat**: Click the chat button - should show "🚧 AI Assistant Coming Soon!" message
2. **URL Bar**: Navigate to different pages - URL should change (e.g., `/restaurants`, `/events`)
3. **Data Loading**: All restaurants, events should load immediately (not from API)
4. **Submit Business**: Go to `/submit-business` - form should exist
5. **No Errors**: Open browser DevTools (F12) → Console - should be no 404 errors for `/api/` endpoints

### ❌ Signs You're on the Wrong Deployment:
- AI chat tries to connect to server
- Console shows 404 errors for `/api/ai/recommend`
- Site is slow to load
- Pages don't load at all
- Different UI than localhost

---

## 📊 Expected Build Stats

Your successful deployment should show:

```
Build time: 6-10 seconds
Bundle size: ~437 KB (gzipped: ~132 KB)
CSS size: ~84 KB (gzipped: ~14 KB)
Files: 13 images + index.html + favicon
```

---

## 🆘 Still Having Issues?

### Check These:

1. **In Netlify Deploy Log**, search for:
   - "vite build" (should be present)
   - "express" or "server" (should NOT be present)
   - "Build succeeded" (should be at the end)

2. **Compare Deploy URLs**:
   - Netlify gives each deploy a unique URL
   - Make sure you're visiting the latest deploy URL
   - Old deploys are still accessible and might confuse you

3. **Environment Variables**:
   - You don't need ANY environment variables for the static site
   - If you see environment variable errors, remove them all

4. **Node Version**:
   - Should be Node 20 (set in netlify.toml)
   - If build fails, try setting it manually in Netlify settings

---

## 🎉 Success Indicators

You'll know it's working when:

1. ✅ Netlify build completes in ~8 seconds
2. ✅ Site loads instantly (no server spin-up)
3. ✅ All pages work (restaurants, events, things-to-do, etc.)
4. ✅ AI chat shows "Coming Soon" message
5. ✅ Submit business form works
6. ✅ No console errors
7. ✅ Images all load correctly

---

## 📁 What's Actually Being Deployed

From branch `claude/analyze-erie-navigator-UF2bj`:

```
dist/
├── index.html (2.3 KB)
├── favicon.png
└── assets/
    ├── index-[hash].js (437 KB) - All React + data bundled
    ├── index-[hash].css (84 KB) - All styles
    └── [images].jpg/png - All restaurant/event images
```

The JSON data files are **bundled inside** the JavaScript file, not separate files.

---

## 🔄 Auto-Deploy Setup

Once working, every push to `claude/analyze-erie-navigator-UF2bj` will auto-deploy:

1. Make changes locally
2. Commit: `git commit -m "Update restaurants"`
3. Push: `git push origin claude/analyze-erie-navigator-UF2bj`
4. Netlify automatically builds and deploys (takes ~1-2 minutes)
5. Site updates automatically

---

## 💰 Netlify Free Tier Limits

You're well within free tier:
- ✅ 100 GB bandwidth/month (your site is ~1 MB, so ~100,000 views/month)
- ✅ 300 build minutes/month (your builds take 0.13 minutes each)
- ✅ 100 form submissions/month (for business submissions)

---

**Next Step**: Go to Netlify, carefully select the `claude/analyze-erie-navigator-UF2bj` branch, and deploy. If it still shows the wrong site, check the deploy logs and verify the branch selection in settings.
