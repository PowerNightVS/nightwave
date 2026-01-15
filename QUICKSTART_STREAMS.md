# 🎬 Streams Feature - Quick Start

## What's New

A complete **live streams** page with Discord OAuth authentication and bot status dashboard has been added to your Vite React app.

### New Files Created:
- `src/pages/StreamsPage.tsx` - Main streams display page
- `src/pages/AuthCallbackPage.tsx` - OAuth callback handler
- `STREAMS_SETUP.md` - Detailed configuration guide
- `.env.example` - Environment variables template

### Updated Files:
- `src/App.tsx` - Added /streams and /auth/callback routes
- `src/components/Layout.tsx` - Added "Streams" to navigation menu

---

## Quick Setup

### Step 1: Create `.env.local`

```bash
# Copy from template
cp .env.example .env.local

# Edit .env.local with your Discord Client ID
VITE_DISCORD_CLIENT_ID=your_client_id_here
```

### Step 2: Discord Developer Portal Setup

1. Go to https://discord.com/developers/applications
2. Create or select your bot application
3. Go to **OAuth2 → General**
4. Click "Add Redirect"
5. Add: `http://localhost:5173/auth/callback` (development)
6. Copy your **Client ID** from the page
7. Paste into `.env.local`

### Step 3: Backend Configuration

Your backend needs to support these endpoints:

```javascript
// POST /api/auth/callback
// Body: { code: "discord_oauth_code" }
// Response: { token: "user_token" }

// GET /api/streams
// Response: [{ id, streamer, title, quality, url, viewers, startTime }]

// GET /api/bot-status
// Response: { uptime, serversCount, membersCount, isOnline }
```

### Step 4: Run the App

```bash
npm run dev
```

Visit: `http://localhost:5173/streams`

---

## Features

✨ **Live Stream Display**
- Shows active Discord streams
- Displays streamer info (name, title, quality)
- Real-time viewer count
- Direct links to join streams

📊 **Bot Status Dashboard**
- Bot online/offline status
- Uptime (formatted as days, hours, minutes)
- Server count the bot is in
- Total members across servers

🔐 **Discord OAuth**
- Secure user authentication
- Automatic token storage
- Logout functionality

---

## Discord Bot Commands (Python Backend)

Your Discord bot should have these slash commands:

```python
@bot.tree.command(name="stream", description="Start streaming")
async def stream(interaction: discord.Interaction, title: str, quality: str):
    # Posts to https://powernight.space/api/add_stream
    # Payload: { streamer, title, quality, url }

@bot.tree.command(name="stopstream", description="Stop streaming")
async def stopstream(interaction: discord.Interaction):
    # Posts to https://powernight.space/api/stop_stream
    # Payload: { streamer }
```

---

## Testing Locally

```bash
# Terminal 1 - Start dev server
npm run dev

# Terminal 2 - In another tab (optional - mock API)
# Create a simple Node server to mock the API endpoints
```

---

## Deployment

### 1. Update OAuth Redirect URI
```
https://yourdomain.com/auth/callback
```

### 2. Update `.env.local`
```
VITE_API_URL=https://yourdomain.com
```

### 3. Build & Deploy
```bash
npm run build
# Deploy dist/ folder
```

---

## Troubleshooting

### "Login with Discord" button doesn't work
- ✅ Check `.env.local` has correct `VITE_DISCORD_CLIENT_ID`
- ✅ Verify redirect URI in Discord Developer Portal
- ✅ Check browser console for errors (F12)

### Streams not loading
- ✅ Verify backend API is running
- ✅ Check network tab (F12) for failed requests
- ✅ Ensure `/api/streams` endpoint exists

### Bot status showing "OFFLINE"
- ✅ Verify `/api/bot-status` endpoint exists
- ✅ Check bot is actually online
- ✅ Review backend logs

---

## Security Checklist

- [ ] Regenerated Discord bot token (if you shared the old one)
- [ ] Never commit `.env.local` (it's already in .gitignore)
- [ ] Using HTTPS in production
- [ ] Backend validates OAuth tokens
- [ ] Discord Client Secret stays on backend only

---

## Need Help?

See `STREAMS_SETUP.md` for detailed configuration and API documentation.
