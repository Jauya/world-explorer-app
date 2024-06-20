/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#062b3a',
                secondary: '#f22d4c',
                page: '#f5f5f4',
                card: '#fefffe',
                placeholder:'#9ba9af'
            },
            fontFamily: {
                poppins: ['Poppins', 'Helvetica', 'Arial', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
