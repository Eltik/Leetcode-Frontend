import Head from 'next/head';
import Leaderboard from "~/components/leaderboard/leaderboard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Leaderboard</title>
        <meta name="description" content="Leaderboard page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c] p-4">
        <h1 className="text-4xl font-bold text-white mb-8 mt-8">Leaderboard</h1>
        <body>
          <p className="test">hi</p>
          <p id='nottesting'>asdfasfsdfsdf</p>
        </body>
        <Leaderboard />
      </main>
    </>
  );
}

