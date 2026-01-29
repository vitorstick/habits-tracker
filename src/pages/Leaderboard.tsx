import React from 'react';
import MobileLayout from '../layouts/MobileLayout';

const Leaderboard: React.FC = () => {
    return (
        <MobileLayout>
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 opacity-50">
                <span className="text-6xl mb-4">🏆</span>
                <h1 className="text-2xl font-black text-brand-gray-dark mb-2">Leaderboard</h1>
                <p className="text-brand-text">Coming Soon</p>
            </div>
        </MobileLayout>
    );
};

export default Leaderboard;
