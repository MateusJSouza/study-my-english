-- 1. Create a public view that hides correct_answer
CREATE VIEW public.questions_public
WITH (security_invoker = on) AS
  SELECT id, reading_id, question, options, created_at
  FROM public.questions;

-- 2. Drop the old permissive SELECT policy on the base table
DROP POLICY IF EXISTS "Anyone can view questions" ON public.questions;

-- 3. Deny direct SELECT on the base table for anon/public
CREATE POLICY "No direct public access to questions"
  ON public.questions FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- 4. Grant SELECT on the view to anon and authenticated so the app can query it
GRANT SELECT ON public.questions_public TO anon, authenticated;