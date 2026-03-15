'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <div className="mb-6">
                {label && (
                    <label className="block mb-2 font-medium text-text-main text-sm">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`w-full py-4 px-5 rounded-xl border border-gray-200 bg-gray-50 outline-none transition-all duration-400 text-base focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''
                        } ${className}`}
                    {...props}
                />
                {error && (
                    <p className="mt-2 text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
