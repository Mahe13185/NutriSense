# 🛠️ Supabase Authentication & Database Setup Guide

This guide details how to configure Supabase for **NutriSense** user authentication, profile management, and cloud assessment history with strict Row Level Security (RLS).

---

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and log in to your dashboard.
2. Click **New Project**.
3. Choose an organization, project name (e.g., `nutrisense-portal`), and strong database password.
4. Select your preferred region and click **Create new project**.

---

## 2. Retrieve Project API Credentials

1. In your Supabase Dashboard, navigate to **Project Settings** (gear icon) -> **API**.
2. Find the following values:
   - **Project URL**: `https://<your-project-id>.supabase.co`
   - **anon / public Key**: `eyJhbGciOi...`
3. In your local NutriSense workspace, open or create `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
   ```

> [!WARNING]
> **Never use or expose the `service_role` key** on the client side. The frontend only needs the `anon` public key. Row Level Security guarantees data isolation.

---

## 3. Apply Database Schema & Row Level Security (RLS)

1. In your Supabase project dashboard, navigate to the **SQL Editor** tab.
2. Click **New query**.
3. Copy and paste the entire contents of [`supabase/schema.sql`](file:///Users/mahendra/AI/NutriSense/supabase/schema.sql).
4. Click **Run**.

### What this SQL script creates:

* **`profiles` Table**:
  - `id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE`
  - `name TEXT`
  - `age INTEGER`
  - `sex TEXT`
  - `height NUMERIC`
  - `weight NUMERIC`
  - `activity_level TEXT`
  - `dietary_preference TEXT`
  - `created_at TIMESTAMPTZ DEFAULT now()`
  - `updated_at TIMESTAMPTZ DEFAULT now()`

* **`assessments` Table**:
  - `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
  - `user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`
  - `created_at TIMESTAMPTZ DEFAULT now()`
  - `assessment_data JSONB NOT NULL` (snapshot of inputs)
  - `result_data JSONB NOT NULL` (snapshot of local assessment engine output)

* **Row Level Security (RLS) Policies**:
  - Enabled on both `profiles` and `assessments`.
  - Users can ONLY select, insert, update, or delete their own records (`auth.uid() = user_id` or `auth.uid() = id`).
  - Cross-user data leaks are prevented at the database engine level.

* **Auth Trigger Function**:
  - `on_auth_user_created` trigger automatically provisions a `profiles` row whenever a new user signs up in `auth.users`.

---

## 4. Configure Authentication Settings (Optional / Recommended)

In the Supabase Dashboard:
1. Go to **Authentication** -> **Providers** -> **Email**.
2. For seamless local testing, you can toggle **"Confirm email"** OFF (or keep it ON if you want email verification).
3. Under **URL Configuration**, ensure `Site URL` is set to `http://localhost:3000` for local development.

---

## 5. Architectural Flow

```
User Sign Up / Login (Supabase Auth)
       ↓
Session Managed in React Context (lib/auth-context.tsx)
       ↓
Basic Demographics Loaded from profiles Table (Prefills Assessment Step 1)
       ↓
Interactive Assessment Questionnaire (3 Steps)
       ↓
Local Rule-Based Assessment Engine (lib/assessmentEngine.ts)
  * Uses project documented references, including ICMR-NIN 2024
  * Computes nutrient risk indications client-side
       ↓
Instant Local Storage Cache (lib/storage.ts)
       ↓
Asynchronous Cloud Persistence (lib/supabaseStorage.ts)
  * Awaited before redirection
  * Gracefully handles network/cloud errors
       ↓
Personal Dashboard & Assessment History (/dashboard, /history, /results?id=...)
```

---

## 6. How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production verification
npm run build
```
