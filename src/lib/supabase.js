import { createClient } from '@supabase/supabase-js';

// ============================================
// Supabase Configuration
// ============================================

// Load credentials from environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate that environment variables are set
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn(
        'Supabase credentials not found. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file'
    );
}

// Initialize Supabase client (used across the app)
export const supabase = createClient(
    SUPABASE_URL || 'https://placeholder.supabase.co',
    SUPABASE_ANON_KEY || 'placeholder-key'
);

// ============================================
// Authentication Functions
// ============================================

/**
 * Register a new user with email and password
 * Also saves the user's full name in the metadata
 * 
 * @param {string} email - User's email address
 * @param {string} password - User's password (min 8 characters)
 * @param {string} fullName - User's display name
 * @returns {Object} { success: boolean, data?: object, error?: string }
 */
export async function signUp(email, password, fullName) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    avatar_url: null,
                },
            },
        });

        if (error) throw error;

        return {
            success: true,
            data,
            message: 'Account created successfully! Please check your email to verify.',
        };
    } catch (error) {
        return {
            success: false,
            error: getErrorMessage(error),
        };
    }
}

/**
 * Sign in an existing user with email and password
 * 
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Object} { success: boolean, data?: object, error?: string }
 */
export async function signIn(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;

        return {
            success: true,
            data,
            message: 'Logged in successfully!',
        };
    } catch (error) {
        return {
            success: false,
            error: getErrorMessage(error),
        };
    }
}

/**
 * Sign out the current user
 * Clears session from browser and Supabase
 */
export async function signOut() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: getErrorMessage(error),
        };
    }
}



/**
 * Get the currently logged in user
 * Returns null if no user is authenticated
 */
export async function getCurrentUser() {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        return user;
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
}

/**
 * Subscribe to authentication state changes
 * Useful for updating UI when user logs in/out
 * 
 * @param {function} callback - Called with (event, session) on auth changes
 * @returns {function} Unsubscribe function
 */
export function onAuthStateChange(callback) {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
    return () => subscription.unsubscribe();
}

// ============================================
// Helper Functions
// ============================================

/**
 * Convert Supabase error codes to user-friendly messages
 */
function getErrorMessage(error) {
    const errorMessages = {
        'Invalid login credentials': 'Invalid email or password. Please try again.',
        'Email not confirmed': 'Please verify your email before logging in.',
        'User already registered': 'An account with this email already exists.',
        'Password should be at least 6 characters': 'Password must be at least 8 characters long.',
        'Email rate limit exceeded': 'Too many attempts. Please try again later.',
    };

    // Return friendly message or original error
    return errorMessages[error.message] || error.message || 'An unexpected error occurred';
}
