/**
 * Refined typography system for seniors
 * Large, readable fonts with responsive design
 * Optimized for accessibility and premium feel across all devices
 */

export const Typography = {
  // Display - Hero text and major headings
  display: {
    fontSize: 36,
    fontWeight: '700' as const,
    lineHeight: 44,
    letterSpacing: -0.3,
  },
  
  // Large title - Screen titles
  largeTitle: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
    letterSpacing: -0.2,
  },
  
  // Title - Section headings
  title: {
    fontSize: 26,
    fontWeight: '600' as const,
    lineHeight: 34,
    letterSpacing: -0.1,
  },
  
  // Subtitle - Secondary headings
  subtitle: {
    fontSize: 22,
    fontWeight: '600' as const,
    lineHeight: 30,
    letterSpacing: 0,
  },
  
  // Body - Main content text
  body: {
    fontSize: 18,
    fontWeight: '400' as const,
    lineHeight: 26,
    letterSpacing: 0,
  },
  
  // Body large - Emphasized body text
  bodyLarge: {
    fontSize: 20,
    fontWeight: '500' as const,
    lineHeight: 28,
    letterSpacing: 0,
  },
  
  // Callout - Important information
  callout: {
    fontSize: 18,
    fontWeight: '500' as const,
    lineHeight: 26,
    letterSpacing: 0,
  },
  
  // Button - Button text
  button: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 26,
    letterSpacing: 0.1,
  },
  
  // Caption - Small text
  caption: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 22,
    letterSpacing: 0.1,
  },
  
  // Tab - Tab bar labels
  tab: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
    letterSpacing: 0.1,
  },
  
  // Result - Large result display
  result: {
    fontSize: 48,
    fontWeight: '700' as const,
    lineHeight: 56,
    letterSpacing: -0.3,
  },
  
  // Price - Pricing display
  price: {
    fontSize: 42,
    fontWeight: '700' as const,
    lineHeight: 50,
    letterSpacing: -0.2,
  },
};

export default Typography;