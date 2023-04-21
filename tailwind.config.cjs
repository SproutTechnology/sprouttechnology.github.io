/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            gridTemplateColumns: {
                'menu-grid': 'repeat(auto-fit, minmax(10rem, max-content))'
            },
            gridTemplateRows: {
                layout: "1fr 1fr 1fr",
            },
            spacing: {
                128: "32rem",
            },
        },
        colors: {
            "living-room": "#E5DBD1",
            "night-sky": "#1C1C1C",
            "charcoal": "#1D1D1D",
            "fresh-curtains": "#EEEEEE",
            "clean-sheets": "#FFFFFF",
        },

        fontFamily: {
            "font-sen": ["Sen", "sans-serif"],
        },
        fontSize: {
            "large-title": ["16rem"],
            "small-title": ["4rem"],
            ingress: ["1.5rem", "2.75rem"],
            paragraph: ["1.125rem", "1.5rem"],
            caption: ["0.75rem", "1rem"],
        },

    },
    plugins: [

        require('@tailwindcss/container-queries'),
        plugin(function({ addBase, theme }) {
            addBase({
                h1: { fontSize: theme("fontSize.large-title") },
                h2: { fontSize: theme("fontSize.small-title") },
                p: { fontSize: theme("fontSize.paragraph") },
            });
        }),
    ],
};