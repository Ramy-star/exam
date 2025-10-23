'use client';
import React from 'react';
import { lecturesData } from '@/lib/data';
import { QuizContainer } from '@/components/quiz-tabs';

// --- MAIN APP COMPONENT ---
export default function App() {
    // The QuizContainer is now self-contained.
    // You pass the lecture data to it as a prop.
    return (
        <QuizContainer lectures={lecturesData} />
    );
}
