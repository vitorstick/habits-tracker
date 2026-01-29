import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BarChart2, User, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavItemProps {
    icon: React.ElementType;
    label: string;
    isActive?: boolean;
    onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={cn(
            "flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-all rounded-xl",
            isActive ? "text-brand-blue" : "text-brand-gray-dark hover:text-brand-text active:bg-brand-gray/20"
        )}
    >
        <div className={cn(
            "p-1.5 rounded-xl transition-colors",
            isActive && "bg-brand-blue/10"
        )}>
            <Icon size={24} strokeWidth={isActive ? 3 : 2} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-wider">{label}</span>
    </button>
);

const NavigationBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine active tab based on path
    const getActiveTab = (path: string) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t-2 border-brand-gray px-4 pb-safe flex items-center justify-around z-50">
            <NavItem
                icon={Home}
                label="Home"
                isActive={getActiveTab('/')}
                onClick={() => navigate('/')}
            />
            <NavItem
                icon={BarChart2}
                label="Stats"
                isActive={getActiveTab('/stats')}
                onClick={() => navigate('/stats')}
            />
            <NavItem
                icon={User}
                label="Quest"
                isActive={getActiveTab('/leaderboard')}
                onClick={() => navigate('/leaderboard')}
            />
            <NavItem
                icon={Settings}
                label="Profile"
                isActive={getActiveTab('/profile')}
                onClick={() => navigate('/profile')}
            />
        </nav>
    );
};

export default NavigationBar;
