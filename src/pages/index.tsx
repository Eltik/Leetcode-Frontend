import Head from "next/head";
import { useState } from "react";
import CodeEditor from "~/components/code-editor";
import QuestionArea from "~/components/question-area";
import OutputArea from "~/components/output-area";
import Leaderboard from "~/components/leaderboard";

export default function Home() {
    const [outputData, setOutputData] = useState("");

    const handleCodeRun = (output: string) => {
        setOutputData(output);
    };

    return (
        <>
            <Head>
                <title>LeetCode Frontend</title>
                <meta name="description" content="LeetCode Frontend Clone" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="">
                <div className="grid h-screen grid-cols-12 gap-4 p-4">
                    {/* Left side: Question and Leaderboard */}
                    <div className="col-span-4 flex flex-col gap-4">
                        <div className="h-2/3 overflow-auto">
                            <QuestionArea />
                        </div>
                        <div className="h-1/3 overflow-auto">
                            <Leaderboard />
                        </div>
                    </div>

                    {/* Right side: Code Editor and Output */}
                    <div className="col-span-8 flex flex-col gap-4">
                        <div className="h-2/3">
                            <CodeEditor onRun={handleCodeRun} />
                        </div>
                        <div className="h-1/3">
                            <OutputArea data={outputData} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
