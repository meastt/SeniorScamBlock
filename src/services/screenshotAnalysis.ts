import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import TesseractOcr from 'react-native-tesseract-ocr';

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
 * Process screenshot analysis with OCR
 * Extracts text from images and analyzes for scams
 */
export const analyzeScreenshot = async (imageUri: string): Promise<any> => {
  try {
    console.log('Starting OCR analysis for:', imageUri);
    
    // Extract text using OCR
    const extractedText = await TesseractOcr.recognize(imageUri, 'LANG_ENGLISH', {
      logger: (m) => console.log('OCR Progress:', m),
    });
    
    console.log('OCR extracted text:', extractedText);
    
    if (!extractedText || extractedText.trim().length === 0) {
      return {
        success: false,
        extractedText: '',
        imageUri,
        error: 'No text could be read from the image. Please try with a clearer photo.',
      };
    }
    
    return {
      success: true,
      extractedText: extractedText.trim(),
      imageUri,
      confidence: 'high', // Could be enhanced with confidence scores
    };
  } catch (error) {
    console.error('OCR analysis error:', error);
    return {
      success: false,
      extractedText: '',
      imageUri,
      error: 'Could not read text from the image. Please try again with a clearer photo.',
    };
  }
};

