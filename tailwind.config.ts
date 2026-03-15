import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#14b8a6',
                    hover: '#0d9488',
                    light: '#f0fdfa',
                },
                accent: '#f43f5e',
                text: {
                    main: '#1e293b',
                    muted: '#64748b',
                },
                bg: {
                    DEFAULT: '#ffffff',
                    secondary: '#f1f5f9',
                },
            },
            backgroundImage: {
                'primary-gradient': 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                'splash-gradient': 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            },
            borderRadius: {
                'input': '0.75rem',  // 12px - for input fields
                'card': '1.25rem',   // 20px - for cards
                'button': '1.5rem',  // 24px - for buttons
                'xl': '1rem',
                '2xl': '1.25rem',
                '3xl': '1.5rem',
                '4xl': '2rem',
            },
            boxShadow: {
                'primary': '0 10px 25px -5px rgba(20, 184, 166, 0.1), 0 8px 10px -6px rgba(20, 184, 166, 0.1)',
                'primary-lg': '0 20px 25px -5px rgba(20, 184, 166, 0.4)',
                'card': '0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                'mobile': '0 50px 100px -20px rgba(0, 0, 0, 0.15)',
            },
            transitionTimingFunction: {
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
            transitionDuration: {
                '400': '400ms',
            },
            fontFamily: {
                sans: ['Outfit', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            },
            spacing: {
                'safe-top': 'env(safe-area-inset-top)',
                'safe-bottom': 'env(safe-area-inset-bottom)',
                'safe-left': 'env(safe-area-inset-left)',
                'safe-right': 'env(safe-area-inset-right)',
            },
        },
    },
    plugins: [],
};

export default config;
