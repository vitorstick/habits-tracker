import { useHabits } from './useHabits';

export const useStreakData = () => {
    const { data: habits = [] } = useHabits();

    const calculateCurrentStreak = () => {
        // 1. Collect all unique completed dates across all habits
        const allDates = new Set<string>();
        habits.forEach(habit => {
            if (habit.completedDates) {
                habit.completedDates.forEach(date => allDates.add(date));
            }
        });

        // 2. Sort dates in descending order (newest first)
        const sortedDates = Array.from(allDates).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

        if (sortedDates.length === 0) return 0;

        // 3. Check for streak
        let streak = 0;
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        // If today is not in the list, and yesterday isn't either, streak is broken (0).
        // Exception: If the most recent date is yesterday, streak is alive.
        // If the most recent date is today, streak is alive.

        // Start checking from the most recent date
        const mostRecent = sortedDates[0];

        // If user hasn't done anything today or yesterday, streak is 0
        if (mostRecent !== today && mostRecent !== yesterday) {
            return 0;
        }

        // Iterate backwards
        let currentDateCheck = new Date(mostRecent);

        // Loop through sorted dates to find valid contiguous block
        for (let i = 0; i < sortedDates.length; i++) {
            const dateStr = sortedDates[i];
            const checkStr = currentDateCheck.toISOString().split('T')[0];

            if (dateStr === checkStr) {
                streak++;
                // Move to previous day
                currentDateCheck.setDate(currentDateCheck.getDate() - 1);
            } else {
                // Gap found
                break;
            }
        }

        return streak;
    };

    return {
        streak: calculateCurrentStreak(),
        isActive: calculateCurrentStreak() > 0 // Streak is active if > 0 (simplified)
    };
};
