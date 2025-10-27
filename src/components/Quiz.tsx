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
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
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

  const getBorderClass = (option: boolean) => {
    if (!showResult) return "border-border hover:bg-accent";
    if (option === question.correctAnswer) return "border-green-500 bg-green-50 dark:bg-green-950";
    if (selectedAnswer === option) return "border-red-500 bg-red-50 dark:bg-red-950";
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
          
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => setSelectedAnswer(value === "true")}
            disabled={showResult}
          >
            <div
              className={`flex items-center space-x-2 p-3 rounded-md border transition-colors ${getBorderClass(true)}`}
            >
              <RadioGroupItem value="true" id="option-true" />
              <Label
                htmlFor="option-true"
                className="flex flex-1 justify-between items-center cursor-pointer"
              >
                <span>True</span>
                {showResult && question.correctAnswer === true && (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                )}
                {showResult && selectedAnswer === true && question.correctAnswer !== true && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </Label>
            </div>
            <div
              className={`flex items-center space-x-2 p-3 rounded-md border transition-colors ${getBorderClass(false)}`}
            >
              <RadioGroupItem value="false" id="option-false" />
              <Label
                htmlFor="option-false"
                className="flex flex-1 justify-between items-center cursor-pointer"
              >
                <span>Falso</span>
                {showResult && question.correctAnswer === false && (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                )}
                {showResult && selectedAnswer === false && question.correctAnswer !== false && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </Label>
            </div>
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
