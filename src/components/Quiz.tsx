import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, RefreshCw, Loader2 } from "lucide-react";
import { Question } from "@/hooks/useReadings";
import { supabase } from "@/integrations/supabase/client";

interface QuizProps {
  questions: Question[];
  onComplete?: () => void;
}

export const Quiz = ({ questions, onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(questions.length).fill(false));
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  // Handle empty questions array
  if (!questions || questions.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <p className="text-muted-foreground text-center">No questions available for this reading.</p>
        </CardContent>
      </Card>
    );
  }

  const handleSubmit = async () => {
    if (selectedAnswer === null) return;
    setIsChecking(true);

    try {
      const { data, error } = await supabase.functions.invoke("check-answers", {
        body: { questionId: questions[currentQuestion].id, selectedAnswer },
      });

      if (error) throw error;

      const correct = data.isCorrect as boolean;
      setIsCorrect(correct);
      setCorrectAnswer(data.correctAnswer as number);

      if (correct && !answeredQuestions[currentQuestion]) {
        setScore(score + 1);
      }

      const newAnsweredQuestions = [...answeredQuestions];
      newAnsweredQuestions[currentQuestion] = true;
      setAnsweredQuestions(newAnsweredQuestions);
      setShowResult(true);
    } catch (err) {
      console.error("Error checking answer:", err);
    } finally {
      setIsChecking(false);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setCorrectAnswer(null);
    } else {
      onComplete?.();
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Array(questions.length).fill(false));
    setCorrectAnswer(null);
  };

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const getBorderClass = (optionIndex: number) => {
    if (!showResult) return "border-border hover:bg-accent";
    if (correctAnswer !== null && optionIndex === correctAnswer) return "border-green-500 bg-green-50 dark:bg-green-950";
    if (selectedAnswer === optionIndex) return "border-red-500 bg-red-50 dark:bg-red-950";
    return "border-border";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Comprehension Questions</span>
          <span className="font-normal text-muted-foreground text-sm">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </CardTitle>
        <CardDescription>
          Score: {score} / {questions.length}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <h3 className="font-medium text-lg">{question.question}</h3>

          {question.imageUrl && (
            <div className="rounded-lg overflow-hidden border border-border">
              <img
                src={question.imageUrl}
                alt="Question context"
                className="w-full max-h-[300px] object-contain bg-muted"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => setSelectedAnswer(parseInt(value))}
            disabled={showResult || isChecking}
          >
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 p-3 rounded-md border transition-colors ${getBorderClass(index)}`}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex flex-1 justify-between items-center cursor-pointer"
                >
                  <span>{option}</span>
                  {showResult && correctAnswer !== null && index === correctAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  )}
                  {showResult && selectedAnswer === index && correctAnswer !== null && index !== correctAnswer && (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {showResult && (
          <div
            className={`p-4 rounded-md ${
              isCorrect
                ? "bg-green-100 dark:bg-green-950 text-green-900 dark:text-green-100"
                : "bg-red-100 dark:bg-red-950 text-red-900 dark:text-red-100"
            }`}
          >
            <p className="font-medium">
              {isCorrect ? "Correct! Well done!" : "Incorrect. Try to understand why."}
            </p>
          </div>
        )}

        <div className="flex gap-2">
          {!showResult ? (
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswer === null || isChecking}
              className="flex-1"
            >
              {isChecking ? <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Checking...</> : "Submit Answer"}
            </Button>
          ) : (
            <>
              <Button onClick={handleNext} className="flex-1">
                {isLastQuestion ? "Finish Quiz" : "Next Question"}
              </Button>
              {isLastQuestion && (
                <Button onClick={handleReset} variant="outline">
                  <RefreshCw className="mr-2 w-4 h-4" />
                  Restart
                </Button>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
