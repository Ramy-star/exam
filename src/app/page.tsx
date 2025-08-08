
'use client';
import React from 'react';
import { lecturesData } from '@/lib/data';

// --- STYLES ---
// All original CSS is included here to maintain the exact look and feel.
const GlobalStyles = () => (
    <style>{`
        /* --- CSS Variables --- */
        :root {
            /* Fonts */
            --qa-font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            --header-font: 'Coiny', cursive;
            --section-title-font: 'Calistoga', serif;
            --question-header-font: var(--qa-font-family);
            --base-font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

            /* Light Theme Colors */
            --page-bg: #f5f7fa;
            --text-color: #333;
            --container-bg: white;
            --container-shadow: 0 4px 15px rgba(0,0,0,0.1);
            --header-text: #1f2937;
            --header-border: #e5e7eb;
            --tab-bg: white;
            --tab-border: #cbd5e1;
            --tab-text: #334155;
            --tab-hover-bg: #f8fafc;
            --tab-hover-border: #94a3b8;
            --tab-hover-text: #0f172a;
            --tab-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            --tab-hover-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            --tab-active-border: #1d4ed8;
            --tab-active-bg: #2563eb;
            --tab-active-gradient: linear-gradient(to right, #3b82f6, #4f46e5);
            --section-title-bg-light: linear-gradient(135deg, #3b82f6, #1e40af);
            --section-title-bg-dark: #2563eb;
            --question-bg: #f8fafc;
            --question-border: #3b82f6;
            --question-shadow: 0 1px 3px rgba(0,0,0,0.05);
            --question-header-text: #dc2626;
            --explanation-bg: #ecfdf5;
            --explanation-border: #10b981;
            --explanation-text: #374151;
            --explanation-strong-text: #111827;
            --written-expl-bg: #f0fdfa;
            --written-expl-border: #99f6e4;
            --written-expl-text: #374151;
            --written-expl-strong-text: #111827;
            --written-label-text: #0d9488;
            --mcq-option-bg: #ffffff;
            --mcq-option-border: #e5e7eb;
            --mcq-option-text: #333;
            --mcq-option-hover-bg: #f9fafb;
            --mcq-option-hover-border: #d1d5db;
            --show-answer-gradient: linear-gradient(135deg, #60a5fa, #3b82f6);
            --show-answer-hover-gradient: linear-gradient(135deg, #3b82f6, #2563eb);
            --show-answer-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
            --show-answer-hover-shadow: 0 3px 6px rgba(59, 130, 246, 0.3);
            --toggle-bg: #f3f4f6;
            --toggle-text: #4b5563;
            --toggle-hover-bg: #e5e7eb;
            --toggle-hover-text: #2563eb;
            --toggle-focus-ring: #3b82f6;
            --fade-bg: white;
        }

        /* --- Dark Mode Variable Overrides --- */
        html.dark {
            --page-bg: #0f172a;
            --text-color: #cbd5e1;
            --container-bg: #1e293b;
            --container-shadow: 0 4px 15px rgba(0,0,0,0.5);
            --header-text: #f1f5f9;
            --header-border: #334155;
            --tab-bg: #334155;
            --tab-border: #475569;
            --tab-text: #cbd5e1;
            --tab-hover-bg: #1e293b;
            --tab-hover-border: #475569;
            --tab-hover-text: #f1f5f9;
            --tab-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.2);
            --tab-hover-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.25), 0 2px 4px -2px rgb(0 0 0 / 0.25);
            --tab-active-border: #1d4ed8;
            --tab-active-bg: #2563eb;
            --tab-active-gradient: none;
            --section-title-bg-dark: #2563eb;
            --question-bg: #1e293b;
            --question-border: #60a5fa;
            --question-shadow: 0 1px 3px rgba(0,0,0,0.2);
            --question-header-text: #f87171;
            --explanation-bg: #065f46;
            --explanation-border: #34d399;
            --explanation-text: #d1fae5;
            --explanation-strong-text: #a7f3d0;
            --written-expl-bg: #115e59;
            --written-expl-border: #5eead4;
            --written-expl-text: #ccfbf1;
            --written-expl-strong-text: #99f6e4;
            --written-label-text: #2dd4bf;
            --mcq-option-bg: #334155;
            --mcq-option-border: #4b5563;
            --mcq-option-text: #cbd5e1;
            --mcq-option-hover-bg: #1e293b;
            --mcq-option-hover-border: #334155;
            --show-answer-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
            --show-answer-hover-shadow: 0 3px 6px rgba(59, 130, 246, 0.15);
            --toggle-bg: #334155;
            --toggle-text: #9ca3af;
            --toggle-hover-bg: #1e293b;
            --toggle-hover-text: #facc15;
            --toggle-focus-ring: #60a5fa;
            --fade-bg: #0f172a;
        }

        /* --- Base screen styles --- */
        body {
            font-family: var(--base-font);
            background-color: var(--page-bg);
            color: var(--text-color);
            font-size: 17px;
            transition: background-color 0.3s ease, color 0.3s ease;
        }
        .page-container {
            max-width: 1200px;
            margin: 20px auto;
            background-color: var(--container-bg);
            box-shadow: var(--container-shadow);
            padding: 30px;
            overflow-x: hidden;
            border-radius: 12px;
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
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
            transition: color 0.3s ease, border-color 0.3s ease;
            position: relative;
        }
        #theme-toggle-btn {
            position: absolute;
            top: 50%;
            right: 15px;
            transform: translateY(-50%);
            padding: 0.5rem;
            border-radius: 9999px;
            color: var(--toggle-text);
            background-color: var(--toggle-bg);
            border: none;
            cursor: pointer;
            transition: background-color 0.2s ease-out, color 0.2s ease-out, transform 0.2s ease-out;
            overflow: hidden;
        }
        #theme-toggle-btn:hover {
            background-color: var(--toggle-hover-bg);
            color: var(--toggle-hover-text);
            transform: translateY(-50%) scale(1.1);
        }
        #theme-toggle-btn:active {
            transform: translateY(-50%) scale(1);
        }
        #theme-toggle-btn:focus { outline: none; }
        #theme-toggle-btn:focus-visible {
            outline: 2px solid var(--toggle-focus-ring);
            outline-offset: 2px;
        }
        #theme-toggle-btn .icon-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.4s ease-in-out;
        }
        html.dark #theme-toggle-btn .icon-wrapper { transform: rotate(-180deg); }
        html:not(.dark) #theme-toggle-btn .icon-wrapper { transform: rotate(0deg); }
        #theme-toggle-btn svg {
            width: 1.5rem;
            height: 1.5rem;
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
            transition: color 0.3s ease;
        }

        /* --- Styles for Lecture Tabs --- */
        #lecture-tabs-wrapper {
            position: relative;
            padding: 0 10px;
            border-bottom: 2px solid var(--header-border);
            margin-bottom: 25px;
            padding-bottom: 15px;
            transition: border-color 0.3s ease;
        }
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
        }
        #lecture-tabs::-webkit-scrollbar { display: none; }
        #lecture-tabs button.lecture-tab-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            white-space: nowrap;
            border-radius: 9999px;
            border-width: 1px;
            text-align: center;
            font-weight: 500;
            font-size: 0.875rem;
            padding: 0.5rem 1rem;
            box-shadow: var(--tab-shadow);
            transition: color 0.3s ease-out, background-color 0.3s ease-out, border-color 0.3s ease-out, box-shadow 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out, background 0.3s ease-out;
            transform: scale(1);
            background-color: var(--tab-bg);
            border-color: var(--tab-border);
            color: var(--tab-text);
            background-image: none;
        }
        @media (min-width: 768px) {
            #lecture-tabs button.lecture-tab-btn {
                font-size: 1rem;
                padding: 0.5rem 1.25rem;
            }
        }
        #lecture-tabs button.lecture-tab-btn:not(.active):hover {
            background-color: var(--tab-hover-bg);
            border-color: var(--tab-hover-border);
            color: var(--tab-hover-text);
            box-shadow: var(--tab-hover-shadow);
            transform: translateY(-2px);
        }
        #lecture-tabs button.lecture-tab-btn.active {
            background-image: var(--tab-active-gradient);
            background-color: var(--tab-active-bg);
            border-color: var(--tab-active-border);
            color: white;
            font-weight: 600;
            box-shadow: none;
            transform: scale(1);
        }
        #lecture-tabs button.lecture-tab-btn.active:hover {
            box-shadow: none;
            filter: brightness(1.1);
            transform: translateY(-2px);
        }
        #lecture-tabs button.lecture-tab-btn:active { transform: scale(0.98); }
        #lecture-tabs button.lecture-tab-btn:focus { outline: none; }

        /* --- Overflow Indicators (Gradient Fades) --- */
        #lecture-tabs-wrapper::before,
        #lecture-tabs-wrapper::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 15px;
            width: 50px;
            pointer-events: none;
            z-index: 2;
            opacity: 0;
            transition: opacity 0.3s ease-in-out, background 0.3s ease;
        }
        #lecture-tabs-wrapper::before {
            left: 0;
            background: linear-gradient(to right, var(--fade-bg) 40%, rgba(255,255,255,0));
        }
        #lecture-tabs-wrapper::after {
            right: 0;
            background: linear-gradient(to left, var(--fade-bg) 40%, rgba(255,255,255,0));
        }
        html.dark #lecture-tabs-wrapper::before {
            background: linear-gradient(to right, var(--fade-bg) 40%, rgba(15, 23, 42, 0));
        }
        html.dark #lecture-tabs-wrapper::after {
            background: linear-gradient(to left, var(--fade-bg) 40%, rgba(15, 23, 42, 0));
        }
        #lecture-tabs-wrapper.show-fade-left::before { opacity: 1; }
        #lecture-tabs-wrapper.show-fade-right::after { opacity: 1; }

        /* --- Content area styling --- */
        #dynamic-question-area {
            margin-top: 0;
            position: relative;
            min-height: 300px;
        }
        .lecture-content {
            opacity: 1;
            background-color: var(--container-bg);
            width: 100%;
            transition: background-color 0.3s ease;
        }
        
        /* --- Staggered fade-in animation --- */
        @keyframes staggerFadeIn {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .stagger-fade-in {
            animation: staggerFadeIn 0.7s ease-out forwards;
        }
        .question-animate {
            opacity: 0;
        }

        /* --- Section/Question Styles --- */
        .section-title {
            display: flex;
            align-items: center;
            background: var(--section-title-bg-light);
            color: white;
            border-radius: 12px;
            padding: 8px 20px;
            margin: 25px 0 20px 0;
            transition: background 0.3s ease;
        }
        html.dark .section-title {
            background: var(--section-title-bg-dark);
        }
        .section-title h2 {
            font-size: 1.4rem;
            font-weight: normal;
            font-family: var(--section-title-font);
            margin: 0;
            flex-grow: 1;
        }
        .section-title i {
            margin-right: 0.6rem;
            font-size: 1.2em;
        }
        .question {
            background-color: var(--question-bg);
            border-left: 5px solid var(--question-border);
            padding: 18px;
            margin: 20px 0;
            border-radius: 5px;
            box-shadow: var(--question-shadow);
            transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .question p.font-semibold {
            font-family: var(--question-header-font);
            font-weight: 600;
            margin-bottom: 10px;
            color: var(--question-header-text);
            font-size: 1.05em;
            line-height: 1.5;
            transition: color 0.3s ease;
        }

        /* --- Explanation/Answer Styles --- */
        .explanation {
            font-family: var(--qa-font-family);
            background-color: var(--explanation-bg);
            border-left: 5px solid var(--explanation-border);
            padding: 15px;
            border-radius: 8px;
            margin-top: 10px;
            box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
            transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        .explanation p {
            font-family: var(--qa-font-family);
            font-size: 14px;
            color: var(--explanation-text);
            line-height: 1.6;
            transition: color 0.3s ease;
        }
        .explanation p strong {
            color: var(--explanation-strong-text);
            font-weight: bold;
            transition: color 0.3s ease;
        }
        .written-answer-label {
            font-family: var(--qa-font-family);
            font-weight: bold;
            color: var(--written-label-text);
            margin-bottom: 6px;
            font-size: 1.1em;
            transition: color 0.3s ease;
        }
        .written-explanation {
            font-family: var(--qa-font-family);
            background-color: var(--written-expl-bg);
            border: 1px solid var(--written-expl-border);
            padding: 18px;
            border-radius: 8px;
            margin-top: 8px;
            box-shadow: inset 0 1px 2px rgba(0,0,0,0.04);
            transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        .written-explanation p {
            font-family: var(--qa-font-family);
            font-size: 14px;
            color: var(--written-expl-text);
            line-height: 1.6;
            transition: color 0.3s ease;
        }
        .written-explanation strong {
            font-weight: bold;
            color: var(--written-expl-strong-text);
            transition: color 0.3s ease;
        }
        .written-explanation em { font-style: italic; color: var(--written-label-text); transition: color 0.3s ease;}
        .mcq-option {
            font-family: var(--qa-font-family);
            padding: 8px 12px;
            margin: 6px 0;
            border-radius: 6px;
            border: 1px solid var(--mcq-option-border);
            background-color: var(--mcq-option-bg);
            font-size: 14px;
            color: var(--mcq-option-text);
            transition: background-color 0.2s, border-color 0.2s, color 0.3s ease;
        }
        .mcq-option:hover {
            background-color: var(--mcq-option-hover-bg);
            border-color: var(--mcq-option-hover-border);
        }
        .written-question-container {
            margin-bottom: 12px;
        }

        /* --- Show Answer Button Styles --- */
        .show-answer-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 5px 10px;
            background: var(--show-answer-gradient);
            color: white;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            font-size: 0.9em;
            font-weight: 600;
            transition: background 0.2s ease-in-out, transform 0.1s ease, box-shadow 0.2s ease;
            margin-top: 12px;
            box-shadow: var(--show-answer-shadow);
            min-width: 110px;
            text-align: center;
        }
        .show-answer-btn:hover {
            background: var(--show-answer-hover-gradient);
            box-shadow: var(--show-answer-hover-shadow);
        }
        .show-answer-btn:active {
            transform: scale(0.97);
            box-shadow: 0 1px 2px rgba(59, 130, 246, 0.15);
        }

        /* --- Answer Container Animation --- */
        .answer-container {
            display: grid;
            grid-template-rows: 0fr;
            opacity: 0;
            margin-top: 0;
            transition: grid-template-rows 0.4s ease-in-out, opacity 0.3s ease-in-out 0.1s, margin-top 0.4s ease-in-out;
        }
        .answer-container.answer-visible {
            grid-template-rows: 1fr;
            opacity: 1;
            margin-top: 0.75rem;
        }
        .answer-container > div {
            overflow: hidden;
        }

        /* --- Mobile-Specific Styles --- */
        @media (max-width: 768px) {
            body {
                font-size: 15px;
            }
            .page-container {
                padding: 15px;
                margin: 10px auto;
                border-radius: 8px;
            }
            .header {
                padding: 15px 0;
                gap: 10px;
                margin-bottom: 15px;
            }
            #theme-toggle-btn {
                right: 5px;
                padding: 0.4rem;
            }
            #theme-toggle-btn svg {
                width: 1.3rem;
                height: 1.3rem;
            }
            .header h1 {
                font-size: 2.5rem;
                top: -5px;
            }
            .header-img {
                height: 60px;
                width: 60px;
            }
            #lecture-tabs-wrapper {
                padding: 0 5px;
                padding-bottom: 10px;
                margin-bottom: 15px;
            }
            #lecture-tabs {
                gap: 8px;
                padding: 5px 1px;
            }
            #lecture-tabs button.lecture-tab-btn {
                font-size: 0.875rem;
                padding: 0.5rem 1rem;
            }
            #lecture-tabs-wrapper::before,
            #lecture-tabs-wrapper::after {
                width: 40px;
                bottom: 10px;
            }
            .section-title {
                padding: 3px 15px;
                border-radius: 12px;
                margin: 20px 0 15px 0;
            }
            .section-title h2 {
                font-size: 1.2rem;
            }
            .section-title i {
                font-size: 1.1em;
                margin-right: 0.5rem;
            }
            .question {
                padding: 15px;
                margin: 15px 0;
                border-radius: 5px;
            }
            .question p.font-semibold {
                font-size: 1em;
            }
            .explanation, .written-explanation {
                padding: 12px;
                border-radius: 6px;
            }
            .mcq-option {
                font-size: 0.85em;
                padding: 6px 10px;
                border-radius: 4px;
            }
            .explanation p, .written-explanation p {
                font-size: 0.85em;
            }
            .written-answer-label {
                font-size: 1em;
            }
            .show-answer-btn {
                font-size: 0.85em;
                padding: 5px 10px;
                border-radius: 12px;
                min-width: 100px;
            }
            .answer-container.answer-visible {
                margin-top: 0.6rem;
            }
        }
    `}</style>
);

// --- HELPER & CHILD COMPONENTS ---

const ThemeToggleButton = ({ theme, toggleTheme }) => {
    const isDark = theme === 'dark';
    return (
        <button
            type="button"
            id="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <div className="icon-wrapper">
                <svg style={{ display: isDark ? 'block' : 'none' }} className="sun-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                <svg style={{ display: isDark ? 'none' : 'block' }} className="moon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </div>
        </button>
    );
};

const Question = ({ questionData, type, lectureId, index }) => {
    const [isAnswerVisible, setAnswerVisible] = React.useState(false);
    const answerId = `answer-${type}-${lectureId}-${index}`;

    const toggleAnswer = () => {
        setAnswerVisible(prev => !prev);
    };

    return (
        <div className="question question-animate">
            {type === 'mcq' ? (
                <>
                    <p className="font-semibold">{questionData.q}</p>
                    <div className="mt-2 mb-2">
                        {questionData.o.map((option, i) => (
                            <div key={i} className="mcq-option">
                                {`${String.fromCharCode(97 + i)}) ${option}`}
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="written-question-container">
                    <p className="font-semibold">{questionData.q}</p>
                </div>
            )}

            <button
                type="button"
                className="show-answer-btn"
                onClick={toggleAnswer}
                aria-expanded={isAnswerVisible}
                aria-controls={answerId}
            >
                {isAnswerVisible ? 'Hide Answer' : 'Show Answer'}
            </button>

            <div
                id={answerId}
                className={`answer-container ${isAnswerVisible ? 'answer-visible' : ''}`}
                role="region"
                aria-hidden={!isAnswerVisible}
            >
                <div>
                    {type === 'mcq' ? (
                        <div className="explanation">
                            <p><strong>Answer:</strong> {questionData.a}</p>
                        </div>
                    ) : (
                        <>
                            <p className="written-answer-label">Answer:</p>
                            <div className="written-explanation">
                                <p dangerouslySetInnerHTML={{ __html: questionData.a }} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const LectureContent = ({ lecture }) => {
    const containerRef = React.useRef(null);

    React.useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        
        const questionsToAnimate = container.querySelectorAll('.question.question-animate');
        const baseDelay = 70; // ms

        questionsToAnimate.forEach((el, index) => {
            (el as HTMLElement).style.animationDelay = `${index * baseDelay}ms`;
            el.classList.add('stagger-fade-in');
        });
    }, [lecture]);

    if (!lecture) return null;

    return (
        <div ref={containerRef} className="lecture-content">
            {lecture.mcqs && lecture.mcqs.length > 0 && (
                <>
                    <div className="section-title">
                        <i className="fas fa-list-check"></i>
                        <h2 className="text-xl font-bold">{lecture.name} - MCQs:</h2>
                    </div>
                    {lecture.mcqs.map((mcq, index) => (
                        <Question key={`mcq-${index}`} questionData={mcq} type="mcq" lectureId={lecture.id} index={index} />
                    ))}
                </>
            )}
            {lecture.written && lecture.written.length > 0 && (
                <>
                    <div className="section-title mt-10">
                        <i className="fas fa-pencil"></i>
                        <h2 className="text-xl font-bold">{lecture.name} - Written Questions:</h2>
                    </div>
                    {lecture.written.map((wq, index) => (
                        <Question key={`written-${index}`} questionData={wq} type="written" lectureId={lecture.id} index={index} />
                    ))}
                </>
            )}
        </div>
    );
};


// --- MAIN APP COMPONENT ---

export default function App() {
    const [theme, setTheme] = React.useState('light');
    const [activeLectureId, setActiveLectureId] = React.useState(lecturesData[0]?.id);
    
    const tabsWrapperRef = React.useRef(null);
    const tabsContainerRef = React.useRef(null);

    // --- Dynamic Font & Icon Loading ---
    React.useEffect(() => {
        const fontLinks = [
            { id: 'font-awesome', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css' },
            { id: 'google-fonts-preconnect-1', href: 'https://fonts.googleapis.com', rel: 'preconnect' },
            { id: 'google-fonts-preconnect-2', href: 'https://fonts.gstatic.com', rel: 'preconnect', crossOrigin: 'anonymous' },
            { id: 'google-fonts-main', href: 'https://fonts.googleapis.com/css2?family=Coiny&family=Calistoga&display=swap' }
        ];

        fontLinks.forEach(linkInfo => {
            if (!document.getElementById(linkInfo.id)) {
                const link = document.createElement('link');
                link.id = linkInfo.id;
                link.rel = linkInfo.rel || 'stylesheet';
                link.href = linkInfo.href;
                if (linkInfo.crossOrigin) {
                    link.crossOrigin = 'anonymous';
                }
                document.head.appendChild(link);
            }
        });

        // Cleanup function to remove links when the component unmounts
        return () => {
            fontLinks.forEach(linkInfo => {
                const linkElement = document.getElementById(linkInfo.id);
                if (linkElement) {
                    document.head.removeChild(linkElement);
                }
            });
        };
    }, []); // Empty dependency array ensures this runs only once on mount


    const toggleTheme = React.useCallback(() => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    }, []);

    React.useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    React.useEffect(() => {
        const tabsContainer = tabsContainerRef.current;
        const tabsWrapper = tabsWrapperRef.current;
        if (!tabsContainer || !tabsWrapper) return;

        const checkTabOverflow = () => {
            requestAnimationFrame(() => {
                const { scrollLeft, scrollWidth, clientWidth } = tabsContainer;
                const tolerance = 2;
                tabsWrapper.classList.toggle('show-fade-left', scrollLeft > tolerance);
                tabsWrapper.classList.toggle('show-fade-right', scrollWidth - scrollLeft - clientWidth > tolerance);
            });
        };

        checkTabOverflow();
        tabsContainer.addEventListener('scroll', checkTabOverflow, { passive: true });
        window.addEventListener('resize', checkTabOverflow);
        const resizeObserver = new ResizeObserver(checkTabOverflow);
        resizeObserver.observe(tabsContainer);
        
        return () => {
            tabsContainer.removeEventListener('scroll', checkTabOverflow);
            window.removeEventListener('resize', checkTabOverflow);
            resizeObserver.disconnect();
        };
    }, []);
    
    const switchTab = (lectureId) => {
        setActiveLectureId(lectureId);
        const targetButton = tabsContainerRef.current?.querySelector(`button[data-lecture-id="${lectureId}"]`);
        targetButton?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    };

    const activeLecture = lecturesData.find(lec => lec.id === activeLectureId);

    return (
        <>
            <GlobalStyles />
            <div className="page-container">
                <div className="header">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/9027/9027706.png"
                        alt="GIT Icon"
                        className="header-img"
                        onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src = 'https://placehold.co/80x80/e0e0e0/333333?text=Icon'; }}
                    />
                    <h1>GIT</h1>
                    <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
                </div>

                <div id="lecture-tabs-wrapper" ref={tabsWrapperRef}>
                    <div id="lecture-tabs" ref={tabsContainerRef} role="tablist" aria-label="Lectures">
                        {lecturesData.map(lecture => (
                            <button
                                key={lecture.id}
                                type="button"
                                className={`lecture-tab-btn ${activeLectureId === lecture.id ? 'active' : ''}`}
                                onClick={() => switchTab(lecture.id)}
                                data-lecture-id={lecture.id}
                                role="tab"
                                aria-selected={activeLectureId === lecture.id}
                            >
                                {lecture.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div id="questions-container">
                    <div id="dynamic-question-area">
                        {activeLecture ? (
                            <LectureContent key={activeLecture.id} lecture={activeLecture} />
                        ) : (
                            <p className="p-4 text-center">No lectures available.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
