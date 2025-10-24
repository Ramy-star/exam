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
        if (!isUserLoading && !user) {
            initiateAnonymousSignIn(auth);
        }
    }, [isUserLoading, user, auth]);

    if (isUserLoading) {
        return <div>Loading...</div>;
    }

    return (
        <ExamContainer lectures={lecturesData} />
    );
}

    