import confetti from 'canvas-confetti';

export const useConfetti = () => {
    const triggerConfetti = () => {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            zIndex: 9999, // Ensure it's above modals
        };

        const fire = (particleRatio: number, opts: confetti.Options) => {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio),
            });
        };

        // Brand colors: Green, Orange, Blue
        const colors = ['#58CC02', '#FF9600', '#1CB0F6'];

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
            colors: colors,
        });

        fire(0.2, {
            spread: 60,
            colors: colors,
        });

        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
            colors: colors,
        });

        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
            colors: colors,
        });

        fire(0.1, {
            spread: 120,
            startVelocity: 45,
            colors: colors,
        });
    };

    return { triggerConfetti };
};
