import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../layouts/MobileLayout';
import HabitNode from '../components/habit/HabitNode';
import LogHabitModal from '../components/modals/LogHabitModal';
import { Habit } from '../types';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useHabits } from '../hooks/useHabits';
import { useLogHabit } from '../hooks/useLogHabit';
import PageTransition from '../components/ui/PageTransition';
import ErrorState from '../components/ui/ErrorState';
import { getRelativeDateString, formatDateToKey } from '../utils/dateUtils';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(formatDateToKey(new Date()));
    const { data: rawHabits = [], isLoading, isError, refetch } = useHabits(selectedDate);
    const { mutate: logHabit } = useLogHabit();
    const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

    const todayStr = formatDateToKey(new Date());
    const isPast = selectedDate < todayStr;
    const isFuture = selectedDate > todayStr;

    // Filter logic: if it's a past date, only show unfinished habits
    const habits = isPast
        ? rawHabits.filter(h => h.status !== 'completed')
        : rawHabits;

    const handleDateChange = (offset: number) => {
        const currentDate = new Date(selectedDate);
        currentDate.setDate(currentDate.getDate() + offset);
        setSelectedDate(formatDateToKey(currentDate));
    };

    const getDateLabel = () => {
        if (selectedDate === todayStr) return "Today";
        if (selectedDate === getRelativeDateString(-1)) return "Yesterday";
        if (selectedDate === getRelativeDateString(1)) return "Tomorrow";
        return selectedDate;
    };

    const handleHabitClick = (habit: Habit) => {
        if (isFuture) return; // Can't log habits in the future
        setSelectedHabit(habit);
    };

    const handleCompleteHabit = (id: number) => {
        logHabit(id);
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
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        }
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

    if (isError) {
        return (
            <MobileLayout>
                <ErrorState onRetry={() => refetch()} />
            </MobileLayout>
        );
    }

    return (
        <PageTransition>
            <MobileLayout>
                {/* Date Selector */}
                <div className="flex items-center justify-between px-6 pt-6 -mb-4">
                    <button
                        onClick={() => handleDateChange(-1)}
                        className="p-2 rounded-full hover:bg-brand-gray/20 transition-colors"
                    >
                        <ChevronLeft className="text-brand-gray-dark" />
                    </button>

                    <div className="flex flex-col items-center">
                        <span className="text-xl font-black text-brand-text uppercase tracking-tight">
                            {getDateLabel()}
                        </span>
                        {selectedDate !== todayStr && (
                            <span className="text-[10px] font-bold text-brand-gray-dark/60 uppercase tracking-widest">
                                {selectedDate}
                            </span>
                        )}
                    </div>

                    <button
                        onClick={() => handleDateChange(1)}
                        className="p-2 rounded-full hover:bg-brand-gray/20 transition-colors"
                    >
                        <ChevronRight className="text-brand-gray-dark" />
                    </button>
                </div>

                <motion.div
                    key={selectedDate} // Ensure animation re-runs on date change
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="py-12 flex flex-col items-center gap-16 relative"
                >
                    <div className="absolute top-0 bottom-0 w-2 bg-brand-gray/20 -z-10 rounded-full" />

                    <AnimatePresence mode="popLayout">
                        {habits.map((habit, index) => {
                            const cycle = index % 4;
                            const xOffset = cycle === 1 ? 48 : cycle === 3 ? -48 : 0;

                            return (
                                <motion.div
                                    key={habit.id}
                                    layout
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="show"
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    style={{ x: xOffset }}
                                    className="relative"
                                >
                                    <HabitNode
                                        habit={habit}
                                        onClick={handleHabitClick}
                                        isCompleted={habit.status === 'completed'}
                                    />
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-max">
                                        <span className={`text-[10px] font-black uppercase tracking-wider ${habit.status === 'locked' ? 'text-brand-gray-dark/50' : 'text-brand-text'
                                            }`}>
                                            {habit.title}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    <motion.div variants={itemVariants} className="mt-8 flex flex-col items-center opacity-30 grayscale saturate-0">
                        <div className="w-24 h-24 rounded-full bg-brand-orange/20 flex items-center justify-center">
                            <span className="text-4xl">🏆</span>
                        </div>
                        <p className="mt-2 text-xs font-black text-brand-gray-dark uppercase tracking-widest">End of Week</p>
                    </motion.div>
                </motion.div>

                {/* Floating Add Button */}
                <button
                    onClick={() => navigate('/create')}
                    className="fixed bottom-24 right-6 w-14 h-14 bg-brand-green text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all z-40 border-b-4 border-brand-green-dark"
                >
                    <Plus size={32} />
                </button>

                <LogHabitModal
                    isOpen={!!selectedHabit}
                    onClose={() => setSelectedHabit(null)}
                    habit={selectedHabit}
                    onComplete={handleCompleteHabit}
                />
            </MobileLayout>
        </PageTransition>
    );
};

export default Dashboard;
