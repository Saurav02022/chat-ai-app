# Day 21: Supabase Setup & Schema

**Type**: Weekend (Full Day - 6-8 hours)  
**Focus**: Backend infrastructure with Supabase  
**Difficulty**: Medium-Hard

## Goal

Set up Supabase project, design comprehensive database schema, implement row-level security, create migrations, and integrate Supabase client with Next.js application.

## Prerequisites

- [ ] Days 1-20 completed
- [ ] All features working with localStorage
- [ ] Full day available (weekend)
- [ ] Supabase account created
- [ ] Understanding of PostgreSQL and RLS

## Tasks Checklist

### Create Supabase Project (30 minutes)

- [ ] Go to supabase.com
- [ ] Sign in or create account
- [ ] Click "New Project"
- [ ] Enter project details:
  - [ ] Name: "JobCraft AI"
  - [ ] Database Password (save securely)
  - [ ] Region (closest to users)
- [ ] Wait for project initialization
- [ ] Copy project URL
- [ ] Copy anon/public API key
- [ ] Copy service role key (keep secure)
- [ ] Save credentials securely

### Install Supabase Client (15 minutes)

- [ ] Install Supabase JS: `npm install @supabase/supabase-js`
- [ ] Verify installation in package.json
- [ ] Create `.env.local` file
- [ ] Add Supabase credentials:
  ```
  NEXT_PUBLIC_SUPABASE_URL=your-project-url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
  SUPABASE_SERVICE_ROLE_KEY=your-service-key
  ```
- [ ] Add `.env.local` to `.gitignore`
- [ ] Test environment variables load

### Create Supabase Client Configuration (30 minutes)

- [ ] Update `lib/supabase.ts` file
- [ ] Create client for browser:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

- [ ] Create client for server (with service role)
- [ ] Add TypeScript types
- [ ] Test client connection
- [ ] Verify no errors

### Design Database Schema (90 minutes)

- [ ] Design users table:
  - [ ] id (uuid, primary key)
  - [ ] email (text, unique)
  - [ ] name (text)
  - [ ] avatar_url (text, nullable)
  - [ ] created_at (timestamp)
  - [ ] updated_at (timestamp)

- [ ] Design jobs table:
  - [ ] id (uuid, primary key)
  - [ ] user_id (uuid, foreign key to users)
  - [ ] company (text)
  - [ ] role (text)
  - [ ] location (text)
  - [ ] work_type (text)
  - [ ] salary (text, nullable)
  - [ ] status (text)
  - [ ] priority (text)
  - [ ] applied_date (date)
  - [ ] job_description (text, nullable)
  - [ ] notes (text, nullable)
  - [ ] created_at (timestamp)
  - [ ] updated_at (timestamp)

- [ ] Design resumes table:
  - [ ] id (uuid, primary key)
  - [ ] user_id (uuid, foreign key)
  - [ ] job_id (uuid, foreign key, nullable)
  - [ ] file_name (text)
  - [ ] file_path (text)
  - [ ] file_size (integer)
  - [ ] uploaded_at (timestamp)

- [ ] Design analyses table:
  - [ ] id (uuid, primary key)
  - [ ] job_id (uuid, foreign key)
  - [ ] resume_id (uuid, foreign key)
  - [ ] overall_score (integer)
  - [ ] keyword_score (integer)
  - [ ] format_score (integer)
  - [ ] content_score (integer)
  - [ ] experience_score (integer)
  - [ ] skills_score (integer)
  - [ ] strengths (jsonb)
  - [ ] improvements (jsonb)
  - [ ] company_insights (jsonb)
  - [ ] analyzed_at (timestamp)

- [ ] Design interviews table:
  - [ ] id (uuid, primary key)
  - [ ] job_id (uuid, foreign key)
  - [ ] interview_date (timestamp)
  - [ ] interview_type (text)
  - [ ] platform (text)
  - [ ] transcript (text, nullable)
  - [ ] performance_score (integer, nullable)
  - [ ] notes (text, nullable)
  - [ ] created_at (timestamp)

- [ ] Document schema in `docs/database-schema.md`

### Create Database Tables (60 minutes)

- [ ] Go to Supabase Dashboard
- [ ] Navigate to SQL Editor
- [ ] Create users table:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

- [ ] Create jobs table with foreign keys
- [ ] Create resumes table with foreign keys
- [ ] Create analyses table with foreign keys
- [ ] Create interviews table with foreign keys
- [ ] Create indexes for performance:
  - [ ] Index on user_id for all tables
  - [ ] Index on job_id for related tables
  - [ ] Index on created_at for sorting
- [ ] Run SQL and verify tables created
- [ ] Check table structure in Table Editor

### Set Up Row-Level Security (90 minutes)

- [ ] Enable RLS on all tables
- [ ] Create policies for users table:
  - [ ] Users can read their own data
  - [ ] Users can update their own data
- [ ] Create policies for jobs table:
  - [ ] Users can CRUD their own jobs
  - [ ] Prevent access to other users' jobs
- [ ] Create policies for resumes table:
  - [ ] Users can CRUD their own resumes
- [ ] Create policies for analyses table:
  - [ ] Users can read analyses for their jobs
- [ ] Create policies for interviews table:
  - [ ] Users can CRUD interviews for their jobs
- [ ] Test RLS policies
- [ ] Document policies

**Example RLS Policy**:

```sql
-- Jobs table: Users can only access their own jobs
CREATE POLICY "Users can view their own jobs"
  ON jobs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own jobs"
  ON jobs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own jobs"
  ON jobs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own jobs"
  ON jobs FOR DELETE
  USING (auth.uid() = user_id);
```

### Create Database Migrations (45 minutes)

- [ ] Create `supabase/migrations` folder
- [ ] Create initial migration file: `001_initial_schema.sql`
- [ ] Copy all table creation SQL
- [ ] Add RLS policies to migration
- [ ] Add indexes to migration
- [ ] Test migration locally (if using Supabase CLI)
- [ ] Document migration process

### Set Up Supabase Storage (45 minutes)

- [ ] Go to Supabase Dashboard > Storage
- [ ] Create bucket: "resumes"
- [ ] Set bucket to private
- [ ] Configure RLS policies for storage:
  - [ ] Users can upload to their folder
  - [ ] Users can read their own files
  - [ ] Users can delete their own files
- [ ] Test file upload via dashboard
- [ ] Document storage structure

### Create TypeScript Types from Schema (30 minutes)

- [ ] Create `types/database.ts` file
- [ ] Define types matching database schema:

```typescript
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['users']['Row'],
          'id' | 'created_at' | 'updated_at'
        >;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      // ... other tables
    };
  };
}
```

- [ ] Export types
- [ ] Use types with Supabase client

### Test Database Connection (30 minutes)

- [ ] Create test API route: `app/api/test-db/route.ts`
- [ ] Test SELECT query
- [ ] Test INSERT query
- [ ] Test UPDATE query
- [ ] Test DELETE query
- [ ] Test RLS policies work
- [ ] Verify data in Supabase dashboard
- [ ] Delete test data

### Documentation (30 minutes)

- [ ] Document database schema
- [ ] Document RLS policies
- [ ] Document migration process
- [ ] Create setup guide for team
- [ ] Add environment variables to README
- [ ] Document backup strategy

## Deliverables

- [ ] Supabase project configured
- [ ] Complete database schema created
- [ ] All tables with proper relationships
- [ ] Row-level security policies implemented
- [ ] Storage bucket configured
- [ ] Supabase client integrated
- [ ] TypeScript types defined
- [ ] Database connection tested
- [ ] Comprehensive documentation

## Success Criteria

- All tables created successfully
- RLS policies prevent unauthorized access
- Supabase client connects without errors
- Test queries work correctly
- Storage bucket accepts file uploads
- TypeScript types match schema
- Documentation is complete and clear

## Files Created/Modified

### New Files

- `supabase/migrations/001_initial_schema.sql`
- `types/database.ts`
- `docs/database-schema.md`
- `app/api/test-db/route.ts`

### Modified Files

- `lib/supabase.ts`
- `.env.local`
- `.gitignore`
- `README.md` (add setup instructions)

## Common Issues & Solutions

**Issue**: RLS policies blocking all access

- **Solution**: Ensure auth.uid() matches user_id in policies

**Issue**: Foreign key constraints failing

- **Solution**: Create tables in correct order (users first)

**Issue**: Storage uploads failing

- **Solution**: Check bucket policies and permissions

**Issue**: TypeScript errors with Supabase client

- **Solution**: Ensure types are properly imported and used

## Time Breakdown

- Create Project: 30 min
- Install Client: 15 min
- Client Config: 30 min
- Design Schema: 90 min
- Create Tables: 60 min
- RLS Setup: 90 min
- Migrations: 45 min
- Storage Setup: 45 min
- TypeScript Types: 30 min
- Testing: 30 min
- Documentation: 30 min

**Total**: ~8 hours

## Next Steps

Tomorrow (Day 22 - Weekend), you'll:

- Set up Supabase Auth with Google OAuth
- Replace mock authentication
- Migrate user data structure
- Test authentication flow

## Tips

- Save all credentials securely
- Test RLS policies thoroughly
- Use Supabase Dashboard for debugging
- Keep migrations in version control
- Document everything clearly
- Test with real data scenarios

## Security Notes

- Never commit service role key
- Use RLS on all tables
- Validate all inputs
- Use prepared statements
- Implement rate limiting
- Monitor database access logs

---

**Status**: [ ] Not Started | [ ] In Progress | [ ] Completed  
**Time Spent**: **\_** hours  
**Completed On**: ****\_\_\_****
