import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

/**
 * Screenshot Analysis Service
 * Allows users to take screenshots of suspicious messages and analyze them
 * Perfect for elderly users who find it easier to take screenshots than copy/paste
 */

export interface ScreenshotAnalysisOptions {
  allowsEditing?: boolean;
  aspect?: [number, number];
  quality?: number;
}

/**
 * Request camera roll permissions
 */
export const requestCameraRollPermissions = async (): Promise<boolean> => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting camera roll permissions:', error);
    return false;
  }
};

/**
 * Launch image picker for screenshot analysis
 */
export const pickScreenshotForAnalysis = async (): Promise<string | null> => {
  try {
    // Check permissions first
    const hasPermission = await requestCameraRollPermissions();
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Elder Sentry needs access to your photos to analyze screenshots of suspicious messages.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Settings', onPress: () => ImagePicker.requestMediaLibraryPermissionsAsync() }
        ]
      );
      return null;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.8,
      base64: false,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      return result.assets[0].uri;
    }

    return null;
  } catch (error) {
    console.error('Error picking image:', error);
    Alert.alert('Error', 'Could not access your photos. Please try again.');
    return null;
  }
};

/**
 * Take a new photo for analysis
 */
export const takePhotoForAnalysis = async (): Promise<string | null> => {
  try {
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Elder Sentry needs camera access to take photos of suspicious messages.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Settings', onPress: () => ImagePicker.requestCameraPermissionsAsync() }
        ]
      );
      return null;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.8,
      base64: false,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      return result.assets[0].uri;
    }

    return null;
  } catch (error) {
    console.error('Error taking photo:', error);
    Alert.alert('Error', 'Could not access the camera. Please try again.');
    return null;
  }
};

/**
 * Show action sheet for screenshot analysis options
 */
export const showScreenshotOptions = (): Promise<'camera' | 'library' | 'cancel'> => {
  return new Promise((resolve) => {
    Alert.alert(
      'Analyze Screenshot',
      'Choose how you\'d like to analyze a suspicious message:',
      [
        {
          text: 'Take Photo',
          onPress: () => resolve('camera'),
        },
        {
          text: 'Choose from Photos',
          onPress: () => resolve('library'),
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
 * Process screenshot analysis
 * This would integrate with OCR and AI analysis
 * For now, returns a placeholder result
 */
export const analyzeScreenshot = async (imageUri: string): Promise<any> => {
  // TODO: Implement OCR to extract text from image
  // TODO: Integrate with AI analysis service
  // For now, return a placeholder
  
  return {
    success: true,
    extractedText: 'Screenshot analysis coming soon! This feature will automatically read text from your photos and analyze it for scams.',
    imageUri,
  };
};

