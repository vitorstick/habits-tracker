import { useMutation, useQueryClient } from '@tanstack/react-query';
import { habitsApi } from '../api/habits';

export const useDeleteHabit = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: habitsApi.deleteHabit,
        onSuccess: () => {
            // Invalidate all habit-related queries to ensure all views refresh
            queryClient.invalidateQueries({ queryKey: ['habits'] });
        },
    });
};
