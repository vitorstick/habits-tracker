import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { ToastProvider } from './context/ToastContext';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import HabitDetail from './pages/HabitDetail';
import Stats from './pages/Stats';

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ToastProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/stats" element={<Stats />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/habit/:id" element={<HabitDetail />} />
                    </Routes>
                </Router>
            </ToastProvider>
        </QueryClientProvider>
    )
}

export default App;
