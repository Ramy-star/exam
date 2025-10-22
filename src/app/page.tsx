'use client';
import React, { useState } from 'react';
import { lecturesData } from '@/lib/data';
import { QuizContainer } from '@/components/quiz-tabs';
import type { Lecture } from '@/lib/types';

// --- STYLES FOR LECTURE SELECTION ---
const SelectionStyles = () => (
    <style>{`
        .lecture-selection-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 80vh;
            text-align: center;
            animation: fadeIn 0.5s ease-out;
        }
        .lecture-selection-container h2 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: #1f2937;
        }
        .lecture-scroll-container {
            display: flex;
            overflow-x: auto;
            padding: 1.5rem 0;
            width: 100%;
            scrollbar-width: thin;
            scrollbar-color: #3b82f6 #e5e7eb;
        }
        .lecture-scroll-container::-webkit-scrollbar {
            height: 8px;
        }
        .lecture-scroll-container::-webkit-scrollbar-track {
            background: #e5e7eb;
            border-radius: 10px;
        }
        .lecture-scroll-container::-webkit-scrollbar-thumb {
            background-color: #3b82f6;
            border-radius: 10px;
        }
        .lecture-btn {
            flex: 0 0 auto;
            background-color: #ef4444; /* Red button */
            color: white;
            padding: 1rem 2rem;
            font-size: 1.1rem;
            font-weight: 600;
            border-radius: 50px;
            border: none;
            cursor: pointer;
            margin: 0 10px;
            transition: transform 0.2s, box-shadow 0.2s;
            box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2);
        }
        .lecture-btn:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `}</style>
);


// --- MAIN APP COMPONENT ---
export default function App() {
    const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);

    const handleSelectLecture = (lecture: Lecture) => {
        setSelectedLecture(lecture);
    };

    const handleExit = () => {
        setSelectedLecture(null);
    };

    if (!selectedLecture) {
        return (
            <>
                <SelectionStyles />
                <div className="page-container">
                    <div className="lecture-selection-container">
                        <h2>Choose a Lecture to Begin</h2>
                        <div className="lecture-scroll-container">
                            {lecturesData.map(lecture => (
                                <button
                                    key={lecture.id}
                                    className="lecture-btn"
                                    onClick={() => handleSelectLecture(lecture)}
                                >
                                    {lecture.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="page-container">
            <QuizContainer lectures={lecturesData} activeLectureId={selectedLecture.id} onExit={handleExit} />
        </div>
    );
}
