export type HabitFrequency = 'daily' | 'weekly' | 'monthly';

export interface Habit {
    id: number;
    title: string;
    description?: string;
    icon: string; // Lucide icon name
    color: string; // Hex color
    frequency: HabitFrequency;
    frequencyDetails?: {
        daysOfWeek?: number[]; // 0-6 (Sun-Sat)
        dayOfMonth?: number; // 1-31
    };
    status: 'pending' | 'completed' | 'locked';
    completedDates: string[];
    streak: number;
}
