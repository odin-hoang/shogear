/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  theme: {
    // Define your custom CSS variables as Tailwind CSS classes
    extend: {
      screens: {
        min: "400px",
        sm: "640px", // Đặt mức độ cho breakpoint sm
        md: "768px", // Đặt mức độ cho breakpoint md
        lg: "1024px", // Đặt mức độ cho breakpoint lg
        xl: "1280px", // Đặt mức độ cho breakpoint xl
      },
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
        side: {
          default: "#ea1c04",
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
        overflow: "0px 5px 15px rgba(0, 0, 0, 0.35)",
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
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};

// tailwind.config.js
