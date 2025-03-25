import Head from "next/head"
import OutputArea from "~/components/output-area"
import { ScrollAreaHorizontalDemo, TabsDemo } from "~/components/output-area/testing";
import Leaderboard from "~/components/leaderboard/Leaderboard";
import QuestionArea from "~/components/question-area";
import InputArea from "~/components/input-area";
import { useState } from "react";

const HomePage = ({ problemData }) => {
    const [name, setName] = useState("");
    const [isNameEntered, setIsNameEntered] = useState(false);

    const handleSubmitName = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
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
                    <Leaderboard name={name} />
                </div>
                <div className="mt-4 mb-8">
                    <h1 className="text-2xl text-white font-bold mb-4 text-center">Welcome {name}!</h1>
                    <QuestionArea problemData={problemData} />
                    <InputArea problemData={problemData} name={name} />
                </div>
            </main>
        </>
    );
};

export async function getServerSideProps() {
    try {
        const response = await fetch('https://backendtest-indol.vercel.app/api/exampleProblem');
        const data = await response.json();
        
        return {
            props: {
                problemData: data.exampleProblem
            }
        };
    } catch (error) {
        console.error('Failed to fetch problem data:', error);
        return {
            props: {
                problemData: null
            }
        };
    }
}

export default HomePage;
