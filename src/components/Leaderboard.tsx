import React from 'react';

const Leaderboard = () => {
    const data = [
        { rank: 1, name: 'Alice', currentPoints: 50, totalPoints: 100 },
        { rank: 2, name: 'Bob', currentPoints: 40, totalPoints: 90 },
        { rank: 3, name: 'Charlie', currentPoints: 30, totalPoints: 80 },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center bg-stone-900">
            <div className="bg-gray-800 text-white text-sm rounded-lg p-10 border border-white w-auto max-w-full">
                <h1 className="text-2xl font-bold">Leaderboard</h1>
                <br />
                <hr className="border-2 rounded-full" />
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
                            <tr key={entry.rank} className="bg-[#3C3C3C] rounded-md">
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