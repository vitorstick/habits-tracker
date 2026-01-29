import React from 'react';
import ProgressRing from './ProgressRing';
import StreakFlame from './StreakFlame';

const TopBar: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b-2 border-brand-gray px-4 py-3 flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center gap-3">
                <ProgressRing progress={66} size={40} strokeWidth={4} />
                <div>
                    <p className="text-[10px] font-black text-brand-gray-dark uppercase tracking-widest leading-none">Overall</p>
                    <p className="text-sm font-extrabold text-brand-text">Level 4</p>
                </div>
            </div>
            <StreakFlame count={12} isActive={true} />
        </header>
    );
};

export default TopBar;
