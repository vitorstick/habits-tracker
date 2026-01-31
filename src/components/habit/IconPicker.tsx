import React from 'react';
import * as Icons from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const COMMON_ICONS = [
    'Droplets', 'Book', 'Brain', 'Dumbbell', 'Pen', 'Moon',
    'Sun', 'Coffee', 'Heart', 'Camera', 'Music', 'Smile',
    'Code', 'Apple', 'Zap', 'Waves', 'Mountain', 'Cloud'
];

interface IconPickerProps {
    selectedIcon: string;
    onSelect: (iconName: string) => void;
    className?: string;
}

export const IconPicker: React.FC<IconPickerProps> = ({ selectedIcon, onSelect, className }) => {
    return (
        <div className={cn("grid grid-cols-6 gap-2 p-2 bg-brand-gray-light rounded-xl border-2 border-brand-gray", className)}>
            {COMMON_ICONS.map((iconName) => {
                const IconComponent = (Icons as any)[iconName];
                const isSelected = selectedIcon === iconName;

                return (
                    <button
                        key={iconName}
                        type="button"
                        onClick={() => onSelect(iconName)}
                        className={cn(
                            "flex items-center justify-center p-2 rounded-lg transition-all",
                            "hover:bg-white hover:scale-110",
                            isSelected ? "bg-white ring-2 ring-brand-green shadow-sm" : "text-brand-text-light"
                        )}
                    >
                        {IconComponent && <IconComponent size={24} />}
                    </button>
                );
            })}
        </div>
    );
};
