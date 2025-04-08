/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            color: "oklch(var(--foreground))",
            a: { color: "oklch(var(--primary))" },
            strong: { color: "oklch(var(--foreground))", fontWeight: "bolder" },
            h1: { color: "oklch(var(--foreground))" },
            h2: { color: "oklch(var(--foreground))" },
            h3: { color: "oklch(var(--foreground))" },
            code: { color: "oklch(var(--accent))" },
          },
        },
        invert: {
          css: {
            color: "oklch(var(--foreground))",
            a: { color: "oklch(var(--primary))" },
            strong: { color: "oklch(var(--foreground))", fontWeight: "bolder" },
            h1: { color: "oklch(var(--foreground))" },
            h2: { color: "oklch(var(--foreground))" },
            h3: { color: "oklch(var(--foreground))" },
            code: { color: "oklch(var(--accent))" },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
