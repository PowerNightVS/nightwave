# Streams Feature - Setup Guide

## Features Added

✅ **Live Streams Page** - Display active Discord streams  
✅ **Discord OAuth Login** - Secure user authentication  
✅ **Bot Status Dashboard** - Shows uptime, server count, members  
✅ **Stream Viewer Interface** - Browse and join streams  

---

## Configuration

### 1. Discord OAuth Setup

Add to your `.env.local` file:

```env
VITE_DISCORD_CLIENT_ID=YOUR_DISCORD_CLIENT_ID
VITE_API_URL=https://powernight.space
```

### 2. Discord Developer Portal

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to **OAuth2 > General**
4. Add Redirect URI: `http://localhost:5173/auth/callback` (dev) or `https://yourdomain.com/auth/callback` (production)
5. Copy your **Client ID** to `.env.local`

### 3. Backend API Endpoints Required

Your backend (`powernight.space`) should implement:

```
POST /api/auth/callback
  - Receives Discord OAuth code
  - Returns { token: "user_token" }

GET /api/streams
  - Returns array of active streams
  - Example: [{ id, streamer, title, quality, url, viewers, startTime }]

GET /api/bot-status
  - Returns { uptime, serversCount, membersCount, isOnline }

POST /api/add_stream
  - Receives { streamer, title, quality, url }
  - Called when `/stream` command is used

POST /api/stop_stream
  - Receives { streamer }
  - Called when stream stops
```

---

## File Structure

```
src/
├── pages/
│   ├── StreamsPage.tsx          ← Main streams display
│   └── AuthCallbackPage.tsx     ← OAuth callback handler
├── components/
│   ├── Layout.tsx               ← Updated with Streams link
└── App.tsx                       ← Updated with new routes
```

---

## Usage

### View Streams
1. Navigate to `/streams`
2. Click "Login with Discord"
3. Authorize the application
4. Browse live streams
5. Click "Join Stream" to go to Discord voice channel

### Bot Commands (Discord Side - Python)

```python
@bot.tree.command(name="stream", description="Start streaming")
async def stream(interaction: discord.Interaction, title: str, quality: str):
    # Sends stream data to API
    
@bot.tree.command(name="stopstream", description="Stop streaming")
async def stopstream(interaction: discord.Interaction):
    # Notifies API of stream stop
```

---

## Running the App

```bash
npm install
npm run dev
```

Visit `http://localhost:5173/streams`

---

## Security Notes

⚠️ **Never commit tokens or sensitive keys**  
⚠️ **Always use HTTPS in production**  
⚠️ **Regenerate bot token if compromised**  
⚠️ **Keep Discord Client Secret secure on backend only**
