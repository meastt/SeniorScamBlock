/**
 * Responsive spacing system for senior-friendly design
 * Balanced spacing that works across all screen sizes
 */

export const Spacing = {
  // Micro spacing
  xs: 4,
  sm: 8,
  md: 12,
  
  // Base spacing
  base: 16,
  lg: 20,
  xl: 24,
  
  // Large spacing
  xxl: 32,
  xxxl: 40,
  
  // Extra large spacing
  huge: 48,
  massive: 64,
  enormous: 80,
  
  // Screen layout - responsive margins
  screenHorizontal: 20, // Reduced from 24 for better balance
  screenVertical: 24,   // Reduced from 32
  screenPadding: 20,
  
  // Component spacing - more reasonable
  cardPadding: 20,      // Reduced from 24
  cardPaddingLarge: 24, // Reduced from 32
  sectionSpacing: 32,   // Reduced from 40
  
  // Button dimensions - still accessible but not oversized
  buttonHeight: 72,     // Reduced from 88
  buttonHeightSmall: 56, // Reduced from 64
  buttonMinWidth: 72,   // Reduced from 88
  buttonPadding: 20,    // Reduced from 24
  
  // Icon sizes - more proportional
  iconTiny: 16,
  iconSmall: 20,
  iconMedium: 24,
  iconLarge: 28,        // Reduced from 32
  iconXLarge: 36,       // Reduced from 40
  iconHuge: 44,         // Reduced from 48
  iconMassive: 56,      // Reduced from 64
  iconEnormous: 72,     // Reduced from 80
  
  // Touch targets - still accessible
  minTouchTarget: 72,   // Reduced from 88
  comfortableTouchTarget: 80, // Reduced from 96
  
  // Border radius - refined
  radiusSmall: 8,
  radiusMedium: 12,
  radiusLarge: 16,
  radiusXLarge: 20,
  radiusHuge: 24,
  radiusRound: 9999,
};

export default Spacing;