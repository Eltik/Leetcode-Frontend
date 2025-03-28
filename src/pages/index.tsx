import Head from "next/head"
import OutputArea from "~/components/output-area"
import Leaderboard from "~/components/leaderboard/Leaderboard";
import QuestionArea from "~/components/question-area";
import InputArea from "~/components/input-area";
import { useState, useEffect } from "react";

interface ProblemData {
  name: string;
  description: string;
  parameter: string;
  hints: string[];
  testcase: string;
  solution: string;
}

interface LeaderboardEntry {
  name: string;
  score: number;
  medal: string | null;
  position: number;
  highlight: boolean;
}

interface HTTPFETCHSTUFF {
  problemData: ProblemData | null;
  leaderboardData: LeaderboardEntry[];
}

const HomePage = ({ problemData, leaderboardData: initialLeaderboardData }: HTTPFETCHSTUFF) => {
    const [name, setName] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [isNameEntered, setIsNameEntered] = useState(false);
    const [leaderboardData, setLeaderboardData] = useState(initialLeaderboardData);

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
        const savedLanguage = localStorage.getItem('userLanguage');
        if (savedName) {
            setName(savedName);
            setIsNameEntered(true);
        }
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, []);

    const formatLeaderboardData = (data: LeaderboardEntry[]): LeaderboardEntry[] => {
        return data.map((entry, index) => ({
            ...entry,
            medal: index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : null,
            position: index + 1,
            highlight: entry.name === name
        }));
    };

    const fetchLeaderboard = async () => {
        console.log('Starting fetchLeaderboard...');
        try {
            const response = await fetch('https://backendtest-indol.vercel.app/api/leaderboard');
            const data = (await response.json()) as LeaderboardEntry[];
            setLeaderboardData(data);
            console.log('Leaderboard state updated');
        } catch (error) {
            console.error('Failed to fetch leaderboard:', error);
        }
    };

    useEffect(() => {
        if (isNameEntered) {
            void fetchLeaderboard();
            const interval = setInterval(() => {
                void fetchLeaderboard();
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [isNameEntered]);

    const handleSubmitName = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            localStorage.setItem('userName', name.trim());
            localStorage.setItem('userLanguage', language);
            setIsNameEntered(true);
        }
    };

    const handleSubmitCode = async (code: string): Promise<string> => {
        try {
            const response = await fetch('https://backendtest-indol.vercel.app/api/executor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    submission: code,
                    language: language
                }),
            });
            const data = await response.json() as { results: string };
            return data.results;
        } catch (error) {
            console.error('Failed to submit code:', error);
            return '';
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
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-[#363636] text-white border border-[#4C4C4C] 
                                       cursor-pointer appearance-none hover:border-[#6C6C6C] transition-colors duration-200
                                       focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.75rem center',
                                backgroundSize: '1.25rem',
                                paddingRight: '2.5rem'
                            }}
                        >
                            <option value="javascript" className="bg-[#363636]">Javascript</option>
                            <option value="python" className="bg-[#363636]">Python</option>
                            <option value="java" className="bg-[#363636]">Java</option>
                            <option value="c++" className="bg-[#363636]">C++</option>
                        </select>
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
                    <div className="text-center mb-8">
                        <h1 className="text-4xl text-white font-bold">
                            Welcome {name}! 🚀
                        </h1>
                        <div className="inline-block bg-gradient-to-r from-[#2F2F2F] to-[#363636] px-6 py-2 rounded-full mt-4 border border-[#4C4C4C] shadow-lg hover:shadow-xl transition-all duration-300">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-green-500 font-bold tracking-wider">
                                CODING IN {language.toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <QuestionArea problemData={problemData} />
                        <div className="mt-6">
                            <InputArea 
                                problemData={problemData} 
                                name={name} 
                                onSolutionSuccess={() => {
                                    console.log("onSolutionSuccess called");
                                    void updateLeaderboard(name);
                                    void fetchLeaderboard();
                                }}
                                onSubmitCode={handleSubmitCode}
                            />
                        </div>
                        <OutputArea hints={problemData?.hints ?? []}/>
                    </div>
                </div>
            </main>
        </>
    );
};

export const getServerSideProps = async () => {
    try {
        const [problemResponse, leaderboardResponse] = await Promise.all([
            fetch('https://backendtest-indol.vercel.app/api/exampleProblem'),
            fetch('https://backendtest-indol.vercel.app/api/leaderboard')
        ]);

        const problemData = await problemResponse.json() as { exampleProblem: ProblemData };
        const leaderboardData = await leaderboardResponse.json() as LeaderboardEntry[];
        
        return {
            props: {
                problemData: problemData.exampleProblem,
                leaderboardData
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
};

export default HomePage;
