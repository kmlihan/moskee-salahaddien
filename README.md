# Moskee Salahaddien — MERN App

A four-language (English, Dutch, French, Arabic) website for **Moskee Salahaddien**, a Belgian mosque in Gent run by a Humanitaire Vereniging. Showcases the community, live prayer times, the planned renovation of Antwerpsesteenweg 24, and ways to support the work.

```
moskee-salahaddien/
├── frontend/        ← React + Vite + Tailwind
└── backend/         ← Node + Express + MongoDB
```

---

## Quick start

### Prerequisites
- **Node.js 18+** (https://nodejs.org)
- **MongoDB** running locally on port 27017, OR a MongoDB Atlas connection string

### 1. Backend

```bash
cd backend
cp .env.example .env
# edit .env if needed — at minimum set ADMIN_TOKEN to a long random string

npm install
npm run dev
```

The API will be running on **http://localhost:4000**.

Test it:
```bash
curl http://localhost:4000/api/health
curl http://localhost:4000/api/prayer/today
```

### 2. Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The site will open at **http://localhost:3000**. The Vite dev server proxies `/api/*` to the backend automatically.

---

## What's included

### Frontend (`frontend/`)

A single-page React app, fully responsive, with:

- **Four languages** with full RTL support for Arabic
- **Live prayer times** for Gent (Aladhan API, Muslim World League method)
- **Hijri & Gregorian dates**
- **Next prayer countdown** in the top utility bar
- **Real photos** of the current mosque interior and architectural models of the renovation
- **Mosque logo** used in nav and footer
- **OpenStreetMap embed** for the visit section
- **Donation panel** with IBAN, account name, and reference fields
- **All contact details and social links** (Instagram, TikTok)

Built with **Vite + React 18 + Tailwind CSS + lucide-react**. Custom typography stack: Fraunces (display), Manrope (body), Amiri (Arabic). No external UI kit.

### Backend (`backend/`)

A small Express API with MongoDB persistence:

| Method | Path | Description |
|--------|------|-------------|
| `GET`    | `/api/health` | Health check |
| `GET`    | `/api/prayer/today` | Today's prayer times + Iqamah overrides (cached 6h) |
| `GET`    | `/api/announcements` | Active multilingual announcements |
| `POST`   | `/api/announcements` | Create announcement *(admin token)* |
| `PATCH`  | `/api/announcements/:id` | Update *(admin token)* |
| `DELETE` | `/api/announcements/:id` | Delete *(admin token)* |
| `POST`   | `/api/contact` | Submit contact form (rate-limited 5/h per IP) |

Mongoose schemas: `PrayerOverride`, `Announcement`, `ContactMessage`.

---

## Connecting frontend to backend

By default the frontend calls the Aladhan API directly from the browser — that way it works even without the backend running. To use **your** backend's prayer endpoint (which supports Iqamah overrides), change one line in `frontend/src/App.jsx`:

```js
// before
fetch('https://api.aladhan.com/v1/timingsByCity?city=Ghent&country=Belgium&method=3')

// after
fetch('/api/prayer/today')
```

The Vite proxy in `vite.config.js` already forwards `/api/*` to `http://localhost:4000`.

---

## Things to update before going live

1. **The IBAN** — currently a placeholder (`BE— — —`). Open `frontend/src/App.jsx`, search for `ibanValue`, and replace in all four language blocks.
2. **The map location** — the OpenStreetMap embed uses approximate Gent coordinates. Open `App.jsx`, search for `openstreetmap.org`, and update the `bbox` and `marker` values to the exact location of Antwerpsesteenweg 24.
3. **The contact form** — backend route exists at `POST /api/contact`. The frontend currently doesn't include a form UI; add a `<ContactForm />` section when ready.
4. **Admin UI for announcements** — the backend supports CRUD with an `ADMIN_TOKEN` header. You'll want a small admin page (or use Postman / curl) to add announcements like Ramadan timetable, Eid prayer time, special khutbahs.

---

## Deployment notes

**Frontend** is a static build — `npm run build` produces a `dist/` folder you can host anywhere (Netlify, Vercel, GitHub Pages, Cloudflare Pages, or a simple nginx).

**Backend** needs Node + MongoDB. Easiest options:
- **Railway / Render** — both have free tiers, MongoDB add-on available
- **MongoDB Atlas** for the database (free M0 cluster) + any Node host
- **A VPS** (Hetzner, DigitalOcean) running PM2

Make sure to set `CORS_ORIGIN` in production to your real frontend domain.

---

## Project structure

```
moskee-salahaddien/
├── README.md                       ← this file
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── public/
│   │   └── logo.png                ← favicon
│   └── src/
│       ├── main.jsx                ← Vite entry
│       ├── App.jsx                 ← the entire app
│       ├── index.css               ← Tailwind + global styles
│       └── assets/
│           ├── logo.png            ← mosque logo
│           ├── interior-1/2/3.jpg  ← prayer hall photos
│           ├── exterior-current.jpg← current building
│           └── model-1/2/3/4.jpg   ← architectural renderings
│
└── backend/
    ├── package.json
    ├── server.js                   ← Express entry
    ├── .env.example
    ├── models/
    │   ├── PrayerOverride.js
    │   ├── Announcement.js
    │   └── ContactMessage.js
    └── routes/
        ├── prayer.js               ← Aladhan proxy + overrides
        ├── announcements.js
        └── contact.js
```

---

## License

Code: MIT — use freely.
Content (text, branding, logo, photographs): © Moskee Salahaddien — Humanitaire Vereniging.

May Allah accept this work and bless the community.
