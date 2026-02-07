import { useTheme } from '../hooks/useTheme';

/**
 * ThemeToggle Component
 * Button to switch between light and dark modes
 * Uses state-based rendering for reliable icon display
 */
export default function ThemeToggle() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            id="theme-toggle"
            onClick={toggleTheme}
            type="button"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-sm transition-all duration-200 active:scale-95
                   bg-white/80 hover:bg-white border border-slate-200/50 hover:shadow-md
                   dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDark ? (
                /* Sun icon - shown in dark mode (click to switch to light) */
                <span className="material-symbols-outlined text-[20px] sm:text-[22px] text-amber-500 transition-transform duration-200">
                    light_mode
                </span>
            ) : (
                /* Moon icon - shown in light mode (click to switch to dark) */
                <span className="material-symbols-outlined text-[20px] sm:text-[22px] text-blue-400 transition-transform duration-200">
                    dark_mode
                </span>
            )}
        </button>
    );
}
