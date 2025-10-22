'use client';
import React, { useState, useMemo, useEffect } from 'react';
import type { Lecture } from '@/lib/types';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, AlertCircle, LogOut, X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// --- STYLES ---
const GlobalStyles = () => (
    <style>{`
        /* --- Keyframes for Animations --- */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
        }
        @keyframes progress-bar {
            from { width: 0%; }
            to { width: var(--progress-width); }
        }

        /* --- CSS Variables --- */
        :root {
            /* Fonts */
            --header-font: 'Coiny', cursive;
            --base-font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

            /* Light Theme Colors */
            --page-bg: #f5f7fa;
            --text-color: #333;
            --container-bg: white;
            --container-shadow: 0 4px 15px rgba(0,0,0,0.08);
            --header-text: #1f2937;
            --header-border: #e5e7eb;
            --primary-blue: #3b82f6;
            --primary-blue-dark: #2563eb;
            --primary-green: #10b981;
            --primary-green-dark: #059669;
            --primary-red: #ef4444;
            --primary-yellow: #f59e0b;
            --light-gray: #f3f4f6;
            --medium-gray: #e5e7eb;
            --dark-gray: #4b5563;
        }

        /* --- Base screen styles --- */
        body {
            font-family: var(--base-font);
            background-color: var(--page-bg);
            color: var(--text-color);
            font-size: 16px;
        }
        .page-container {
            max-width: 900px;
            margin: 20px auto;
            background-color: var(--container-bg);
            box-shadow: var(--container-shadow);
            padding: 30px;
            overflow-x: hidden;
            border-radius: 12px;
        }

        /* --- Exam Container --- */
        .exam-container {
            position: relative;
            background-color: #ffffff;
            border-radius: 12px;
            padding: 2rem;
        }
        .exam-container.start-mode {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 70vh;
        }

        .animating-out {
            animation: fadeOut 0.3s ease-out forwards;
        }
        .animating-in {
             animation: fadeIn 0.5s ease-out forwards;
        }


        /* --- Lecture Tabs --- */
        #lecture-tabs {
            display: flex;
            flex-wrap: nowrap;
            justify-content: flex-start;
            gap: 12px;
            padding: 5px 2px;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch; 
            scrollbar-width: none; 
            scroll-behavior: smooth;
            width: 100%;
            margin-bottom: 1.5rem;
        }

        #lecture-tabs::-webkit-scrollbar {
            display: none;
        }
        
        button.lecture-tab-btn {
            flex-shrink: 0;
            padding: 0.5rem 1rem;
            border-radius: 9999px;
            border: 1px solid var(--medium-gray);
            background-color: #fff;
            color: var(--dark-gray);
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
        }

        button.lecture-tab-btn:hover {
            background-color: var(--light-gray);
            border-color: var(--primary-blue);
        }

        button.lecture-tab-btn.active {
            background-image: linear-gradient(to right, #3b82f6, #4f46e5);
            background-color: #2563eb;
            border-color: #1d4ed8;
            color: white;
            font-weight: 600;
            box-shadow: none;
            transform: scale(1);
        }

        /* --- Start Screen --- */
        .exam-start-screen {
            text-align: center;
            padding: 2rem;
            width: 100%;
        }
        .exam-start-screen h2 {
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: var(--header-text);
        }
        .exam-start-screen p {
            font-size: 1.1rem;
            color: var(--dark-gray);
            margin-bottom: 2.5rem;
        }
        .start-exam-btn {
            background: linear-gradient(135deg, var(--primary-blue), var(--primary-blue-dark));
            color: white;
            padding: 0.8rem 2.5rem;
            font-size: 1.1rem;
            font-weight: 600;
            border-radius: 50px;
            border: none;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }
        .start-exam-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        /* --- In-Progress Screen --- */
        .quick-exit-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: transparent;
            border: none;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #9ca3af;
            transition: all 0.2s ease;
        }
        .quick-exit-btn:hover {
            background: #fee2e2;
            color: #ef4444;
            transform: scale(1.1);
        }

        .exam-progress-header {
            margin-bottom: 1.5rem;
        }
        .exam-progress-header h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
        }
        .progress-bar-container {
            width: 100%;
            background-color: var(--light-gray);
            border-radius: 10px;
            height: 8px;
            overflow: hidden;
        }
        .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, var(--primary-blue), #60a5fa);
            border-radius: 10px;
            transition: width 0.4s ease-in-out;
        }
        .question-area {
          min-height: 320px;
        }
        .question-title {
            font-size: 1rem;
            font-weight: 500;
            color: var(--dark-gray);
            margin-bottom: 1rem;
        }
        .question-text {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 2rem;
            line-height: 1.6;
        }
        .options-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
        }
        .option-btn {
            display: flex;
            align-items: center;
            text-align: left;
            width: 100%;
            padding: 1rem 1.25rem;
            border: 2px solid var(--medium-gray);
            border-radius: 10px;
            background-color: #fff;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
        }
        .option-btn:hover {
            border-color: var(--primary-blue);
            transform: translateX(5px);
        }
        .option-btn.selected {
            background-color: #e0e7ff;
            border-color: var(--primary-blue-dark);
            font-weight: 600;
            box-shadow: 0 2px 8px rgba(96, 165, 250, 0.2);
        }
        .option-letter {
            font-weight: 700;
            margin-right: 1rem;
            padding: 0.25rem 0.6rem;
            border: 1px solid var(--medium-gray);
            border-radius: 6px;
            min-width: 32px;
            text-align: center;
            transition: all 0.2s ease-in-out;
        }
        .option-btn.selected .option-letter {
          background-color: var(--primary-blue);
          color: white;
          border-color: var(--primary-blue);
        }

        .exam-navigation {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 2rem;
            border-top: 1px solid var(--header-border);
            padding-top: 1.5rem;
        }
        .nav-btn {
            background-color: #fff;
            color: var(--dark-gray);
            padding: 0.6rem 1.5rem;
            font-size: 1rem;
            font-weight: 500;
            border-radius: 8px;
            border: 1px solid var(--medium-gray);
            cursor: pointer;
            transition: background-color 0.2s, color 0.2s, transform 0.1s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .nav-btn:hover:not(:disabled) {
            background-color: var(--light-gray);
        }
        .nav-btn:active:not(:disabled) {
            transform: scale(0.97);
        }
        .nav-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        .nav-btn.finish {
            background-color: var(--primary-green);
            color: white;
            border-color: var(--primary-green);
            font-weight: 600;
        }
        .nav-btn.finish:hover {
            background-color: var(--primary-green-dark);
            border-color: var(--primary-green-dark);
        }

        /* --- Results Screen --- */
        .exam-results-screen {
            text-align: center;
        }
        .results-summary {
            background: linear-gradient(135deg, #f9fafb, #eef2f7);
            border: 1px solid var(--header-border);
            border-radius: 16px;
            padding: 2.5rem 2rem;
            margin-bottom: 2.5rem;
            box-shadow: 0 8px 25px rgba(0,0,0,0.05);
        }
        .results-summary h2 {
            font-size: 2rem;
            font-weight: 700;
            color: var(--header-text);
            margin-bottom: 0.75rem;
        }
        .results-summary .score {
            font-size: 5rem;
            font-weight: 800;
            line-height: 1.1;
            color: var(--primary-blue);
            margin: 1.5rem 0;
            text-shadow: 0 4px 10px rgba(59, 130, 246, 0.2);
        }
        .results-summary .score-text {
            font-size: 1.25rem;
            color: var(--dark-gray);
        }
        .review-answers-title {
            font-size: 1.8rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            text-align: left;
            border-bottom: 1px solid var(--header-border);
            padding-bottom: 1rem;
        }
        .review-question {
            background-color: #fff;
            border: 1px solid var(--medium-gray);
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 1.25rem;
            text-align: left;
            transition: box-shadow 0.2s;
        }
        .review-question:hover {
            box-shadow: 0 4px 15px rgba(0,0,0,0.07);
        }
        .review-question-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1.25rem;
        }
        .review-question-text {
          font-weight: 600;
          font-size: 1.1rem;
          line-height: 1.6;
        }
        .review-option {
            padding: 0.8rem 1rem;
            border-radius: 8px;
            margin-bottom: 0.75rem;
            display: flex;
            gap: 1rem;
            align-items: center;
            border: 1px solid transparent;
            font-size: 0.95rem;
        }
        .review-option.correct {
            background-color: #dcfce7;
            color: #166534;
            border-color: #86efac;
            font-weight: 600;
        }
        .review-option.incorrect {
            background-color: #fee2e2;
            color: #991b1b;
            border-color: #fca5a5;
        }
        .review-option.unanswered {
            background-color: #fffbeb;
            color: #b45309;
            border-color: #fcd34d;
        }
        .review-option > svg {
          flex-shrink: 0;
        }

        .exit-btn {
            background: none;
            border: 2px solid var(--primary-red);
            color: var(--primary-red);
            padding: 0.75rem 2rem;
            font-size: 1.1rem;
            font-weight: 600;
            border-radius: 50px;
            cursor: pointer;
            transition: background-color 0.2s, color 0.2s, transform 0.2s;
            margin-top: 2rem;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .exit-btn:hover {
            background-color: var(--primary-red);
            color: white;
            transform: translateY(-2px);
        }
        
        /* Alert Dialog Customization */
        [role="alertdialog"] {
            background-color: white !important;
            border-radius: 12px !important;
        }
        [role="alertdialog"] [role="heading"] {
            text-align: center;
            font-size: 1.25rem;
            font-weight: 600;
        }
        [role="alertdialog"] p {
            text-align: center;
            color: #4b5563;
        }
        [role="alertdialog"] footer {
            display: flex;
            justify-content: center !important;
            gap: 1rem;
        }
        [role="alertdialog"] footer button {
            border-radius: 8px !important;
            font-weight: 500;
        }
        [role="alertdialog"] footer button:last-child {
             background-color: #ef4444 !important;
             color: white !important;
        }
        [role="alertdialog"] footer button:last-child:hover {
             background-color: #dc2626 !important;
        }
        [role="alertdialog"] footer button:first-child {
            background-color: #e5e7eb !important;
            color: #374151 !important;
            border: none !important;
        }
        [role="alertdialog"] footer button:first-child:hover {
            background-color: #d1d5db !important;
        }


        /* Mobile Styles */
        @media (max-width: 768px) {
            .page-container {
                padding: 15px;
                margin: 10px;
            }
            .exam-container {
                padding: 1rem;
            }
            .exam-start-screen h2 {
                font-size: 1.8rem;
            }
            .results-summary .score {
                font-size: 4rem;
            }
        }
    `}</style>
);


const ExamMode = ({ lecture, onExit, onSwitchLecture, allLectures }: { lecture: Lecture, onExit: () => void, onSwitchLecture: (lectureId: string) => void, allLectures: Lecture[] }) => {
    const [examState, setExamState] = useState<'not-started' | 'in-progress' | 'finished'>('not-started');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isExitAlertOpen, setIsExitAlertOpen] = useState(false);

    const questions = useMemo(() => {
        return [...(lecture.mcqs_level_1 || []), ...(lecture.mcqs_level_2 || [])];
    }, [lecture]);

    useEffect(() => {
        if (examState === 'not-started') {
            setIsAnimating(false);
            setCurrentQuestionIndex(0);
            setUserAnswers(Array(questions.length).fill(null));
        }
    }, [lecture, examState, questions.length]);

    const handleAnimationEnd = (nextState: 'not-started' | 'in-progress' | 'finished') => {
        setExamState(nextState);
        setIsAnimating(false);
    };
    
    const triggerAnimation = (nextState: 'not-started' | 'in-progress' | 'finished') => {
        setIsAnimating(true);
        setTimeout(() => handleAnimationEnd(nextState), 300); // Match animation duration
    };

    const handleStartExam = () => {
        triggerAnimation('in-progress');
        setCurrentQuestionIndex(0);
        setUserAnswers(Array(questions.length).fill(null));
    };

    const handleSelectOption = (option: string) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = option;
        setUserAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmit = () => {
        triggerAnimation('finished');
    };
    
    const handleExitClick = () => {
        triggerAnimation('not-started');
        onExit();
    };

    const handleQuickExit = () => {
        triggerAnimation('not-started');
        onExit();
    };
    
    const calculateScore = () => {
        return userAnswers.reduce((score, answer, index) => {
            if (answer === questions[index].a) {
                return score + 1;
            }
            return score;
        }, 0);
    };

    const containerClasses = `exam-container ${isAnimating ? 'animating-out' : 'animating-in'}`;

    if (questions.length === 0 && examState === 'not-started') {
        return <div className="exam-container"><p>No multiple-choice questions available for this lecture.</p></div>;
    }
    
    if (examState === 'not-started') {
        return (
            <div className={`${containerClasses} start-mode`}>
                <div className="exam-start-screen">
                    <div id="lecture-tabs">
                        {allLectures.map(l => (
                            <button 
                                key={l.id}
                                className={`lecture-tab-btn ${lecture.id === l.id ? 'active' : ''}`}
                                onClick={() => onSwitchLecture(l.id)}
                            >
                                {l.name}
                            </button>
                        ))}
                    </div>
                    <hr className="w-full border-t border-gray-200 mb-8" />
                    <h2>{lecture.name} Exam</h2>
                    <p>{`Ready to test your knowledge? You have ${questions.length} questions.`}</p>
                    <button onClick={handleStartExam} className="start-exam-btn">
                        Start Exam
                    </button>
                </div>
            </div>
        );
    }
    
    if (examState === 'finished') {
        const score = calculateScore();
        return (
            <div className={`${containerClasses} exam-results-screen`}>
              <TooltipProvider>
                <div className="results-summary">
                    <h2>Exam Completed!</h2>
                    <div className="score">{score} / {questions.length}</div>
                    <p className="score-text">
                        You answered {score} out of {questions.length} questions correctly.
                    </p>
                </div>
                
                <h3 className="review-answers-title">Review Your Answers</h3>
                <div className="review-questions-list">
                    {questions.map((q, index) => {
                        const userAnswer = userAnswers[index];
                        const correctAnswer = q.a;
                        const isCorrect = userAnswer === correctAnswer;
                        const isUnanswered = userAnswer === null;
                        const questionText = q.q.substring(q.q.indexOf('.') + 1).trim();

                        return (
                            <div key={index} className="review-question">
                                <div className="review-question-header">
                                  {isUnanswered && (
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <AlertCircle size={20} className="text-yellow-500" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>You did not answer this question</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  )}
                                  <p className="review-question-text">{index + 1}. {questionText}</p>
                                </div>
                                <div className="options">
                                    {q.o.map((option, optIndex) => {
                                        const isUserAnswer = option === userAnswer;
                                        const isCorrectAnswer = option === correctAnswer;
                                        let optionClass = 'review-option';

                                        if (isCorrectAnswer) {
                                            optionClass += ' correct';
                                        } else if (isUserAnswer && !isCorrect) {
                                            optionClass += ' incorrect';
                                        } else if (isUnanswered && isCorrectAnswer) {
                                            optionClass += ' unanswered';
                                        }

                                        return (
                                            <div key={optIndex} className={optionClass}>
                                                {isCorrectAnswer && <CheckCircle size={22} />}
                                                {isUserAnswer && !isCorrect && <XCircle size={22} />}
                                                {!isCorrectAnswer && !isUserAnswer && <div style={{width: 24, height: 24}} />}
                                                <span>{String.fromCharCode(97 + optIndex)}) {option.substring(option.indexOf(')') + 1).trim()}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button onClick={handleExitClick} className="exit-btn">
                    <LogOut size={20} />
                    Exit
                </button>
              </TooltipProvider>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    const questionText = currentQuestion.q.substring(currentQuestion.q.indexOf('.') + 1).trim();

    return (
        <>
            <AlertDialog open={isExitAlertOpen} onOpenChange={setIsExitAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to exit?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Your progress will be lost. You will be returned to the lecture selection screen.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleQuickExit}>Exit</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className={containerClasses}>
                <button className="quick-exit-btn" onClick={() => setIsExitAlertOpen(true)} aria-label="Exit Exam">
                    <X size={20} />
                </button>
                <div className="exam-progress-header">
                    <h3>{lecture.name}</h3>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>

                <div className="question-area">
                    {currentQuestion && (
                        <>
                            <p className="question-title">{`Question ${currentQuestionIndex + 1} of ${questions.length}`}</p>
                            <p className="question-text">{questionText}</p>
                            <div className="options-grid">
                                {currentQuestion.o.map((option, index) => (
                                    <button
                                        key={index}
                                        className={`option-btn ${userAnswers[currentQuestionIndex] === option ? 'selected' : ''}`}
                                        onClick={() => handleSelectOption(option)}
                                    >
                                        <span className="option-letter">{String.fromCharCode(97 + index).toUpperCase()}</span>
                                        <span>{option.substring(option.indexOf(')') + 1).trim()}</span>
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                
                <div className="exam-navigation">
                    <button 
                        onClick={handlePrevious} 
                        disabled={currentQuestionIndex === 0}
                        className="nav-btn"
                    >
                        <ChevronLeft size={20} />
                        Previous
                    </button>

                    {currentQuestionIndex === questions.length - 1 ? (
                        <button onClick={handleSubmit} className="nav-btn finish">
                            Finish & Submit
                        </button>
                    ) : (
                        <button 
                            onClick={handleNext} 
                            className="nav-btn"
                        >
                            Next
                            <ChevronRight size={20} />
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};


export function QuizContainer({ lectures }: { lectures: Lecture[] }) {
    const [activeLectureId, setActiveLectureId] = useState(lectures[0]?.id || '');

    useEffect(() => {
        const fontLinks = [
            { id: 'google-fonts-preconnect-1', href: 'https://fonts.googleapis.com', rel: 'preconnect' },
            { id: 'google-fonts-preconnect-2', href: 'https://fonts.gstatic.com', rel: 'preconnect', crossOrigin: 'anonymous' },
            { id: 'google-fonts-main', href: 'https://fonts.googleapis.com/css2?family=Coiny&display=swap', rel: 'stylesheet' }
        ];

        fontLinks.forEach(linkInfo => {
            if (!document.getElementById(linkInfo.id)) {
                const link = document.createElement('link');
                link.id = linkInfo.id;
                link.rel = linkInfo.rel;
                link.href = linkInfo.href;
                if (linkInfo.crossOrigin) {
                    (link as HTMLLinkElement).crossOrigin = linkInfo.crossOrigin as string;
                }
                document.head.appendChild(link);
            }
        });
    }, []);

    const handleSwitchLecture = (lectureId: string) => {
        setActiveLectureId(lectureId);
    };

    const handleExit = () => {
        // This function is now used to reset to the start screen (lecture selection)
        // but the main logic is handled inside ExamMode now.
        // We can select the first lecture by default on full exit.
        setActiveLectureId(lectures[0]?.id || '');
    };

    if (lectures.length === 0) {
        return <p className="p-4 text-center">No lectures available.</p>;
    }

    const activeLecture = lectures.find(l => l.id === activeLectureId) || lectures[0];

    return (
        <div className="page-container">
            <GlobalStyles />
            <div id="questions-container">
                 <ExamMode 
                    lecture={activeLecture} 
                    onExit={handleExit} 
                    onSwitchLecture={handleSwitchLecture}
                    allLectures={lectures}
                />
            </div>
        </div>
    );
}
