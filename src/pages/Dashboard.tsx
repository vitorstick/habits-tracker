import React from 'react';
import MobileLayout from '../layouts/MobileLayout';
import HabitNode from '../components/habit/HabitNode';
import { Habit } from '../types';
import { Droplets, Dumbbell, BookOpen, Moon, Sun, Wind } from 'lucide-react';
import ProgressRing from '../components/ui/ProgressRing';
import StreakFlame from '../components/ui/StreakFlame';

const Dashboard: React.FC = () => {
    // Mock habits with a winding path structure
    const habits: Habit[] = [
        { id: 1, title: 'Morning Water', icon: <Droplets size={32} />, status: 'completed' },
        { id: 2, title: 'Read 10 Pages', icon: <BookOpen size={32} />, status: 'completed' },
        { id: 3, title: 'Meditation', icon: <Wind size={32} />, status: 'pending' },
        { id: 4, title: 'Exercise', icon: <Dumbbell size={32} />, status: 'pending' },
        { id: 5, title: 'Journaling', icon: <Sun size={32} />, status: 'locked' },
        { id: 6, title: 'Sleep Well', icon: <Moon size={32} />, status: 'locked' },
    ];

    // Offsets for the zigzag path
    const getOffsetClass = (index: number) => {
        const cycle = index % 4;
        if (cycle === 0) return "translate-x-0";
        if (cycle === 1) return "translate-x-12";
        if (cycle === 2) return "translate-x-0";
        return "-translate-x-12";
    };

    return (
        <MobileLayout>
            {/* Sticky Header */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b-2 border-brand-gray px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <ProgressRing progress={66} size={40} strokeWidth={4} />
                    <div>
                        <p className="text-[10px] font-black text-brand-gray-dark uppercase tracking-widest leading-none">Overall</p>
                        <p className="text-sm font-extrabold text-brand-text">Level 4</p>
                    </div>
                </div>
                <StreakFlame count={12} isActive={true} />
            </header>

            {/* The Winding Path */}
            <div className="py-12 flex flex-col items-center gap-16 relative">
                {/* SVG Path Background (Optional visual connecting line) */}
                <div className="absolute top-0 bottom-0 w-2 bg-brand-gray/20 -z-10 rounded-full" />

                {habits.map((habit, index) => (
                    <div key={habit.id} className={`transition-transform duration-500 ${getOffsetClass(index)}`}>
                        <HabitNode
                            habit={habit}
                            onClick={(h) => console.log('Habit clicked:', h.title)}
                        />
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-max">
                            <span className={`text-[10px] font-black uppercase tracking-wider ${habit.status === 'locked' ? 'text-brand-gray-dark/50' : 'text-brand-text'
                                }`}>
                                {habit.title}
                            </span>
                        </div>
                    </div>
                ))}

                {/* Achievement Cup at the end */}
                <div className="mt-8 flex flex-col items-center opacity-30 grayscale saturate-0">
                    <div className="w-24 h-24 rounded-full bg-brand-orange/20 flex items-center justify-center">
                        <span className="text-4xl">🏆</span>
                    </div>
                    <p className="mt-2 text-xs font-black text-brand-gray-dark uppercase tracking-widest">End of Week</p>
                </div>
            </div>
        </MobileLayout>
    );
};

export default Dashboard;
