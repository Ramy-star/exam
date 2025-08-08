"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { lecturesData } from "@/lib/data";
import type { Lecture } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ListChecks, Pencil } from "lucide-react";

interface AnswerVisibilityState {
  [key: string]: boolean;
}

function LectureContent({ lecture }: { lecture: Lecture }) {
  const [visibleAnswers, setVisibleAnswers] = useState<AnswerVisibilityState>({});
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleAnswer = (id: string) => {
    setVisibleAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('question-animate-enter');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    questionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      questionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [lecture]);

  return (
    <div>
      {lecture.mcqs.length > 0 && (
        <>
          <div className="flex items-center rounded-xl p-2 px-5 my-5" style={{ background: 'var(--section-title-bg-light)', color: 'white' }}>
            <ListChecks className="mr-3 h-5 w-5" />
            <h2 className="font-section text-xl font-bold">{lecture.name} - MCQs:</h2>
          </div>
          {lecture.mcqs.map((mcq, index) => {
            const answerId = `mcq-${lecture.id}-${index}`;
            return (
              <div
                key={answerId}
                className="question-animate"
                ref={(el) => (questionRefs.current[index] = el)}
              >
                <Card className="my-5 bg-[hsl(var(--question-bg))] border-l-4" style={{ borderColor: "hsl(var(--question-border))"}}>
                  <CardContent className="p-4">
                    <p className="font-semibold text-question-header">{mcq.q}</p>
                    <div className="my-2 space-y-2">
                      {mcq.o.map((option, i) => (
                        <div key={i} className="rounded-md border p-2 text-sm border-mcq-option-border hover:bg-mcq-option-hover-bg">
                          {String.fromCharCode(97 + i)}) {option}
                        </div>
                      ))}
                    </div>
                    <Button onClick={() => toggleAnswer(answerId)} className="show-answer-btn" style={{ background: visibleAnswers[answerId] ? 'var(--show-answer-hover-gradient)' : 'var(--show-answer-gradient)' }}>
                      {visibleAnswers[answerId] ? "Hide Answer" : "Show Answer"}
                    </Button>
                    <div className={`answer-container ${visibleAnswers[answerId] ? "answer-visible" : ""}`}>
                      <div>
                        <div className="mt-3 border-l-4 rounded-md bg-explanation-bg p-4 text-explanation-text" style={{borderColor: "hsl(var(--explanation-border))"}}>
                          <p><strong className="text-explanation-strong-text">Answer:</strong> {mcq.a}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </>
      )}

      {lecture.written.length > 0 && (
         <>
          <div className="flex items-center rounded-xl p-2 px-5 my-5" style={{ background: 'var(--section-title-bg-light)', color: 'white' }}>
            <Pencil className="mr-3 h-5 w-5" />
            <h2 className="font-section text-xl font-bold">{lecture.name} - Written Questions:</h2>
          </div>
          {lecture.written.map((wq, index) => {
             const answerId = `written-${lecture.id}-${index}`;
             const writtenIndex = lecture.mcqs.length + index;
             return (
              <div
                key={answerId}
                className="question-animate"
                ref={(el) => (questionRefs.current[writtenIndex] = el)}
              >
                <Card className="my-5 bg-[hsl(var(--question-bg))] border-l-4" style={{ borderColor: "hsl(var(--question-border))"}}>
                  <CardContent className="p-4">
                    <p className="font-semibold text-question-header">{wq.q}</p>
                     <Button onClick={() => toggleAnswer(answerId)} className="show-answer-btn" style={{ background: visibleAnswers[answerId] ? 'var(--show-answer-hover-gradient)' : 'var(--show-answer-gradient)' }}>
                      {visibleAnswers[answerId] ? "Hide Answer" : "Show Answer"}
                    </Button>
                     <div className={`answer-container ${visibleAnswers[answerId] ? "answer-visible" : ""}`}>
                      <div>
                        <p className="font-semibold text-written-label-text mt-3">Answer:</p>
                        <div className="mt-1 border rounded-md bg-written-expl-bg p-4 text-explanation-text" style={{borderColor: "hsl(var(--written-expl-border))"}}
                          dangerouslySetInnerHTML={{ __html: wq.a }}
                        />
                      </div>
                    </div>
                   </CardContent>
                </Card>
               </div>
             );
           })}
        </>
      )}
    </div>
  );
}

export function QuizTabs() {
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [showFades, setShowFades] = useState({ left: false, right: false });

  const checkTabOverflow = useCallback(() => {
    const container = tabsContainerRef.current;
    if (container) {
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const tolerance = 2;
      setShowFades({
        left: scrollLeft > tolerance,
        right: scrollWidth - scrollLeft - clientWidth > tolerance,
      });
    }
  }, []);

  useEffect(() => {
    checkTabOverflow();
    const container = tabsContainerRef.current;
    if (container) {
        container.addEventListener("scroll", checkTabOverflow, { passive: true });
        window.addEventListener("resize", checkTabOverflow);
        const resizeObserver = new ResizeObserver(checkTabOverflow);
        resizeObserver.observe(container);
        return () => {
            container.removeEventListener("scroll", checkTabOverflow);
            window.removeEventListener("resize", checkTabOverflow);
            resizeObserver.disconnect();
        };
    }
  }, [checkTabOverflow]);
  
  const MemoizedLectureContent = useMemo(() => {
    const components: { [key: string]: React.FC<{ lecture: Lecture }> } = {};
    for (const lecture of lecturesData) {
      components[lecture.id] = (props) => <LectureContent {...props} />;
    }
    return components;
  }, []);

  return (
    <Tabs defaultValue={lecturesData[0]?.id || ""} className="w-full">
      <div
        className={`relative tabs-wrapper-fades ${showFades.left ? 'show-fade-left' : ''} ${showFades.right ? 'show-fade-right' : ''}`}
      >
        <TabsList ref={tabsContainerRef} className="h-auto justify-start bg-transparent p-1 overflow-x-auto">
          {lecturesData.map((lecture) => (
            <TabsTrigger key={lecture.id} value={lecture.id} className="lecture-tab-btn">
              {lecture.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {lecturesData.map((lecture) => {
        const Content = MemoizedLectureContent[lecture.id];
        return (
          <TabsContent key={lecture.id} value={lecture.id}>
            <Content lecture={lecture} />
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
