import React from 'react';
import NavigationBar from '../components/ui/NavigationBar';

interface MobileLayoutProps {
    children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-brand-gray-light flex flex-col max-w-md mx-auto relative shadow-2xl">
            {/* Content Area */}
            <main className="flex-1 pb-24 overflow-y-auto overflow-x-hidden">
                {children}
            </main>

            {/* Bottom Navigation */}
            <NavigationBar />
        </div>
    );
};

export default MobileLayout;
