import { useHabits } from './useHabits';

export const useMonthlyProgress = () => {
    const { data: habits = [] } = useHabits();

    const calculateProgress = () => {
        if (habits.length === 0) return { progress: 0, level: 1 };

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const today = now.getDate(); // Days passed so far

        let totalCompletionsThisMonth = 0;

        habits.forEach(habit => {
            if (habit.completedDates) {
                habit.completedDates.forEach(dateStr => {
                    const date = new Date(dateStr);
                    if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
                        totalCompletionsThisMonth++;
                    }
                });
            }
        });

        // Max possible completions so far = (Habits * Days Passed)
        // Note: This assumes all habits existed all month. Simplified logic.
        const maxPossible = habits.length * today;

        // Calculate percentage
        const percentage = maxPossible > 0
            ? Math.round((totalCompletionsThisMonth / maxPossible) * 100)
            : 0;

        // Level logic (mock): Every 10 completions is a level, max level 100
        const level = Math.floor(totalCompletionsThisMonth / 10) + 1;

        return {
            progress: Math.min(percentage, 100),
            level
        };
    };

    return calculateProgress();
};
