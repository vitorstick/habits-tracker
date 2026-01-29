import { Habit } from '../types';
import { storage } from '../utils/storage';

const HABITS_STORAGE_KEY = 'habit-hero-data';

// Initial Mock Data
const INITIAL_HABITS: Habit[] = [
    { id: 1, title: 'Morning Water', status: 'completed', completedDates: [] },
    { id: 2, title: 'Read 10 Pages', status: 'completed', completedDates: [] },
    { id: 3, title: 'Meditation', status: 'pending', completedDates: [] },
    { id: 4, title: 'Exercise', status: 'pending', completedDates: [] },
    { id: 5, title: 'Journaling', status: 'locked', completedDates: [] },
    { id: 6, title: 'Sleep Well', status: 'locked', completedDates: [] },
];

export const habitsApi = {
    fetchHabits: async (): Promise<Habit[]> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const stored = storage.getItem<Habit[]>(HABITS_STORAGE_KEY);
        if (!stored) {
            storage.setItem(HABITS_STORAGE_KEY, INITIAL_HABITS);
            return INITIAL_HABITS;
        }
        return stored;
    },

    logHabit: async (id: string | number): Promise<Habit[]> => {
        await new Promise(resolve => setTimeout(resolve, 300));

        const today = new Date().toISOString().split('T')[0];
        const habits = storage.getItem<Habit[]>(HABITS_STORAGE_KEY) || INITIAL_HABITS;

        const updatedHabits = habits.map(h => {
            if (h.id === id) {
                // Prevent duplicate entries for today
                const dates = h.completedDates || [];
                const newDates = dates.includes(today) ? dates : [...dates, today];

                return {
                    ...h,
                    status: 'completed' as const,
                    completedDates: newDates
                };
            }
            return h;
        });

        storage.setItem(HABITS_STORAGE_KEY, updatedHabits);
        return updatedHabits;
    }
};
