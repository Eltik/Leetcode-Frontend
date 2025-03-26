import React from 'react';

interface LeaderboardProps {
    name: string;
    leaderboardData: Array<{
        name: string;
        score: number;
        medal: string | null;
        position: number;
        highlight: boolean;
    }>;
}

const Leaderboard = ({ name, leaderboardData }: LeaderboardProps) => {
    return (
        <div className="text-white">
            <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
            <div className="space-y-2">
                {leaderboardData.map((entry) => (
                    <div
                        key={entry.name}
                        className={`p-2 rounded ${
                            entry.highlight
                                ? 'bg-blue-500/20 border border-blue-500'
                                : 'bg-gray-800'
                        } ${
                            entry.position === 1
                                ? 'bg-yellow-500/20'
                                : entry.position === 2
                                ? 'bg-gray-400/20'
                                : entry.position === 3
                                ? 'bg-orange-700/20'
                                : 'bg-black'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-6">{entry.medal || entry.position}</span>
                                <span>{entry.name}</span>
                            </div>
                            <span>{entry.score}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;