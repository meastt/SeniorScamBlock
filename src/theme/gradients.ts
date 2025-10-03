import { Colors } from './colors';

/**
 * Gradient utilities for modern visual hierarchy
 * Designed specifically for senior users with subtle, non-disorienting gradients
 */

export const Gradients = {
  // Primary action gradient - subtle depth for important buttons
  primary: {
    colors: Colors.gradientPrimary,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    locations: [0, 1],
  },

  // Premium upgrade gradient - warm, inviting gold
  premium: {
    colors: Colors.gradientPremium,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0.8 },
    locations: [0, 1],
  },

  // Success state gradient - reassuring green
  success: {
    colors: Colors.gradientSuccess,
    start: { x: 0, y: 0 },
    end: { x: 0.8, y: 1 },
    locations: [0, 1],
  },

  // Card background gradient - subtle depth
  card: {
    colors: Colors.gradientCard,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0.3 },
    locations: [0, 1],
  },

  // Hero section gradient - warm and welcoming
  hero: {
    colors: ['#FAF9F7', '#F5F3F0'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    locations: [0, 1],
  },
};

// Animation durations optimized for seniors (slightly slower for clarity)
export const AnimationDurations = {
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 800, // For major state changes
};

// Easing curves for smooth, non-jarring animations
export const AnimationEasings = {
  easeInOut: 'ease-in-out',
  easeOut: 'ease-out',
  easeIn: 'ease-in',
  bounce: 'bounce', // Very gentle bounce for positive feedback
};

// Animation presets for common interactions
export const Animations = {
  buttonPress: {
    duration: AnimationDurations.fast,
    easing: AnimationEasings.easeOut,
    scale: 0.98, // Subtle press feedback
  },
  cardHover: {
    duration: AnimationDurations.normal,
    easing: AnimationEasings.easeInOut,
    scale: 1.02, // Gentle lift effect
  },
  loadingPulse: {
    duration: AnimationDurations.slow,
    easing: AnimationEasings.easeInOut,
    scale: [1, 1.05, 1], // Gentle pulse
  },
  slideUp: {
    duration: AnimationDurations.normal,
    easing: AnimationEasings.easeOut,
    translateY: [-20, 0], // Smooth entrance
  },
  fadeIn: {
    duration: AnimationDurations.normal,
    easing: AnimationEasings.easeIn,
    opacity: [0, 1],
  },
};

export default Gradients;
