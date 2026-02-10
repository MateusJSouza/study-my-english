-- Fix: Move image_url from blank_items to readings table
-- Images should be for the entire exercise, not individual sentences

-- 1. Remove image_url from blank_items (wrong location)
ALTER TABLE public.blank_items
DROP COLUMN IF EXISTS image_url;

-- 2. Add image_url to readings table (correct location)
ALTER TABLE public.readings
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- 3. Add comment for documentation
COMMENT ON COLUMN public.readings.image_url IS
  'Optional URL for an image to display with the reading/exercise.
   For fill-in-blanks exercises, this shows one image for all sentences.
   Can be a Supabase Storage URL or external URL.';

-- Note: This allows one image per reading/exercise, which makes more sense
-- for exercises like fill-in-blanks where all sentences relate to one context image
