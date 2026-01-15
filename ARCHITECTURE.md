# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Browser (Your Users)                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              React + Vite Frontend (localhost:5173)             │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    StreamsPage.tsx                        │  │
│  │  - Display active streams                                │  │
│  │  - Show bot status dashboard                             │  │
│  │  - Handle user login/logout                              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              AuthCallbackPage.tsx                         │  │
│  │  - Receive OAuth code from Discord                       │  │
│  │  - Exchange code for access token                        │  │
│  │  - Store token in localStorage                           │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
        ↓                                    ↓
    (OAuth)                           (API Requests)
        ↓                                    ↓
┌──────────────────────────┐    ┌──────────────────────────┐
│   Discord OAuth Server   │    │   Backend API Server     │
│  discord.com/api/oauth2  │    │ (powernight.space)       │
│                          │    │                          │
│  - Authenticate user     │    │  - /api/auth/callback    │
│  - Redirect with code    │    │  - /api/streams          │
└──────────────────────────┘    │  - /api/bot-status       │
                                 │  - /api/add_stream       │
                                 │  - /api/stop_stream      │
                                 └──────────────────────────┘
                                           ↓
                          ┌────────────────────────────────┐
                          │  Discord Bot (Python)          │
                          │                                │
                          │  - /stream command             │
                          │  - /stopstream command         │
                          │  - on_voice_state_update event │
                          └────────────────────────────────┘
```

## Data Flow

### 1. User Login Flow
```
User clicks "Login with Discord"
    ↓
StreamsPage.tsx: handleDiscordLogin()
    ↓
Redirects to Discord OAuth URL with Client ID
    ↓
User logs in & authorizes at Discord
    ↓
Discord redirects to /auth/callback with code
    ↓
AuthCallbackPage.tsx: exchangeCodeForToken()
    ↓
POST to /api/auth/callback with code
    ↓
Backend exchanges code for access token
    ↓
Backend returns token in response
    ↓
Frontend stores token in localStorage
    ↓
User redirected to /streams page
    ↓
StreamsPage loads user data and streams ✓
```

### 2. Display Streams Flow
```
User visits /streams page
    ↓
StreamsPage.tsx: useEffect() runs
    ↓
Calls: fetchStreams() → GET /api/streams
    ↓
Backend queries database for active streams
    ↓
Returns array of stream objects:
  [
    {
      id: "123",
      streamer: "UserName",
      title: "Playing Valorant",
      quality: "1080p60",
      url: "discord.com/channels/...",
      viewers: 42,
      startTime: "2024-01-16T10:30:00Z"
    },
    ...
  ]
    ↓
Frontend renders streams in grid layout
    ↓
User sees live stream cards ✓
```

### 3. Bot Status Flow
```
StreamsPage mounts
    ↓
Calls: fetchBotStatus() → GET /api/bot-status
    ↓
Backend queries Discord bot stats:
  {
    isOnline: true,
    uptime: 2592000000ms,
    serversCount: 150,
    membersCount: 45000
  }
    ↓
Frontend displays in 4-column dashboard:
  [Online Status] [Uptime] [Servers] [Members]
    ↓
Formatted and animated display ✓
```

### 4. Start Stream Flow (Discord Bot)
```
User types: /stream title:"Gaming" quality:"1080p60"
    ↓
Discord Bot receives slash command
    ↓
/stream command handler checks:
  - Is user in voice channel?
    ↓
    If NO: Send error message ✓
    If YES: Continue
    ↓
Create stream URL:
  https://discord.com/channels/{guild_id}/{channel_id}
    ↓
POST to /api/add_stream with:
  {
    streamer: "UserName",
    title: "Gaming",
    quality: "1080p60",
    url: "https://discord.com/channels/..."
  }
    ↓
Backend saves stream to database
    ↓
Frontend polls /api/streams
    ↓
New stream appears on Streams page ✓
```

### 5. Stop Stream Flow
```
User types: /stopstream
    ↓
Discord Bot receives command
    ↓
POST to /api/stop_stream with:
  { streamer: "UserName" }
    ↓
Backend removes stream from database
    ↓
Frontend refreshes stream list
    ↓
Stream disappears from page ✓
```

## Component Hierarchy

```
App.tsx
├── Router
└── Layout.tsx
    ├── Navigation (with Streams link)
    │   └── "Streams" link → /streams
    ├── Routes
    │   ├── / → HomePage
    │   ├── /features → FeaturesPage
    │   ├── /streams → StreamsPage ← NEW
    │   │   ├── Header section
    │   ├── /auth/callback → AuthCallbackPage ← NEW
    │   │   └── OAuth callback handler
    │   ├── /about → AboutPage
    │   └── /support → SupportPage
    └── Footer
```

## State Management

### StreamsPage State
```
const [streams, setStreams] = useState<Stream[]>([])
  ↓ Fetched from GET /api/streams
  ↓ Updated when new streams start/stop

const [botStatus, setBotStatus] = useState<BotStatus | null>(null)
  ↓ Fetched from GET /api/bot-status
  ↓ Shows online/uptime/servers/members

const [user, setUser] = useState<User | null>(null)
  ↓ Fetched from Discord API after OAuth
  ↓ Shows username in header

const [loading, setLoading] = useState(true)
  ↓ Loading state during initial fetch
```

## API Endpoints Summary

```
┌─────────────────────────────────────────────────────────┐
│  FRONTEND REQUESTS                                      │
└─────────────────────────────────────────────────────────┘

POST /api/auth/callback
├─ Input:  { code: "discord_oauth_code" }
├─ Called: On OAuth redirect
└─ Output: { token: "jwt_token" }

GET /api/streams
├─ Input:  None
├─ Called: On page load & periodically
└─ Output: [{ id, streamer, title, quality, url, viewers, startTime }]

GET /api/bot-status
├─ Input:  None
├─ Called: On page load & periodically
└─ Output: { isOnline, uptime, serversCount, membersCount }

┌─────────────────────────────────────────────────────────┐
│  DISCORD BOT REQUESTS (via Python)                      │
└─────────────────────────────────────────────────────────┘

POST /api/add_stream
├─ Input:  { streamer, title, quality, url }
├─ Called: When /stream command is used
└─ Output: { success: true }

POST /api/stop_stream
├─ Input:  { streamer }
├─ Called: When /stopstream command or user leaves VC
└─ Output: { success: true }
```

## Tech Stack

```
Frontend:
  ├─ React 18.3.1
  ├─ TypeScript 5.5.4
  ├─ Vite 7.3.1 (Build tool)
  ├─ React Router 6.26.2 (Routing)
  ├─ Framer Motion 11.5.4 (Animations)
  ├─ Tailwind CSS 3.4.17 (Styling)
  └─ Lucide React 0.522.0 (Icons)

Backend (Your implementation):
  ├─ Framework: Express, FastAPI, etc.
  ├─ Database: Your choice (PostgreSQL, MongoDB, etc.)
  └─ Auth: Discord OAuth 2.0

Discord Bot:
  ├─ Language: Python 3.8+
  ├─ Library: discord.py 2.0+
  └─ HTTP: aiohttp (async requests)
```

## Security Flow

```
1. User clicks "Login with Discord"
   ↓
2. Frontend redirects to Discord OAuth
   ↓
3. User logs in (at Discord, not your site)
   ↓
4. Discord redirects to /auth/callback with code
   ↓
5. Frontend receives code (NOT the token)
   ↓
6. Frontend sends code to backend
   ↓
7. Backend (with Client Secret) exchanges code for token
   ↓
8. Backend returns token to frontend
   ↓
9. Frontend stores token in localStorage
   ↓
10. Token is used for subsequent API requests ✓

Note: Client Secret NEVER leaves the backend!
```

---

This architecture ensures:
✅ Secure OAuth flow
✅ Separation of concerns
✅ Scalable design
✅ Real-time stream updates
✅ Responsive user experience
