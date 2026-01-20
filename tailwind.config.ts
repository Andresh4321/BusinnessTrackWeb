module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#f9fafb',
        foreground: '#111827',
        card: '#ffffff',
        muted: '#f3f4f6',
        'muted-foreground': '#6b7280',
        'primary-foreground': '#ffffff',
        destructive: '#ef4444',
        'destructive-foreground': '#ffffff',
        success: '#22c55e',
        warning: '#facc15',
        primary: '#3b82f6',
        border: '#e5e7eb',
        sidebar: '#ffffff',
        'sidebar-border': '#e5e7eb',
        'sidebar-foreground': '#111827',
        'sidebar-accent': '#f3f4f6',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      },
      animation: {
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
      },
      keyframes: {
        slideInLeft: {
          from: {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        fadeIn: {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        scaleIn: {
          from: {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          to: {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
};
