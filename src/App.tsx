import { useState } from 'react'
import TactileButton from './components/ui/TactileButton'
import HabitNode, { Habit } from './components/habit/HabitNode'
import ProgressRing from './components/ui/ProgressRing'
import StreakFlame from './components/ui/StreakFlame'
import { Droplets, Coffee, Dumbbell } from 'lucide-react'

function App() {
    const [count, setCount] = useState(0)
    const progress = Math.min((count / 10) * 100, 100)
    const [streakActive, setStreakActive] = useState(true)

    const habits: Habit[] = [
        { id: 1, title: 'Drink Water', icon: <Droplets size={32} />, status: 'pending' },
        { id: 2, title: 'Morning Coffee', icon: <Coffee size={32} />, status: 'completed' },
        { id: 3, title: 'Go to Gym', icon: <Dumbbell size={32} />, status: 'locked' },
    ]

    return (
        <div className="flex flex-col items-center justify-center gap-10 min-h-screen p-8 bg-brand-gray-light">
            <header className="flex items-center justify-between w-full max-w-md px-4 py-3 bg-white rounded-2xl shadow-sm border-b-2 border-brand-gray">
                <div className="flex items-center gap-3">
                    <ProgressRing progress={progress} size={36} strokeWidth={4} />
                    <span className="font-bold text-brand-text text-sm">Today</span>
                </div>
                <h1 className="text-xl font-extrabold text-brand-green tracking-tight">HABIT HERO</h1>
                <StreakFlame count={5} isActive={streakActive} />
            </header>

            <div className="flex flex-wrap items-center justify-center gap-8 p-8 bg-white rounded-3xl shadow-xl border-b-4 border-brand-gray">
                <div className="flex flex-col items-center gap-2">
                    <HabitNode habit={habits[0]} onClick={() => setCount(c => c + 1)} />
                    <span className="text-xs font-bold text-brand-text uppercase tracking-wider">Track</span>
                </div>
                <div className="flex flex-col items-center gap-3 opacity-60">
                    <HabitNode habit={habits[1]} />
                    <span className="text-xs font-bold text-brand-text-light uppercase tracking-wider">Done</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <HabitNode habit={habits[2]} />
                    <span className="text-xs font-bold text-brand-text-light uppercase tracking-wider">Lvl 5</span>
                </div>
            </div>

            <div className="flex flex-col gap-6 w-full max-w-xs text-center">
                <div className="flex flex-col gap-2">
                    <TactileButton
                        variant="primary"
                        size="lg"
                        onClick={() => {
                            setCount(c => c + 1)
                            setStreakActive(true)
                        }}
                    >
                        Log Activity
                    </TactileButton>
                    <p className="text-[10px] font-black text-brand-gray-dark uppercase tracking-[0.2em]">
                        Current Goal: 10 Sessions
                    </p>
                </div>

                <div className="flex gap-4">
                    <TactileButton variant="secondary" className="min-w-0 flex-1" onClick={() => {
                        setCount(0)
                        setStreakActive(false)
                    }}>
                        Reset
                    </TactileButton>
                    <TactileButton variant="success" className="min-w-0 flex-1">
                        Finish
                    </TactileButton>
                </div>
            </div>
        </div>
    )
}

export default App
