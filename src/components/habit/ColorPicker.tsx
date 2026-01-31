import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const BRAND_COLORS = [
    '#58CC02', // green
    '#1CB0F6', // blue
    '#FF9600', // orange
    '#FF4B4B', // red
    '#AF7AC5', // purple
    '#F1C40F', // yellow
    '#1A5276', // dark blue
    '#AFAFAF', // gray
];

interface ColorPickerProps {
    selectedColor: string;
    onSelect: (color: string) => void;
    className?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onSelect, className }) => {
    return (
        <div className={cn("flex flex-wrap gap-3 p-2", className)}>
            {BRAND_COLORS.map((color) => (
                <button
                    key={color}
                    type="button"
                    onClick={() => onSelect(color)}
                    style={{ backgroundColor: color }}
                    className={cn(
                        "w-8 h-8 rounded-full transition-transform hover:scale-125",
                        selectedColor === color && "ring-4 ring-offset-2 ring-brand-gray-dark scale-110"
                    )}
                />
            ))}
        </div>
    );
};
