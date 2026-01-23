import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, RefreshCw, GripVertical } from "lucide-react";

export interface VocabularyItem {
  id: string;
  word: string;
  image: string;
}

interface VocabularyMatchProps {
  items: VocabularyItem[];
  title?: string;
}

export const VocabularyMatch = ({ items, title }: VocabularyMatchProps) => {
  const [shuffledWords, setShuffledWords] = useState<string[]>(() => 
    [...items.map(i => i.word)].sort(() => Math.random() - 0.5)
  );
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [draggedWord, setDraggedWord] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});

  const handleDragStart = (word: string) => {
    setDraggedWord(word);
  };

  const handleDrop = (itemId: string) => {
    if (draggedWord) {
      // Remove the word from previous match if exists
      const newMatches = { ...matches };
      Object.keys(newMatches).forEach(key => {
        if (newMatches[key] === draggedWord) {
          delete newMatches[key];
        }
      });
      newMatches[itemId] = draggedWord;
      setMatches(newMatches);
      setDraggedWord(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeMatch = (itemId: string) => {
    const newMatches = { ...matches };
    delete newMatches[itemId];
    setMatches(newMatches);
    setShowResults(false);
    setResults({});
  };

  const checkAnswers = () => {
    const newResults: Record<string, boolean> = {};
    items.forEach(item => {
      newResults[item.id] = matches[item.id] === item.word;
    });
    setResults(newResults);
    setShowResults(true);
  };

  const resetGame = useCallback(() => {
    setShuffledWords([...items.map(i => i.word)].sort(() => Math.random() - 0.5));
    setMatches({});
    setShowResults(false);
    setResults({});
  }, [items]);

  const correctCount = Object.values(results).filter(Boolean).length;
  const totalItems = items.length;
  const matchedWords = Object.values(matches);
  const availableWords = shuffledWords.filter(word => !matchedWords.includes(word));

  return (
    <div className="space-y-6">
      {title && <h3 className="text-xl font-bold text-foreground mb-4">{title}</h3>}
      
      {/* Word Bank */}
      <Card className="p-4 bg-muted/50">
        <p className="text-sm text-muted-foreground mb-3 font-medium">
          Drag the words to the correct images:
        </p>
        <div className="flex flex-wrap gap-2">
          {availableWords.map((word) => (
            <div
              key={word}
              draggable
              onDragStart={() => handleDragStart(word)}
              className="flex items-center gap-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg cursor-grab active:cursor-grabbing hover:bg-primary/90 transition-colors font-medium text-sm"
            >
              <GripVertical className="w-4 h-4 opacity-70" />
              {word}
            </div>
          ))}
          {availableWords.length === 0 && !showResults && (
            <p className="text-muted-foreground text-sm italic">All words placed! Click "Check Answers" to verify.</p>
          )}
        </div>
      </Card>

      {/* Images Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            onDrop={() => handleDrop(item.id)}
            onDragOver={handleDragOver}
            className={`relative rounded-xl border-2 transition-all ${
              matches[item.id] 
                ? showResults 
                  ? results[item.id] 
                    ? 'border-green-500 bg-green-50 dark:bg-green-950/30' 
                    : 'border-red-500 bg-red-50 dark:bg-red-950/30'
                  : 'border-primary bg-primary/5'
                : 'border-dashed border-muted-foreground/30 hover:border-primary/50'
            }`}
          >
            <img
              src={item.image}
              alt="Vocabulary item"
              className="w-full h-32 object-contain rounded-t-lg bg-white p-2"
            />
            <div className="p-2 min-h-[48px] flex items-center justify-center">
              {matches[item.id] ? (
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => !showResults && removeMatch(item.id)}
                >
                  <span className="font-medium text-sm">{matches[item.id]}</span>
                  {showResults && (
                    results[item.id] 
                      ? <CheckCircle2 className="w-5 h-5 text-green-600" />
                      : <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              ) : (
                <span className="text-muted-foreground text-sm">Drop here</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Results & Actions */}
      {showResults && (
        <Card className="p-4 bg-accent/10">
          <p className="text-lg font-semibold text-foreground">
            Score: {correctCount} / {totalItems} correct!
          </p>
          {correctCount === totalItems && (
            <p className="text-green-600 font-medium mt-1">🎉 Perfect! All answers are correct!</p>
          )}
        </Card>
      )}

      <div className="flex gap-3">
        <Button 
          onClick={checkAnswers} 
          disabled={Object.keys(matches).length < items.length}
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
