import { useMutation, useQueryClient } from '@tanstack/react-query';
import { habitsApi } from '../api/habits';

export const useLogHabit = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: habitsApi.logHabit,
        onSuccess: (updatedHabits) => {
            // Update the cache with the new data
            queryClient.setQueryData(['habits'], updatedHabits);
        },
    });
};
