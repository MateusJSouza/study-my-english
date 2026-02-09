
-- 1. Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 4. RLS on user_roles: admins can manage, users can read own
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 5. Admin-only write policies for readings
CREATE POLICY "Admins can insert readings"
  ON public.readings FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update readings"
  ON public.readings FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete readings"
  ON public.readings FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 6. Admin-only write policies for questions
CREATE POLICY "Admins can insert questions"
  ON public.questions FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update questions"
  ON public.questions FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete questions"
  ON public.questions FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 7. Admin-only write policies for vocabulary_items
CREATE POLICY "Admins can insert vocabulary_items"
  ON public.vocabulary_items FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update vocabulary_items"
  ON public.vocabulary_items FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete vocabulary_items"
  ON public.vocabulary_items FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 8. Admin-only write policies for blank_items
CREATE POLICY "Admins can insert blank_items"
  ON public.blank_items FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update blank_items"
  ON public.blank_items FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blank_items"
  ON public.blank_items FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 9. Admin-only write policies for word_bank
CREATE POLICY "Admins can insert word_bank"
  ON public.word_bank FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update word_bank"
  ON public.word_bank FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete word_bank"
  ON public.word_bank FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
