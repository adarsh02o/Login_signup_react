import { useState, useEffect, useCallback } from 'react';

// Key used to store theme preference in localStorage
const THEME_KEY = 'osa-hr-theme';

/**
 * useTheme Hook
 * Manages dark/light theme state with localStorage persistence
 * Defaults to dark mode for premium look
 * 
 * @returns {Object} { isDark: boolean, toggleTheme: function }
 */
export function useTheme() {
    // Initialize theme from localStorage, default to dark
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === 'undefined') return true; // SSR fallback
        const saved = localStorage.getItem(THEME_KEY);

        // Only use light mode if explicitly saved
        if (saved === 'light') return false;
        if (saved === 'dark') return true;

        // Default to dark mode
        return true;
    });

    // Apply theme class to document root whenever it changes
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    // Toggle between dark and light mode
    const toggleTheme = useCallback(() => {
        // Add transition class for smooth color changes
        document.documentElement.classList.add('theme-transitioning');

        setIsDark(prev => {
            const newValue = !prev;
            localStorage.setItem(THEME_KEY, newValue ? 'dark' : 'light');
            return newValue;
        });

        // Remove transition class after animation completes
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transitioning');
        }, 500);
    }, []);

    return { isDark, toggleTheme };
}
