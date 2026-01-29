import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import MobileLayout from '../layouts/MobileLayout';
import HabitNode from '../components/habit/HabitNode';
import LogHabitModal from '../components/modals/LogHabitModal';
import { Habit } from '../types';
import { Droplets, Dumbbell, BookOpen, Moon, Sun, Wind, HelpCircle } from 'lucide-react';
import { useHabits } from '../hooks/useHabits';
import { useLogHabit } from '../hooks/useLogHabit';

const Dashboard: React.FC = () => {
    const { data: habits = [], isLoading } = useHabits();
    const { mutate: logHabit } = useLogHabit();
    const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

    // Helper to map habit titles to icons (since our simple mock API doesn't store React nodes)
    const getIconForHabit = (title: string) => {
        switch (title) {
            case 'Morning Water': return <Droplets size={32} />;
            case 'Read 10 Pages': return <BookOpen size={32} />;
            case 'Meditation': return <Wind size={32} />;
            case 'Exercise': return <Dumbbell size={32} />;
            case 'Journaling': return <Sun size={32} />;
            case 'Sleep Well': return <Moon size={32} />;
            default: return <HelpCircle size={32} />;
        }
    };

    const handleHabitClick = (habit: Habit) => {
        // Hydrate the habit with its icon before opening modal
        setSelectedHabit({ ...habit, icon: getIconForHabit(habit.title) });
    };

    const handleCompleteHabit = (id: string | number) => {
        logHabit(id);
    };

    // Offsets for the zigzag path
    const getOffsetClass = (index: number) => {
        const cycle = index % 4;
        if (cycle === 0) return "translate-x-0";
        if (cycle === 1) return "translate-x-12";
        if (cycle === 2) return "translate-x-0";
        return "-translate-x-12";
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 50, scale: 0.8 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    if (isLoading) {
        return (
            <MobileLayout>
                <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
                </div>
            </MobileLayout>
        );
    }

    return (
        <MobileLayout>
            {/* The Winding Path */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="py-12 flex flex-col items-center gap-16 relative"
            >
                {/* SVG Path Background (Optional visual connecting line) */}
                <div className="absolute top-0 bottom-0 w-2 bg-brand-gray/20 -z-10 rounded-full" />

                {habits.map((habit, index) => (
                    <motion.div
                        key={habit.id}
                        variants={itemVariants}
                        className={`transition-transform duration-500 ${getOffsetClass(index)}`}
                    >
                        <HabitNode
                            habit={{ ...habit, icon: getIconForHabit(habit.title) }}
                            onClick={handleHabitClick}
                        />
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-max">
                            <span className={`text-[10px] font-black uppercase tracking-wider ${habit.status === 'locked' ? 'text-brand-gray-dark/50' : 'text-brand-text'
                                }`}>
                                {habit.title}
                            </span>
                        </div>
                    </motion.div>
                ))}

                {/* Achievement Cup at the end */}
                <motion.div variants={itemVariants} className="mt-8 flex flex-col items-center opacity-30 grayscale saturate-0">
                    <div className="w-24 h-24 rounded-full bg-brand-orange/20 flex items-center justify-center">
                        <span className="text-4xl">🏆</span>
                    </div>
                    <p className="mt-2 text-xs font-black text-brand-gray-dark uppercase tracking-widest">End of Week</p>
                </motion.div>
            </motion.div>

            <LogHabitModal
                isOpen={!!selectedHabit}
                onClose={() => setSelectedHabit(null)}
                habit={selectedHabit}
                onComplete={handleCompleteHabit}
            />
        </MobileLayout>
    );
};

export default Dashboard;
