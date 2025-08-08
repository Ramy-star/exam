"use client";

import { useFormState, useFormStatus } from "react-dom";
import { generateQuizAction } from "@/app/quiz-builder/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { QuizBuilderOutput } from "@/ai/flows/quiz-builder";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Loader2, Wand2 } from "lucide-react";

const initialState = {
  message: null,
  errors: null,
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Generate Quiz
        </>
      )}
    </Button>
  );
}

function GeneratedQuiz({ quizData }: { quizData: QuizBuilderOutput }) {
  const [visibleAnswers, setVisibleAnswers] = useState<Record<string, boolean>>({});

  const toggleAnswer = (id: string) => {
    setVisibleAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  
  return (
    <div className="mt-8">
      <h2 className="font-section text-2xl font-bold text-center mb-4">Generated Quiz</h2>
      <div className="space-y-4">
        {quizData.questions.map((q, index) => {
          const questionId = `gen-q-${index}`;
          return (
            <Card key={questionId} className="bg-[hsl(var(--question-bg))] border-l-4" style={{ borderColor: "hsl(var(--question-border))"}}>
              <CardContent className="p-4">
                <p className="font-semibold text-question-header">{index + 1}. {q.question}</p>
                <div className="my-2 space-y-2">
                  {q.options.map((option, i) => (
                    <div key={i} className="rounded-md border p-2 text-sm border-mcq-option-border">
                      {option}
                    </div>
                  ))}
                </div>
                <Button onClick={() => toggleAnswer(questionId)} className="show-answer-btn" size="sm" style={{ background: visibleAnswers[questionId] ? 'var(--show-answer-hover-gradient)' : 'var(--show-answer-gradient)' }}>
                  {visibleAnswers[questionId] ? "Hide Answer" : "Show Answer"}
                </Button>
                <div className={`answer-container ${visibleAnswers[questionId] ? 'answer-visible' : ''}`}>
                    <div>
                        <div className="mt-3 border-l-4 rounded-md bg-explanation-bg p-4 text-explanation-text" style={{borderColor: "hsl(var(--explanation-border))"}}>
                            <p><strong className="text-explanation-strong-text">Correct Answer:</strong> {q.answer}</p>
                        </div>
                    </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}


export function QuizBuilder() {
  const [state, formAction] = useFormState(generateQuizAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message && state.errors) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-section text-3xl text-center">AI Quiz Builder</CardTitle>
          <CardDescription className="text-center">
            Paste any text content below, and we'll generate a multiple-choice quiz for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Paste the content from a webpage or document here... (min 100 characters)"
                rows={15}
                required
              />
              {state?.errors?.content && <p className="text-sm font-medium text-destructive">{state.errors.content[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="numQuestions">Number of Questions</Label>
              <Input
                id="numQuestions"
                name="numQuestions"
                type="number"
                defaultValue={5}
                min={1}
                max={10}
                required
              />
              {state?.errors?.numQuestions && <p className="text-sm font-medium text-destructive">{state.errors.numQuestions[0]}</p>}
            </div>
            <SubmitButton />
          </form>
          {state?.message && !state.errors && !state.data && (
             <Alert variant="destructive" className="mt-4">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Generation Failed</AlertTitle>
                <AlertDescription>
                    {state.message}
                </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      
      {state?.data && <GeneratedQuiz quizData={state.data} />}
    </>
  );
}
