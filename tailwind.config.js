/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,md}'],
  theme: {
    extend: {
      colors: {
        creamCanvas: 'var(--color-cream-canvas)',
        purePaper: 'var(--color-pure-paper)',
        linenBorder: 'var(--color-linen-border)',
        stoneMist: 'var(--color-stone-mist)',
        warmAsh: 'var(--color-warm-ash)',
        driftwood: 'var(--color-driftwood)',
        bark: 'var(--color-bark)',
        espresso: 'var(--color-espresso)',
        amberSignal: 'var(--color-amber-signal)',
        burnishedGold: 'var(--color-burnished-gold)',
        terracotta: 'var(--color-terracotta)',
        wisteria: 'var(--color-wisteria)',
        honeyWash: 'var(--color-honey-wash)'
      },
      spacing: {
        4: 'var(--spacing-4)',
        5: 'var(--spacing-5)',
        6: 'var(--spacing-6)',
        7: 'var(--spacing-7)',
        8: 'var(--spacing-8)',
        12: 'var(--spacing-12)',
        16: 'var(--spacing-16)',
        20: 'var(--spacing-20)',
        28: 'var(--spacing-28)',
        30: 'var(--spacing-30)',
        32: 'var(--spacing-32)',
        40: 'var(--spacing-40)',
        48: 'var(--spacing-48)',
        56: 'var(--spacing-56)',
        63: 'var(--spacing-63)',
        105: 'var(--spacing-105)'
      },
      borderRadius: {
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)'
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        'sm-2': 'var(--shadow-sm-2)'
      },
      fontFamily: {
        interphases: ['var(--font-interphases-pro-variable)']
      }
    }
  },
  plugins: []
};
