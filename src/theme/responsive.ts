import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

/**
 * Responsive design utilities for better cross-device support
 * Optimized for iPhone, iPad, and various Android devices
 */

export const Responsive = {
  // Screen dimensions
  screenWidth,
  screenHeight,
  
  // Device type detection
  isTablet: screenWidth >= 768,
  isLargeScreen: screenWidth >= 1024,
  isSmallScreen: screenWidth < 375,
  
  // Responsive spacing multipliers
  spacing: {
    xs: screenWidth < 375 ? 0.8 : screenWidth > 768 ? 1.2 : 1,
    sm: screenWidth < 375 ? 0.8 : screenWidth > 768 ? 1.3 : 1,
    md: screenWidth < 375 ? 0.9 : screenWidth > 768 ? 1.4 : 1,
    lg: screenWidth < 375 ? 0.9 : screenWidth > 768 ? 1.5 : 1,
    xl: screenWidth < 375 ? 1 : screenWidth > 768 ? 1.6 : 1,
  },
  
  // Responsive font scaling
  fontScale: {
    xs: screenWidth < 375 ? 0.9 : screenWidth > 768 ? 1.1 : 1,
    sm: screenWidth < 375 ? 0.9 : screenWidth > 768 ? 1.15 : 1,
    md: screenWidth < 375 ? 0.95 : screenWidth > 768 ? 1.2 : 1,
    lg: screenWidth < 375 ? 0.95 : screenWidth > 768 ? 1.25 : 1,
    xl: screenWidth < 375 ? 1 : screenWidth > 768 ? 1.3 : 1,
  },
  
  // Responsive margins
  getScreenMargin: () => {
    if (screenWidth < 375) return 16; // Small phones
    if (screenWidth > 768) return Math.min(screenWidth * 0.08, 120); // Tablets
    return 20; // Standard phones
  },
  
  // Responsive card width
  getCardWidth: () => {
    if (screenWidth < 375) return screenWidth - 32;
    if (screenWidth > 768) return Math.min(screenWidth * 0.7, 600);
    return screenWidth - 40;
  },
  
  // Responsive button height
  getButtonHeight: () => {
    if (screenWidth < 375) return 64;
    if (screenWidth > 768) return 80;
    return 72;
  },
  
  // Responsive icon size
  getIconSize: (baseSize: number) => {
    const multiplier = screenWidth < 375 ? 0.9 : screenWidth > 768 ? 1.2 : 1;
    return baseSize * multiplier;
  },
};

export default Responsive;
