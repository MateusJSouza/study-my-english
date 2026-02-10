import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, RefreshCw, GripVertical } from "lucide-react";

export interface BlankItem {
  id: number;
  sentence: string;
  blank: string;
  answer: string;
}

interface FillInBlanksProps {
  items: BlankItem[];
  wordBank: string[];
  title?: string;
  imageUrl?: string;
}

export const FillInBlanks = ({ items, wordBank, title, imageUrl }: FillInBlanksProps) => {
  const [shuffledWords] = useState<string[]>(() => 
    [...wordBank].sort(() => Math.random() - 0.5)
  );
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [draggedWord, setDraggedWord] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<Record<number, boolean>>({});

  const handleDragStart = (e: React.DragEvent, word: string) => {
    setDraggedWord(word);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', word);
  };

  const handleDragEnd = () => {
    setDraggedWord(null);
  };

  const handleDrop = (e: React.DragEvent, itemId: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (draggedWord) {
      const newAnswers = { ...answers };
      newAnswers[itemId] = draggedWord;
      setAnswers(newAnswers);
      setDraggedWord(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
  };

  const removeAnswer = (itemId: number) => {
    const newAnswers = { ...answers };
    delete newAnswers[itemId];
    setAnswers(newAnswers);
    setShowResults(false);
    setResults({});
  };

  const checkAnswers = () => {
    const newResults: Record<number, boolean> = {};
    items.forEach(item => {
      newResults[item.id] = answers[item.id]?.toLowerCase() === item.answer.toLowerCase();
    });
    setResults(newResults);
    setShowResults(true);
  };

  const resetGame = useCallback(() => {
    setAnswers({});
    setShowResults(false);
    setResults({});
  }, []);

  const correctCount = Object.values(results).filter(Boolean).length;
  const usedWords = Object.values(answers);
  const availableWords = shuffledWords.filter(word => !usedWords.includes(word));

  return (
    <div className="space-y-6">
      {title && <h3 className="text-xl font-bold text-foreground mb-4">{title}</h3>}

      {/* Exercise Image */}
      {imageUrl && (
        <div className="rounded-lg overflow-hidden border border-border">
          <img
            src={imageUrl}
            alt="Exercise context"
            className="w-full max-h-[400px] object-contain bg-muted"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Word Bank */}
      <Card className="p-4 bg-muted/50">
        <p className="text-sm text-muted-foreground mb-3 font-medium">
          Drag the words to complete the sentences:
        </p>
        <div className="flex flex-wrap gap-2">
          {availableWords.map((word, idx) => (
            <div
              key={`${word}-${idx}`}
              draggable
              onDragStart={(e) => handleDragStart(e, word)}
              onDragEnd={handleDragEnd}
              className="flex items-center gap-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg cursor-grab active:cursor-grabbing hover:bg-primary/90 transition-colors font-medium text-sm select-none"
            >
              <GripVertical className="w-4 h-4 opacity-70" />
              {word}
            </div>
          ))}
        </div>
      </Card>

      {/* Sentences */}
      <div className="space-y-3">
        {items.map((item) => (
          <Card
            key={item.id}
            className={`p-3 transition-all ${
              showResults
                ? results[item.id]
                  ? 'border-green-500 bg-green-50 dark:bg-green-950/30'
                  : 'border-red-500 bg-red-50 dark:bg-red-950/30'
                : ''
            }`}
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-muted-foreground font-medium">{item.id}.</span>
              {item.sentence.split(item.blank).map((part, idx, arr) => (
                <span key={idx} className="flex items-center gap-2">
                  <span>{part}</span>
                  {idx < arr.length - 1 && (
                    <span
                      onDrop={(e) => handleDrop(e, item.id)}
                      onDragOver={handleDragOver}
                      onClick={() => !showResults && answers[item.id] && removeAnswer(item.id)}
                      className={`inline-flex items-center justify-center gap-1 min-w-[100px] min-h-[36px] px-3 py-2 rounded border-2 border-dashed transition-all ${
                        answers[item.id]
                          ? 'border-primary bg-primary/10 cursor-pointer hover:bg-primary/20'
                          : 'border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5'
                      } ${draggedWord ? 'ring-2 ring-primary/20' : ''}`}
                    >
                      {answers[item.id] ? (
                        <>
                          <span className="font-medium">{answers[item.id]}</span>
                          {showResults && (
                            results[item.id]
                              ? <CheckCircle2 className="w-4 h-4 text-green-600" />
                              : <XCircle className="w-4 h-4 text-red-600" />
                          )}
                        </>
                      ) : (
                        <span className="text-muted-foreground text-sm">______</span>
                      )}
                    </span>
                  )}
                </span>
              ))}
            </div>
            {showResults && !results[item.id] && (
              <p className="text-sm text-green-600 mt-1">Correct answer: {item.answer}</p>
            )}
          </Card>
        ))}
      </div>

      {/* Results */}
      {showResults && (
        <Card className="p-4 bg-accent/10">
          <p className="text-lg font-semibold text-foreground">
            Score: {correctCount} / {items.length} correct!
          </p>
          {correctCount === items.length && (
            <p className="text-green-600 font-medium mt-1">🎉 Perfect! All answers are correct!</p>
          )}
        </Card>
      )}

      <div className="flex gap-3">
        <Button 
          onClick={checkAnswers} 
          disabled={Object.keys(answers).length < items.length}
          className="flex-1"
        >
          Check Answers
        </Button>
        <Button 
          variant="outline" 
          onClick={resetGame}
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Reset
        </Button>
      </div>
    </div>
  );
};
