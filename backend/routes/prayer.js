// routes/prayer.js — fetches from the mosque's Mawaqit page
import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const SLUG = process.env.MAWAQIT_SLUG || 'moskee-salahaddien-gent-9000-belgium';
const MAWAQIT_URL = `https://mawaqit.net/en/m/${SLUG}`;

// Cache for 30 min — times don't change during the day
let cache = null;

// Walk braces to extract a balanced JSON object after `varName`
function extractJSON(html, varName) {
  const idx = html.indexOf(varName);
  if (idx === -1) return null;
  const start = html.indexOf('{', idx);
  if (start === -1) return null;
  let depth = 0, inStr = false, esc = false;
  for (let i = start; i < html.length; i++) {
    const c = html[i];
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (c === '"') inStr = !inStr;
    if (inStr) continue;
    if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return html.slice(start, i + 1);
  }
  return null;
}

async function fetchMawaqit() {
  if (cache && Date.now() - cache.at < 30 * 60 * 1000) return cache.data;

  const res = await fetch(MAWAQIT_URL, {
    headers: { 'User-Agent': 'Mozilla/5.0 (SalahaddinSite)' },
  });
  if (!res.ok) throw new Error(`Mawaqit ${res.status}`);
  const html = await res.text();

  const raw = extractJSON(html, 'confData');
  if (!raw) throw new Error('confData not found on Mawaqit page');
  const conf = JSON.parse(raw);

  // conf.times = [Fajr, Dhuhr, Asr, Maghrib, Isha]
  // conf.shuruq = sunrise
  // conf.iqama = iqama delays (minutes after adhan) OR fixed times
  // conf.jumua = Jumu'ah time
  const t = conf.times || [];
  const data = {
    timings: {
      Fajr:    t[0] || '',
      Sunrise: conf.shuruq || '',
      Dhuhr:   t[1] || '',
      Asr:     t[2] || '',
      Maghrib: t[3] || '',
      Isha:    t[4] || '',
    },
    iqama:  conf.iqama || [],
    jumua:  conf.jumua || '13:30',
    name:   conf.name || '',
    source: 'mawaqit',
    mosqueId: conf.id || '11473',
  };

  cache = { at: Date.now(), data };
  return data;
}

router.get('/today', async (req, res, next) => {
  try {
    res.json(await fetchMawaqit());
  } catch (err) { next(err); }
});

// serve a simple HTML page that embeds the Mawaqit page in an iframe
router.get('/embed', (req, res) => {
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Mawaqit Embed</title>
  <style>
    html,body { height:100%; margin:0; }
    .frame { position:fixed; inset:0; border:0; width:100%; height:100%; }
  </style>
</head>
<body>
  <iframe class="frame" src="${MAWAQIT_URL}" frameborder="0" allowfullscreen sandbox="allow-same-origin allow-scripts allow-forms"></iframe>
</body>
</html>`;
  res.type('html').send(html);
});


export default router;