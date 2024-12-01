/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            sans: ["Lato", "sans-serif"],
        },
        extend: {
            colors: {
                lblue: "#BEE3E2",
                dblue: "#ADD9D8",
                mblue: "#06A19D"
            },
        },
        container: {
            center: true,
        },
    },
    plugins: [],
};
