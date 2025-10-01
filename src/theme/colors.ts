/**
 * Premium color system designed for seniors - warm, trustworthy, accessible
 * Inspired by Apple's design language with warm, approachable tones
 */

export const Colors = {
  // Base colors - sophisticated neutrals
  white: '#FFFFFF',
  black: '#1A1A1A',
  pureBlack: '#000000',
  
  // Result colors - clear, high contrast with warm undertones
  dangerRed: '#E53E3E',        // Warm red for scams
  dangerRedLight: '#FED7D7',   // Light red background
  dangerRedDark: '#C53030',    // Darker red for emphasis
  warningYellow: '#D69E2E',    // Warm amber for suspicious
  warningYellowLight: '#FEF5E7', // Light amber background
  warningYellowDark: '#B7791F',
  safeGreen: '#38A169',        // Warm green for safe
  safeGreenLight: '#C6F6D5',   // Light green background
  safeGreenDark: '#2F855A',
  
  // Background colors - warm, sophisticated
  background: '#FAFAFA',       // Warm off-white
  backgroundSecondary: '#F7F7F7', // Slightly deeper
  cardBackground: '#FFFFFF',   // Pure white with subtle shadows
  surface: '#FFFFFF',          // Elevated surfaces
  
  // Text colors - warm, high contrast
  textPrimary: '#2D3748',      // Warm dark gray
  textSecondary: '#4A5568',    // Medium warm gray
  textTertiary: '#718096',     // Light warm gray
  textInverse: '#FFFFFF',      // White text for dark backgrounds
  
  // Primary brand colors - trustworthy blue
  primary: '#3182CE',          // Warm, trustworthy blue
  primaryLight: '#EBF8FF',     // Light blue background
  primaryDark: '#2C5282',      // Darker blue
  primaryAccent: '#63B3ED',    // Lighter accent blue
  
  // Button colors - sophisticated and accessible
  buttonPrimary: '#3182CE',    // Primary blue
  buttonSecondary: '#EDF2F7',  // Light gray
  buttonDanger: '#E53E3E',     // Danger red
  buttonSuccess: '#38A169',    // Success green
  buttonDisabled: '#CBD5E0',   // Disabled state
  
  // Accent colors - warm, premium
  accentGold: '#D69E2E',       // Warm gold for premium features
  accentPurple: '#805AD5',     // Purple for special features
  accentTeal: '#319795',       // Teal for secondary actions
  accentOrange: '#DD6B20',     // Orange for alerts
  
  // Border colors - subtle, refined
  border: '#E2E8F0',          // Light border
  borderMedium: '#CBD5E0',    // Medium border
  borderDark: '#A0AEC0',      // Darker border
  borderFocus: '#3182CE',     // Focus state
  
  // Shadow colors - soft, natural
  shadowLight: 'rgba(0, 0, 0, 0.04)',
  shadowMedium: 'rgba(0, 0, 0, 0.08)',
  shadowDark: 'rgba(0, 0, 0, 0.12)',
  shadowCard: 'rgba(0, 0, 0, 0.06)',
  
  // Status colors - clear and warm
  error: '#E53E3E',
  errorLight: '#FED7D7',
  success: '#38A169',
  successLight: '#C6F6D5',
  warning: '#D69E2E',
  warningLight: '#FEF5E7',
  info: '#3182CE',
  infoLight: '#EBF8FF',
  
  // Premium colors - sophisticated indigo
  premium: '#6366F1',
  premiumLight: '#E0E7FF',
  premiumDark: '#4338CA',
};

// Premium gradient definitions
export const Gradients = {
  primary: ['#3182CE', '#2C5282'],
  primaryLight: ['#63B3ED', '#3182CE'],
  danger: ['#E53E3E', '#C53030'],
  dangerLight: ['#FC8181', '#E53E3E'],
  warning: ['#D69E2E', '#B7791F'],
  warningLight: ['#F6E05E', '#D69E2E'],
  success: ['#38A169', '#2F855A'],
  successLight: ['#68D391', '#38A169'],
  premium: ['#6366F1', '#4338CA'],
  premiumLight: ['#A5B4FC', '#6366F1'],
  background: ['#FAFAFA', '#F7F7F7'],
  card: ['#FFFFFF', '#FAFAFA'],
};

// Sophisticated shadow presets
export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: Colors.shadowLight,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: Colors.shadowMedium,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: Colors.shadowDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
  },
  xl: {
    shadowColor: Colors.shadowDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  card: {
    shadowColor: Colors.shadowCard,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
  },
  button: {
    shadowColor: Colors.shadowMedium,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 4,
  },
  premium: {
    shadowColor: Colors.premium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
};

export default Colors;