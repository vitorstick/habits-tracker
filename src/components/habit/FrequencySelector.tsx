import React from 'react';
import { HabitFrequency } from '../../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface FrequencySelectorProps {
    frequency: HabitFrequency;
    details: { daysOfWeek?: number[]; dayOfMonth?: number };
    onChange: (freq: HabitFrequency, details: { daysOfWeek?: number[]; dayOfMonth?: number }) => void;
}

const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const FrequencySelector: React.FC<FrequencySelectorProps> = ({ frequency, details, onChange }) => {
    const toggleDay = (day: number) => {
        const current = details.daysOfWeek || [];
        const updated = current.includes(day)
            ? current.filter((d) => d !== day)
            : [...current, day].sort();
        onChange(frequency, { ...details, daysOfWeek: updated });
    };

    return (
        <div className="space-y-4">
            {/* Main Tabs */}
            <div className="flex gap-2 p-1 bg-brand-gray-light rounded-xl border-2 border-brand-gray">
                {(['daily', 'weekly', 'monthly'] as HabitFrequency[]).map((f) => (
                    <button
                        key={f}
                        type="button"
                        onClick={() => onChange(f, details)}
                        className={cn(
                            "flex-1 py-2 text-sm font-bold capitalize rounded-lg transition-all",
                            frequency === f ? "bg-white shadow-sm text-brand-green" : "text-brand-text-light"
                        )}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Weekly Sub-options */}
            {frequency === 'weekly' && (
                <div className="flex justify-between p-2">
                    {DAYS_OF_WEEK.map((day, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => toggleDay(idx)}
                            className={cn(
                                "w-10 h-10 rounded-full border-2 font-bold transition-all",
                                details.daysOfWeek?.includes(idx)
                                    ? "bg-brand-green border-brand-green-dark text-white shadow-tactile-sm"
                                    : "border-brand-gray text-brand-text-light hover:bg-white"
                            )}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            )}

            {/* Monthly Sub-options */}
            {frequency === 'monthly' && (
                <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-text-light">Day of the month</label>
                    <input
                        type="number"
                        min="1"
                        max="31"
                        value={details.dayOfMonth || 1}
                        onChange={(e) => onChange(frequency, { ...details, dayOfMonth: parseInt(e.target.value) })}
                        className="w-full p-3 rounded-xl border-2 border-brand-gray focus:border-brand-green outline-none bg-white font-bold"
                    />
                </div>
            )}
        </div>
    );
};
