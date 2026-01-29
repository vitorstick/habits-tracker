import { useQuery } from '@tanstack/react-query';
import { habitsApi } from '../api/habits';

export const useHabits = () => {
    return useQuery({
        queryKey: ['habits'],
        queryFn: habitsApi.fetchHabits,
    });
};
