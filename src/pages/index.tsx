import Head from "next/head"
import OutputArea from "~/components/output-area"
import { ScrollAreaHorizontalDemo, TabsDemo } from "~/components/output-area/testing";
import Leaderboard from "~/components/leaderboard/Leaderboard";
import QuestionArea from "~/components/question-area";

const HomePage = () => {
    return (

        <>
            <Head>
                <title>Create T3 App</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <OutputArea data={
                    "yeahgytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagytagyta sigma"
                } />
                <Leaderboard />
                <QuestionArea />

                <div className="bg-red">
                    <p>I like text</p>
                </div>
            </main>
        </>

    );
};

export default HomePage;
