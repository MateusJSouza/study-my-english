-- Create a public storage bucket for vocabulary images
INSERT INTO storage.buckets (id, name, public) VALUES ('vocabulary-images', 'vocabulary-images', true);

-- Allow anyone to view vocabulary images
CREATE POLICY "Anyone can view vocabulary images"
ON storage.objects FOR SELECT
USING (bucket_id = 'vocabulary-images');

-- Allow admins to upload vocabulary images
CREATE POLICY "Admins can upload vocabulary images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'vocabulary-images' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to update vocabulary images
CREATE POLICY "Admins can update vocabulary images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'vocabulary-images' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete vocabulary images
CREATE POLICY "Admins can delete vocabulary images"
ON storage.objects FOR DELETE
USING (bucket_id = 'vocabulary-images' AND public.has_role(auth.uid(), 'admin'));