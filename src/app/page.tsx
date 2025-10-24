'use client';
import React from 'react';
import { lecturesData } from '@/lib/data';
import { ExamContainer } from '@/components/exam';
import { useFirebase } from '@/firebase';

// --- MAIN APP COMPONENT ---
export default function App() {
    const { user, isUserLoading } = useFirebase();

    if (isUserLoading) {
        return <div className="flex items-center justify-center h-screen"><p>Loading...</p></div>;
    }

    // Only render the exam container if a user is logged in.
    // Your app should handle redirecting to a login page if the user is not authenticated.
    if (!user) {
        return <div className="flex items-center justify-center h-screen"><p>Please log in to continue.</p></div>;
    }

    return (
        <ExamContainer lectures={lecturesData} />
    );
}
