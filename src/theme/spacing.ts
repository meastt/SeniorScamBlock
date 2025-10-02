/**
 * Spacing system optimized for senior accessibility
 * Based on 8px grid with reasonable, not excessive, sizing
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

  // Screen layout
  screenHorizontal: 16,
  screenVertical: 16,
  screenPadding: 16,

  // Component spacing
  cardPadding: 16,
  cardPaddingLarge: 20,
  sectionSpacing: 24,

  // Button dimensions - accessible but not comical
  buttonHeight: 56,
  buttonHeightSmall: 44,
  buttonMinWidth: 120,
  buttonPadding: 16,

  // Icon sizes - proportional
  iconTiny: 16,
  iconSmall: 20,
  iconMedium: 24,
  iconLarge: 28,
  iconXLarge: 32,
  iconHuge: 40,
  iconMassive: 48,

  // Touch targets - WCAG AA compliant (44px minimum)
  minTouchTarget: 44,
  comfortableTouchTarget: 56,

  // Border radius
  radiusSmall: 6,
  radiusMedium: 8,
  radiusLarge: 12,
  radiusXLarge: 16,
  radiusRound: 9999,
};

export default Spacing;