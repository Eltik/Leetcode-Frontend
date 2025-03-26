import Head from "next/head"
import OutputArea from "~/components/output-area"
import { ScrollAreaHorizontalDemo, TabsDemo } from "~/components/output-area/testing";
import Leaderboard from "~/components/leaderboard/Leaderboard";
import QuestionArea from "~/components/question-area";
import InputArea from "~/components/input-area";
import { useState, useEffect } from "react";

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

const HomePage = ({ problemData, leaderboardData: initialLeaderboardData }: HTTPFETCHSTUFF) => {
    const [name, setName] = useState('');
    const [isNameEntered, setIsNameEntered] = useState(false);
    const [leaderboardData, setLeaderboardData] = useState(initialLeaderboardData);

    const formatLeaderboardData = (data: any[]) => {
        return data.map((entry, index) => ({
            ...entry,
            medal: index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : null,
            position: index + 1,
            highlight: entry.name === name
        }));
    };

    const fetchLeaderboard = async () => {
        try {
            const response = await fetch('https://backendtest-indol.vercel.app/api/leaderboard');
            const data = await response.json();
            setLeaderboardData(data);
        } catch (error) {
            console.error('Failed to fetch leaderboard:', error);
        }
    };

    useEffect(() => {
        if (isNameEntered) {
            fetchLeaderboard();
            const interval = setInterval(fetchLeaderboard, 5000);
            return () => clearInterval(interval);
        }
    }, [isNameEntered]);

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
                    <form onSubmit={handleSubmitName} className="flex flex-col items-center gap-4 bg-[#2F2F2F] p-8 rounded-lg border border-[#4C4C4C]">
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
            <main className="flex min-h-screen bg-[#3C3C3C]">
                {/* Fixed Leaderboard */}
                <div className="fixed left-0 top-0 h-screen w-80 p-6 bg-[#2F2F2F] border-r border-[#4C4C4C]">
                    <Leaderboard 
                        name={name} 
                        leaderboardData={formatLeaderboardData(leaderboardData)} 
                    />
                </div>
                
                {/* Main Content Area */}
                <div className="flex-1 ml-80 p-8 relative">
                    <h1 className="text-4xl text-white font-bold mb-8 text-center">
                        Welcome {name}! 🚀
                    </h1>
                    <div className="max-w-4xl mx-auto">
                        <QuestionArea problemData={problemData} />
                        <div className="mt-6">
                            <InputArea 
                                problemData={problemData} 
                                name={name} 
                                onSolutionSuccess={() => fetchLeaderboard()}
                            />
                        </div>
                        <OutputArea hints={[]}/>
                    </div>
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
