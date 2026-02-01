import { useQuery } from '@tanstack/react-query';
import { habitsApi } from '../api/habits';

export const useHabits = (date?: string) => {
    return useQuery({
        queryKey: ['habits', date],
        queryFn: () => habitsApi.fetchHabits(date),
    });
};
