-- HOLYFAITH ENGLISH SCHOOL - Database Setup Script
-- Copy and paste this entire script into Supabase SQL Editor

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
