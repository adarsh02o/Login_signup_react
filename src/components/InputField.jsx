import { useState } from 'react';

/**
 * InputField Component
 * Premium minimalist input with floating label transition
 * and refined focus states
 */
export default function InputField({
    type = 'text',
    id,
    name,
    label,
    placeholder,
    icon,
    value,
    onChange,
    onFocus,
    error,
    autoComplete,
    showPasswordToggle = false,
    className = '',
    staggerClass = '',
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputType = showPasswordToggle
        ? (showPassword ? 'text' : 'password')
        : type;

    const hasError = !!error;

    return (
        <div className={`group relative field-reveal ${staggerClass}`}>
            {/* Label */}
            <label
                htmlFor={id}
                className={`block text-xs font-medium mb-1.5 transition-colors duration-200
                          ${hasError ? 'text-red-500' : 'text-slate-500 dark:text-gray-400 group-focus-within:text-blue-500'}`}
            >
                {label}
            </label>

            <div className="relative">
                {/* Icon */}
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200
                              ${isFocused ? 'text-blue-500' : 'text-slate-400 dark:text-slate-500'}`}>
                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                </div>

                {/* Input */}
                <input
                    type={inputType}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={(e) => {
                        setIsFocused(true);
                        onFocus?.(e);
                    }}
                    onBlur={() => setIsFocused(false)}
                    className={`block w-full rounded-xl border-0 py-3 pl-10 pr-10 text-slate-900 ring-1 ring-inset transition duration-200 ease-in-out sm:text-sm sm:leading-6
                            ${hasError
                            ? 'bg-red-50/50 ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 dark:bg-red-900/10 dark:ring-red-900'
                            : 'bg-slate-50/50 ring-slate-200 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:bg-white/5 dark:ring-white/10 dark:text-white dark:focus:bg-white/10 dark:focus:ring-blue-500'
                        } ${className}`}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                />

                {/* Password Toggle */}
                {showPasswordToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            {showPassword ? 'visibility' : 'visibility_off'}
                        </span>
                    </button>
                )}
            </div>

            {/* Error Message with slide-down animation */}
            {error && (
                <p className="mt-1.5 text-xs text-red-500 animate-[slideDown_0.2s_ease-out]">
                    {error}
                </p>
            )}
        </div>
    );
}
