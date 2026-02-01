import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import TactileButton from './TactileButton';

interface ErrorStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({
    title = "Oops! Something went wrong",
    message = "We couldn't load your habits. Please check your connection and try again.",
    onRetry
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-8 text-center min-h-[50vh]"
        >
            <div className="relative mb-6">
                <motion.div
                    animate={{
                        rotate: [0, -10, 10, -10, 10, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 3
                    }}
                    className="w-24 h-24 bg-brand-red/10 rounded-full flex items-center justify-center"
                >
                    <AlertCircle size={48} className="text-brand-red" />
                </motion.div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-brand-red rounded-full flex items-center justify-center border-4 border-white">
                    <div className="w-1 h-1 bg-white rounded-full animate-ping" />
                </div>
            </div>

            <h3 className="text-2xl font-black text-brand-text mb-2">
                {title}
            </h3>

            <p className="text-brand-gray-dark font-medium mb-8 max-w-xs">
                {message}
            </p>

            {onRetry && (
                <TactileButton
                    variant="danger"
                    onClick={onRetry}
                    className="flex items-center gap-2"
                >
                    <RefreshCw size={20} className="mr-2" />
                    RETRY
                </TactileButton>
            )}
        </motion.div>
    );
};

export default ErrorState;
