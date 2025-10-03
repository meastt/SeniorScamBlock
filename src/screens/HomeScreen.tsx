import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SeniorButton } from '../components/SeniorButton';
import { AnalyzingButton } from '../components/AnalyzingButton';
import { ScreenshotAnalysisModal } from '../components/ScreenshotAnalysisModal';
import { useApp } from '../context/AppContext';
import { analyzeMessage } from '../services/scamDetection';
import { useShareIntentHandler, processSharedContent, SharedContent } from '../services/shareIntent';
import { showScreenshotOptions, pickScreenshotForAnalysis, takePhotoForAnalysis, analyzeScreenshot } from '../services/screenshotAnalysis';
import { showVoiceInputOptions, startVoiceRecognition, VoiceResult } from '../services/voiceInput';
import { initializeAutoScreenshotDetection, startScreenshotMonitoring, showScreenshotAnalysisPrompt, analyzeScreenshotAutomatically } from '../services/autoScreenshotDetection';
import { initializeSiriShortcuts } from '../services/siriShortcuts';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';
import { useTheme } from '../context/ThemeContext';

/**
 * Home Screen - Modern, Professional, Accessible
 *
 * Design principles:
 * - Clear visual hierarchy through elevation and spacing
 * - Generous touch targets and readable text
 * - Warm, professional aesthetic
 * - Purposeful use of color and iconography
 */
const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { subscription, addAnalysis } = useApp();
  const { colors } = useTheme();
  const [messageText, setMessageText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [screenshotModalVisible, setScreenshotModalVisible] = useState(false);
  const [currentScreenshotUri, setCurrentScreenshotUri] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [isAnalyzingScreenshot, setIsAnalyzingScreenshot] = useState(false);

  // Handle shared text
  useEffect(() => {
    const params = route.params as any;
    if (params?.sharedText) {
      setMessageText(params.sharedText);
      handleCheckMessage(params.sharedText);
    }
  }, [route.params]);

  // Share intent handler
  const handleSharedContent = async (sharedContent: SharedContent) => {
    Alert.alert(
      'Message Received',
      `Analyzing content from ${sharedContent.sourceApp}...`,
      [{ text: 'OK' }]
    );

    try {
      const result = await processSharedContent(sharedContent);
      addAnalysis(result);
      (navigation as any).navigate('Result', { result });
    } catch (error) {
      Alert.alert('Error', 'Could not analyze the shared content. Please try again.');
    }
  };

  useShareIntentHandler(handleSharedContent);

  // Initialize features
  useEffect(() => {
    const initializeFeatures = async () => {
      await initializeAutoScreenshotDetection();

      const cleanup = startScreenshotMonitoring(
        (screenshotUri: string) => {
          showScreenshotAnalysisPrompt(
            screenshotUri,
            async (uri: string) => {
              setIsAnalyzing(true);
              try {
                await analyzeScreenshotAutomatically(
                  uri,
                  (result: any) => {
                    addAnalysis(result);
                    (navigation as any).navigate('Result', { result });
                  },
                  (error: string) => Alert.alert('Analysis Error', error)
                );
              } finally {
                setIsAnalyzing(false);
              }
            },
            () => console.log('Screenshot analysis dismissed')
          );
        },
        { enabled: true, autoAnalyze: false, showNotification: true }
      );

      return cleanup;
    };

    initializeFeatures();
    initializeSiriShortcuts();
  }, []);

  const handleCheckMessage = async (text?: string) => {
    const textToCheck = text || messageText;

    if (!textToCheck.trim()) {
      Alert.alert('No Message', 'Please enter a message to check.');
      return;
    }

    // Check message limit
    if (subscription.tier === 'FREE' && subscription.messageCheckCount >= subscription.monthlyLimit) {
      Alert.alert(
        'Limit Reached',
        `You've used all ${subscription.monthlyLimit} free checks this month. Upgrade to Premium for unlimited checks.`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Upgrade', onPress: () => navigation.navigate('Upgrade' as never) },
        ]
      );
      return;
    }

    Keyboard.dismiss();

    setTimeout(async () => {
      setIsAnalyzing(true);
      try {
        const result = await analyzeMessage(textToCheck);
        addAnalysis(result);
        (navigation as any).navigate('Result', { result });
        setMessageText('');
      } catch (error) {
        Alert.alert('Error', 'We could not check the message. Try again.');
      } finally {
        setIsAnalyzing(false);
      }
    }, 100);
  };

  const handleScreenshotAnalysis = async () => {
    try {
      const option = await showScreenshotOptions();
      if (option === 'cancel') return;

      let imageUri: string | null = null;
      if (option === 'camera') imageUri = await takePhotoForAnalysis();
      else if (option === 'library') imageUri = await pickScreenshotForAnalysis();

      if (imageUri) {
        setCurrentScreenshotUri(imageUri);
        setExtractedText('');
        setScreenshotModalVisible(true);
        setIsAnalyzingScreenshot(true);

        const analysis = await analyzeScreenshot(imageUri);
        setIsAnalyzingScreenshot(false);

        if (analysis.success && analysis.extractedText) {
          setExtractedText(analysis.extractedText);
        } else {
          setExtractedText('');
          Alert.alert('Text Extraction Failed', analysis.error || 'Could not read text from the image.');
        }
      }
    } catch (error) {
      setScreenshotModalVisible(false);
      Alert.alert('Error', 'Could not analyze the screenshot. Please try again.');
    }
  };

  const handleScreenshotAnalyze = async () => {
    if (!extractedText.trim()) return;

    setIsAnalyzing(true);
    try {
      const result = await analyzeMessage(extractedText);
      addAnalysis(result);
      setScreenshotModalVisible(false);
      (navigation as any).navigate('Result', { result });
    } catch (error) {
      Alert.alert('Error', 'Could not analyze the text. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleVoiceInput = async () => {
    try {
      const option = await showVoiceInputOptions();
      if (option === 'cancel') return;

      if (option === 'voice') {
        setIsListening(true);
        await startVoiceRecognition(
          (result: VoiceResult) => {
            setIsListening(false);
            if (result.success && result.text) {
              setMessageText(result.text);
              Alert.alert(
                'Voice Input Complete',
                `I heard: "${result.text}"\n\nWould you like to check this message for scams?`,
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Check Message', onPress: () => handleCheckMessage(result.text) }
                ]
              );
            } else {
              Alert.alert('Voice Input Failed', result.error || 'Could not understand what you said.');
            }
          },
          (error: string) => {
            setIsListening(false);
            Alert.alert('Voice Input Error', error);
          }
        );
      }
    } catch (error) {
      setIsListening(false);
      Alert.alert('Error', 'Could not start voice input. Please try again.');
    }
  };

  const remainingChecks = subscription.tier === 'FREE'
    ? subscription.monthlyLimit - subscription.messageCheckCount
    : -1;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header - Clear branding */}
          <View style={styles.header}>
            <View style={styles.brandContainer}>
              <View style={[styles.logoContainer, { backgroundColor: colors.primaryLight }]}>
                <Text style={styles.logoIcon}>🛡️</Text>
              </View>
              <Text style={[styles.brandName, { color: colors.textPrimary }]}>Elder Sentry</Text>
            </View>
            <Text style={[styles.tagline, { color: colors.textSecondary }]}>
              AI-powered protection from scams
            </Text>

            {/* Status indicator */}
            <View style={[
              styles.statusBadge,
              { backgroundColor: colors.backgroundSecondary, borderColor: colors.border },
              subscription.tier === 'PREMIUM' && styles.statusBadgePremium
            ]}>
              <View style={styles.statusDot} />
              <Text style={[styles.statusText, { color: colors.textSecondary }]}>
                {subscription.tier === 'PREMIUM'
                  ? 'Premium Active'
                  : `${remainingChecks} Checks Remaining`
                }
              </Text>
            </View>
          </View>

          {/* Main Action Card */}
          <View style={[styles.mainCard, { backgroundColor: colors.backgroundElevated }]}>
            <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Check a Message</Text>
            <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
              Enter any suspicious text, email, or phone call message below
            </Text>

            <TextInput
              style={[styles.messageInput, { backgroundColor: colors.background, borderColor: colors.border, color: colors.textPrimary }]}
              multiline
              numberOfLines={6}
              placeholder="Paste or type the message here..."
              placeholderTextColor={colors.textTertiary}
              value={messageText}
              onChangeText={setMessageText}
              textAlignVertical="top"
            />

            <AnalyzingButton
              isAnalyzing={isAnalyzing}
              onPress={() => handleCheckMessage()}
              disabled={!messageText.trim()}
            />

            {/* Alternative input methods */}
            <View style={[styles.alternativeMethods, { borderTopColor: colors.border }]}>
              <Text style={[styles.alternativeLabel, { color: colors.textSecondary }]}>Or use:</Text>
              <View style={styles.methodButtons}>
                <TouchableOpacity
                  style={[styles.methodButton, { backgroundColor: colors.background, borderColor: colors.border }]}
                  onPress={handleVoiceInput}
                  disabled={isAnalyzing || isListening}
                >
                  <Text style={styles.methodIcon}>🎤</Text>
                  <Text style={[styles.methodText, { color: colors.textPrimary }]}>Voice</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.methodButton, { backgroundColor: colors.background, borderColor: colors.border }]}
                  onPress={handleScreenshotAnalysis}
                  disabled={isAnalyzing || isListening}
                >
                  <Text style={styles.methodIcon}>📸</Text>
                  <Text style={[styles.methodText, { color: colors.textPrimary }]}>Screenshot</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Educational callout - Subtle, professional */}
          <View style={[styles.educationalCard, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
            <View style={styles.educationalContent}>
              <View style={[styles.educationalIconContainer, { backgroundColor: colors.primaryLight }]}>
                <Text style={[styles.educationalIcon, { color: colors.primary }]}>→</Text>
              </View>
              <View style={styles.educationalTextContainer}>
                <Text style={[styles.educationalTitle, { color: colors.textPrimary }]}>Quick Tip</Text>
                <Text style={[styles.educationalText, { color: colors.textSecondary }]}>
                  Share messages directly from Mail or Messages using the share button — we'll analyze them instantly.
                </Text>
              </View>
            </View>
          </View>

          {/* Premium CTA for free users - Sophisticated gradient */}
          {subscription.tier === 'FREE' && (
            <View style={styles.premiumCard}>
              <LinearGradient
                colors={['#0F766E', '#134E4A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.premiumGradient}
              >
                <View style={styles.premiumContent}>
                  <View style={styles.premiumBadgeContainer}>
                    <Text style={styles.premiumBadge}>UPGRADE</Text>
                  </View>
                  <Text style={styles.premiumTitle}>Unlimited Protection</Text>
                  <Text style={styles.premiumDescription}>
                    Remove limits, add family members, get priority support
                  </Text>
                  <View style={styles.premiumFeatures}>
                    <View style={styles.premiumFeature}>
                      <Text style={styles.premiumFeatureIcon}>✓</Text>
                      <Text style={styles.premiumFeatureText}>Unlimited checks</Text>
                    </View>
                    <View style={styles.premiumFeature}>
                      <Text style={styles.premiumFeatureIcon}>✓</Text>
                      <Text style={styles.premiumFeatureText}>Family alerts</Text>
                    </View>
                    <View style={styles.premiumFeature}>
                      <Text style={styles.premiumFeatureIcon}>✓</Text>
                      <Text style={styles.premiumFeatureText}>Priority support</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.premiumButton}
                    onPress={() => navigation.navigate('Upgrade' as never)}
                  >
                    <Text style={styles.premiumButtonText}>View Plans</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Screenshot Analysis Modal */}
      <ScreenshotAnalysisModal
        visible={screenshotModalVisible}
        imageUri={currentScreenshotUri}
        extractedText={extractedText}
        isAnalyzing={isAnalyzingScreenshot}
        onClose={() => setScreenshotModalVisible(false)}
        onAnalyze={handleScreenshotAnalyze}
        onRetake={() => {
          setScreenshotModalVisible(false);
          handleScreenshotAnalysis();
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    alignItems: 'center',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoIcon: {
    fontSize: 24,
  },
  brandName: {
    ...Typography.titleLarge,
  },
  tagline: {
    ...Typography.body,
    marginBottom: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusBadgePremium: {
    backgroundColor: Colors.accentLight,
    borderColor: Colors.accent,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
    marginRight: 8,
  },
  statusText: {
    ...Typography.caption,
    fontWeight: '500',
  },

  // Main Card
  mainCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 24,
    borderRadius: 16,
    ...Colors.shadowMd,
  },
  cardTitle: {
    ...Typography.titleLarge,
    marginBottom: 4,
  },
  cardSubtitle: {
    ...Typography.body,
    marginBottom: 20,
  },
  messageInput: {
    ...Typography.bodyLarge,
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    minHeight: 140,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  alternativeMethods: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
  },
  alternativeLabel: {
    ...Typography.caption,
    marginBottom: 12,
    textAlign: 'center',
  },
  methodButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  methodButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 12,
  },
  methodIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  methodText: {
    ...Typography.bodyMedium,
    fontWeight: '500',
  },

  // Educational Card - Minimal, professional
  educationalCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  educationalContent: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'flex-start',
  },
  educationalIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  educationalIcon: {
    fontSize: 16,
    fontWeight: '600',
  },
  educationalTextContainer: {
    flex: 1,
  },
  educationalTitle: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: 4,
  },
  educationalText: {
    ...Typography.bodyMedium,
    lineHeight: 24,
  },

  // Premium Card - Sophisticated, dark gradient
  premiumCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    ...Colors.shadowLg,
  },
  premiumGradient: {
    padding: 28,
  },
  premiumContent: {
    alignItems: 'flex-start',
  },
  premiumBadgeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 6,
    marginBottom: 16,
  },
  premiumBadge: {
    fontSize: 11,
    color: Colors.white,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  premiumTitle: {
    ...Typography.titleLarge,
    color: Colors.white,
    marginBottom: 8,
  },
  premiumDescription: {
    ...Typography.body,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 24,
    lineHeight: 26,
  },
  premiumFeatures: {
    marginBottom: 24,
    gap: 12,
  },
  premiumFeature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  premiumFeatureIcon: {
    fontSize: 16,
    color: '#6EE7B7',
    marginRight: 12,
    fontWeight: '600',
  },
  premiumFeatureText: {
    ...Typography.bodyMedium,
    color: Colors.white,
    fontWeight: '500',
  },
  premiumButton: {
    backgroundColor: Colors.white,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignSelf: 'stretch',
    alignItems: 'center',
    ...Colors.shadowSm,
  },
  premiumButtonText: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default HomeScreen;
