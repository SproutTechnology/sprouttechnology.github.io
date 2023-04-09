/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            spacing: {
                128: '32rem',
            }
        },
        colors: {
            "living-room": "#E5DBD1",
            "night-sky": "#1C1C1C",
            "fresh-curtains": "#EEEEEEE",
            "clean-sheets": "#FFFFFF"

        },

        fontFamily: {
            'font-sen': ['Sen', 'sans-serif']
        },
        fontSize: {
            "large-title": ['12rem'],
            "small-title": ["4rem"],
            "ingress": ["1.5rem", "2.75rem"],
            "paragraph": ["1.125rem", "1.5rem"],
            "caption": ["0.75rem", "1rem"]
        },
        extend: {

        },
    },
    plugins: [
        plugin(function({ addBase, theme }) {
            addBase({
                'h1': { fontSize: theme('fontSize.large-title') },
                'h2': { fontSize: theme('fontSize.small-title') },
                "p": { fontSize: theme('fontSize.paragraph') }
            })
        })
    ]
}