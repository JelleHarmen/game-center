// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      serif: ['Texturina', 'serif'],
    },
    extend: {
      colors: {
        primary: '#48a3be',
        secondary: '#e96e50',
        danger: 'rgb(245, 15, 15)',
      },
    },

    cursor: {
      grab: 'grab',
    },
  },

  plugins: [],
};
