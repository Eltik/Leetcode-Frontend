import React from 'react';

const Leaderboard = () => {
    const data = [
        { rank: 1, name: 'Alice' },
        { rank: 2, name: 'Bob' },
        { rank: 3, name: 'Charlie' },
        { rank: 4, name: 'Diana' },
        { rank: 5, name: 'Eve' },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="bg-[#2F2F2F] text-white text-sm rounded-md p-5 border border-[#3C3C3C] w-auto max-w-full overflow-auto" style={{ minHeight: '200px' }}>
                <h1 className="text-2xl font-bold">Leaderboard</h1>
                <br />
                <hr className="border-2 rounded-full" />
                <br />
                <table className="w-full">
                    <thead>
                        <tr className="text-[#B7B7B7]">
                            <th className="p-3">Rank</th>
                            <th className="p-3">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((entry) => (
                            <tr key={entry.rank} className="bg-[#3C3C3C] rounded-md">
                                <td className="p-3">{entry.rank}</td>
                                <td className="p-3">{entry.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;