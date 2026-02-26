import React from 'react';
import NavigationBar from '../components/ui/NavigationBar';
import TopBar from '../components/ui/TopBar';
import { cn } from '../lib/utils';

interface MobileLayoutProps {
    children: React.ReactNode;
    showNav?: boolean;
    showTopBar?: boolean;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
    children,
    showNav = true,
    showTopBar = true
}) => {
    return (
        <div className="min-h-screen bg-brand-gray-light flex flex-col max-w-md mx-auto relative shadow-2xl">
            {/* Top Bar */}
            {showTopBar && <TopBar />}

            {/* Content Area */}
            <main className={cn(
                "flex-1 overflow-y-auto overflow-x-hidden",
                showTopBar ? "pt-20" : "pt-0",
                showNav ? "pb-24" : "pb-0"
            )}>
                {children}
            </main>

            {/* Bottom Navigation */}
            {showNav && <NavigationBar />}
        </div>
    );
};

export default MobileLayout;
