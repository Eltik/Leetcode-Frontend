import Head from "next/head"
import OutputArea from "~/components/output-area"
import { ScrollAreaHorizontalDemo, TabsDemo } from "~/components/output-area/testing";
import Leaderboard from "~/components/leaderboard/Leaderboard";
import QuestionArea from "~/components/question-area";
import InputArea from "~/components/input-area";
import { useState, useEffect } from "react";

// Add these interfaces above the HomePage component
interface ProblemData {
  name: string;
  description: string;
  parameter: string;
  providedCode: string;
  testcase: string;
  solution: any;
}

interface HTTPFETCHSTUFF {
  problemData: ProblemData | null;
  leaderboardData: any[];
}

const HomePage = ({ problemData, leaderboardData }: HTTPFETCHSTUFF) => {
    const [name, setName] = useState('');
    const [isNameEntered, setIsNameEntered] = useState(false);

    const updateLeaderboard = async (playerName: string) => {
        try {
            await fetch('https://backendtest-indol.vercel.app/api/leaderboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: playerName }),
            });
        } catch (error) {
            console.error('Failed to update leaderboard:', error);
        }
    };

    useEffect(() => {
        const savedName = localStorage.getItem('userName');
        if (savedName) {
            setName(savedName);
            setIsNameEntered(true);
        }
    }, []);

    const handleSubmitName = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            // Save name to localStorage
            localStorage.setItem('userName', name.trim());
            setIsNameEntered(true);
        }
    };

    if (!isNameEntered) {
        return (
            <>
                <Head>
                    <title>Leetcode Club</title>
                    <meta name="description" content="App for practicing Leetcode problems" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className="flex min-h-screen items-center justify-center bg-[#3C3C3C]">
                    <form onSubmit={handleSubmitName} className="flex flex-col items-center gap-4">
                        <h1 className="text-2xl text-white font-bold mb-4">Welcome to Leetcode Club</h1>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="px-4 py-2 rounded-md"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                            Enter
                        </button>
                    </form>
                </main>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Leetcode Club</title>
                <meta name="description" content="App for practicing Leetcode problems" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen items-start justify-center bg-[#3C3C3C]">
                <div className="flex-col mt-10">
                    <Leaderboard name={name} leaderboardData={leaderboardData} />
                </div>
                <div className="mt-4 mb-8">
                    <h1 className="text-2xl text-white font-bold mb-4 text-center">Welcome {name}!</h1>
                    <QuestionArea problemData={problemData} />
                    <InputArea 
                        problemData={problemData} 
                        name={name} 
                        onSolutionSuccess={() => updateLeaderboard(name)}
                    />
                </div>
            </main>
        </>
    );
};

export async function getServerSideProps() {
    try {
        const [problemResponse, leaderboardResponse] = await Promise.all([
            fetch('https://backendtest-indol.vercel.app/api/exampleProblem'),
            fetch('https://backendtest-indol.vercel.app/api/leaderboard')
        ]);

        const [problemData, leaderboardData] = await Promise.all([
            problemResponse.json(),
            leaderboardResponse.json()
        ]);
        
        return {
            props: {
                problemData: problemData.exampleProblem,
                leaderboardData: leaderboardData
            }
        };
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return {
            props: {
                problemData: null,
                leaderboardData: []
            }
        };
    }
}

export default HomePage;
