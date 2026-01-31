import { Habit } from '../types';
import { apiClient } from '../lib/apiClient';

export const habitsApi = {
    fetchHabits: async (): Promise<Habit[]> => {
        return apiClient.get<Habit[]>('/habits');
    },

    createHabit: async (habitData: Omit<Habit, 'id' | 'status' | 'completedDates' | 'streak'>): Promise<Habit> => {
        // Map frontend fields to backend CreateHabitRequest if needed
        // Backend expects: Title, Icon, Color, Frequency
        return apiClient.post<Habit>('/habits', habitData);
    },

    logHabit: async (id: number): Promise<Habit[]> => {
        // Path might vary based on backend implementation, assuming /habits/:id/log or similar
        // Based on typical REST: POST /habits/:id/log
        await apiClient.post(`/habits/${id}/log`, {});
        return apiClient.get<Habit[]>('/habits');
    },

    updateHabit: async (id: number, data: Partial<Habit>): Promise<Habit[]> => {
        await apiClient.put(`/habits/${id}`, data);
        return apiClient.get<Habit[]>('/habits');
    },

    deleteHabit: async (id: number): Promise<Habit[]> => {
        await apiClient.delete(`/habits/${id}`);
        return apiClient.get<Habit[]>('/habits');
    }
};
