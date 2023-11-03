/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                background: '#e7ecef',
                primary: '#8492A6',
                'custom-red': '#D13F4A',
                'custom-green': '#83B435',
                'light-green': '#059669',
                'light-gray': '#EDF2F9',
            },
        },
    },
    plugins: [],
};
