import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { Question } from "@/data/readings";

interface QuizProps {
  questions: Question[];
  onComplete?: () => void;
}

export const Quiz = ({ questions, onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(questions.length).fill(false));

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    if (isCorrect && !answeredQuestions[currentQuestion]) {
      setScore(score + 1);
    }

    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);

    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
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
  };

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Comprehension Questions</span>
          <span className="text-sm font-normal text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </CardTitle>
        <CardDescription>
          Score: {score} / {questions.length}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{question.question}</h3>
          
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => setSelectedAnswer(parseInt(value))}
            disabled={showResult}
          >
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 p-3 rounded-md border transition-colors ${
                  showResult
                    ? index === question.correctAnswer
                      ? "border-green-500 bg-green-50 dark:bg-green-950"
                      : selectedAnswer === index
                      ? "border-red-500 bg-red-50 dark:bg-red-950"
                      : "border-border"
                    : "border-border hover:bg-accent"
                }`}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer flex items-center justify-between"
                >
                  <span>{option}</span>
                  {showResult && index === question.correctAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  )}
                  {showResult && selectedAnswer === index && index !== question.correctAnswer && (
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
              disabled={selectedAnswer === null}
              className="flex-1"
            >
              Submit Answer
            </Button>
          ) : (
            <>
              <Button onClick={handleNext} className="flex-1">
                {isLastQuestion ? "Finish Quiz" : "Next Question"}
              </Button>
              {isLastQuestion && (
                <Button onClick={handleReset} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
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
