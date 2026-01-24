/**
 * GLAMGO Typography System
 * 
 * Font families, sizes, weights, and line heights
 */

export const typography = {
  // Font families
  fontFamily: {
    primary: 'System',    // iOS: San Francisco, Android: Roboto
    heading: 'System',
    body: 'System',
    mono: 'Courier',
  },

  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 48,
  },

  // Font weights
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  // Text styles
  styles: {
    h1: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 1.4,
    },
    h4: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 1.4,
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 1.5,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 1.5,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 1.5,
    },
  },
};

export default typography;
