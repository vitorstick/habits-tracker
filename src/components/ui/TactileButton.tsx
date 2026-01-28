import React from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge tailwind classes
 */
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface TactileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'success';
    size?: 'sm' | 'md' | 'lg';
}

const TactileButton: React.FC<TactileButtonProps> = ({
    variant = 'primary',
    size = 'md',
    className,
    children,
    ...props
}) => {
    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base font-bold',
        lg: 'px-8 py-4 text-xl font-extrabold tracking-wide uppercase',
    };

    const shadowColors = {
        primary: 'bg-brand-green-dark',
        secondary: 'bg-brand-gray-dark',
        danger: 'bg-brand-red-dark',
        success: 'bg-brand-blue-dark',
    };

    const faceColors = {
        primary: 'bg-brand-green text-white',
        secondary: 'bg-brand-gray text-brand-text border-2 border-brand-gray-dark/10',
        danger: 'bg-brand-red text-white',
        success: 'bg-brand-blue text-white',
    };

    // Separate motion props from HTML button props to avoid type conflicts
    const { onClick, disabled, type, ...rest } = props;

    return (
        <div className={cn("relative inline-block min-w-[120px]", disabled && "opacity-50 cursor-not-allowed")}>
            {/* Shadow */}
            <div
                className={cn(
                    "absolute inset-0 translate-y-1 rounded-2xl",
                    shadowColors[variant]
                )}
            />

            {/* Button Face */}
            <motion.button
                whileTap={disabled ? {} : { y: 4 }}
                transition={{ type: "spring", stiffness: 600, damping: 30 }}
                onClick={onClick}
                disabled={disabled}
                type={type}
                className={cn(
                    "relative w-full rounded-2xl border-none outline-none cursor-pointer select-none",
                    sizeClasses[size],
                    faceColors[variant],
                    className
                )}
                {...rest as any}
            >
                {children}
            </motion.button>
        </div>
    );
};

export default TactileButton;
