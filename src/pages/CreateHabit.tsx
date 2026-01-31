import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import TactileButton from '../components/ui/TactileButton';
import { IconPicker } from '../components/habit/IconPicker';
import { ColorPicker } from '../components/habit/ColorPicker';
import { FrequencySelector } from '../components/habit/FrequencySelector';
import { habitsApi } from '../api/habits';
import { HabitFrequency } from '../types';
import { useToast } from '../context/ToastContext';
import { useConfetti } from '../hooks/useConfetti';

export const CreateHabit: React.FC = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('Droplets');
    const [color, setColor] = useState('#58CC02');
    const [frequency, setFrequency] = useState<HabitFrequency>('daily');
    const [details, setDetails] = useState<{ daysOfWeek?: number[]; dayOfMonth?: number }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { triggerConfetti } = useConfetti();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        setIsSubmitting(true);
        try {
            await habitsApi.createHabit({
                title,
                description,
                icon,
                color,
                frequency,
                frequencyDetails: details
            });
            triggerConfetti();
            showToast('Habit created successfully! 🚀', 'success');
            setTimeout(() => navigate('/'), 1500);
        } catch (error) {
            console.error('Failed to create habit:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <header className="flex items-center gap-4 p-6 border-b-2 border-brand-gray">
                <button onClick={() => navigate(-1)} className="text-brand-text hover:text-brand-green transition-colors">
                    <ChevronLeft size={28} />
                </button>
                <h1 className="text-2xl font-extrabold text-brand-text">Create Habit</h1>
            </header>

            <form
                id="create-habit-form"
                onSubmit={handleSubmit}
                className="flex-1 overflow-y-auto p-6 space-y-8 pb-32"
            >
                {/* Name */}
                {/* Name */}
                <section className="space-y-2">
                    <label className="text-sm font-bold text-brand-text-light uppercase tracking-wider">Habit Name</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Morning Yoga"
                        className="w-full p-4 rounded-2xl border-2 border-brand-gray bg-brand-gray-light focus:border-brand-green focus:bg-white outline-none font-bold text-lg transition-all"
                        required
                    />
                </section>

                {/* Description */}
                <section className="space-y-2">
                    <label className="text-sm font-bold text-brand-text-light uppercase tracking-wider">Description (Optional)</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Detailed notes..."
                        className="w-full p-4 rounded-2xl border-2 border-brand-gray bg-brand-gray-light focus:border-brand-green focus:bg-white outline-none font-medium h-24 transition-all"
                    />
                </section>

                {/* Icon Selection */}
                <section className="space-y-4">
                    <label className="text-sm font-bold text-brand-text-light uppercase tracking-wider">Choose Icon</label>
                    <IconPicker selectedIcon={icon} onSelect={setIcon} />
                </section>

                {/* Color Selection */}
                <section className="space-y-4">
                    <label className="text-sm font-bold text-brand-text-light uppercase tracking-wider">Choose Color</label>
                    <ColorPicker selectedColor={color} onSelect={setColor} />
                </section>
                {/* Frequency */}
                <section className="space-y-4">
                    <label className="text-sm font-bold text-brand-text-light uppercase tracking-wider">Schedule</label>
                    <FrequencySelector
                        frequency={frequency}
                        details={details}
                        onChange={(f, d) => { setFrequency(f); setDetails(d); }}
                    />
                </section>
            </form>

            {/* Sticky Footer */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t-2 border-brand-gray max-w-md mx-auto">
                <TactileButton
                    variant="primary"
                    size="lg"
                    type="submit"
                    form="create-habit-form"
                    className="w-full"
                    disabled={isSubmitting || !title.trim()}
                >
                    {isSubmitting ? 'Creating...' : 'CREATE HABIT'}
                </TactileButton>
            </div>
        </div>
    );
};
