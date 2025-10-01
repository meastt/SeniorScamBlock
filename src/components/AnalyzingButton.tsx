import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { SeniorButton } from './SeniorButton';

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
  const animatedValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isAnalyzing) {
      // Start subtle pulsing animation
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedValue, {
            toValue: 0.7,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ])
      );

      pulseAnimation.start();

      return () => {
        pulseAnimation.stop();
      };
    } else {
      animatedValue.setValue(1);
    }
  }, [isAnalyzing, animatedValue]);

  const pulseOpacity = animatedValue;

  const title = isAnalyzing ? '🔄 Analyzing...' : '🔍 Check Message';

  return (
    <Animated.View
      style={{
        opacity: isAnalyzing ? pulseOpacity : 1,
      }}
    >
      <SeniorButton
        title={title}
        onPress={onPress}
        variant="primary"
        fullWidth
        disabled={disabled || isAnalyzing}
      />
    </Animated.View>
  );
};

export default AnalyzingButton;
