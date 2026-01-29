import { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';

export const useNotifications = () => {
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const { showToast } = useToast();

    useEffect(() => {
        if ('Notification' in window) {
            setPermission(Notification.permission);
        }
    }, []);

    const requestPermission = async () => {
        if (!('Notification' in window)) {
            showToast('Notifications are not supported in this browser.', 'error');
            return;
        }

        try {
            const result = await Notification.requestPermission();
            setPermission(result);

            if (result === 'granted') {
                showToast('Notifications enabled!', 'success');
                // Send a test immediate notification or welcome interaction
                new Notification('Habit Hero', {
                    body: 'You will now receive reminders to keep your streak alive!',
                    icon: '/pwa-192x192.png'
                });
            } else if (result === 'denied') {
                showToast('Notifications denied. Enable them in browser settings.', 'error');
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            showToast('Failed to request permission', 'error');
        }
    };

    const sendTestNotification = () => {
        if (permission === 'granted') {
            new Notification('Habit Hero Test', {
                body: 'This is how your habit reminders will look! 🔥',
                icon: '/pwa-192x192.png'
            });
        } else {
            showToast('Permission not granted yet!', 'info');
        }
    };

    return {
        permission,
        requestPermission,
        sendTestNotification
    };
};
