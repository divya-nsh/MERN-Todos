/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fade 0.2s ease-in-out",
        "fadeIn-0.3": "fade 0.3s ease-in-out",
        "fadeIn-0.4": "fade 0.4s ease-in-out",
      },
    },
  },

  plugins: [],
};
