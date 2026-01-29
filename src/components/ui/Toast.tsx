import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
    id: string;
    type: ToastType;
    message: string;
    onDismiss: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, type, message, onDismiss }) => {
    const variants = {
        success: 'bg-brand-green text-white',
        error: 'bg-brand-red text-white',
        info: 'bg-brand-blue text-white',
    };

    const icons = {
        success: <CheckCircle className="w-5 h-5" />,
        error: <AlertCircle className="w-5 h-5" />,
        info: <Info className="w-5 h-5" />,
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            layout
            className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg min-w-[300px] pointer-events-auto",
                variants[type]
            )}
        >
            <div className="shrink-0">
                {icons[type]}
            </div>
            <p className="flex-1 font-bold text-sm">{message}</p>
            <button
                onClick={() => onDismiss(id)}
                className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            >
                <X size={18} />
            </button>
        </motion.div>
    );
};

export default Toast;
