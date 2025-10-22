'use client';
import React, { useState, useMemo, useEffect } from 'react';
import type { Lecture } from '@/lib/types';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react';

// --- STYLES ---
const GlobalStyles = () => (
    <style>{`
        /* --- Keyframes for Animations --- */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
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
            --container-shadow: 0 4px 15px rgba(0,0,0,0.1);
            --header-text: #1f2937;
            --header-border: #e5e7eb;
            --primary-blue: #3b82f6;
            --primary-blue-dark: #2563eb;
            --primary-green: #10b981;
            --primary-red: #ef4444;
            --light-gray: #f3f4f6;
            --medium-gray: #e5e7eb;
            --dark-gray: #4b5563;
        }

        /* --- Base screen styles --- */
        body {
            font-family: var(--base-font);
            background-color: var(--page-bg);
            color: var(--text-color);
            font-size: 17px;
        }
        .page-container {
            max-width: 1200px;
            margin: 20px auto;
            background-color: var(--container-bg);
            box-shadow: var(--container-shadow);
            padding: 30px;
            overflow-x: hidden;
            border-radius: 12px;
        }
        .header {
            background: none;
            color: var(--header-text);
            border-radius: 0;
            padding: 25px 0;
            margin-bottom: 20px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
            border-bottom: 2px solid var(--header-border);
        }
        .header-img {
            height: 80px;
            width: 80px;
            object-fit: contain;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header h1 {
            font-family: var(--header-font);
            font-size: 3.5rem;
            margin-bottom: 0;
            color: var(--header-text);
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
            position: relative;
            top: 5px;
        }

        /* --- Exam Container --- */
        .exam-container {
            background-color: #ffffff;
            border-radius: 12px;
            padding: 2rem;
            animation: fadeIn 0.5s ease-out;
        }

        /* --- Start Screen --- */
        .exam-start-screen {
            text-align: center;
            padding: 2rem;
        }
        .exam-start-screen h2 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: var(--header-text);
        }
        .exam-start-screen p {
            font-size: 1.2rem;
            color: var(--dark-gray);
            margin-bottom: 2rem;
        }
        .start-exam-btn {
            background: linear-gradient(135deg, var(--primary-blue), var(--primary-blue-dark));
            color: white;
            padding: 0.75rem 2rem;
            font-size: 1.1rem;
            font-weight: 600;
            border-radius: 50px;
            border: none;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }
        .start-exam-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        /* --- In-Progress Screen --- */
        .exam-progress-header {
            margin-bottom: 1.5rem;
        }
        .exam-progress-header h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        .progress-bar-container {
            width: 100%;
            background-color: var(--light-gray);
            border-radius: 10px;
            height: 10px;
            overflow: hidden;
        }
        .progress-bar {
            height: 100%;
            background-color: var(--primary-blue);
            border-radius: 10px;
            transition: width 0.3s ease-in-out;
            animation: progress-bar 0.5s ease-out forwards;
        }
        .question-area {
          min-height: 300px;
        }
        .question-title {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
        }
        .options-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.75rem;
        }
        .option-btn {
            display: flex;
            align-items: start;
            text-align: left;
            width: 100%;
            padding: 1rem;
            border: 2px solid var(--medium-gray);
            border-radius: 8px;
            background-color: #fff;
            font-size: 1rem;
            cursor: pointer;
            transition: border-color 0.2s, background-color 0.2s, color 0.2s;
        }
        .option-btn:hover {
            border-color: var(--primary-blue);
        }
        .option-btn.selected {
            background-color: #e0e7ff;
            border-color: var(--primary-blue);
            font-weight: 600;
        }
        .option-letter {
            font-weight: 700;
            margin-right: 0.75rem;
            padding: 0.1rem 0.5rem;
            border: 1px solid var(--medium-gray);
            border-radius: 4px;
            min-width: 28px;
            text-align: center;
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
            border-top: 1px solid var(--medium-gray);
            padding-top: 1.5rem;
        }
        .nav-btn {
            background-color: #fff;
            color: var(--dark-gray);
            padding: 0.5rem 1.5rem;
            font-size: 1rem;
            border-radius: 8px;
            border: 1px solid var(--medium-gray);
            cursor: pointer;
            transition: background-color 0.2s, color 0.2s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .nav-btn:hover:not(:disabled) {
            background-color: var(--light-gray);
        }
        .nav-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        .nav-btn.finish {
            background-color: var(--primary-green);
            color: white;
            border-color: var(--primary-green);
        }
        .nav-btn.finish:hover {
            background-color: #059669;
        }

        /* --- Results Screen --- */
        .exam-results-screen {
            text-align: center;
        }
        .results-summary {
            background-color: var(--light-gray);
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 2rem;
        }
        .results-summary h2 {
            font-size: 2rem;
            font-weight: 700;
            color: var(--header-text);
        }
        .results-summary .score {
            font-size: 4rem;
            font-weight: 800;
            color: var(--primary-blue);
            margin: 1rem 0;
        }
        .results-summary .score-text {
            font-size: 1.2rem;
            color: var(--dark-gray);
        }
        .review-answers-title {
            font-size: 1.8rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            text-align: left;
        }
        .review-question {
            background-color: #fff;
            border: 1px solid var(--medium-gray);
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            text-align: left;
        }
        .review-question p {
          margin-bottom: 1rem;
          font-weight: 600;
        }
        .review-option {
            padding: 0.75rem;
            border-radius: 6px;
            margin-bottom: 0.5rem;
            display: flex;
            gap: 0.75rem;
            align-items: center;
        }
        .review-option.correct {
            background-color: #d1fae5;
            color: #065f46;
            border: 1px solid #6ee7b7;
        }
        .review-option.incorrect {
            background-color: #fee2e2;
            color: #991b1b;
            border: 1px solid #fca5a5;
        }

        .retry-exam-btn {
            background: none;
            border: 1px solid var(--primary-blue);
            color: var(--primary-blue);
            padding: 0.75rem 2rem;
            font-size: 1.1rem;
            font-weight: 600;
            border-radius: 50px;
            cursor: pointer;
            transition: background-color 0.2s, color 0.2s;
            margin-top: 2rem;
        }
        .retry-exam-btn:hover {
            background-color: var(--primary-blue);
            color: white;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
            .page-container {
                padding: 15px;
                margin: 10px auto;
            }
            .header h1 {
                font-size: 2.5rem;
            }
            .exam-container {
                padding: 1rem;
            }
        }
    `}</style>
);


const ExamMode = ({ lecture }: { lecture: Lecture }) => {
    const [examState, setExamState] = useState<'not-started' | 'in-progress' | 'finished'>('not-started');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);

    const questions = useMemo(() => {
        // For simplicity, we'll combine all MCQs into one list for the exam.
        // We will ignore written questions in exam mode for now.
        return [...(lecture.mcqs_level_1 || []), ...(lecture.mcqs_level_2 || [])];
    }, [lecture]);

    useEffect(() => {
        // Initialize userAnswers array when questions are loaded
        if (questions.length > 0 && userAnswers.length !== questions.length) {
            setUserAnswers(Array(questions.length).fill(null));
        }
    }, [questions, userAnswers.length]);

    const handleStartExam = () => {
        setExamState('in-progress');
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
        setExamState('finished');
    };
    
    const calculateScore = () => {
        return userAnswers.reduce((score, answer, index) => {
            if (answer === questions[index].a) {
                return score + 1;
            }
            return score;
        }, 0);
    };

    if (questions.length === 0) {
        return <p>No multiple-choice questions available for this lecture.</p>;
    }
    
    // --- Render Start Screen ---
    if (examState === 'not-started') {
        return (
            <div className="exam-container">
                <div className="exam-start-screen">
                    <h2>{lecture.name} Exam</h2>
                    <p>{`You will be tested on ${questions.length} multiple-choice questions.`}</p>
                    <button onClick={handleStartExam} className="start-exam-btn">
                        Start Exam
                    </button>
                </div>
            </div>
        );
    }
    
    // --- Render Results Screen ---
    if (examState === 'finished') {
        const score = calculateScore();
        return (
            <div className="exam-container exam-results-screen">
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
                        return (
                            <div key={index} className="review-question">
                                <p>{index + 1}. {q.q}</p>
                                <div className="options">
                                    {q.o.map((option, optIndex) => {
                                        const isUserAnswer = option === userAnswer;
                                        const isCorrectAnswer = option === correctAnswer;
                                        let optionClass = 'review-option';

                                        if (isCorrectAnswer) {
                                            optionClass += ' correct';
                                        } else if (isUserAnswer && !isCorrect) {
                                            optionClass += ' incorrect';
                                        }

                                        return (
                                            <div key={optIndex} className={optionClass}>
                                                {isCorrectAnswer && <CheckCircle size={20} />}
                                                {isUserAnswer && !isCorrect && <XCircle size={20} />}
                                                {!isCorrectAnswer && !isUserAnswer && <div style={{width: 20}} />}
                                                <span>{option}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button onClick={handleStartExam} className="retry-exam-btn">
                    Try Again
                </button>
            </div>
        );
    }

    // --- Render In-Progress Screen ---
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div className="exam-container">
            <div className="exam-progress-header">
                <h3>{lecture.name}</h3>
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ '--progress-width': `${progress}%` } as React.CSSProperties}></div>
                </div>
            </div>

            <div className="question-area">
                {currentQuestion && (
                    <>
                        <p className="question-title">{`Question ${currentQuestionIndex + 1} of ${questions.length}`}</p>
                        <p className="font-semibold text-xl mb-6">{currentQuestion.q}</p>
                        <div className="options-grid">
                            {currentQuestion.o.map((option, index) => (
                                <button
                                    key={index}
                                    className={`option-btn ${userAnswers[currentQuestionIndex] === option ? 'selected' : ''}`}
                                    onClick={() => handleSelectOption(option)}
                                >
                                    <span className="option-letter">{String.fromCharCode(97 + index)}</span>
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
                    <button onClick={handleNext} className="nav-btn">
                        Next
                        <ChevronRight size={20} />
                    </button>
                )}
            </div>
        </div>
    );
};


export function QuizContainer({ lectures }: { lectures: Lecture[] }) {
    // For now, we are focusing on a single lecture exam mode.
    // The tab interface can be re-introduced later if needed.
    const activeLecture = lectures[0];

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

    if (!activeLecture) {
        return <p className="p-4 text-center">No lectures available.</p>;
    }

    return (
        <>
            <GlobalStyles />
            <div id="questions-container">
                <ExamMode lecture={activeLecture} />
            </div>
        </>
    );
}
