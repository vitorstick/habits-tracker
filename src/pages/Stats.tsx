import React from 'react';
import MobileLayout from '../layouts/MobileLayout';
import { useHabits } from '../hooks/useHabits';
import { BarChart2 as IconBarChart } from 'lucide-react';
import { cn } from '../lib/utils';
import PageTransition from '../components/ui/PageTransition';

const Stats: React.FC = () => {
    const { data: habits = [] } = useHabits();

    // Calculate last 7 days activity
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return {
            date: d,
            dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
            isoDate: d.toISOString().split('T')[0]
        };
    });

    const activityData = last7Days.map(day => {
        const count = habits.reduce((acc, habit) => {
            return acc + (habit.completedDates?.includes(day.isoDate) ? 1 : 0);
        }, 0);
        return { ...day, count };
    });

    const maxCount = Math.max(...activityData.map(d => d.count), 1); // Avoid div by 0

    return (
        <PageTransition>
            <MobileLayout>
                <div className="p-6">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-black text-brand-text mb-2">Statistics</h1>
                        <p className="text-brand-gray-dark font-bold">Your Activity</p>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border-2 border-brand-gray shadow-sm">
                        <div className="flex items-center gap-2 mb-6 text-brand-gray-dark">
                            <IconBarChart size={20} />
                            <span className="font-bold uppercase text-xs tracking-wider">Last 7 Days</span>
                        </div>

                        {/* Bar Chart */}
                        <div className="flex items-end justify-between h-48 gap-2">
                            {activityData.map((day, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-full bg-brand-gray-light rounded-t-lg relative flex items-end overflow-hidden group">
                                        <div
                                            className={cn(
                                                "w-full transition-all duration-1000 ease-out rounded-t-lg",
                                                day.count > 0 ? "bg-brand-blue" : "bg-transparent"
                                            )}
                                            style={{ height: `${(day.count / maxCount) * 100}%` }}
                                        >
                                            <div className="w-full h-full opacity-0 group-hover:opacity-100 bg-white/20 transition-opacity" />
                                        </div>
                                    </div>
                                    <span className={cn(
                                        "text-xs font-bold uppercase",
                                        day.date.getDay() === new Date().getDay() ? "text-brand-blue" : "text-brand-gray-dark"
                                    )}>
                                        {day.dayName.charAt(0)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-4">
                        {/* Placeholder for more stats */}
                        <div className="p-4 bg-brand-green/10 rounded-2xl border-2 border-brand-green/20 flex items-center justify-between">
                            <div>
                                <p className="font-black text-brand-green text-lg">Consistent!</p>
                                <p className="text-sm text-brand-green/80 font-bold">You're completing 80% of your goals.</p>
                            </div>
                            <span className="text-2xl">📈</span>
                        </div>
                    </div>
                </div>
            </MobileLayout>
        </PageTransition>
    );
};

export default Stats;
