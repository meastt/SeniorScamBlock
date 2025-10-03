/**
 * Elder Sentry Color System - Professional Protection
 *
 * Philosophy: Trustworthy, sophisticated, accessible
 * - Warm neutrals create comfort without condescension
 * - Clear semantic hierarchy for instant understanding
 * - Subtle depth through elevation, not decoration
 * - WCAG AAA compliant with purposeful contrast
 */

export const Colors = {
  // Foundation
  white: '#FFFFFF',
  black: '#1A1A1A',

  // Backgrounds - Warm, inviting neutrals
  background: '#FAFBFC',
  backgroundSecondary: '#FFFFFF',
  backgroundElevated: '#FFFFFF',

  // Text - Clear, accessible hierarchy
  textPrimary: '#1A1A1A',
  textSecondary: '#5F6B7A',
  textTertiary: '#9CA3AF',
  textInverse: '#FFFFFF',

  // Brand - Trustworthy blue with warmth
  primary: '#0F766E', // Deep teal - professional, calming
  primaryLight: '#F0FDFA',
  primaryDark: '#134E4A',

  // Accent - Premium gold for highlights
  accent: '#B45309', // Warm amber - valued, protected
  accentLight: '#FEF3C7',
  accentDark: '#78350F',

  // Semantic States - Clear, immediate
  danger: '#DC2626', // Clear red - stop, danger
  dangerLight: '#FEF2F2',
  dangerDark: '#991B1B',

  warning: '#EA580C', // Alert orange - caution
  warningLight: '#FFF7ED',
  warningDark: '#9A3412',

  success: '#059669', // Confident green - safe
  successLight: '#F0FDF4',
  successDark: '#065F46',

  // UI Elements
  border: '#E5E7EB',
  borderMedium: '#D1D5DB',
  borderDark: '#9CA3AF',

  // Interactive
  buttonPrimary: '#0F766E',
  buttonSecondary: '#FFFFFF',
  buttonDisabled: '#F3F4F6',

  // Elevation System
  shadowSm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  shadowMd: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  shadowLg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 6,
  },

  // Aliases for backward compatibility
  backgroundTertiary: '#FAFBFC',
  lightBorder: '#E5E7EB',
  cardBackground: '#FFFFFF',
  shadowSoft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  shadowStrong: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 6,
  },
  primaryHover: '#1565C0',
  dangerHover: '#B71C1C',
  dangerDark: '#B71C1C',
  warningHover: '#E65100',
  warningDark: '#E65100',
  successHover: '#2E7D32',
  successDark: '#2E7D32',
  info: '#2196F3',
  infoLight: '#E3F2FD',
  infoDark: '#1565C0',
  premium: '#D4AF37',
  premiumLight: '#F8F3E3',
  premiumDark: '#9C7C1A',
  premiumHover: '#9C7C1A',
  premiumAccent: '#D4AF37',
  buttonPrimaryHover: '#1565C0',
  buttonSecondaryHover: '#F8F9FA',
  primaryButton: '#2196F3',
  secondaryButton: '#FFFFFF',
  disabledButton: '#E2E8F0',
  lightBorder: '#E2E8F0',
  borderMedium: '#CBD5E0',
  borderFocus: '#2196F3',
  cardBackground: '#F8F9FA',
  error: '#D32F2F',
  errorLight: '#FDECEA',
  dangerRed: '#D32F2F',
  dangerRedLight: '#FDECEA',
  warningYellow: '#F57C00',
  warningYellowLight: '#FFF3E0',
  warningYellowDark: '#E65100',
  safeGreen: '#388E3C',
  safeGreenLight: '#E8F5E9',
  gradientPrimary: ['#2196F3', '#1565C0'],
  gradientPremium: ['#D4AF37', '#9C7C1A'],
  gradientSuccess: ['#66BB6A', '#388E3C'],
  gradientCard: ['#FFFFFF', '#F8F9FA'],
  shadowStrong: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },

  // Dark theme - Senior-friendly (not too dark)
  dark: {
    // Base
    white: '#FFFFFF',
    black: '#000000',

    // Backgrounds - Comfortable dark for aging eyes
    background: '#2A2A2A',
    backgroundSecondary: '#3A3A3A',
    backgroundElevated: '#3A3A3A',

    // Text - High contrast
    textPrimary: '#FFFFFF',
    textSecondary: '#D1D5DB',
    textInverse: '#000000',

    // Primary accent
    primary: '#60A5FA',
    primaryLight: '#1E3A8A',
    primaryDark: '#3B82F6',

    // Secondary accent
    accent: '#FCD34D',
    accentLight: '#4A3A1A',
    accentDark: '#F59E0B',

    // Semantic: Danger
    danger: '#F87171',
    dangerLight: '#4A1A1A',

    // Semantic: Warning
    warning: '#FB923C',
    warningLight: '#4A2A1A',

    // Semantic: Success
    success: '#6EE7B7',
    successLight: '#1A4A2A',

    // Borders
    border: '#4B5563',
    borderMedium: '#6B7280',
    borderDark: '#6B7280',

    // Buttons
    buttonPrimary: '#60A5FA',
    buttonSecondary: '#3A3A3A',
    buttonDisabled: '#4B5563',

    // Aliases for backward compatibility
    backgroundTertiary: '#3A3A3A',
    textTertiary: '#D1D5DB',
    cardBackground: '#3A3A3A',
    primaryHover: '#3B82F6',
    dangerHover: '#EF4444',
    dangerDark: '#EF4444',
    warningHover: '#F97316',
    warningDark: '#F97316',
    successHover: '#10B981',
    successDark: '#10B981',
    info: '#60A5FA',
    infoLight: '#1E3A8A',
    infoDark: '#3B82F6',
    premium: '#FCD34D',
    premiumLight: '#4A3A1A',
    premiumDark: '#F59E0B',
    premiumHover: '#F59E0B',
    premiumAccent: '#FCD34D',
    buttonPrimaryHover: '#3B82F6',
    buttonSecondaryHover: '#4A4A4A',
    primaryButton: '#60A5FA',
    secondaryButton: '#3A3A3A',
    disabledButton: '#4B5563',
    lightBorder: '#4B5563',
    borderMedium: '#6B7280',
    borderFocus: '#60A5FA',
    error: '#F87171',
    errorLight: '#4A1A1A',
    dangerRed: '#F87171',
    dangerRedLight: '#4A1A1A',
    warningYellow: '#FB923C',
    warningYellowLight: '#4A2A1A',
    warningYellowDark: '#F97316',
    safeGreen: '#6EE7B7',
    safeGreenLight: '#1A4A2A',
  },
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