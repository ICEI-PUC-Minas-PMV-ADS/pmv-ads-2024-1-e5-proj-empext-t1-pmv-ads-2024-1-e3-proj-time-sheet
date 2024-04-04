/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.jsx',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        'primary-100': '#9ABEA4',
        'primary-200': '#59A093',
        'primary-400': '#345255',
        'primary-600': '#1E3F42',
        'primary-800': '#102D30',
        'surface-100': "#F5F7FA",
        'surface-200': "#EEF2F7",
        'surface-400': "#E6ECF4",
        'surface-600': "#CFD7E2",
        'surface-800': "#AAB1BC",
        'text-100': "#F2F6FF",
        'text-200': "#C3CAD9",
        'text-400': "#98A0B3",
        'text-600': "#4E5668",
        'text-800': "#282C36",
        'sucess-100': "#EBFFF8",
        'sucess-200': "#A9FBE0",
        'sucess-400': "#6AF7C8",
        'sucess-600': "#17E5A1",
        'sucess-800': "#00BD7E",
        'warning-100': "#FFF8EB",
        'warning-200': "#FBE0A9",
        'warning-400': "#F7C86A",
        'warning-600': "#FFB41F",
        'warning-800': "#E39F17",
        'danger-100': "#FFF3F2",
        'danger-200': "#FBB3AE",
        'danger-400': "#F7766D",
        'danger-600': "#F52C1D",
        'danger-800': "#C92014",
        'information-100': "#F2FFFF",
        'information-200': "#AEFBFB",
        'information-400': "#77F7F7",
        'information-600': "#0EE5E5",
        'information-800': "#2EC9C9",
      }
    },
  },
  plugins: [],
}

