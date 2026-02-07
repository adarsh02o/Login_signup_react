import { calculatePasswordStrength, STRENGTH_CONFIG } from '../lib/validation';

/**
 * PasswordStrengthMeter Component
 * Visual indicator of password complexity
 * Updated for premium dark mode visibility
 */
export default function PasswordStrengthMeter({ password }) {
    const { score, level } = calculatePasswordStrength(password);

    // Don't show anything if password is empty
    if (!password) return null;

    return (
        <div className="mt-3 animate-[slideDown_0.3s_ease-out]">
            {/* Strength label */}
            <div className="flex justify-between items-center mb-1.5 px-0.5">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
                    Strength
                </span>
                <span className={`text-[10px] uppercase tracking-wider font-bold transition-colors duration-300 ${STRENGTH_CONFIG.labels[level].class}`}>
                    {STRENGTH_CONFIG.labels[level].text}
                </span>
            </div>

            {/* Strength bars */}
            <div className="flex gap-1.5 h-1">
                {[0, 1, 2, 3].map((index) => (
                    <div
                        key={index}
                        className={`h-full flex-1 rounded-full transition-all duration-500 ease-out
                                  ${index < score
                                ? STRENGTH_CONFIG.colors[level]
                                : 'bg-slate-200 dark:bg-white/10'
                            }
                                  ${index < score ? STRENGTH_CONFIG.glowShadow[level] : ''}
                                  `}
                    />
                ))}
            </div>

            {/* Helper text for weak passwords */}
            {score < 2 && (
                <p className="mt-2 text-[10px] text-slate-400 dark:text-slate-500 leading-normal px-0.5">
                    Tip: Use 8+ chars effectively mixing letters, numbers & symbols.
                </p>
            )}
        </div>
    );
}
