import { useState, useCallback } from 'react';
import { signUp as supabaseSignUp, signIn as supabaseSignIn } from '../lib/supabase';

/**
 * useAuth Hook
 * Handles authentication operations with Supabase
 * Manages loading state and error messages
 * 
 * @returns {Object} { signUp, signIn, loading, error }
 */
export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Register a new user
     * @param {string} email - User's email address
     * @param {string} password - User's password
     * @param {string} fullName - User's display name
     */
    const signUp = useCallback(async (email, password, fullName) => {
        setLoading(true);
        setError(null);

        const result = await supabaseSignUp(email, password, fullName);

        setLoading(false);
        if (!result.success) {
            setError(result.error);
        }
        return result;
    }, []);

    /**
     * Sign in an existing user
     * @param {string} email - User's email address
     * @param {string} password - User's password
     */
    const signIn = useCallback(async (email, password) => {
        setLoading(true);
        setError(null);

        const result = await supabaseSignIn(email, password);

        setLoading(false);
        if (!result.success) {
            setError(result.error);
        }
        return result;
    }, []);

    return { signUp, signIn, loading, error };
}
