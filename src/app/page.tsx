'use client';
import React from 'react';
import { lecturesData } from '@/lib/data';
import { ExamContainer } from '@/components/exam';

// --- MAIN APP COMPONENT ---
export default function App() {
    // The ExamContainer is now self-contained.
    // You pass the lecture data to it as a prop.
    return (
        <ExamContainer lectures={lecturesData} />
    );
}
