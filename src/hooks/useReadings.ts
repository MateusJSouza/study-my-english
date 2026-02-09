import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface VocabularyItem {
  id: string;
  word: string;
  image: string;
}

export interface BlankItem {
  id: number;
  sentence: string;
  blank: string;
  answer: string;
}

export interface Reading {
  title: string;
  description: string;
  content: string;
  questions: Question[];
  type?: "reading" | "vocabulary" | "fill-blanks";
  vocabularyItems?: VocabularyItem[];
  blankItems?: BlankItem[];
  wordBank?: string[];
}

export function useReadings() {
  return useQuery({
    queryKey: ["readings"],
    queryFn: async (): Promise<Record<string, Reading[]>> => {
      // Fetch all data in parallel
      const [readingsRes, questionsRes, vocabRes, blanksRes, wordBankRes] = await Promise.all([
        supabase.from("readings").select("*").order("created_at"),
        supabase.from("questions").select("*"),
        supabase.from("vocabulary_items").select("*"),
        supabase.from("blank_items").select("*"),
        supabase.from("word_bank").select("*"),
      ]);

      if (readingsRes.error) throw readingsRes.error;

      const questionsMap = new Map<string, typeof questionsRes.data>();
      (questionsRes.data ?? []).forEach((q) => {
        const arr = questionsMap.get(q.reading_id) ?? [];
        arr.push(q);
        questionsMap.set(q.reading_id, arr);
      });

      const vocabMap = new Map<string, typeof vocabRes.data>();
      (vocabRes.data ?? []).forEach((v) => {
        const arr = vocabMap.get(v.reading_id) ?? [];
        arr.push(v);
        vocabMap.set(v.reading_id, arr);
      });

      const blanksMap = new Map<string, typeof blanksRes.data>();
      (blanksRes.data ?? []).forEach((b) => {
        const arr = blanksMap.get(b.reading_id) ?? [];
        arr.push(b);
        blanksMap.set(b.reading_id, arr);
      });

      const wordBankMap = new Map<string, string[]>();
      (wordBankRes.data ?? []).forEach((w) => {
        const arr = wordBankMap.get(w.reading_id) ?? [];
        arr.push(w.word);
        wordBankMap.set(w.reading_id, arr);
      });

      const grouped: Record<string, Reading[]> = {};

      for (const r of readingsRes.data) {
        const questions: Question[] = (questionsMap.get(r.id) ?? []).map((q) => ({
          question: q.question,
          options: q.options,
          correctAnswer: q.correct_answer,
        }));

        const vocabularyItems: VocabularyItem[] | undefined =
          r.type === "vocabulary"
            ? (vocabMap.get(r.id) ?? []).map((v) => ({
                id: v.id,
                word: v.word,
                image: v.image_url,
              }))
            : undefined;

        const rawBlanks = blanksMap.get(r.id);
        const blankItems: BlankItem[] | undefined =
          r.type === "fill-blanks" && rawBlanks
            ? rawBlanks.map((b, i) => ({
                id: i + 1,
                sentence: b.sentence,
                blank: "______",
                answer: b.answer,
              }))
            : undefined;

        const wordBank = r.type === "fill-blanks" ? wordBankMap.get(r.id) : undefined;

        const reading: Reading = {
          title: r.title,
          description: r.description,
          content: r.content,
          questions,
          type: r.type as Reading["type"],
          vocabularyItems,
          blankItems,
          wordBank,
        };

        if (!grouped[r.level]) grouped[r.level] = [];
        grouped[r.level].push(reading);
      }

      // Ensure levels are in order
      const ordered: Record<string, Reading[]> = {};
      for (const level of ["A1", "A2", "B1", "B2", "C1"]) {
        if (grouped[level]) ordered[level] = grouped[level];
      }
      return ordered;
    },
  });
}
