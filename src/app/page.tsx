'use client';
import React, { useEffect } from 'react';
import { lecturesData } from '@/lib/data';
import { ExamContainer } from '@/components/exam';
import { useFirebase } from '@/firebase';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { Button } from '@/components/ui/button';

// --- MAIN APP COMPONENT ---
export default function App() {
    const { auth, user, isUserLoading } = useFirebase();

    useEffect(() => {
        // Automatically sign in the user anonymously if they are not logged in
        if (!isUserLoading && !user) {
            initiateAnonymousSignIn(auth);
        }
    }, [isUserLoading, user, auth]);

    if (isUserLoading) {
        return <div className="flex items-center justify-center h-screen"><p>Loading...</p></div>;
    }

    // While waiting for automatic sign-in or if it fails, show a login button
    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="mb-4">Please log in to continue.</p>
                <Button onClick={() => initiateAnonymousSignIn(auth)}>
                    Sign in Anonymously
                </Button>
            </div>
        );
    }

    return (
        <ExamContainer lectures={lecturesData} />
    );
}
