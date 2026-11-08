/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "rgba(241, 237, 228, 0.12)",
        input: "rgba(241, 237, 228, 0.12)",
        ring: "rgba(241, 237, 228, 0.12)",
        background: "#101010",
        foreground: "#F1EDE4",
        secondary: "#181818",
        surface: "#222222",
        muted: "#A9A49A",
        accent: "#B49A70",
      },
    },
  },
  plugins: [],
}