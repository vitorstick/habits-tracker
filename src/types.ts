import React from 'react';

export interface Habit {
    id: string | number;
    title: string;
    icon?: React.ReactNode;
    status: 'pending' | 'completed' | 'locked';
    completedDates: string[];
}
