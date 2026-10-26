export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        canvas: '#F3F1EC',
        surface: '#FFFFFF',
        subtle: '#F7F6F2',
        ink: '#15211C',
        muted: '#5D6A64',
        line: '#E2DED5',
        brand: { DEFAULT: '#0D6B4E', dark: '#08503A', soft: '#E2F0E9' },
        urgent: { DEFAULT: '#C42B1C', dark: '#A12215', soft: '#FBE8E5' },
        warn: { DEFAULT: '#9A5205', soft: '#FCEFD9' },
        ok: { DEFAULT: '#167A3F', soft: '#E1F3E7' },
      },
    },
  },
};
