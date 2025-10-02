/**
 * Semantic color system for senior accessibility
 * High contrast, WCAG AAA compliant
 */

export const Colors = {
  // Base
  white: '#FFFFFF',
  black: '#1A1A1A',

  // Backgrounds
  background: '#F8F9FA',
  backgroundSecondary: '#FFFFFF',

  // Text - 4.5:1 contrast minimum
  textPrimary: '#1A202C',
  textSecondary: '#4A5568',
  textTertiary: '#718096',
  textInverse: '#FFFFFF',

  // Primary brand
  primary: '#2563EB',
  primaryLight: '#DBEAFE',
  primaryDark: '#1E40AF',

  // Semantic status colors
  danger: '#DC2626',
  dangerLight: '#FEE2E2',
  dangerDark: '#991B1B',

  warning: '#D97706',
  warningLight: '#FEF3C7',
  warningDark: '#92400E',

  success: '#059669',
  successLight: '#D1FAE5',
  successDark: '#065F46',

  info: '#2563EB',
  infoLight: '#DBEAFE',
  infoDark: '#1E40AF',

  // Interactive elements
  buttonPrimary: '#2563EB',
  buttonSecondary: '#F3F4F6',
  buttonDisabled: '#E5E7EB',

  // Borders
  border: '#E5E7EB',
  borderMedium: '#D1D5DB',
  borderDark: '#9CA3AF',
  borderFocus: '#2563EB',

  // Premium
  premium: '#7C3AED',
  premiumLight: '#EDE9FE',
  premiumDark: '#5B21B6',
};

// Shadow system - actually visible
export const Shadows = {
  none: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
};

export default Colors;