/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,tsx}"],
  theme: {
    // Define your custom CSS variables as Tailwind CSS classes
    extend: {
      fontFamily: {
        sf: ["SF-Pro", "Arial", "sans-serif", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          default: "#E30019",
          900: " #BE1529",
        },
        secondary: {
          default: "#6D6E72",
        },
        sub: {
          default: "#1982F9",
        },
        state: {
          info: "#1982F9",
          success: "#24B400",
          warning: "#FDD835",
          error: "#E30019",
          question: "#FF8A00",
        },
        text: {
          default: "#111111",
        },
        title: {
          default: "#333333",
        },
        hover: {
          default: "#E30019",
        },
        lineBorder: {
          default: "#CFCFCF",
        },
        textLink: {
          default: "#0568d6",
        },
        bodyBg: {
          default: "#ECECEC",
          loading: "rgba(255, 255, 255, 0.5)",
        },
        price: {
          default: "#2c3c4d",
        },
        oldPrice: {
          default: "#e2231a",
        },
        newPrice: {
          default: "#E30019",
        },
        inputBg: {
          default: "#f6f7fa",
          active: "var(--color-body-bg)",
        },
        inputText: {
          default: "#2c3c4d",
        },
        inputFill: {
          default: "#CFCFCF",
          success: "#1E9800",
          error: "#E30019",
        },
      },
      boxShadow: {
        custom: "0px 4px 20px rgba(22, 19, 69, 0.13)",
      },
      borderRadius: {
        custom: "10px",
        input: "4px",
        button: "4px",
        badge1: "3px",
        badge2: "16px",
        checkbox: "4px",
        image: "4px",
        labelPercent: "2px",
        progress: "16px",
      },
      backgroundColor: {
        "home-coupon-bg": "#ffffff",
        "home-coupon-light": "#ffffff",
      },
      borderColor: {
        "home-coupon-border": "#f8d0d3",
      },
      textColor: {
        placeholder: "#757575",
        "home-coupon-text": "#333333",
        textcolor: "#111111",
        maincolor: "#E30019",
        titlecolor: "#333333",
        hovercolor: "#E30019",
        bordercolor: "#CFCFCF",
      },
    },
  },
  plugins: [require("daisyui")],
};

// tailwind.config.js
