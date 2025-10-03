import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { SeniorButton } from './SeniorButton';
import { Gradients, Animations, AnimationDurations } from '../theme/gradients';

interface AnalyzingButtonProps {
  isAnalyzing: boolean;
  onPress: () => void;
  disabled?: boolean;
}

/**
 * Animated analyzing button with gradient animation
 * Shows clear visual feedback that analysis is in progress
 */
export const AnalyzingButton: React.FC<AnalyzingButtonProps> = ({
  isAnalyzing,
  onPress,
  disabled = false,
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isAnalyzing) {
      // Start gentle pulsing animation for analyzing state
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseValue, {
            toValue: 1.05,
            duration: AnimationDurations.slow,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseValue, {
            toValue: 0.95,
            duration: AnimationDurations.slow,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );

      // Subtle breathing effect
      const breatheAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1.02,
            duration: AnimationDurations.verySlow,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 0.98,
            duration: AnimationDurations.verySlow,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );

      pulseAnimation.start();
      breatheAnimation.start();

      return () => {
        pulseAnimation.stop();
        breatheAnimation.stop();
      };
    } else {
      // Reset to normal state
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: AnimationDurations.fast,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isAnalyzing]);

  const title = isAnalyzing ? '🔄 Analyzing...' : '🔍 Check Message';

  return (
    <Animated.View
      style={{
        transform: [
          { scale: isAnalyzing ? pulseValue : scaleValue },
        ],
        opacity: isAnalyzing ? 0.9 : 1,
      }}
    >
      <SeniorButton
        title={title}
        onPress={onPress}
        variant={isAnalyzing ? "secondary" : "primary"}
        fullWidth
        disabled={disabled || isAnalyzing}
      />
    </Animated.View>
  );
};

export default AnalyzingButton;
