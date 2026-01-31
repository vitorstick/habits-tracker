import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import TactileButton from '../ui/TactileButton';
import { Habit } from '../../types';
import { useConfetti } from '../../hooks/useConfetti';
import { useToast } from '../../context/ToastContext';
import { HabitIcon } from '../habit/HabitIcon';

interface LogHabitModalProps {
    isOpen: boolean;
    onClose: () => void;
    habit: Habit | null;
    onComplete: (habitId: number) => void;
}

const LogHabitModal: React.FC<LogHabitModalProps> = ({ isOpen, onClose, habit, onComplete }) => {
    const [note, setNote] = useState('');
    const { triggerConfetti } = useConfetti();
    const { showToast } = useToast();

    if (!habit) return null;

    const handleComplete = () => {
        if (navigator.vibrate) navigator.vibrate(200);
        triggerConfetti();
        showToast('Habit completed! Well done!', 'success');
        onComplete(habit.id);
        onClose();
    };

    const handleSkip = () => {
        showToast('Habit skipped. Keep it up tomorrow!', 'info');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl max-w-md mx-auto overflow-hidden"
                    >
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                                        style={{ backgroundColor: habit.color }}
                                    >
                                        <HabitIcon name={habit.icon} size={28} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-brand-text">{habit.title}</h2>
                                        <p className="text-brand-gray-dark font-bold text-sm">Daily Goal</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 bg-brand-gray-light rounded-full text-brand-gray-dark hover:bg-brand-gray/20 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Note Input */}
                            <div className="mb-8">
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Add a note (optional)..."
                                    className="w-full bg-brand-gray-light p-4 rounded-2xl text-brand-text font-bold placeholder:text-brand-gray-dark/50 resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                                    rows={3}
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-3">
                                <TactileButton
                                    variant="primary"
                                    size="lg"
                                    onClick={handleComplete}
                                    className="w-full flex items-center justify-center gap-2"
                                >
                                    <Check strokeWidth={4} />
                                    Complete Habit
                                </TactileButton>

                                <TactileButton
                                    variant="secondary"
                                    size="md"
                                    onClick={handleSkip}
                                    className="w-full text-brand-gray-dark"
                                >
                                    Skip for today
                                </TactileButton>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default LogHabitModal;
