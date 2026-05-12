/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  safelist: [
    // Color combinations used dynamically via template literals
    { pattern: /(bg|text|border|from|to|via)-(cyan|purple|pink|yellow|green|orange|rose|blue|emerald|red|slate)-(50|100|200|300|400|500|600|700|800|900)/, variants: ['hover', 'group-hover'] },
    { pattern: /(bg|text|border)-(cyan|purple|pink|yellow|green|orange|rose|blue|emerald|red|slate)-(400|500)\/(10|20|30|40)/, variants: ['hover', 'group-hover'] },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
