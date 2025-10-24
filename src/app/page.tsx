'use client';
import React, { useEffect } from 'react';
import { lecturesData } from '@/lib/data';
import { ExamContainer } from '@/components/exam';
import { useFirebase } from '@/firebase';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';

// --- MAIN APP COMPONENT ---
export default function App() {
    const { auth, user, isUserLoading } = useFirebase();

    useEffect(() => {
        if (!isUserLoading && !user && auth) {
            initiateAnonymousSignIn(auth);
        }
    }, [isUserLoading, user, auth]);

    if (isUserLoading) {
        return <div className="flex items-center justify-center h-screen"><p>Loading...</p></div>;
    }

    return (
        <ExamContainer lectures={lecturesData} />
    );
}
