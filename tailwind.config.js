/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                skyDark: "#0F172A",
                skyCard: "#1E293B",
                skyBlue: "#60A5FA",
                skyPurple: "#A78BFA",
                skyText: "#E2E8F0",
            },
        },
    },
    plugins: [],
}