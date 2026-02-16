/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'hero-bg',
    'about-hero-bg', 
    'contact-hero-bg',
    'projects-hero-bg'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f1f8e9",
          100: "#dcedc8",
          200: "#c5e1a5",
          300: "#aed581",
          400: "#9ccc65",
          500: "#8bc34a",
          600: "#2E7D32",
          700: "#1B5E20",
          800: "#2e7d32",
          900: "#1b5e20",
          950: "#0d2818",
        },
        "primary-light": "#4CAF50",
        "primary-dark": "#1B5E20",
        secondary: {
          50: "#f3e5f5",
          100: "#e1bee7",
          200: "#ce93d8",
          300: "#ba68c8",
          400: "#ab47bc",
          500: "#9c27b0",
          600: "#8e24aa",
          700: "#7b1fa2",
          800: "#6a1b9a",
          900: "#4a148c",
          950: "#311b92",
        },
        "gray-tech": "#546E7A",
        "gray-dark": "#263238",
        white: "#FFFFFF",
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030712",
        },
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        info: "#3b82f6",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Montserrat", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
        "144": "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "soft": "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        "medium": "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "hard": "0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        "glow": "0 0 20px rgba(46, 125, 50, 0.3)",
        "glow-lg": "0 0 40px rgba(46, 125, 50, 0.4)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-in-left": "slideInLeft 0.6s ease-out",
        "slide-in-right": "slideInRight 0.6s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse-slow": "pulseSlow 2s ease-in-out infinite",
        "bounce-gentle": "bounceGentle 2s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(-5px)" },
          "50%": { transform: "translateY(0)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        "3xl": "1600px",
      },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
    function({ addUtilities, addComponents, theme }) {
      // Custom utilities
      addUtilities({
        ".text-shadow": {
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
        },
        ".text-shadow-lg": {
          textShadow: "0 4px 8px rgba(0,0,0,0.2)",
        },
        ".backface-hidden": {
          backfaceVisibility: "hidden",
        },
        ".transform-gpu": {
          transform: "translate3d(0,0,0)",
        },
        ".will-change-transform": {
          willChange: "transform",
        },
        ".will-change-opacity": {
          willChange: "opacity",
        },
      });

      // Custom components
      addComponents({
        ".btn": {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.75rem 1.5rem",
          border: "1px solid transparent",
          fontSize: "1rem",
          fontWeight: "500",
          borderRadius: "0.75rem",
          transition: "all 0.3s",
          outline: "none",
          "&:focus": {
            ring: "2px",
            ringColor: "#10b981",
            ringOffset: "2px"
          },
          "&:disabled": {
            opacity: "0.5",
            cursor: "not-allowed"
          }
        },
        ".btn-sm": {
          padding: "0.5rem 1rem",
          fontSize: "0.875rem"
        },
        ".btn-lg": {
          padding: "1rem 2rem",
          fontSize: "1.125rem"
        },
        ".input": {
          display: "block",
          width: "100%",
          padding: "0.75rem 1rem",
          border: "1px solid #d1d5db",
          borderRadius: "0.75rem",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          "&::placeholder": {
            color: "#9ca3af"
          },
          "&:focus": {
            outline: "none",
            ring: "2px",
            ringColor: "#10b981",
            borderColor: "transparent"
          }
        },
        ".label": {
          display: "block",
          fontSize: "0.875rem",
          fontWeight: "500",
          color: "#374151",
          marginBottom: "0.5rem"
        },
        ".card": {
          backgroundColor: "#ffffff",
          borderRadius: "1rem",
          boxShadow: "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          border: "1px solid #f3f4f6"
        },
        ".card-hover": {
          "&:hover": {
            boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            transform: "translateY(-4px)"
          },
          transition: "all 0.3s"
        },
      });
    },
  ],
  darkMode: "class", // Soporte futuro para dark mode
}