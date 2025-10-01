/**
 * Modern, high-contrast color system designed for seniors
 * Professional gradients and enhanced visual polish
 */

export const Colors = {
  // Primary colors - high contrast
  white: '#FFFFFF',
  black: '#000000',
  
  // Result colors with high contrast
  dangerRed: '#DC2626',      // RED for definite scams
  dangerRedDark: '#991B1B',  // Darker red for gradients
  warningYellow: '#F59E0B',  // YELLOW for suspicious
  warningYellowDark: '#D97706',
  safeGreen: '#10B981',      // GREEN for appears safe
  safeGreenDark: '#047857',
  
  // Background colors - modern with depth
  background: '#F9FAFB',      // Soft off-white
  cardBackground: '#FFFFFF',   // Pure white cards
  screenBackground: '#F3F4F6', // Subtle gray for depth
  
  // Text colors - high contrast
  textPrimary: '#111827',     // Almost black
  textSecondary: '#4B5563',   // Medium gray
  textTertiary: '#6B7280',    // Light gray for hints
  
  // Button colors - vibrant and modern
  primaryButton: '#3B82F6',   // Bright blue
  primaryButtonDark: '#2563EB', // Darker blue for gradient
  secondaryButton: '#6B7280', // Medium gray
  disabledButton: '#D1D5DB',
  
  // Accent colors
  accentPurple: '#8B5CF6',
  accentOrange: '#F97316',
  accentTeal: '#14B8A6',
  
  // Border colors
  border: '#E5E7EB',          // Soft gray border
  borderDark: '#9CA3AF',      // Darker borders
  borderFocus: '#3B82F6',     // Blue focus state
  
  // Shadow colors
  shadowLight: 'rgba(0, 0, 0, 0.05)',
  shadowMedium: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.2)',
  
  // Status colors
  error: '#DC2626',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
};

// Gradient definitions for modern UI
export const Gradients = {
  primary: ['#3B82F6', '#2563EB'],
  danger: ['#DC2626', '#991B1B'],
  warning: ['#F59E0B', '#D97706'],
  success: ['#10B981', '#047857'],
  purple: ['#8B5CF6', '#7C3AED'],
  background: ['#F9FAFB', '#F3F4F6'],
};

// Shadow presets
export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
};

export default Colors;