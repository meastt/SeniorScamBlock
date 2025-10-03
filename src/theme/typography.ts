/**
 * Typography System - Accessible + Sophisticated
 *
 * Scale designed for senior readability without sacrificing elegance
 * - Generous sizing: 18px minimum for body text
 * - Clear hierarchy through weight + size contrast
 * - Optimized line heights for comfortable reading
 * - WCAG AAA compliant contrast ratios
 */

export const Typography = {
  // Display - Hero text, major headings (34px)
  display: {
    fontSize: 34,
    fontWeight: '700' as const,
    lineHeight: 42,
    letterSpacing: -0.5,
  },

  // Title Large - Screen titles, important headings (24px)
  titleLarge: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
    letterSpacing: -0.2,
  },

  // Title - Section headings, card titles (20px)
  title: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
    letterSpacing: 0,
  },

  // Body Large - Emphasized content, key information (19px)
  bodyLarge: {
    fontSize: 19,
    fontWeight: '400' as const,
    lineHeight: 28,
    letterSpacing: 0,
  },

  // Body - Main content, default text (18px - senior optimized)
  body: {
    fontSize: 18,
    fontWeight: '400' as const,
    lineHeight: 27,
    letterSpacing: 0,
  },

  // Body Medium - Secondary content (17px)
  bodyMedium: {
    fontSize: 17,
    fontWeight: '400' as const,
    lineHeight: 26,
    letterSpacing: 0,
  },

  // Caption - Metadata, hints, labels (15px)
  caption: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 22,
    letterSpacing: 0,
  },

  // Aliases for backward compatibility (all map to core 4)
  headline: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 48,
    letterSpacing: -0.5,
  },
  largeTitle: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 48,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
    letterSpacing: 0,
  },
  subheadline: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
    letterSpacing: 0,
  },
  bodyLarge: {
    fontSize: 17,
    fontWeight: '500' as const,
    lineHeight: 26,
    letterSpacing: 0,
  },
  callout: {
    fontSize: 17,
    fontWeight: '500' as const,
    lineHeight: 26,
    letterSpacing: 0,
  },
  button: {
    fontSize: 17,
    fontWeight: '600' as const,
    lineHeight: 26,
    letterSpacing: 0,
  },
  tab: {
    fontSize: 17,
    fontWeight: '600' as const,
    lineHeight: 26,
    letterSpacing: 0,
  },
};

export default Typography;