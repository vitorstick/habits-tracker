import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface StreakFlameProps {
    count: number;
    isActive?: boolean;
    size?: number;
    className?: string;
}

const StreakFlame: React.FC<StreakFlameProps> = ({
    count,
    isActive = false,
    size = 24,
    className
}) => {
    return (
        <div className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors",
            isActive ? "bg-brand-orange/10" : "bg-brand-gray/50",
            className
        )}>
            <motion.div
                animate={isActive ? {
                    scale: [1, 1.2, 1],
                    filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
                } : {}}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <Flame
                    size={size}
                    className={cn(
                        isActive ? "text-brand-orange fill-brand-orange" : "text-brand-gray-dark fill-brand-gray-dark"
                    )}
                />
            </motion.div>
            <span className={cn(
                "text-lg font-extrabold leading-none",
                isActive ? "text-brand-orange" : "text-brand-gray-dark"
            )}>
                {count}
            </span>
        </div>
    );
};

export default StreakFlame;
