"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { lecturesData } from "@/lib/data";
import type { Lecture, MCQ, WrittenQuestion } from "@/lib/types";
import { ListChecks, Pencil } from "lucide-react";

interface AnswerVisibilityState {
  [key: string]: boolean;
}

function LectureContent({ lecture }: { lecture: Lecture }) {
  const [visibleAnswers, setVisibleAnswers] = useState<AnswerVisibilityState>({});
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleAnswer = (id: string) => {
    setVisibleAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const container = contentRef.current;
    if (container) {
      const questionsToAnimate = container.querySelectorAll('.question-animate');
      const baseDelay = 70; // ms

      questionsToAnimate.forEach((el, index) => {
        const delay = index * baseDelay;
        (el as HTMLElement).style.animationDelay = `${delay}ms`;
        el.classList.add('stagger-fade-in');
      });
    }
  }, [lecture]);


  return (
    <div ref={contentRef} className="lecture-content visible">
        {lecture.mcqs && lecture.mcqs.length > 0 && (
            <>
                <div className="section-title">
                    <i className="fas fa-list-check icon"></i>
                    <h2>{lecture.name} - MCQs:</h2>
                </div>
                {lecture.mcqs.map((mcq, index) => {
                    const answerId = `answer-mcq-${lecture.id}-${index}`;
                    return (
                        <div key={answerId} className="question question-animate">
                            <p className="font-semibold">{mcq.q}</p>
                            <div className="mt-2 mb-2">
                                {mcq.o.map((option, i) => (
                                    <div key={i} className="mcq-option">
                                        {String.fromCharCode(97 + i)}) {option}
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                className="show-answer-btn"
                                data-target-id={answerId}
                                aria-expanded="false"
                                aria-controls={answerId}
                                onClick={() => toggleAnswer(answerId)}
                            >
                                {visibleAnswers[answerId] ? "Hide Answer" : "Show Answer"}
                            </button>
                            <div id={answerId} className={`answer-container ${visibleAnswers[answerId] ? 'answer-visible' : ''}`} role="region" aria-hidden={!visibleAnswers[answerId]}>
                                <div>
                                    <div className="explanation">
                                        <p><strong>Answer:</strong> {mcq.a}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </>
        )}
        {lecture.written && lecture.written.length > 0 && (
             <>
                <div className="section-title mt-10">
                     <i className="fas fa-pencil icon"></i>
                    <h2>{lecture.name} - Written Questions:</h2>
                </div>
                {lecture.written.map((wq, index) => {
                    const answerId = `answer-written-${lecture.id}-${index}`;
                    return(
                        <div key={answerId} className="question question-animate">
                            <div className="written-question-container">
                                <p className="font-semibold">{wq.q}</p>
                            </div>
                            <button
                                type="button"
                                className="show-answer-btn"
                                data-target-id={answerId}
                                aria-expanded="false"
                                aria-controls={answerId}
                                onClick={() => toggleAnswer(answerId)}
                            >
                                {visibleAnswers[answerId] ? "Hide Answer" : "Show Answer"}
                            </button>
                            <div id={answerId} className={`answer-container ${visibleAnswers[answerId] ? 'answer-visible' : ''}`} role="region" aria-hidden={!visibleAnswers[answerId]}>
                                <div>
                                    <p className="written-answer-label">Answer:</p>
                                    <div className="written-explanation" dangerouslySetInnerHTML={{ __html: wq.a }}></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </>
        )}
    </div>
  );
}

export function QuizContainer() {
  const [activeLectureId, setActiveLectureId] = useState(lecturesData[0]?.id || "");
  const tabsWrapperRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  
  const checkTabOverflow = useCallback(() => {
    const container = tabsContainerRef.current;
    const wrapper = tabsWrapperRef.current;
    if (container && wrapper) {
      requestAnimationFrame(() => {
        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        const tolerance = 2;
        wrapper.classList.toggle('show-fade-left', scrollLeft > tolerance);
        wrapper.classList.toggle('show-fade-right', scrollWidth - scrollLeft - clientWidth > tolerance);
      });
    }
  }, []);

  useEffect(() => {
    const container = tabsContainerRef.current;
    checkTabOverflow();
    if(container) {
        container.addEventListener('scroll', checkTabOverflow, { passive: true });
        window.addEventListener('resize', checkTabOverflow);
        const resizeObserver = new ResizeObserver(checkTabOverflow);
        resizeObserver.observe(container);
        if(tabsWrapperRef.current) {
            resizeObserver.observe(tabsWrapperRef.current);
        }

        return () => {
            container.removeEventListener('scroll', checkTabOverflow);
            window.removeEventListener('resize', checkTabOverflow);
            resizeObserver.disconnect();
        };
    }
  }, [checkTabOverflow]);

  const switchTab = (lectureId: string) => {
    const targetButton = tabsContainerRef.current?.querySelector(`button.lecture-tab-btn[data-lecture-id="${lectureId}"]`);
    if(targetButton) {
         targetButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
    setActiveLectureId(lectureId);
  }

  const activeLecture = lecturesData.find(lec => lec.id === activeLectureId);

  return (
    <>
        <div id="lecture-tabs-wrapper" ref={tabsWrapperRef}>
            <div id="lecture-tabs" ref={tabsContainerRef} role="tablist" aria-label="Lectures">
                 {lecturesData.map((lecture) => (
                    <button
                        key={lecture.id}
                        type="button"
                        className={`lecture-tab-btn ${activeLectureId === lecture.id ? 'active' : ''}`}
                        data-lecture-id={lecture.id}
                        role="tab"
                        aria-controls="dynamic-question-area"
                        aria-selected={activeLectureId === lecture.id}
                        onClick={() => switchTab(lecture.id)}
                    >
                        {lecture.name}
                    </button>
                ))}
            </div>
        </div>
        <div id="dynamic-question-area">
             {activeLecture && <LectureContent lecture={activeLecture} />}
        </div>
    </>
  );
}
