import React from 'react';
import * as Icons from 'lucide-react';
import { HelpCircle } from 'lucide-react';

interface HabitIconProps {
    name: string | undefined;
    size?: number;
    className?: string;
    strokeWidth?: number;
}

export const HabitIcon: React.FC<HabitIconProps> = ({ name, size = 24, className, strokeWidth }) => {
    if (!name) return <HelpCircle size={size} className={className} strokeWidth={strokeWidth} />;

    const IconComponent = (Icons as any)[name];

    if (!IconComponent) {
        return <HelpCircle size={size} className={className} strokeWidth={strokeWidth} />;
    }

    return <IconComponent size={size} className={className} strokeWidth={strokeWidth} />;
};
