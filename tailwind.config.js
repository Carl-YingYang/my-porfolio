/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // 👈 ITO YUNG PINAKA-IMPORTANTE
    ],
    theme: {
        extend: {
            colors: {
                background: '#09090b',
                surface: '#18181b',
                primary: '#f4f4f5',
                secondary: '#a1a1aa',
                accent: '#3b82f6',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            }
        },
    },
    plugins: [],
}