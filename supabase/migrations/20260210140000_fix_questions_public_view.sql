-- Fix questions_public view to bypass RLS
-- The issue: security_invoker = on makes the view inherit caller's permissions
-- This means the view is blocked by RLS on the base table
-- Solution: Recreate the view without security_invoker (defaults to security_definer)

-- 1. Drop the existing view
DROP VIEW IF EXISTS public.questions_public;

-- 2. Recreate the view WITHOUT security_invoker
-- This makes it use the view owner's permissions (security_definer by default)
CREATE VIEW public.questions_public AS
  SELECT id, reading_id, question, options, created_at
  FROM public.questions;

-- 3. Re-grant SELECT permissions to anon and authenticated
GRANT SELECT ON public.questions_public TO anon, authenticated;

-- Note: The RLS policy on questions table still blocks direct access,
-- but the view now works because it uses the owner's (superuser) permissions
