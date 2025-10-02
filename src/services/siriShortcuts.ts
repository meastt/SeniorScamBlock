import SiriShortcuts from 'react-native-siri-shortcut';
import { Alert } from 'react-native';

/**
 * Siri Shortcuts Service
 * Provides voice-activated scam checking for seniors
 * Allows users to say "Hey Siri, check this message for scams"
 */

export interface SiriShortcutConfig {
  phrase: string;
  title: string;
  subtitle: string;
  userInfo?: any;
}

/**
 * Default Siri shortcut configurations
 */
export const DEFAULT_SHORTCUTS: SiriShortcutConfig[] = [
  {
    phrase: 'Check message for scams',
    title: 'Check Message for Scams',
    subtitle: 'Analyze suspicious messages with Elder Sentry',
    userInfo: { action: 'check_message' },
  },
  {
    phrase: 'Check text for scams',
    title: 'Check Text for Scams',
    subtitle: 'Analyze suspicious text with Elder Sentry',
    userInfo: { action: 'check_text' },
  },
  {
    phrase: 'Analyze screenshot',
    title: 'Analyze Screenshot',
    subtitle: 'Check screenshot for suspicious content',
    userInfo: { action: 'analyze_screenshot' },
  },
];

/**
 * Check if Siri Shortcuts are supported
 */
export const isSiriShortcutsSupported = async (): Promise<boolean> => {
  try {
    return await SiriShortcuts.isSupported();
  } catch (error) {
    console.error('Error checking Siri Shortcuts support:', error);
    return false;
  }
};

/**
 * Add a Siri shortcut
 */
export const addSiriShortcut = async (config: SiriShortcutConfig): Promise<boolean> => {
  try {
    const isSupported = await isSiriShortcutsSupported();
    if (!isSupported) {
      Alert.alert(
        'Siri Shortcuts Not Supported',
        'Siri Shortcuts are not supported on this device.',
        [{ text: 'OK' }]
      );
      return false;
    }

    await SiriShortcuts.addShortcut({
      phrase: config.phrase,
      title: config.title,
      subtitle: config.subtitle,
      userInfo: config.userInfo,
    });

    return true;
  } catch (error) {
    console.error('Error adding Siri shortcut:', error);
    Alert.alert(
      'Error Adding Shortcut',
      'Could not add the Siri shortcut. Please try again.',
      [{ text: 'OK' }]
    );
    return false;
  }
};

/**
 * Add all default shortcuts
 */
export const addDefaultShortcuts = async (): Promise<void> => {
  try {
    const isSupported = await isSiriShortcutsSupported();
    if (!isSupported) {
      console.log('Siri Shortcuts not supported, skipping...');
      return;
    }

    for (const shortcut of DEFAULT_SHORTCUTS) {
      await addSiriShortcut(shortcut);
    }

    Alert.alert(
      'Siri Shortcuts Added! 🎉',
      'You can now say "Hey Siri, check message for scams" to quickly analyze suspicious messages.',
      [{ text: 'Great!' }]
    );
  } catch (error) {
    console.error('Error adding default shortcuts:', error);
  }
};

/**
 * Remove a Siri shortcut
 */
export const removeSiriShortcut = async (phrase: string): Promise<boolean> => {
  try {
    await SiriShortcuts.removeShortcut(phrase);
    return true;
  } catch (error) {
    console.error('Error removing Siri shortcut:', error);
    return false;
  }
};

/**
 * Get all available shortcuts
 */
export const getAvailableShortcuts = async (): Promise<SiriShortcutConfig[]> => {
  try {
    const shortcuts = await SiriShortcuts.getShortcuts();
    return shortcuts.map(shortcut => ({
      phrase: shortcut.phrase,
      title: shortcut.title,
      subtitle: shortcut.subtitle,
      userInfo: shortcut.userInfo,
    }));
  } catch (error) {
    console.error('Error getting shortcuts:', error);
    return [];
  }
};

/**
 * Handle Siri shortcut activation
 */
export const handleSiriShortcut = (
  shortcut: any,
  onCheckMessage: (text?: string) => void,
  onAnalyzeScreenshot: () => void
): void => {
  try {
    const action = shortcut.userInfo?.action;
    
    switch (action) {
      case 'check_message':
      case 'check_text':
        // For voice shortcuts, we'll need to get the text from the user
        Alert.alert(
          'Voice Input',
          'Please speak the suspicious message you want to check:',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Start Voice Input', 
              onPress: () => {
                // This would trigger voice input
                // The actual implementation would be handled by the calling component
                console.log('Starting voice input for Siri shortcut');
              }
            }
          ]
        );
        break;
        
      case 'analyze_screenshot':
        onAnalyzeScreenshot();
        break;
        
      default:
        console.log('Unknown Siri shortcut action:', action);
    }
  } catch (error) {
    console.error('Error handling Siri shortcut:', error);
  }
};

/**
 * Show Siri Shortcuts setup guide
 */
export const showSiriShortcutsGuide = (): void => {
  Alert.alert(
    '🎤 Siri Shortcuts Setup',
    'To use voice commands with Elder Sentry:\n\n1. Go to Settings > Siri & Search\n2. Find "Elder Sentry" in the list\n3. Tap "Add to Siri"\n4. Record your phrase\n5. Say "Hey Siri, [your phrase]" to check messages!\n\nExample phrases:\n• "Check message for scams"\n• "Analyze screenshot"\n• "Check text for scams"',
    [
      { text: 'Got It!' },
      { text: 'Add Shortcuts Now', onPress: () => addDefaultShortcuts() }
    ]
  );
};

/**
 * Initialize Siri Shortcuts
 */
export const initializeSiriShortcuts = async (): Promise<void> => {
  try {
    const isSupported = await isSiriShortcutsSupported();
    if (!isSupported) {
      console.log('Siri Shortcuts not supported on this device');
      return;
    }

    // Check if shortcuts are already added
    const existingShortcuts = await getAvailableShortcuts();
    if (existingShortcuts.length === 0) {
      // Show setup guide for first-time users
      showSiriShortcutsGuide();
    }
  } catch (error) {
    console.error('Error initializing Siri Shortcuts:', error);
  }
};