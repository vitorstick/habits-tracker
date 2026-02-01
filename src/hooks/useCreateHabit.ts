import { useMutation, useQueryClient } from '@tanstack/react-query';
import { habitsApi } from '../api/habits';

export const useCreateHabit = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: habitsApi.createHabit,
        onSuccess: () => {
            // Invalidate all habit-related queries to ensure all views refresh
            queryClient.invalidateQueries({ queryKey: ['habits'] });
        },
    });
};
