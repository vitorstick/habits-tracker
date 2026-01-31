import { Habit } from '../types';
import { storage } from '../utils/storage';

const HABITS_STORAGE_KEY = 'habit-hero-data';

// Initial Mock Data
const INITIAL_HABITS: Habit[] = [
    {
        id: 1,
        title: 'Morning Water',
        description: 'Drink 500ml of water right after waking up',
        icon: 'droplet',
        color: '#1CB0F6',
        frequency: 'daily',
        status: 'completed',
        completedDates: [],
        streak: 5
    },
    {
        id: 2,
        title: 'Read 10 Pages',
        description: 'Read a book for personal growth',
        icon: 'book',
        color: '#58CC02',
        frequency: 'daily',
        status: 'completed',
        completedDates: [],
        streak: 12
    },
    {
        id: 3,
        title: 'Meditation',
        description: '10 minutes of mindfulness',
        icon: 'brain',
        color: '#AF7AC5',
        frequency: 'daily',
        status: 'pending',
        completedDates: [],
        streak: 3
    },
    {
        id: 4,
        title: 'Exercise',
        description: 'Generic physical activity',
        icon: 'dumbbell',
        color: '#FF9600',
        frequency: 'daily',
        status: 'pending',
        completedDates: [],
        streak: 0
    },
    {
        id: 5,
        title: 'Journaling',
        description: 'Write about the day',
        icon: 'pen',
        color: '#FF4B4B',
        frequency: 'daily',
        status: 'locked',
        completedDates: [],
        streak: 0
    },
    {
        id: 6,
        title: 'Sleep Well',
        description: 'Get at least 8 hours of sleep',
        icon: 'moon',
        color: '#1A5276',
        frequency: 'daily',
        status: 'locked',
        completedDates: [],
        streak: 0
    },
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

    createHabit: async (habitData: Omit<Habit, 'id' | 'status' | 'completedDates' | 'streak'>): Promise<Habit> => {
        await new Promise(resolve => setTimeout(resolve, 600));

        const habits = storage.getItem<Habit[]>(HABITS_STORAGE_KEY) || INITIAL_HABITS;
        const newHabit: Habit = {
            ...habitData,
            id: Date.now(),
            status: 'pending',
            completedDates: [],
            streak: 0
        };

        const updatedHabits = [...habits, newHabit];
        storage.setItem(HABITS_STORAGE_KEY, updatedHabits);
        return newHabit;
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
    },

    updateHabit: async (id: string | number, data: Partial<Habit>): Promise<Habit[]> => {
        await new Promise(resolve => setTimeout(resolve, 300));

        const habits = storage.getItem<Habit[]>(HABITS_STORAGE_KEY) || INITIAL_HABITS;
        const updatedHabits = habits.map(h =>
            h.id === id ? { ...h, ...data } : h
        );

        storage.setItem(HABITS_STORAGE_KEY, updatedHabits);
        return updatedHabits;
    },

    deleteHabit: async (id: string | number): Promise<Habit[]> => {
        await new Promise(resolve => setTimeout(resolve, 300));

        const habits = storage.getItem<Habit[]>(HABITS_STORAGE_KEY) || INITIAL_HABITS;
        const updatedHabits = habits.filter(h => h.id !== id);

        storage.setItem(HABITS_STORAGE_KEY, updatedHabits);
        return updatedHabits;
    }
};
