// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts}",  // ✅ Include Angular templates
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["emerald", "corporate", "night"], // ✅ NGO-friendly themes
  },
}