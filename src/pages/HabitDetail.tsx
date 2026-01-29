import React from 'react';
import { useParams } from 'react-router-dom';
import MobileLayout from '../layouts/MobileLayout';

const HabitDetail: React.FC = () => {
    const { id } = useParams();

    return (
        <MobileLayout>
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 opacity-50">
                <span className="text-6xl mb-4">📝</span>
                <h1 className="text-2xl font-black text-brand-gray-dark mb-2">Habit {id}</h1>
                <p className="text-brand-text">Details Coming Soon</p>
            </div>
        </MobileLayout>
    );
};

export default HabitDetail;
