-- Add image_url field to questions table
-- This allows questions to include images for visual context

-- 1. Add the image_url column to the base table
ALTER TABLE public.questions
ADD COLUMN image_url TEXT;

-- 2. Add comment for documentation
COMMENT ON COLUMN public.questions.image_url IS
  'Optional URL for an image to display with the question. Can be a Supabase Storage URL or external URL.';

-- 3. Recreate the questions_public view to include image_url
DROP VIEW IF EXISTS public.questions_public;

CREATE VIEW public.questions_public AS
  SELECT id, reading_id, question, options, image_url, created_at
  FROM public.questions;

-- 4. Re-grant permissions
GRANT SELECT ON public.questions_public TO anon, authenticated;

-- Note: The correct_answer field remains hidden from the public view for security
