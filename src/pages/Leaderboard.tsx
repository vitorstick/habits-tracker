import React from 'react';
import MobileLayout from '../layouts/MobileLayout';
import { Trophy, Flame } from 'lucide-react';
import { cn } from '../lib/utils';
import { useStreakData } from '../hooks/useStreakData';
import { useMonthlyProgress } from '../hooks/useMonthlyProgress';

interface LeaderboardUser {
    id: number;
    name: string;
    xp: number;
    streak: number;
    avatar?: string;
    isCurrentUser?: boolean;
}

const MOCK_FRIENDS: LeaderboardUser[] = [
    { id: 2, name: 'Alice', xp: 4500, streak: 15, avatar: '👩‍🦰' },
    { id: 3, name: 'Bob', xp: 3200, streak: 8, avatar: '👨‍🦱' },
    { id: 4, name: 'Charlie', xp: 6100, streak: 21, avatar: '👵' },
    { id: 5, name: 'David', xp: 2800, streak: 3, avatar: '🧔' },
];

const Leaderboard: React.FC = () => {
    const { streak } = useStreakData();
    const { level } = useMonthlyProgress();

    // Construct current user object from real stats
    const currentUser: LeaderboardUser = {
        id: 1,
        name: 'You',
        xp: level * 1000 + (streak * 100), // Simplified XP calculation
        streak: streak,
        avatar: '😎',
        isCurrentUser: true
    };

    // Combine and sort
    const allUsers = [...MOCK_FRIENDS, currentUser].sort((a, b) => b.xp - a.xp);

    return (
        <MobileLayout>
            <div className="p-6 pb-24">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-black text-brand-text mb-2">Leaderboard</h1>
                    <p className="text-brand-gray-dark font-bold">This Week's Top Heroes</p>
                </div>

                <div className="flex flex-col gap-4">
                    {allUsers.map((user, index) => (
                        <div
                            key={user.id}
                            className={cn(
                                "flex items-center gap-4 p-4 rounded-2xl border-2 transition-transform",
                                user.isCurrentUser
                                    ? "bg-brand-blue/10 border-brand-blue scale-105 shadow-lg"
                                    : "bg-white border-brand-gray"
                            )}
                        >
                            {/* Rank */}
                            <div className="w-8 flex flex-col items-center justify-center shrink-0">
                                {index < 3 ? (
                                    <Trophy
                                        size={24}
                                        className={cn(
                                            index === 0 ? "text-yellow-500" :
                                                index === 1 ? "text-gray-400" :
                                                    "text-orange-400"
                                        )}
                                        fill="currentColor"
                                    />
                                ) : (
                                    <span className="text-lg font-black text-brand-gray-dark">{index + 1}</span>
                                )}
                            </div>

                            {/* Avatar */}
                            <div className="w-12 h-12 rounded-full bg-brand-gray-light flex items-center justify-center text-2xl border-2 border-brand-gray-light">
                                {user.avatar}
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <h3 className={cn(
                                    "font-black text-base",
                                    user.isCurrentUser ? "text-brand-blue" : "text-brand-text"
                                )}>
                                    {user.name}
                                </h3>
                                <div className="flex items-center gap-1 text-xs font-bold text-brand-gray-dark">
                                    <span>{user.xp} XP</span>
                                </div>
                            </div>

                            {/* Streak Badge */}
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-1 text-brand-orange">
                                    <Flame size={16} fill="currentColor" />
                                    <span className="font-black">{user.streak}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MobileLayout>
    );
};

export default Leaderboard;
