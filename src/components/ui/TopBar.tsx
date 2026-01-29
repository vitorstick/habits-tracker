import React from 'react';
import ProgressRing from './ProgressRing';
import StreakFlame from './StreakFlame';
import { useStreakData } from '../../hooks/useStreakData';
import { useMonthlyProgress } from '../../hooks/useMonthlyProgress';

const TopBar: React.FC = () => {
    const { streak, isActive } = useStreakData();
    const { progress, level } = useMonthlyProgress();

    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b-2 border-brand-gray px-4 py-3 flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center gap-3">
                <ProgressRing progress={progress} size={40} strokeWidth={4} />
                <div>
                    <p className="text-[10px] font-black text-brand-gray-dark uppercase tracking-widest leading-none">Overall</p>
                    <p className="text-sm font-extrabold text-brand-text">Level {level}</p>
                </div>
            </div>
            <StreakFlame count={streak} isActive={isActive} />
        </header>
    );
};

export default TopBar;
