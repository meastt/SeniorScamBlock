import { Alert, Platform } from 'react-native';

// Check if we're in Expo Go (where native modules might not be available)
const isExpoGo = Platform.OS === 'web' || (Platform.OS === 'ios' && !__DEV__);

/**
 * Voice Input Service
 * Provides voice-to-text functionality for seniors who prefer speaking over typing
 * Makes scam checking more accessible and intuitive
 */

// Conditionally import Voice - fallback for Expo Go
let Voice: any = null;
try {
  if (!isExpoGo) {
    Voice = require('@react-native-voice/voice');
  }
} catch (error) {
  console.warn('Voice module not available in this environment');
}

/**
 * Voice Input Service
 * Provides voice-to-text functionality for seniors who prefer speaking over typing
 * Makes scam checking more accessible and intuitive
 */

export interface VoiceInputOptions {
  language?: string;
  timeout?: number;
  showPartialResults?: boolean;
}

export interface VoiceResult {
  success: boolean;
  text: string;
  confidence?: number;
  error?: string;
}

/**
 * Initialize voice recognition
 */
export const initializeVoiceRecognition = async (): Promise<boolean> => {
  try {
    if (isExpoGo || !Voice) {
      Alert.alert(
        'Voice Recognition Not Available',
        'Voice recognition requires a development build. Please use text input or try the web version.',
        [{ text: 'OK' }]
      );
      return false;
    }

    // Check if voice recognition is available
    const isAvailable = await Voice.isAvailable();
    if (!isAvailable) {
      Alert.alert(
        'Voice Recognition Not Available',
        'Voice recognition is not available on this device. Please use text input instead.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error initializing voice recognition:', error);
    return false;
  }
};

/**
 * Start voice recognition
 */
export const startVoiceRecognition = (
  onResult: (result: VoiceResult) => void,
  onError: (error: string) => void,
  options: VoiceInputOptions = {}
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (isExpoGo || !Voice) {
        onError('Voice recognition requires a development build. Please use text input instead.');
        reject(new Error('Voice recognition not available'));
        return;
      }

      // Initialize voice recognition
      const isAvailable = await initializeVoiceRecognition();
      if (!isAvailable) {
        reject(new Error('Voice recognition not available'));
        return;
      }

      // Set up event listeners
      Voice.onSpeechStart = () => {
        console.log('Voice recognition started');
      };

      Voice.onSpeechEnd = () => {
        console.log('Voice recognition ended');
      };

      Voice.onSpeechResults = (e) => {
        if (e.value && e.value.length > 0) {
          const text = e.value[0];
          const confidence = e.confidence ? e.confidence[0] : undefined;

          onResult({
            success: true,
            text: text.trim(),
            confidence,
          });
        } else {
          onResult({
            success: false,
            text: '',
            error: 'No speech detected. Please try again.',
          });
        }
      };

      Voice.onSpeechError = (e) => {
        console.error('Voice recognition error:', e.error);
        onError(e.error?.message || 'Voice recognition failed');
      };

      // Start recognition
      await Voice.start(options.language || 'en-US');
      resolve();
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      reject(error);
    }
  });
};

/**
 * Stop voice recognition
 */
export const stopVoiceRecognition = async (): Promise<void> => {
  try {
    await Voice.stop();
    await Voice.destroy();
  } catch (error) {
    console.error('Error stopping voice recognition:', error);
  }
};

/**
 * Check if voice recognition is currently active
 */
export const isVoiceRecognitionActive = (): boolean => {
  if (isExpoGo || !Voice) {
    return false;
  }
  return Voice.isRecognizing();
};

/**
 * Show voice input options dialog
 */
export const showVoiceInputOptions = (): Promise<'voice' | 'text' | 'cancel'> => {
  return new Promise((resolve) => {
    Alert.alert(
      'How would you like to input the message?',
      'Choose your preferred method:',
      [
        {
          text: '🎤 Speak (Voice)',
          onPress: () => resolve('voice'),
        },
        {
          text: '✏️ Type (Text)',
          onPress: () => resolve('text'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => resolve('cancel'),
        },
      ]
    );
  });
};

/**
 * Request microphone permissions
 */
export const requestMicrophonePermissions = async (): Promise<boolean> => {
  try {
    // Voice recognition typically handles permissions automatically
    // This is a placeholder for any additional permission checks
    return true;
  } catch (error) {
    console.error('Error requesting microphone permissions:', error);
    return false;
  }
};