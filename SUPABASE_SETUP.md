# 🚀 Supabase Setup Guide for HOLYFAITH ENGLISH SCHOOL

This guide will help you set up Supabase for form submissions on your website.

## 📋 Table of Contents

1. [Create Supabase Account](#1-create-supabase-account)
2. [Create Database Tables](#2-create-database-tables)
3. [Get Your Credentials](#3-get-your-credentials)
4. [Configure Environment Variables](#4-configure-environment-variables)
5. [Deploy to Vercel](#5-deploy-to-vercel)
6. [Testing](#6-testing)
7. [Viewing Submissions](#7-viewing-submissions)

---

## 1. Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign Up"**
3. Sign up with your GitHub, Google, or email account
4. Create a new project:
   - **Project name**: `holyfaith-school` (or any name you prefer)
   - **Database password**: Create a strong password (save it securely!)
   - **Region**: Choose the closest region to India (e.g., Mumbai or Singapore)
5. Click **"Create new project"**
6. Wait 2-3 minutes for the project to be ready

---

## 2. Create Database Tables

### Step 1: Open SQL Editor

1. In your Supabase dashboard, click on **"SQL Editor"** in the left sidebar
2. Click **"New query"**

### Step 2: Create Tables

Copy and paste the following SQL code and click **"Run"**:

```sql
-- Table 1: Admission Submissions
CREATE TABLE admissions (
  id BIGSERIAL PRIMARY KEY,
  student_first_name TEXT NOT NULL,
  student_middle_name TEXT,
  student_last_name TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  parent_email TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  dob DATE NOT NULL,
  student_class TEXT NOT NULL,
  academic_year TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table 2: Contact Form Submissions
CREATE TABLE contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  student_class TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table 3: Brochure Requests (Hero Form)
CREATE TABLE brochure_requests (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  grade TEXT NOT NULL,
  phone TEXT NOT NULL,
  source TEXT DEFAULT 'hero_form',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for security
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE brochure_requests ENABLE ROW LEVEL SECURITY;

-- Create policies to allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON admissions
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON contact_submissions
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON brochure_requests
  FOR INSERT TO anon
  WITH CHECK (true);

-- Create policies to allow authenticated users to read all
CREATE POLICY "Allow authenticated users to read" ON admissions
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read" ON contact_submissions
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read" ON brochure_requests
  FOR SELECT TO authenticated
  USING (true);
```

✅ You should see a success message: "Success. No rows returned"

---

## 3. Get Your Credentials

1. Click on **"Project Settings"** (gear icon) in the left sidebar
2. Click on **"API"** in the settings menu
3. You will see two important values:

   **Copy these values:**
   - **Project URL**: Looks like `https://abcdefgh.supabase.co`
   - **anon public key**: A long string starting with `eyJhbGc...`

⚠️ **IMPORTANT**: The `anon public` key is safe to use in your website. DO NOT use the `service_role` key!

---

## 4. Configure Environment Variables

### For Local Development:

1. In your project folder, copy `.env.example` to create a new `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and add your credentials:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

3. Save the file

⚠️ **NEVER commit the `.env` file to Git!** It's already in `.gitignore`.

---

## 5. Deploy to Vercel

### Step 1: Push to GitHub

1. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Add Supabase integration"
   ```

2. Create a new repository on GitHub

3. Push your code:
   ```bash
   git remote add origin https://github.com/your-username/your-repo.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Click on **"Environment Variables"**
5. Add your Supabase credentials:
   - **Name**: `VITE_SUPABASE_URL`
   - **Value**: Your Supabase project URL
   - Click **"Add"**
   
   - **Name**: `VITE_SUPABASE_ANON_KEY`
   - **Value**: Your Supabase anon key
   - Click **"Add"**

6. Click **"Deploy"**
7. Wait for deployment to complete (1-2 minutes)

🎉 **Your website is now live with Supabase!**

---

## 6. Testing

### Test Each Form:

1. **Hero Form (Homepage)**:
   - Fill in student name, grade, and phone number
   - Click "Get Brochure"
   - Should show success message

2. **Contact Form**:
   - Go to Contact page
   - Fill in all required fields
   - Click "Send Message"
   - Should show success message

3. **Admission Form**:
   - Go to Admissions page
   - Fill in the admission enquiry form
   - Click "Submit"
   - Should show success message

### Verify in Supabase:

1. Go to your Supabase dashboard
2. Click **"Table Editor"** in the left sidebar
3. Select each table (`admissions`, `contact_submissions`, `brochure_requests`)
4. You should see the submitted data!

---

## 7. Viewing Submissions

### Option 1: Supabase Dashboard

1. Log in to [https://supabase.com](https://supabase.com)
2. Select your project
3. Click **"Table Editor"**
4. Click on each table to view submissions

### Option 2: Export to Excel/CSV

1. In Table Editor, click on any table
2. Click the **"..."** menu button
3. Select **"Export as CSV"**
4. Open in Excel or Google Sheets

### Option 3: Create Email Notifications (Advanced)

You can set up **Supabase Edge Functions** or **Database Webhooks** to send email notifications when new forms are submitted. See Supabase documentation for details.

---

## 🔒 Security Notes

✅ **What's Secure:**
- Using `anon public` key is safe for client-side code
- Row Level Security (RLS) is enabled
- Anonymous users can only INSERT (submit forms)
- Only authenticated users can view submissions
- Environment variables are not exposed in code

⚠️ **Best Practices:**
- Never commit `.env` file to Git
- Never use `service_role` key in client-side code
- Regularly check your Supabase dashboard for submissions
- Set up email notifications to get alerts for new submissions

---

## 📊 Database Schema

### Table: `admissions`
| Column | Type | Required | Description |
|--------|------|----------|-------------|
| id | BIGSERIAL | Auto | Unique ID |
| student_first_name | TEXT | Yes | Student's first name |
| student_middle_name | TEXT | No | Student's middle name |
| student_last_name | TEXT | Yes | Student's last name |
| parent_name | TEXT | Yes | Parent/Guardian name |
| mobile_number | TEXT | Yes | Contact number |
| parent_email | TEXT | Yes | Email address |
| city | TEXT | Yes | City |
| state | TEXT | Yes | State |
| dob | DATE | Yes | Date of birth |
| student_class | TEXT | Yes | Class applying for |
| academic_year | TEXT | Yes | Academic year |
| address | TEXT | Yes | Full address |
| created_at | TIMESTAMPTZ | Auto | Submission timestamp |

### Table: `contact_submissions`
| Column | Type | Required | Description |
|--------|------|----------|-------------|
| id | BIGSERIAL | Auto | Unique ID |
| name | TEXT | Yes | Student name |
| parent_name | TEXT | Yes | Parent name |
| phone | TEXT | Yes | Phone number |
| email | TEXT | Yes | Email address |
| student_class | TEXT | No | Class interested in |
| subject | TEXT | No | Subject/Topic |
| message | TEXT | Yes | Message content |
| created_at | TIMESTAMPTZ | Auto | Submission timestamp |

### Table: `brochure_requests`
| Column | Type | Required | Description |
|--------|------|----------|-------------|
| id | BIGSERIAL | Auto | Unique ID |
| name | TEXT | Yes | Student name |
| grade | TEXT | Yes | Grade/Class |
| phone | TEXT | Yes | Phone number |
| source | TEXT | Auto | Form source |
| created_at | TIMESTAMPTZ | Auto | Submission timestamp |

---

## 🆘 Troubleshooting

### Problem: Forms show "Demo mode" message
**Solution**: Make sure you've added environment variables in Vercel dashboard and redeployed.

### Problem: "Failed to insert" error
**Solution**: 
1. Check if tables are created correctly
2. Verify RLS policies are set up
3. Check browser console for detailed error message

### Problem: Can't see submissions in Supabase
**Solution**: 
1. Click "Table Editor" in Supabase
2. Make sure you're looking at the correct table
3. Click refresh button in top right

### Problem: Environment variables not working locally
**Solution**: 
1. Make sure `.env` file exists in project root
2. Restart your development server
3. Use `import.meta.env.VITE_SUPABASE_URL` (not `process.env`)

---

## 📞 Support

If you need help:
- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)
- **Vercel Docs**: [https://vercel.com/docs](https://vercel.com/docs)
- **School Contact**: +91 9923873374

---

## ✅ Checklist

- [ ] Created Supabase account
- [ ] Created all 3 tables with SQL script
- [ ] Copied Project URL and anon key
- [ ] Created `.env` file locally
- [ ] Tested forms locally
- [ ] Pushed code to GitHub
- [ ] Added environment variables in Vercel
- [ ] Deployed to Vercel
- [ ] Tested forms on live website
- [ ] Verified submissions appear in Supabase

---

**🎉 Congratulations! Your forms are now connected to Supabase!**

All form submissions will be automatically saved to your Supabase database.
