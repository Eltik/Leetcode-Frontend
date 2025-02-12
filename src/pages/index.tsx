import React from 'react';
import Link from 'next/link';

const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-stone-900">
            <h1 className="text-3xl font-bold text-white">Welcome to the Home Page</h1>
            <Link href="/leaderboard" className="mt-5 text-lg text-blue-500 hover:underline">
                Go to Leaderboard
            </Link>
        </div>
    );
};

export default HomePage;
