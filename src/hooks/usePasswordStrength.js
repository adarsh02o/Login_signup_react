import { useMemo } from 'react';
import { calculatePasswordStrength, STRENGTH_CONFIG } from '../lib/validation';

/**
 * usePasswordStrength Hook
 * Calculates password strength and returns score, level, and config
 * 
 * @param {string} password - The password to evaluate
 * @returns {Object} { score: number, level: string, config: object }
 */
export function usePasswordStrength(password) {
    return useMemo(() => {
        const { score, level } = calculatePasswordStrength(password);
        return { score, level, config: STRENGTH_CONFIG };
    }, [password]);
}
