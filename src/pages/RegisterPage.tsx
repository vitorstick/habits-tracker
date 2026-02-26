import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import TactileButton from '../components/ui/TactileButton';
import MobileLayout from '../layouts/MobileLayout';
import { Mail, Lock, User, Loader2 } from 'lucide-react';

const RegisterPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !password.trim()) {
            showToast('Please fill in all fields', 'error');
            return;
        }

        setIsSubmitting(true);
        try {
            await register(email, name, password);
            showToast('Account created! Welcome to the flock!', 'success');
            navigate('/', { replace: true });
        } catch (error) {
            showToast('Registration failed. Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <MobileLayout showNav={false} showTopBar={false}>
            <div className="flex flex-col min-h-screen px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center mb-10"
                >
                    <div className="w-20 h-20 bg-brand-blue rounded-3xl flex items-center justify-center text-white mb-4 shadow-tactile shadow-brand-blue-dark">
                        <span className="text-4xl">🥚</span>
                    </div>
                    <h1 className="text-2xl font-black text-brand-text mb-1">Create Profile</h1>
                    <p className="text-brand-gray-dark font-bold text-sm">Join the habit-forming flock!</p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3"
                >
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray-dark" size={20} />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-brand-gray-light py-4 pl-12 pr-4 rounded-2xl border-2 border-brand-gray focus:border-brand-blue outline-none font-bold text-brand-text transition-colors"
                        />
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray-dark" size={20} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-brand-gray-light py-4 pl-12 pr-4 rounded-2xl border-2 border-brand-gray focus:border-brand-blue outline-none font-bold text-brand-text transition-colors"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray-dark" size={20} />
                        <input
                            type="password"
                            placeholder="Create Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-brand-gray-light py-4 pl-12 pr-4 rounded-2xl border-2 border-brand-gray focus:border-brand-blue outline-none font-bold text-brand-text transition-colors"
                        />
                    </div>

                    <TactileButton
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isSubmitting}
                        className="mt-6 flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : 'CREATE ACCOUNT'}
                    </TactileButton>
                </motion.form>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 flex items-center justify-center gap-2 text-brand-gray-dark font-bold text-sm"
                >
                    <span>Already have an account?</span>
                    <Link to="/login" className="text-brand-blue uppercase tracking-wider font-black hover:underline">
                        Log In
                    </Link>
                </motion.div>

                <p className="mt-auto pt-8 text-[10px] text-center text-brand-gray-dark font-bold leading-relaxed opacity-60">
                    By joining, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
                </p>
            </div>
        </MobileLayout>
    );
};

export default RegisterPage;
