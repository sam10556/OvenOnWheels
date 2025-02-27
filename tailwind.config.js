/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
          primary:'#ce3a22',
      },
      fontFamily: {
        ibm: ["var(--font-ibm)"],
        roboto: ["var(--font-roboto)"],
        hlo: ["var(--font-hlo)"],
      },
      animation: {
        'slow-spin': 'spin 6s linear infinite', // Slows down the spin
      },
    },
  },
  plugins: [],
};
