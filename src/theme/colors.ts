/**
 * High contrast color system designed for seniors
 * No gray-on-gray, no blue/purple combinations
 */

export const Colors = {
  // Primary colors - high contrast only
  white: '#FFFFFF',
  black: '#000000',
  
  // Result colors with high contrast
  dangerRed: '#D32F2F',      // RED for definite scams
  warningYellow: '#F9A825',  // YELLOW for suspicious
  safeGreen: '#388E3C',      // GREEN for appears safe
  
  // Background colors
  background: '#FFFFFF',
  cardBackground: '#F5F5F5',
  
  // Text colors - high contrast only
  textPrimary: '#000000',
  textSecondary: '#333333',
  
  // Button colors
  primaryButton: '#2196F3',   // Clear blue for primary actions
  secondaryButton: '#757575', // Dark gray for secondary actions
  disabledButton: '#BDBDBD',
  
  // Border colors
  border: '#000000',
  lightBorder: '#CCCCCC',
  
  // Status colors
  error: '#D32F2F',
  success: '#388E3C',
};

export default Colors;