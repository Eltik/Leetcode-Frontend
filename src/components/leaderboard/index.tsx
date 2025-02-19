import React from "react";

const Leaderboard = () => {
    const data = [
        { rank: 1, name: "Alice", currentPoints: 50, totalPoints: 100 },
        { rank: 2, name: "Bob", currentPoints: 40, totalPoints: 90 },
        { rank: 3, name: "Charlie", currentPoints: 30, totalPoints: 80 },
        { rank: 4, name: "Diana", currentPoints: 20, totalPoints: 70 },
        { rank: 5, name: "Eve", currentPoints: 10, totalPoints: 60 },
    ];

    return (
        <div className="flex min-h-screen flex-col items-center">
            <div className="w-auto max-w-full overflow-auto rounded-lg border border-white bg-gray-800 p-10 text-sm text-white" style={{ minHeight: "200px" }}>
                <h1 className="text-2xl font-bold">Leaderboard</h1>
                <br />
                <hr className="rounded-full border-2" />
                <br />
                <table className="w-full">
                    <thead>
                        <tr className="text-[#B7B7B7]">
                            <th className="p-3">Rank</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Current Points</th>
                            <th className="p-3">Total Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((entry) => (
                            <tr key={entry.rank} className="rounded-md bg-gray-700">
                                <td className="p-3">{entry.rank}</td>
                                <td className="p-3">{entry.name}</td>
                                <td className="p-3">{entry.currentPoints}</td>
                                <td className="p-3">{entry.totalPoints}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
