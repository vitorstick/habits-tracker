import React from 'react';
import { motion } from 'framer-motion';
import { Check, Lock } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Habit } from '../../types';
import { HabitIcon } from './HabitIcon';

interface HabitNodeProps {
    habit: Habit;
    onClick?: (habit: Habit) => void;
    className?: string;
    isCompleted?: boolean;
}

const HabitNode: React.FC<HabitNodeProps> = ({ habit, onClick, className, isCompleted: isCompletedProp }) => {
    const isCompleted = isCompletedProp ?? (habit.status === 'completed');
    const isLocked = habit.status === 'locked';
    const isPending = habit.status === 'pending';

    const shadowColors = {
        completed: 'bg-brand-green-dark',
        pending: 'bg-brand-gray-dark',
        locked: 'bg-brand-gray-dark/50',
    };

    const faceColors = {
        completed: 'bg-brand-green text-white',
        pending: 'bg-brand-gray text-brand-text',
        locked: 'bg-brand-gray text-brand-text/50 opacity-70',
    };

    const status = isLocked ? 'locked' : (isCompleted ? 'completed' : 'pending');

    return (
        <div
            className={cn(
                "relative w-20 h-20 group",
                isLocked ? "cursor-not-allowed" : "cursor-pointer",
                className
            )}
            onClick={() => {
                if (!isLocked) {
                    if (navigator.vibrate) navigator.vibrate(15);
                    onClick?.(habit);
                }
            }}
        >
            {/* Shadow */}
            <div
                className={cn(
                    "absolute inset-0 translate-y-2 rounded-full",
                    shadowColors[status]
                )}
            />

            {/* Button Face */}
            <motion.div
                whileHover={!isLocked ? { scale: 1.05 } : {}}
                whileTap={!isLocked ? { scale: 0.95, y: 4 } : {}}
                transition={{ type: "spring", stiffness: 600, damping: 30 }}
                className={cn(
                    "relative w-full h-full rounded-full flex items-center justify-center transition-colors px-1",
                    faceColors[status]
                )}
            >
                {isLocked ? (
                    <Lock size={32} />
                ) : isCompleted ? (
                    <Check size={40} strokeWidth={3} />
                ) : (
                    <HabitIcon name={habit.icon} size={32} strokeWidth={2.5} />
                )}
            </motion.div>

            {/* Completion indicator pulse for pending habits */}
            {isPending && (
                <div className="absolute -inset-1 rounded-full border-2 border-brand-green/20 animate-pulse pointer-events-none" />
            )}
        </div>
    );
};

export default HabitNode;
