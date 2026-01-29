import React from 'react';
import MobileLayout from '../layouts/MobileLayout';
import { useStreakData } from '../hooks/useStreakData';
import { useMonthlyProgress } from '../hooks/useMonthlyProgress';
import { useHabits } from '../hooks/useHabits';
import { Settings, Award, Zap } from 'lucide-react';

const Profile: React.FC = () => {
    const { streak } = useStreakData();
    const { level } = useMonthlyProgress();
    const { data: habits = [] } = useHabits();

    // Calculate total completions from all time
    const totalCompletions = habits.reduce((acc, habit) =>
        acc + (habit.completedDates?.length || 0), 0
    );

    return (
        <MobileLayout>
            <div className="pb-24">
                {/* Header Profile Section */}
                <div className="bg-brand-blue text-white px-6 pt-8 pb-16 rounded-b-[3rem] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-20">
                        <Settings size={32} />
                    </div>

                    <div className="flex flex-col items-center gap-4 relative z-10">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl border-4 border-white/20">
                            😎
                        </div>
                        <div className="text-center">
                            <h1 className="text-2xl font-black">Habit Hero</h1>
                            <p className="font-bold opacity-80">Level {level} Explorer</p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="px-6 -mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl border-2 border-brand-gray shadow-sm flex flex-col items-center gap-2">
                        <div className="p-2 bg-brand-orange/10 rounded-xl text-brand-orange">
                            <Zap size={24} fill="currentColor" />
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-black text-brand-text">{streak}</p>
                            <p className="text-xs font-bold text-brand-gray-dark uppercase">Day Streak</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border-2 border-brand-gray shadow-sm flex flex-col items-center gap-2">
                        <div className="p-2 bg-brand-blue/10 rounded-xl text-brand-blue">
                            <Award size={24} />
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-black text-brand-text">{totalCompletions}</p>
                            <p className="text-xs font-bold text-brand-gray-dark uppercase">Total Done</p>
                        </div>
                    </div>
                </div>

                {/* Achievements Section */}
                <div className="p-6 mt-4">
                    <h2 className="text-xl font-black text-brand-text mb-4">Achievements</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { icon: '🚀', title: 'First Steps', desc: 'Log your first habit', unlocked: totalCompletions > 0 },
                            { icon: '🔥', title: '3 Day Streak', desc: 'Reach a 3 day streak', unlocked: streak >= 3 },
                            { icon: '🏆', title: 'Level 5', desc: 'Reach Level 5', unlocked: level >= 5 },
                            { icon: '📅', title: 'Week Warrior', desc: 'Complete 7 days', unlocked: totalCompletions >= 7 },
                            { icon: '⭐', title: 'Perfection', desc: 'Perfect week', unlocked: false },
                            { icon: '👑', title: 'Habit Master', desc: '100 Day Streak', unlocked: false },
                        ].map((badge, i) => (
                            <div key={i} className={`flex flex-col items-center gap-2 text-center ${badge.unlocked ? 'opacity-100' : 'opacity-40 grayscale'}`}>
                                <div className="w-16 h-16 bg-brand-gray-light rounded-2xl flex items-center justify-center text-2xl border-b-4 border-brand-gray">
                                    {badge.icon}
                                </div>
                                <div>
                                    <p className="text-xs font-black text-brand-text leading-tight">{badge.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MobileLayout>
    );
};

export default Profile;
