-- Add image_url field to blank_items table
-- This allows fill-in-blanks exercises to include images for visual context

-- 1. Add the image_url column to blank_items table
ALTER TABLE public.blank_items
ADD COLUMN image_url TEXT;

-- 2. Add comment for documentation
COMMENT ON COLUMN public.blank_items.image_url IS
  'Optional URL for an image to display with the fill-in-blank item. Can be a Supabase Storage URL or external URL.';

-- Note: blank_items doesn't have a public view like questions,
-- so the column is directly accessible (it doesn't contain sensitive data like correct_answer)
