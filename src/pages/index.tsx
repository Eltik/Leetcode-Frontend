import Head from "next/head"
import OutputArea from "~/components/output-area"
import { ScrollAreaHorizontalDemo, TabsDemo } from "~/components/output-area/testing";
import Leaderboard from "~/components/leaderboard/Leaderboard";
import QuestionArea from "~/components/question-area";
import InputArea from "~/components/input-area";

const HomePage = ({ problemData }) => {
    return (
        <>
            <Head>
                <title>Leetcode Club</title>
                <meta name="description" content="App for practicing Leetcode problems" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen items-start justify-center bg-[#3C3C3C]">
                <div className="flex-col mt-4">
                    <Leaderboard />
                </div>
                <div className="mt-4">
                    <QuestionArea problemData={problemData} />
                </div>
                <div className="mt-4">
                    {console.log('problemData:', problemData)}
                    <InputArea problemData={problemData}/>
                    <OutputArea data={""} />
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
