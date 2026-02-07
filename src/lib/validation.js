// ============================================
// Form Validation Utilities
// ============================================

// Email regex pattern - RFC 5322 compliant
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {Object} { isValid: boolean, error?: string }
 */
export function validateEmail(email) {
    if (!email || !email.trim()) {
        return { isValid: false, error: 'Email is required' };
    }
    if (!EMAIL_REGEX.test(email)) {
        return { isValid: false, error: 'Please enter a valid email address' };
    }
    return { isValid: true };
}

/**
 * Validate password strength
 * Requirements: minimum 8 characters
 * 
 * @param {string} password - Password to validate
 * @returns {Object} { isValid: boolean, error?: string }
 */
export function validatePassword(password) {
    if (!password) {
        return { isValid: false, error: 'Password is required' };
    }
    if (password.length < 8) {
        return { isValid: false, error: 'Password must be at least 8 characters' };
    }
    return { isValid: true };
}

/**
 * Validate user's full name
 * Requirements: minimum 2 characters
 * 
 * @param {string} name - Name to validate
 * @returns {Object} { isValid: boolean, error?: string }
 */
export function validateName(name) {
    if (!name || !name.trim()) {
        return { isValid: false, error: 'Name is required' };
    }
    if (name.trim().length < 2) {
        return { isValid: false, error: 'Name must be at least 2 characters' };
    }
    return { isValid: true };
}

// ============================================
// Password Strength Calculation
// ============================================

/**
 * Calculate password strength score (0-4)
 * Checks for: length, lowercase, uppercase, numbers, special chars
 * 
 * @param {string} password - Password to evaluate
 * @returns {Object} { score: number, level: string }
 */
export function calculatePasswordStrength(password) {
    if (!password) return { score: 0, level: 'weak' };

    let score = 0;

    // Length checks (progressive scoring)
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    // Character variety checks
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++; // Mixed case
    if (/\d/.test(password)) score++;  // Has numbers
    if (/[^a-zA-Z0-9]/.test(password)) score++;  // Has special characters

    // Cap score at 4
    score = Math.min(score, 4);

    // Map score to strength level
    const levels = ['weak', 'weak', 'fair', 'good', 'strong'];

    return {
        score,
        level: levels[score],
    };
}

// ============================================
// Password Strength UI Configuration
// ============================================

/**
 * Visual styles for password strength meter
 * Used by PasswordStrengthMeter component
 */
export const STRENGTH_CONFIG = {
    // Background colors for strength bars
    colors: {
        weak: 'bg-red-500',
        fair: 'bg-amber-500',
        good: 'bg-green-400',
        strong: 'bg-green-500',
    },
    // Glow effect for strength bars
    glowShadow: {
        weak: 'shadow-[0_0_8px_rgba(239,68,68,0.5)]',
        fair: 'shadow-[0_0_8px_rgba(245,158,11,0.5)]',
        good: 'shadow-[0_0_8px_rgba(74,222,128,0.5)]',
        strong: 'shadow-[0_0_8px_rgba(34,197,94,0.6)]',
    },
    // Text labels with colors
    labels: {
        weak: { text: 'Weak', class: 'text-red-500' },
        fair: { text: 'Fair', class: 'text-amber-500' },
        good: { text: 'Good', class: 'text-green-400' },
        strong: { text: 'Strong', class: 'text-green-500' },
    },
};
