/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                lightPurple: "#B48DEE",
                blue: "#78CFFF",
                lightBlue: "#C1EEFF",
                yellow: "#FFCB50",
                gray: "#4C4E69",
                orange: "#B45700",
                teal: "#02616E",
                darkPurple: "#554E88",
                darkGray: "#252525",
            },
            fontFamily: {
                font: ["Questrial", "sans-serif"],
            },
        },
    },
    plugins: [],
};
