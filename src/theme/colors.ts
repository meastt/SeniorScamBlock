/**
 * Elder Sentry Color System
 *
 * Philosophy: Warm, protective, trustworthy
 * - Teal primary: Professional shield/protection symbolism
 * - Warm grays: Comfortable, not clinical
 * - Gold premium: Traditional value signaling
 * - Clear severity hierarchy: success → warning → danger → critical
 *
 * WCAG AAA Compliance:
 * - textPrimary: 16.5:1 contrast ratio
 * - textSecondary: 7.2:1 contrast ratio
 * - textTertiary: 4.6:1 (large text only, 18px+)
 *
 * Usage:
 * - Use 'danger' for scam alerts (serious but controlled)
 * - Use 'critical' for immediate action required (STOP)
 * - Use 'warning' for suspicious activity (be cautious)
 * - Use 'success' for verified safe messages
 * - Use 'verified' for highly trusted sources
 * - Use 'neutral' for unknown/uncertain states
 */

export const Colors = {
  // Base
  white: '#FFFFFF',
  black: '#1C1917', // Warm black, not pure black

  // Backgrounds - warm neutral grays
  background: '#FAF9F7', // Warm off-white
  backgroundSecondary: '#FFFFFF',
  backgroundTertiary: '#F5F3F0', // Subtle warm tint

  // Text - All WCAG AAA compliant on white
  textPrimary: '#1C1917', // 16.5:1 ratio ✓
  textSecondary: '#57534E', // 7.2:1 ratio ✓
  textTertiary: '#78716C', // 4.6:1 ratio ✓ (large text only)
  textInverse: '#FFFFFF',

  // Primary brand - Warm, trustworthy teal (like a protective shield)
  primary: '#0F766E', // Deep teal - professional, protective
  primaryHover: '#0D5F58',
  primaryLight: '#CCFBF1',
  primaryDark: '#134E4A',

  // Danger - CRITICAL scam alerts
  danger: '#B91C1C', // Deep red - serious, not playful
  dangerHover: '#991B1B',
  dangerLight: '#FEE2E2',
  dangerDark: '#7F1D1D',

  // Critical - Even more urgent than danger
  critical: '#DC2626', // Brighter red for STOP EVERYTHING
  criticalLight: '#FEF2F2',
  criticalDark: '#991B1B',

  // Warning - Suspicious activity
  warning: '#CA8A04', // Warm amber - caution without panic
  warningHover: '#A16207',
  warningLight: '#FEF9C3',
  warningDark: '#854D0E',

  // Success - Verified safe
  success: '#15803D', // Warm green - reassuring
  successHover: '#166534',
  successLight: '#DCFCE7',
  successDark: '#14532D',

  // Verified - Extra safe, trusted source
  verified: '#16A34A', // Brighter green - confident
  verifiedLight: '#F0FDF4',
  verifiedDark: '#15803D',

  // Neutral - Unknown/uncertain
  neutral: '#6B7280', // Balanced gray - neither good nor bad
  neutralLight: '#F3F4F6',
  neutralDark: '#374151',

  // Info - Educational content
  info: '#0891B2', // Cyan - informative but friendly
  infoLight: '#CFFAFE',
  infoDark: '#155E75',

  // Premium - Gold tones for value
  premium: '#CA8A04', // Rich gold - signals quality
  premiumHover: '#A16207',
  premiumLight: '#FEF9C3',
  premiumDark: '#854D0E',
  premiumAccent: '#F59E0B', // Brighter gold for highlights

  // Gradients for modern visual hierarchy
  gradientPrimary: ['#0F766E', '#134E4A'],
  gradientPremium: ['#CA8A04', '#F59E0B'],
  gradientSuccess: ['#15803D', '#16A34A'],
  gradientCard: ['#FFFFFF', '#FAF9F7'],

  // Modern shadows for depth
  shadowSoft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  shadowStrong: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },

  // Interactive elements
  buttonPrimary: '#0F766E',
  buttonPrimaryHover: '#0D5F58',
  buttonSecondary: '#F5F3F0',
  buttonSecondaryHover: '#E7E5E4',
  buttonDisabled: '#D6D3D1',

  // Borders - Unified warm gray family
  border: '#E7E5E4',
  borderMedium: '#D6D3D1',
  borderDark: '#A8A29E',
  borderFocus: '#0F766E',

  // Dark mode variants (for future use)
  dark: {
    background: '#1C1917',
    backgroundSecondary: '#292524',
    backgroundTertiary: '#44403C',
    textPrimary: '#FAFAF9',
    textSecondary: '#D6D3D1',
    textTertiary: '#A8A29E',
    border: '#44403C',
    borderMedium: '#57534E',
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