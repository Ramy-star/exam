'use client';
import React from 'react';
import { lecturesData } from '@/lib/data';
import { QuizContainer } from '@/components/quiz-tabs';

// --- MAIN APP COMPONENT ---
export default function App() {
    return (
        <div className="page-container">
            <div className="header">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/9027/9027706.png"
                    alt="GIT Icon"
                    className="header-img"
                    onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src = 'https://placehold.co/80x80/e0e0e0/333333?text=Icon'; }}
                />
                <h1>GIT</h1>
            </div>
            <QuizContainer lectures={lecturesData} />
        </div>
    );
}
