-- Create enum for reading types
CREATE TYPE public.reading_type AS ENUM ('reading', 'vocabulary', 'fill-blanks');

-- Create enum for proficiency levels
CREATE TYPE public.proficiency_level AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1');

-- Create readings table
CREATE TABLE public.readings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  level proficiency_level NOT NULL,
  type reading_type NOT NULL DEFAULT 'reading',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create questions table (for reading comprehension)
CREATE TABLE public.questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reading_id UUID NOT NULL REFERENCES public.readings(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options TEXT[] NOT NULL,
  correct_answer INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create vocabulary_items table (for vocabulary matching exercises)
CREATE TABLE public.vocabulary_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reading_id UUID NOT NULL REFERENCES public.readings(id) ON DELETE CASCADE,
  word TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blank_items table (for fill-in-blanks exercises)
CREATE TABLE public.blank_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reading_id UUID NOT NULL REFERENCES public.readings(id) ON DELETE CASCADE,
  sentence TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create word_bank table (for fill-in-blanks exercises)
CREATE TABLE public.word_bank (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reading_id UUID NOT NULL REFERENCES public.readings(id) ON DELETE CASCADE,
  word TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (public read access for educational content)
ALTER TABLE public.readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabulary_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blank_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.word_bank ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view readings"
  ON public.readings FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view questions"
  ON public.questions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view vocabulary items"
  ON public.vocabulary_items FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view blank items"
  ON public.blank_items FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view word bank"
  ON public.word_bank FOR SELECT
  USING (true);

-- Create indexes for better performance
CREATE INDEX idx_questions_reading_id ON public.questions(reading_id);
CREATE INDEX idx_vocabulary_items_reading_id ON public.vocabulary_items(reading_id);
CREATE INDEX idx_blank_items_reading_id ON public.blank_items(reading_id);
CREATE INDEX idx_word_bank_reading_id ON public.word_bank(reading_id);
CREATE INDEX idx_readings_level ON public.readings(level);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_readings_updated_at
  BEFORE UPDATE ON public.readings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();