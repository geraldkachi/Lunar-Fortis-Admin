/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lf: {
          navy: "#0D1B2A",
          red: "#E8392A",
          gray: "#6B7280",
          border: "#E5E7EB",
          bg: "#F9FAFB",
          success: "#10B981",
          "success-bg": "#D1FAE5",
          pending: "#F59E0B",
          "pending-bg": "#FEF3C7",
          rejected: "#EF4444",
          "rejected-bg": "#FEE2E2",
          approved: "#10B981",
          "approved-bg": "#D1FAE5",
        },
      },
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      boxShadow: { modal: "0 8px 32px rgba(0,0,0,0.12)", card: "0 1px 4px rgba(0,0,0,0.06)" },
    },
  },
  plugins: [],
};
