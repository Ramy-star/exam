'use client';
import React from 'react';
import { lecturesData } from '@/lib/data';
import { QuizContainer } from '@/components/quiz-tabs';

// --- MAIN APP COMPONENT ---
export default function App() {
    return (
        <QuizContainer lectures={lecturesData} />
    );
}
