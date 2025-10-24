'use client';
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, AlertCircle, LogOut, X, Clock, ArrowDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LabelProps, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid, LabelList, ReferenceLine } from 'recharts';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, useFirebase, useUser } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

// --- TYPES ---
export interface MCQ {
  q: string;
  o: string[];
  a: string;
}
export interface WrittenSubQuestion {
  q: string;
  a: string;
}
export interface WrittenCase {
    case: string;
    subqs: WrittenSubQuestion[];
}
export interface Lecture {
  id: string;
  name: string;
  mcqs_level_1: MCQ[];
  mcqs_level_2: MCQ[];
  written: WrittenCase[];
}

export interface ExamResult {
    lectureId: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    timestamp: Date;
    userId: string;
}

const PerformanceChart = ({ correct, incorrect, unanswered }: { correct: number, incorrect: number, unanswered: number }) => {
    const data = [
        { name: 'Correct', value: correct, color: '#10b981' },
        { name: 'Incorrect', value: incorrect, color: '#ef4444' },
        { name: 'Unanswered', value: unanswered, color: '#f59e0b' },
    ].filter(item => item.value > 0);

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = (props: LabelProps & { name: string, percent: number }) => {
        const { cx, cy, midAngle, outerRadius, percent, name } = props as any;
        const radius = outerRadius * 1.35; 
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        const textAnchor = x > cx ? 'start' : 'end';
        const labelX = x + (x > cx ? 3 : -3);

        if (percent === 0) return null;

        return (
            <text x={labelX} y={y} textAnchor={textAnchor} dominantBaseline="central" className="text-xs font-medium fill-foreground">
                {`${name} (${(percent * 100).toFixed(0)}%)`}
            </text>
        );
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 20, right: 50, left: 50, bottom: 20 }}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine
                    label={renderCustomizedLabel}
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-background border border-border p-2 rounded-lg shadow-lg text-sm">
                <p className="font-bold">{`Score Range: ${label}`}</p>
                <p className="text-muted-foreground">{`Students: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

const YouIndicator = (props: any) => {
    const { x, y, index, userBinIndex } = props;
    if (index !== userBinIndex || !x || !y) return null;

    return (
        <g transform={`translate(${x},${y})`}>
            <ArrowDown x={-8} y={-20} size={16} color="hsl(var(--primary))" />
            <text x={0} y={-25} textAnchor="middle" fill="hsl(var(--primary))" className="font-bold text-sm">
                You
            </text>
        </g>
    );
};


const ResultsDistributionChart = ({ results, userPercentage }: { results: ExamResult[], userPercentage: number }) => {
    const userBinIndex = useMemo(() => {
        if (userPercentage < 0) return -1;
        if (userPercentage === 100) return 20;
        return Math.floor(userPercentage / 5);
    }, [userPercentage]);

    const data = useMemo(() => {
        const bins = Array.from({ length: 20 }, (_, i) => ({
            name: `${i * 5}-${i * 5 + 4}%`,
            count: 0,
        }));
        bins.push({ name: '100%', count: 0 });

        results.forEach(result => {
            const percentage = result.percentage;
            if (percentage === 100) {
                bins[20].count++;
            } else if (percentage >= 0) {
                const binIndex = Math.floor(percentage / 5);
                if(bins[binIndex]) bins[binIndex].count++;
            }
        });
        
        return bins;
    }, [results]);
    
    if (results.length === 0) {
        return <p className="text-center text-muted-foreground">Be the first to set the benchmark!</p>
    }
    
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 40, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} interval={1} tick={{fontSize: 10}} />
                <YAxis allowDecimals={false} label={{ value: 'Students', angle: -90, position: 'insideLeft' }} />
                <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--primary) / 0.1)' }} />
                <Bar dataKey="count" name="Number of Students">
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === userBinIndex ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.3)"} />
                    ))}
                    {userBinIndex !== -1 && (
                      <LabelList 
                        dataKey="count" 
                        content={<YouIndicator userBinIndex={userBinIndex} />} 
                        position="top" 
                      />
                    )}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}


const ExamMode = ({ lecture, onExit, onSwitchLecture, allLectures }: { lecture: Lecture, onExit: () => void, onSwitchLecture: (lectureId: string) => void, allLectures: Lecture[] }) => {
    const [examState, setExamState] = useState<'not-started' | 'in-progress' | 'finished'>('not-started');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isExitAlertOpen, setIsExitAlertOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [showResumeAlert, setShowResumeAlert] = useState(false);
    const [questionAnimation, setQuestionAnimation] = useState('');
    const isInitialRender = useRef(true);

    const { user } = useUser();
    const firestore = useFirestore();
    
    const resultsCollectionRef = useMemoFirebase(() => firestore ? collection(firestore, "examResults") : null, [firestore]);
    const examResultsQuery = useMemoFirebase(() => resultsCollectionRef ? query(resultsCollectionRef, where("lectureId", "==", lecture.id)) : null, [resultsCollectionRef, lecture.id]);
    const { data: allResults } = useCollection<ExamResult>(examResultsQuery);

    const questions = useMemo(() => {
        return [...(lecture.mcqs_level_1 || []), ...(lecture.mcqs_level_2 || [])];
    }, [lecture]);

    const { score, incorrect, unanswered } = useMemo(() => {
        let score = 0;
        let incorrect = 0;
        let unanswered = 0;

        for (let i = 0; i < questions.length; i++) {
            if (userAnswers[i] === null || userAnswers[i] === undefined) {
                unanswered++;
            } else if (questions[i] && userAnswers[i] === questions[i].a) {
                score++;
            } else {
                incorrect++;
            }
        }
        return { score, incorrect, unanswered };
    }, [questions, userAnswers]);

    const userPercentage = useMemo(() => questions.length > 0 ? (score / questions.length) * 100 : 0, [score, questions.length]);

    const userFirstResult = useMemo(() => {
        if (!user || !allResults) return null;
        // Find the user's first result for this lecture
        const userResults = allResults.filter(r => r.userId === user.uid);
        userResults.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        return userResults.length > 0 ? userResults[0] : null;
    }, [allResults, user]);

    const storageKey = useMemo(() => user ? `exam_progress_${lecture.id}_${user.uid}` : null, [lecture.id, user]);

    const handleSubmit = useCallback(async () => {
        const percentage = questions.length > 0 ? (score / questions.length) * 100 : 0;
        
        if (user && resultsCollectionRef) {
            const userPreviousResultsQuery = query(resultsCollectionRef, where("lectureId", "==", lecture.id), where("userId", "==", user.uid));
            try {
                const userPreviousResultsSnapshot = await getDocs(userPreviousResultsQuery);

                if (userPreviousResultsSnapshot.empty) {
                     const result: ExamResult = {
                        lectureId: lecture.id,
                        score,
                        totalQuestions: questions.length,
                        percentage,
                        userId: user.uid,
                        timestamp: new Date(),
                    };
                    addDocumentNonBlocking(resultsCollectionRef, result);
                }
            } catch (e) {
                console.error("Error checking or submitting exam results:", e)
            }
        }
        
        if (storageKey) {
            try {
                localStorage.removeItem(storageKey);
            } catch (error) {
                console.error("Could not clear localStorage:", error);
            }
        }
        triggerAnimation('finished');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storageKey, lecture.id, questions.length, user, resultsCollectionRef, score]);

    useEffect(() => {
        if (isInitialRender.current || !storageKey) {
            isInitialRender.current = false;
            return;
        }
        
        try {
            const savedProgress = localStorage.getItem(storageKey);
            if (savedProgress) {
                setShowResumeAlert(true);
            } else {
                setExamState('not-started');
                setCurrentQuestionIndex(0);
                setUserAnswers(Array(questions.length).fill(null));
                setTimeLeft(0);
            }
        } catch (error) {
            console.error("Could not access localStorage:", error);
        }
    }, [storageKey, questions.length, lecture.id]);


    // Save progress
    useEffect(() => {
        if (examState === 'in-progress' && storageKey) {
            try {
                const progress = {
                    currentQuestionIndex,
                    userAnswers,
                    timeLeft,
                };
                localStorage.setItem(storageKey, JSON.stringify(progress));
            } catch (error) {
                console.error("Could not save to localStorage:", error);
            }
        }
    }, [currentQuestionIndex, userAnswers, timeLeft, examState, storageKey]);


    const startTimer = useCallback(() => {
        const totalTime = questions.length * 30; // 30 seconds per question
        setTimeLeft(totalTime);
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [questions.length, handleSubmit]);


    useEffect(() => {
        let timerCleanup: () => void = () => {};
        if (examState === 'in-progress') {
            if (timeLeft > 0) { // Resume timer
                const timer = setInterval(() => {
                    setTimeLeft(prevTime => {
                        if (prevTime <= 1) {
                            clearInterval(timer);
                            handleSubmit();
                            return 0;
                        }
                        return prevTime - 1;
                    });
                }, 1000);
                timerCleanup = () => clearInterval(timer);
            } else { // Start new timer
                timerCleanup = startTimer();
            }
        }
        return timerCleanup;
    }, [examState, timeLeft, startTimer, handleSubmit]);


    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleAnimationEnd = (nextState: 'not-started' | 'in-progress' | 'finished') => {
        setExamState(nextState);
        setIsAnimating(false);
    };
    
    const triggerAnimation = (nextState: 'not-started' | 'in-progress' | 'finished') => {
        setIsAnimating(true);
        setTimeout(() => handleAnimationEnd(nextState), 300); // Match animation duration
    };

    const handleStartExam = (resume = false) => {
        setShowResumeAlert(false);
        if (resume && storageKey) {
            try {
                const savedProgress = localStorage.getItem(storageKey);
                if (savedProgress) {
                    const { currentQuestionIndex, userAnswers, timeLeft } = JSON.parse(savedProgress);
                    setCurrentQuestionIndex(currentQuestionIndex);
                    setUserAnswers(userAnswers);
                    setTimeLeft(timeLeft);
                    triggerAnimation('in-progress');
                }
            } catch (error) {
                console.error("Could not load from localStorage:", error);
                startNewExam();
            }
        } else {
            startNewExam();
        }
    };
    
    const startNewExam = () => {
        if (storageKey) {
            try {
                localStorage.removeItem(storageKey);
            } catch (error) {
                console.error("Could not clear localStorage:", error);
            }
        }
        setCurrentQuestionIndex(0);
        setUserAnswers(Array(questions.length).fill(null));
        setTimeLeft(0);
        triggerAnimation('in-progress');
    };

    const handleSelectOption = (option: string) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = option;
        setUserAnswers(newAnswers);
    };

    const triggerQuestionAnimation = (callback: () => void) => {
        setQuestionAnimation('question-fade-out');
        setTimeout(() => {
            callback();
            setQuestionAnimation('question-fade-in');
        }, 300); // Duration of fade-out animation
    };



    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            triggerQuestionAnimation(() => setCurrentQuestionIndex(prev => prev + 1));
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            triggerQuestionAnimation(() => setCurrentQuestionIndex(prev => prev - 1));
        }
    };
    
    const handleExitClick = () => {
        setIsExitAlertOpen(true);
    };

    const handleQuickExit = () => {
        triggerAnimation('not-started');
        onExit();
    };

    const containerClasses = `exam-container ${isAnimating ? 'animating-out' : 'animating-in'}`;

    if (questions.length === 0 && examState === 'not-started') {
        return <div className="exam-container"><p>No multiple-choice questions available for this lecture.</p></div>;
    }
    
    return (
        <>
            <AlertDialog open={isExitAlertOpen} onOpenChange={setIsExitAlertOpen}>
                <AlertDialogContent className="rounded-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to exit?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Your current progress will be saved. You can resume next time.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="justify-center sm:justify-center">
                        <AlertDialogCancel className="rounded-2xl">Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive hover:bg-destructive/90 rounded-2xl" onClick={handleQuickExit}>Exit</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={showResumeAlert} onOpenChange={setShowResumeAlert}>
                <AlertDialogContent className="rounded-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Welcome Back!</AlertDialogTitle>
                        <AlertDialogDescription>
                            We found an incomplete exam. Would you like to resume where you left off or start a new exam?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="justify-center sm:justify-center">
                         <AlertDialogCancel 
                            className="rounded-2xl border-border bg-background hover:bg-gray-100 text-foreground hover:text-foreground focus:ring-0 focus-visible:ring-0 focus:ring-offset-0" 
                            onClick={() => handleStartExam(false)}>
                            Start New
                        </AlertDialogCancel>
                        <AlertDialogAction 
                            className="rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-0 focus-visible:ring-0 focus:ring-offset-0" 
                            onClick={() => handleStartExam(true)}>
                            Resume Exam
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {examState === 'not-started' && (
                <div className={cn(containerClasses, "start-mode")}>
                    <div className="exam-start-screen">
                        <div id="lecture-tabs">
                            {allLectures.map(l => (
                                <button 
                                    key={l.id}
                                    className={cn('lecture-tab-btn', {'active': lecture.id === l.id})}
                                    onClick={() => {
                                        if (lecture.id !== l.id) onSwitchLecture(l.id);
                                    }}
                                >
                                    {l.name}
                                </button>
                            ))}
                        </div>
                        <hr className="w-full border-t border-border mb-8" />
                        <h2 style={{ fontFamily: "'Calistoga', cursive" }}>{lecture.name} Exam</h2>
                        <p>{`Ready to test your knowledge? You have ${questions.length} questions.`}</p>
                        <button onClick={() => handleStartExam(false)} className="start-exam-btn">
                            Start Exam
                        </button>
                    </div>
                </div>
            )}

            {examState === 'finished' && (
                <div className={cn(containerClasses, "exam-results-screen")}>
                    <TooltipProvider>
                        <div className="results-summary">
                            <h2 style={{ fontFamily: "'Calistoga', cursive" }}>Exam Completed!</h2>
                            <div className="score-container">
                                <div className="score">{score} / {questions.length}</div>
                                <p className="score-text">
                                    You answered {score} out of {questions.length} questions correctly.
                                </p>
                            </div>
                            <div className="chart-container">
                                <PerformanceChart correct={score} incorrect={incorrect} unanswered={unanswered} />
                            </div>
                        </div>

                        <div className="results-summary mt-6">
                            <h2 style={{ fontFamily: "'Calistoga', cursive" }}>How You Compare</h2>
                            <div className="w-full h-[300px]">
                                {allResults ? (
                                    <ResultsDistributionChart results={allResults} userPercentage={userPercentage} />
                                ) : (
                                    <p className='text-center pt-10'>Loading comparison data...</p>
                                )}
                            </div>
                        </div>
                        
                        <h3 className="review-answers-title" style={{ fontFamily: "'Calistoga', cursive" }}>Review Your Answers</h3>
                        <div className="review-questions-list">
                            {questions.map((q, index) => {
                                const userAnswer = userAnswers[index];
                                const correctAnswer = q.a;
                                const isCorrect = userAnswer === correctAnswer;
                                const isUnanswered = userAnswer === null || userAnswer === undefined;
                                const questionText = q.q.substring(q.q.indexOf('.') + 1).trim();

                                return (
                                    <div key={index} className="review-question">
                                        <div className="review-question-header">
                                            {isUnanswered ? (
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                      <AlertCircle size={20} className="text-yellow-500 shrink-0" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>You did not answer this question</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            ) : isCorrect ? (
                                                <CheckCircle size={20} className="text-green-600 shrink-0"/>
                                            ) : (
                                                <XCircle size={20} className="text-red-600 shrink-0"/>
                                            )}
                                            <p className="review-question-text">{index + 1}. {questionText}</p>
                                        </div>
                                        <div className="options">
                                            {q.o.map((option, optIndex) => {
                                                const isUserAnswer = option === userAnswer;
                                                const isCorrectAnswer = option === correctAnswer;
                                                let optionClass = 'review-option ';

                                                if (isCorrectAnswer) {
                                                    optionClass += 'correct';
                                                } else if (isUserAnswer && !isCorrect) {
                                                    optionClass += 'incorrect';
                                                } else if (isUnanswered && isCorrectAnswer) {
                                                    optionClass += 'unanswered';
                                                }

                                                return (
                                                    <div key={optIndex} className={optionClass}>
                                                        {isCorrectAnswer ? <CheckCircle size={22} className="shrink-0" /> :
                                                         isUserAnswer && !isCorrect ? <XCircle size={22} className="shrink-0" /> :
                                                         <div style={{width: 22, height: 22}} className="shrink-0" />}
                                                        <span className='pl-2'>{String.fromCharCode(97 + optIndex)}) {option.substring(option.indexOf(')') + 1).trim()}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <button onClick={() => { triggerAnimation('not-started'); onExit(); }} className="exit-btn">
                            <LogOut size={20} />
                            Exit
                        </button>
                    </TooltipProvider>
                </div>
            )}

            {examState === 'in-progress' && (() => {
                const currentQuestion = questions[currentQuestionIndex];
                const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
                const questionText = currentQuestion ? currentQuestion.q.substring(currentQuestion.q.indexOf('.') + 1).trim() : '';

                return (
                    <div className={containerClasses}>
                         <div className="exam-progress-header">
                            <h3 className="text-lg font-bold text-center mb-2" style={{ fontFamily: "'Calistoga', cursive" }}>{lecture.name}</h3>
                             <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2 font-semibold text-lg text-muted-foreground">
                                    <Clock size={20} />
                                    <span>{formatTime(timeLeft)}</span>
                                </div>
                                <button className="quick-exit-btn" onClick={handleExitClick} aria-label="Exit Exam">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="progress-bar-container">
                                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>

                        <div className={cn("question-area", questionAnimation)}>
                            {currentQuestion && (
                                <>
                                    <p className="question-title">{`Question ${currentQuestionIndex + 1} of ${questions.length}`}</p>
                                    <p className="question-text">{questionText}</p>
                                    <div className="options-grid">
                                        {currentQuestion.o.map((option, index) => (
                                            <button
                                                key={index}
                                                className={cn('option-btn', {'selected': userAnswers[currentQuestionIndex] === option})}
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
                );
            })()}
        </>
    );
};


export function ExamContainer({ lectures }: { lectures: Lecture[] }) {
    const [activeLectureId, setActiveLectureId] = useState('');
    const isInitialRender = useRef(true);

    useEffect(() => {
        const fontLinks = [
            { id: 'google-fonts-preconnect-1', href: 'https://fonts.googleapis.com', rel: 'preconnect' },
            { id: 'google-fonts-preconnect-2', href: 'https://fonts.gstatic.com', rel: 'preconnect', crossOrigin: 'anonymous' },
            { id: 'google-fonts-main', href: 'https://fonts.googleapis.com/css2?family=Coiny&family=Calistoga&display=swap', rel: 'stylesheet' }
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
        // No specific action needed on exit from the container perspective
    };
    
    // This effect ensures we have a valid lecture on initial load
    useEffect(() => {
        if (isInitialRender.current && lectures.length > 0) {
            setActiveLectureId(lectures[0].id);
            isInitialRender.current = false;
        }
    }, [lectures]);


    if (!lectures || lectures.length === 0) {
        return <p className="p-4 text-center">No lectures available.</p>;
    }

    const activeLecture = lectures.find(l => l.id === activeLectureId);

    if (!activeLecture) {
        return <div className="flex items-center justify-center h-screen"><p>Loading lecture...</p></div>;
    }

    return (
        <main className="exam-page-container bg-background text-foreground">
            <div id="questions-container">
                 <ExamMode 
                    lecture={activeLecture} 
                    onExit={handleExit} 
                    onSwitchLecture={handleSwitchLecture}
                    allLectures={lectures}
                />
            </div>
        </main>
    );
}

    