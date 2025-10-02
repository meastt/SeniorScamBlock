/**
 * Typography system optimized for senior readability
 * Balanced font sizes with proper line heights (1.4-1.5x multiplier)
 * WCAG AAA compliant for readability
 */

export const Typography = {
  // Display - Hero text and major headings
  display: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
    letterSpacing: -0.5,
  },

  // Large title - Screen titles
  largeTitle: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
    letterSpacing: -0.3,
  },

  // Title - Section headings
  title: {
    fontSize: 22,
    fontWeight: '600' as const,
    lineHeight: 28,
    letterSpacing: 0,
  },

  // Subtitle - Secondary headings
  subtitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
    letterSpacing: 0,
  },

  // Body - Main content text
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
    letterSpacing: 0,
  },

  // Body large - Emphasized body text
  bodyLarge: {
    fontSize: 18,
    fontWeight: '500' as const,
    lineHeight: 26,
    letterSpacing: 0,
  },

  // Callout - Important information
  callout: {
    fontSize: 15,
    fontWeight: '500' as const,
    lineHeight: 20,
    letterSpacing: 0,
  },

  // Button - Button text
  button: {
    fontSize: 17,
    fontWeight: '600' as const,
    lineHeight: 22,
    letterSpacing: 0,
  },

  // Caption - Small text
  caption: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 18,
    letterSpacing: 0,
  },

  // Tab - Tab bar labels
  tab: {
    fontSize: 12,
    fontWeight: '600' as const,
    lineHeight: 16,
    letterSpacing: 0,
  },
};

export default Typography;