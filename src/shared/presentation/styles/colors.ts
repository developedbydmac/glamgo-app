/**
 * GLAMGO Color System
 * 
 * Brand colors for GLAMGO beauty supply delivery app
 * Based on BRAND_GUIDELINES.md
 */

export const colors = {
  // Primary Brand Colors
  primary: {
    purple: '#4A2663',      // Royal Purple - Main brand color
    purpleLight: '#6B3D8F', // Lighter purple for hover states
    purpleDark: '#2E1640',  // Darker purple for emphasis
  },

  // Accent Colors
  accent: {
    gold: '#C9A961',        // Gold - Premium accent
    goldLight: '#DCC18A',   // Light gold for backgrounds
    goldDark: '#B39440',    // Dark gold for text
  },

  // Neutral Colors
  neutral: {
    cream: '#F5EFE6',       // Cream - Background
    white: '#FFFFFF',       // Pure white
    black: '#000000',       // Pure black
    gray100: '#F7F7F7',     // Lightest gray
    gray200: '#E5E5E5',     // Light gray
    gray300: '#D4D4D4',     // Medium-light gray
    gray400: '#A3A3A3',     // Medium gray
    gray500: '#737373',     // Medium-dark gray
    gray600: '#525252',     // Dark gray
    gray700: '#404040',     // Darker gray
    gray800: '#262626',     // Very dark gray
    gray900: '#171717',     // Almost black
  },

  // Semantic Colors
  semantic: {
    success: '#22C55E',     // Green - Success states
    warning: '#F59E0B',     // Amber - Warning states
    error: '#EF4444',       // Red - Error states
    info: '#3B82F6',        // Blue - Info states
  },

  // UI Colors
  ui: {
    background: '#F5EFE6',  // Main background (cream)
    surface: '#FFFFFF',     // Card/surface backgrounds
    border: '#E5E5E5',      // Border color
    divider: '#D4D4D4',     // Divider lines
    overlay: 'rgba(0, 0, 0, 0.5)', // Modal overlays
  },

  // Text Colors
  text: {
    primary: '#171717',     // Primary text (almost black)
    secondary: '#525252',   // Secondary text (dark gray)
    disabled: '#A3A3A3',    // Disabled text (medium gray)
    inverse: '#FFFFFF',     // Text on dark backgrounds
    link: '#4A2663',        // Link text (brand purple)
  },

  // Status Colors (for order tracking, etc.)
  status: {
    pending: '#F59E0B',     // Amber
    processing: '#3B82F6',  // Blue
    confirmed: '#8B5CF6',   // Purple
    preparing: '#EC4899',   // Pink
    ready: '#10B981',       // Emerald
    outForDelivery: '#6366F1', // Indigo
    delivered: '#22C55E',   // Green
    cancelled: '#EF4444',   // Red
  },
};

// Export individual color palettes for convenience
export const { primary, accent, neutral, semantic, ui, text, status } = colors;

// Default export
export default colors;
