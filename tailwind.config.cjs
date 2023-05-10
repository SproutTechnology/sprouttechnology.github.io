/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            animation: {
                "fade": "fadeIn 4s ease-in-out",
            },
            backgroundImage: {
                'hero-pattern': "url('/src/assets/header.svg')",
                'hero-pattern-mobile' : "url('/src/assets/header_mobile.svg')",
                'footer': "url('/src/assets/footer.svg')",
            },

            width: {
                card: "clamp(10rem, 14cqi, 15rem)"
            },
            height: {
                card: 'clamp(12rem, 24cqi, 24rem)'
            },
            fontSize: {
                "large-title": "clamp(3rem, 10cqi, 8rem)",
                "small-title": "clamp(1rem, 2cqi, 2rem)",
                "medium-title": "clamp(3rem, 5cqi, 5rem)",

                ingress: ["1.5rem", "2.75rem"],
                paragraph: ["1.125rem", "1.5rem"],
                caption: ["0.75rem", "1rem"],
            },
            keyframes: (theme) => ({
                fadeIn: {
                    "0%": { opacity: "0%" },
                    "20%": { opacity: "0%" },
                    "100%": { opacity: "100%" },
                },
            }),

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


    },
    plugins: [

        require('@tailwindcss/container-queries'),
        plugin(function({ addBase, theme }) {
            addBase({
                h1: { fontSize: theme("fontSize.large-title"), color: theme('colors.living-room') },
                h2: { fontSize: theme('fontSize.small-title'), color: theme('colors.living-room') },
                h3: { fontSize: theme("fontSize.medium-title") },
                p: { fontSize: theme("fontSize.paragraph") },
            });
        }),
    ],
};