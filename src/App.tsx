import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { queryClient } from './lib/queryClient';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import { CreateHabit } from './pages/CreateHabit';
// import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Stats from './pages/Stats';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path="/create" element={
                    <ProtectedRoute>
                        <CreateHabit />
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path="/stats" element={
                    <ProtectedRoute>
                        <Stats />
                    </ProtectedRoute>
                } />
            </Routes>
        </AnimatePresence>
    );
};

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ToastProvider>
                    <Router>
                        <AnimatedRoutes />
                    </Router>
                </ToastProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
