import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';
import { analyzeScreenshot } from './screenshotAnalysis';
import { analyzeMessage } from './scamDetection';

/**
 * Auto Screenshot Detection Service
 * Automatically detects when users take screenshots and offers to analyze them
 * Perfect for seniors who take screenshots of suspicious messages
 */

export interface AutoScreenshotOptions {
  enabled: boolean;
  autoAnalyze: boolean;
  showNotification: boolean;
}

/**
 * Request media library permissions
 */
export const requestMediaLibraryPermissions = async (): Promise<boolean> => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting media library permissions:', error);
    return false;
  }
};

/**
 * Get the most recent screenshot from the media library
 */
export const getLatestScreenshot = async (): Promise<string | null> => {
  try {
    const hasPermission = await requestMediaLibraryPermissions();
    if (!hasPermission) {
      console.log('Media library permission not granted');
      return null;
    }

    // Get recent photos (last 10)
    const assets = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.photo,
      first: 10,
      sortBy: MediaLibrary.SortBy.creationTime,
    });

    // Find the most recent screenshot
    for (const asset of assets.assets) {
      // Check if it's a screenshot (common screenshot naming patterns)
      const filename = asset.filename.toLowerCase();
      if (
        filename.includes('screenshot') ||
        filename.includes('screen_shot') ||
        filename.includes('img_') ||
        asset.width > 0 && asset.height > 0 // Basic check for valid image
      ) {
        return asset.uri;
      }
    }

    return null;
  } catch (error) {
    console.error('Error getting latest screenshot:', error);
    return null;
  }
};

/**
 * Monitor for new screenshots and offer analysis
 */
export const startScreenshotMonitoring = (
  onNewScreenshot: (screenshotUri: string) => void,
  options: AutoScreenshotOptions = { enabled: true, autoAnalyze: false, showNotification: true }
): (() => void) => {
  if (!options.enabled) {
    return () => {}; // Return empty cleanup function
  }

  let lastCheckedTime = Date.now();
  let isMonitoring = true;

  const checkForNewScreenshots = async () => {
    if (!isMonitoring) return;

    try {
      const latestScreenshot = await getLatestScreenshot();
      if (latestScreenshot) {
        // Check if this is a new screenshot (created after we started monitoring)
        const asset = await MediaLibrary.getAssetInfoAsync(latestScreenshot);
        if (asset.creationTime && asset.creationTime > lastCheckedTime) {
          console.log('New screenshot detected:', latestScreenshot);
          onNewScreenshot(latestScreenshot);
        }
      }
    } catch (error) {
      console.error('Error monitoring screenshots:', error);
    }

    // Check again in 5 seconds
    setTimeout(checkForNewScreenshots, 5000);
  };

  // Start monitoring
  checkForNewScreenshots();

  // Return cleanup function
  return () => {
    isMonitoring = false;
  };
};

/**
 * Show screenshot analysis prompt
 */
export const showScreenshotAnalysisPrompt = (
  screenshotUri: string,
  onAnalyze: (uri: string) => void,
  onDismiss: () => void
): void => {
  Alert.alert(
    '📸 New Screenshot Detected',
    'Would you like to analyze this screenshot for suspicious content?',
    [
      {
        text: 'Not Now',
        style: 'cancel',
        onPress: onDismiss,
      },
      {
        text: 'Analyze Screenshot',
        onPress: () => onAnalyze(screenshotUri),
      },
    ]
  );
};

/**
 * Analyze screenshot automatically
 */
export const analyzeScreenshotAutomatically = async (
  screenshotUri: string,
  onResult: (result: any) => void,
  onError: (error: string) => void
): Promise<void> => {
  try {
    console.log('Auto-analyzing screenshot:', screenshotUri);
    
    // Extract text using OCR
    const analysis = await analyzeScreenshot(screenshotUri);
    
    if (analysis.success && analysis.extractedText) {
      // Analyze the extracted text for scams
      const result = await analyzeMessage(analysis.extractedText);
      onResult(result);
    } else {
      onError(analysis.error || 'Could not read text from the screenshot');
    }
  } catch (error) {
    console.error('Auto-screenshot analysis error:', error);
    onError('Could not analyze the screenshot automatically');
  }
};

/**
 * Initialize auto screenshot detection
 */
export const initializeAutoScreenshotDetection = async (): Promise<boolean> => {
  try {
    const hasPermission = await requestMediaLibraryPermissions();
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Elder Sentry needs access to your photos to detect new screenshots automatically.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Grant Permission', onPress: () => requestMediaLibraryPermissions() }
        ]
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error initializing auto screenshot detection:', error);
    return false;
  }
};