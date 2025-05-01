// tailwind.config.mjs
export default {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            50:  '#f4f0fe',
            100: '#e6dbfd',
            200: '#cbb8fa',
            300: '#ae93f6',
            400: '#976ff1',
            500: '#7c4ee4',
            600: '#643dbe',
            700: '#4c2f97',
            800: '#36226e',
            900: '#211643',
          },
          gray: {
            50:  '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
          },
          black: '#000000',
          white: '#ffffff',
        },
      },
    },
    plugins: [],
  };
  