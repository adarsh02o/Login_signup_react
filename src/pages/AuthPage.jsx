import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import Logo from '../components/Logo';
import GlassCard from '../components/GlassCard';
import ThemeToggle from '../components/ThemeToggle';
import InputField from '../components/InputField';
import SocialButtons from '../components/SocialButtons';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import TrustBadge from '../components/TrustBadge';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, validatePassword, validateName } from '../lib/validation';

/**
 * AuthPage Component - Premium Redesign
 * Handles user login and registration with a high-end aesthetic
 */
export default function AuthPage() {
    const navigate = useNavigate();
    const { signUp, signIn, loading } = useAuth();

    const [view, setView] = useState('signup');
    const [formError, setFormError] = useState('');

    // Signup form state
    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: '',
        terms: false,
    });
    const [signupErrors, setSignupErrors] = useState({});

    // Login form state
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const [loginErrors, setLoginErrors] = useState({});

    const handleSignupChange = (field) => (e) => {
        const value = field === 'terms' ? e.target.checked : e.target.value;
        setSignupData(prev => ({ ...prev, [field]: value }));
    };

    const handleLoginChange = (field) => (e) => {
        setLoginData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const clearFieldError = (form, field) => {
        if (form === 'signup') {
            setSignupErrors(prev => ({ ...prev, [field]: '' }));
        } else {
            setLoginErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        const errors = {};

        const nameResult = validateName(signupData.name);
        if (!nameResult.isValid) errors.name = nameResult.error;

        const emailResult = validateEmail(signupData.email);
        if (!emailResult.isValid) errors.email = emailResult.error;

        const passwordResult = validatePassword(signupData.password);
        if (!passwordResult.isValid) errors.password = passwordResult.error;

        if (!signupData.terms) errors.terms = 'You must agree to the terms';

        setSignupErrors(errors);

        if (Object.keys(errors).length > 0) return;

        const result = await signUp(signupData.email, signupData.password, signupData.name);

        if (result.success) {
            localStorage.setItem('osa-hr-user-name', signupData.name.trim());
            navigate('/success');
        } else {
            setFormError(result.error);
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        const errors = {};

        const emailResult = validateEmail(loginData.email);
        if (!emailResult.isValid) errors.email = emailResult.error;

        const passwordResult = validatePassword(loginData.password);
        if (!passwordResult.isValid) errors.password = passwordResult.error;

        setLoginErrors(errors);

        if (Object.keys(errors).length > 0) return;

        const result = await signIn(loginData.email, loginData.password);

        if (result.success) {
            navigate('/success');
        } else {
            setFormError(result.error);
        }
    };

    const switchToLogin = (e) => {
        e.preventDefault();
        setView('login');
        setFormError('');
    };

    const switchToSignup = (e) => {
        e.preventDefault();
        setView('signup');
        setFormError('');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 font-sans antialiased overflow-x-hidden relative
                      bg-slate-50 text-slate-800 selection:bg-blue-500/20
                      dark:bg-[#05050A] dark:text-white dark:selection:bg-blue-500/30">

            <AnimatedBackground />

            {/* Main Container - z-10 to sit above background */}
            <div className="w-full max-w-[440px] flex flex-col items-center gap-6 sm:gap-8 z-10 relative">

                <Logo />

                <GlassCard className="mt-2 text-center">
                    <ThemeToggle />

                    {/* Signup Form */}
                    {view === 'signup' && (
                        <div className="view-transition">
                            <header className="mb-8 text-center field-reveal">
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2
                                             text-slate-900 dark:text-white">
                                    Join Now
                                </h1>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Create your professional account
                                </p>
                            </header>

                            <form onSubmit={handleSignupSubmit} className="flex flex-col gap-5 text-left" noValidate>
                                {formError && (
                                    <div className="form-error-banner bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-xl animate-shake">
                                        {formError}
                                    </div>
                                )}

                                <InputField
                                    type="text"
                                    id="name"
                                    name="name"
                                    label="Full Name"
                                    placeholder="John Doe"
                                    icon="person"
                                    value={signupData.name}
                                    onChange={handleSignupChange('name')}
                                    onFocus={() => clearFieldError('signup', 'name')}
                                    error={signupErrors.name}
                                    autoComplete="name"
                                    staggerClass="stagger-1"
                                />

                                <InputField
                                    type="email"
                                    id="email"
                                    name="email"
                                    label="Email Address"
                                    placeholder="name@company.com"
                                    icon="mail"
                                    value={signupData.email}
                                    onChange={handleSignupChange('email')}
                                    onFocus={() => clearFieldError('signup', 'email')}
                                    error={signupErrors.email}
                                    autoComplete="email"
                                    staggerClass="stagger-2"
                                />

                                <div className="stagger-3">
                                    <InputField
                                        type="password"
                                        id="password"
                                        name="password"
                                        label="Password"
                                        placeholder="Min. 8 characters"
                                        icon="lock"
                                        value={signupData.password}
                                        onChange={handleSignupChange('password')}
                                        onFocus={() => clearFieldError('signup', 'password')}
                                        error={signupErrors.password}
                                        showPasswordToggle={true}
                                        autoComplete="new-password"
                                    />
                                    {/* Password Strength Meter - Only show when typing */}
                                    {signupData.password && (
                                        <div className="mt-3">
                                            <PasswordStrengthMeter password={signupData.password} />
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-start gap-3 mt-1 stagger-4">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="terms"
                                            name="terms"
                                            type="checkbox"
                                            checked={signupData.terms}
                                            onChange={handleSignupChange('terms')}
                                            className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 bg-transparent"
                                        />
                                    </div>
                                    <div className="text-xs sm:text-sm">
                                        <label htmlFor="terms" className="font-medium text-slate-700 dark:text-slate-300">
                                            I agree to the <a href="#" className="text-blue-500 hover:text-blue-600">Terms of Service</a> and <a href="#" className="text-blue-500 hover:text-blue-600">Privacy Policy</a>
                                        </label>
                                        {signupErrors.terms && (
                                            <p className="mt-1 text-red-500 text-xs">{signupErrors.terms}</p>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-2 w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-sm font-semibold text-white 
                                             bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#0F1016]
                                             disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30
                                             stagger-5"
                                >
                                    {loading ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>

                                <div className="relative my-4 stagger-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-slate-200 dark:border-white/10"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white dark:bg-[#0F1016] px-2 text-slate-400 dark:text-slate-500">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>

                                <div className="stagger-7">
                                    <SocialButtons />
                                </div>

                                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4 stagger-7">
                                    Already have an account?{' '}
                                    <button
                                        onClick={switchToLogin}
                                        className="font-semibold text-blue-500 hover:text-blue-400 transition-colors"
                                    >
                                        Log In
                                    </button>
                                </p>
                            </form>
                        </div>
                    )}

                    {/* Login Form */}
                    {view === 'login' && (
                        <div className="view-transition">
                            <header className="mb-8 text-center field-reveal">
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2
                                             text-slate-900 dark:text-white">
                                    Welcome Back
                                </h1>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Enter your credentials to access your account
                                </p>
                            </header>

                            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5 text-left" noValidate>
                                {formError && (
                                    <div className="form-error-banner bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-xl animate-shake">
                                        {formError}
                                    </div>
                                )}

                                <InputField
                                    type="email"
                                    id="login-email"
                                    name="email"
                                    label="Email Address"
                                    placeholder="name@company.com"
                                    icon="mail"
                                    value={loginData.email}
                                    onChange={handleLoginChange('email')}
                                    onFocus={() => clearFieldError('login', 'email')}
                                    error={loginErrors.email}
                                    autoComplete="username"
                                    staggerClass="stagger-1"
                                />

                                <div className="stagger-2">
                                    <InputField
                                        type="password"
                                        id="login-password"
                                        name="password"
                                        label="Password"
                                        placeholder="Enter your password"
                                        icon="lock"
                                        value={loginData.password}
                                        onChange={handleLoginChange('password')}
                                        onFocus={() => clearFieldError('login', 'password')}
                                        error={loginErrors.password}
                                        showPasswordToggle={true}
                                        autoComplete="current-password"
                                    />
                                    <div className="flex justify-end mt-2">
                                        <a href="#" className="text-xs font-medium text-blue-500 hover:text-blue-400 transition-colors">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-2 w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-sm font-semibold text-white 
                                             bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#0F1016]
                                             disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30
                                             stagger-3"
                                >
                                    {loading ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    ) : (
                                        'Log In'
                                    )}
                                </button>

                                <div className="relative my-4 stagger-4">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-slate-200 dark:border-white/10"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white dark:bg-[#0F1016] px-2 text-slate-400 dark:text-slate-500">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>

                                <div className="stagger-5">
                                    <SocialButtons />
                                </div>

                                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4 stagger-5">
                                    Don't have an account?{' '}
                                    <button
                                        onClick={switchToSignup}
                                        className="font-semibold text-blue-500 hover:text-blue-400 transition-colors"
                                    >
                                        Sign Up
                                    </button>
                                </p>
                            </form>
                        </div>
                    )}
                </GlassCard>

                <TrustBadge />
            </div>
        </div>
    );
}
