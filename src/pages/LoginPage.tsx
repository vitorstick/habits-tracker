import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import TactileButton from '../components/ui/TactileButton';
import MobileLayout from '../layouts/MobileLayout';
import { Mail, Lock, Loader2 } from 'lucide-react';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as any)?.from?.pathname || "/";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            showToast('Please fill in all fields', 'error');
            return;
        }

        setIsSubmitting(true);
        try {
            await login(email, password);
            showToast('Welcome back!', 'success');
            navigate(from, { replace: true });
        } catch (error) {
            showToast('Login failed. Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <MobileLayout showNav={false} showTopBar={false}>
            <div className="flex flex-col min-h-screen px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center mb-12"
                >
                    <div className="w-24 h-24 bg-brand-green rounded-3xl flex items-center justify-center text-white mb-6 shadow-tactile shadow-brand-green-dark">
                        <span className="text-5xl">🦉</span>
                    </div>
                    <h1 className="text-3xl font-black text-brand-text mb-2">Welcome Back!</h1>
                    <p className="text-brand-gray-dark font-bold">Sign in to continue your streak</p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray-dark" size={20} />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-brand-gray-light py-4 pl-12 pr-4 rounded-2xl border-2 border-brand-gray focus:border-brand-blue outline-none font-bold text-brand-text transition-colors"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray-dark" size={20} />
                        <input
                            type="password"
                            placeholder="Password"
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
                        className="mt-4 flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : 'LOG IN'}
                    </TactileButton>
                </motion.form>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-auto pt-8 flex flex-col items-center gap-4"
                >
                    <div className="flex items-center gap-2 text-brand-gray-dark font-bold">
                        <span>Don't have an account?</span>
                        <Link to="/register" className="text-brand-blue uppercase tracking-wider font-black hover:underline">
                            Sign Up
                        </Link>
                    </div>

                    <button className="text-brand-gray-dark/50 text-xs font-bold uppercase tracking-widest hover:text-brand-gray-dark transition-colors">
                        Forgot Password?
                    </button>
                </motion.div>
            </div>
        </MobileLayout>
    );
};

export default LoginPage;
