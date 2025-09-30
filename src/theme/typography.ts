/**
 * Typography system designed for seniors 75+
 * Minimum 24pt body text, 36pt headlines, 72pt results
 * 1.5x line spacing throughout
 */

export const Typography = {
  // Result display - MASSIVE
  result: {
    fontSize: 72,
    fontWeight: '700' as const,
    lineHeight: 108, // 1.5x
    letterSpacing: 0,
  },
  
  // Headlines
  headline: {
    fontSize: 36,
    fontWeight: '700' as const,
    lineHeight: 54, // 1.5x
    letterSpacing: 0,
  },
  
  // Subheadline
  subheadline: {
    fontSize: 28,
    fontWeight: '600' as const,
    lineHeight: 42, // 1.5x
    letterSpacing: 0,
  },
  
  // Body text - minimum 24pt
  body: {
    fontSize: 24,
    fontWeight: '400' as const,
    lineHeight: 36, // 1.5x
    letterSpacing: 0,
  },
  
  // Button text
  button: {
    fontSize: 28,
    fontWeight: '600' as const,
    lineHeight: 42, // 1.5x
    letterSpacing: 0,
  },
  
  // Tab labels
  tab: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 30, // 1.5x
    letterSpacing: 0,
  },
};

export default Typography;