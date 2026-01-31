import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { queryClient } from './lib/queryClient';
import { ToastProvider } from './context/ToastContext';
import Dashboard from './pages/Dashboard';
import { CreateHabit } from './pages/CreateHabit';
// import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Stats from './pages/Stats';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/create" element={<CreateHabit />} />
                {/* <Route path="/leaderboard" element={<Leaderboard />} /> */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/stats" element={<Stats />} />
            </Routes>
        </AnimatePresence>
    );
};

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ToastProvider>
                <Router>
                    <AnimatedRoutes />
                </Router>
            </ToastProvider>
        </QueryClientProvider>
    );
}

export default App;
