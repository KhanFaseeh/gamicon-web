# AGENTS.md

## Project Overview
You are an expert React, TypeScript, Tailwind CSS, and Supabase developer building a cinematic, minimal website for the indie game studio **"Gamicon"** (inspired by Kojima Productions).

---

## Critical Environment & Guardrails (Prevent Hanging)
1. **DO NOT Initialize a New Project:** Vite, React, TypeScript, and Tailwind CSS are expected in this directory. Do not run `npm create vite` or overwrite configuration files unless fixing a specific build error.
2. **DO NOT Run SQL or Database Migrations:** The Supabase tables (`games` and `studio_info`) and RLS policies ALREADY exist in the remote database. Only use `@supabase/supabase-js` for standard CRUD operations (`select`, `insert`, `update`, `delete`).
3. **Non-Interactive Terminal Only:** If you need to install an additional package (such as `react-router-dom`), always ensure commands run non-interactively (e.g. `npm install --no-audit --no-fund`).

---

## Tech Stack & Design System
- **Framework:** React (Vite SPA) + TypeScript (Strict Mode, no `any` types).
- **Routing:** Use `react-router-dom` with routes for:
  - `/` (Homepage)
  - `/game/:slug` (Game Detail & YouTube Video Page)
  - `/about` (Studio Vision / Manifesto)
  - `/press` (News, Press Kit & Contact)
  - `/admin` (Studio Management CMS Dashboard)
  - `*` (404 "SIGNAL LOST" Page)
- **Aesthetic:** Kojima Productions-inspired brutalist minimalism.
  - **Colors:**
    - Deep black: `#050505`
    - Crisp white: `#FFFFFF`
    - Muted gray: `#888888`
    - Dark gray borders: `#1F1F1F`
  - **Styling Guidelines:** Sharp 0px corners, 1px solid borders, zero drop shadows, generous negative space, high contrast, monospace or clean sans typography with cinematic tracking.

---

## Supabase Database Schema
Connect via `src/lib/supabaseClient.ts` using `import.meta.env.VITE_SUPABASE_URL` and `import.meta.env.VITE_SUPABASE_ANON_KEY`.

### Table: `games`
- `id`: uuid (primary key, auto-generated)
- `title`: text
- `slug`: text (unique)
- `release_date`: date (`YYYY-MM-DD`)
- `youtube_id`: text (11-character YouTube video ID only)
- `description`: text
- `tags`: text[] (array of strings)
- `created_at`: timestamptz

### Table: `studio_info`
- `id`: int (primary key, always `1`)
- `manifesto`: text
- `contact_email`: text
- `press_kit_url`: text

---

## Execution Rules & Features
1. **UI Integration:** Convert provided Stitch UI designs / specifications into modular React components matching the target routes.
2. **Seed Data Integration:** Support seeding from `gameweb.txt` ("game web"). Inside the `/admin` dashboard, include a **"Seed Initial Data"** button that populates the `games` and `studio_info` tables with the exact contents of `gameweb.txt` via standard Supabase `.upsert()` calls.
3. **Admin Panel (`/admin`):**
   - Clean CMS dashboard interface.
   - Add new games: Title, Slug, Release Date, YouTube ID (or full YouTube URL parsed down to the 11-char ID), Description, comma-separated Tags.
   - Delete games.
   - Edit the single Studio Info row (`id = 1`).
