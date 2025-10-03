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
  Dimensions,
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
import { showVoiceInputOptions, startVoiceRecognition, stopVoiceRecognition, VoiceResult } from '../services/voiceInput';
import { initializeAutoScreenshotDetection, startScreenshotMonitoring, showScreenshotAnalysisPrompt, analyzeScreenshotAutomatically } from '../services/autoScreenshotDetection';
import { initializeSiriShortcuts, handleSiriShortcut } from '../services/siriShortcuts';
import { Colors, Shadows } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';
import { Responsive } from '../theme/responsive';
import { Gradients, Animations } from '../theme/gradients';

const { width: screenWidth } = Dimensions.get('window');

/**
 * Premium Home Screen - Sophisticated message checking interface
 * Elegant design with clear hierarchy and premium feel
 */
const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { subscription, addAnalysis } = useApp();
  const [messageText, setMessageText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [screenshotModalVisible, setScreenshotModalVisible] = useState(false);
  const [currentScreenshotUri, setCurrentScreenshotUri] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [isAnalyzingScreenshot, setIsAnalyzingScreenshot] = useState(false);
  const [recentMessages, setRecentMessages] = useState<string[]>([
    'Hi Grandma, I need money for emergency surgery...',
    'Congratulations! You won $1,000,000! Click here...',
    'Your package delivery failed, update payment info...'
  ]);
  const [expandedHelp, setExpandedHelp] = useState<string | null>(null);

  // Handle shared text from other apps
  useEffect(() => {
    const params = route.params as any;
    if (params?.sharedText) {
      setMessageText(params.sharedText);
      // Auto-analyze shared content
      handleCheckMessage(params.sharedText);
    }
  }, [route.params]);

  // Handle share intent using the hook
  const handleSharedContent = async (sharedContent: SharedContent) => {
    console.log('Received shared content:', sharedContent);
    
    // Show a brief confirmation
    Alert.alert(
      'Message Received',
      `Received content from ${sharedContent.sourceApp}. Analyzing for scams...`,
      [{ text: 'OK' }]
    );
    
    try {
      // Process the shared content
      const result = await processSharedContent(sharedContent);
      addAnalysis(result);
      
      // Navigate to result screen
      (navigation as any).navigate('Result', { result });
    } catch (error) {
      console.error('Error processing shared content:', error);
      Alert.alert('Error', 'Could not analyze the shared content. Please try again.', [{ text: 'OK' }]);
    }
  };

  // Use the share intent hook
  useShareIntentHandler(handleSharedContent);

  // Initialize auto screenshot detection
  useEffect(() => {
    const initializeAutoDetection = async () => {
      await initializeAutoScreenshotDetection();
      
      // Start monitoring for new screenshots
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
                  (error: string) => {
                    Alert.alert('Analysis Error', error);
                  }
                );
              } finally {
                setIsAnalyzing(false);
              }
            },
            () => {
              // User dismissed the prompt
              console.log('Screenshot analysis dismissed');
            }
          );
        },
        { enabled: true, autoAnalyze: false, showNotification: true }
      );

      return cleanup;
    };

    initializeAutoDetection();
    
    // Initialize Siri Shortcuts
    initializeSiriShortcuts();
  }, []);

  const handleCheckMessage = async (text?: string) => {
    const textToCheck = text || messageText;
    
    if (!textToCheck.trim()) {
      Alert.alert('No Message', 'Please enter a message to check.', [{ text: 'OK' }]);
      return;
    }

    // Check message limit for free tier
    if (subscription.tier === 'FREE') {
      if (subscription.messageCheckCount >= subscription.monthlyLimit) {
        Alert.alert(
          'Limit Reached',
          `You've used all ${subscription.monthlyLimit} free checks this month. Upgrade to Premium for unlimited checks.`,
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Upgrade', 
              onPress: () => navigation.navigate('Upgrade' as never) 
            },
          ]
        );
        return;
      }
    }

    // Dismiss keyboard first to prevent double-tap issue
    Keyboard.dismiss();
    
    // Small delay to ensure keyboard is dismissed
    setTimeout(async () => {
      setIsAnalyzing(true);

      try {
        const result = await analyzeMessage(textToCheck);
        addAnalysis(result);
        
        // Navigate to result screen
        (navigation as any).navigate('Result', { result });
        setMessageText(''); // Clear input
      } catch (error) {
        Alert.alert('Error', 'We could not check the message. Try again.', [{ text: 'OK' }]);
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
      
      if (option === 'camera') {
        imageUri = await takePhotoForAnalysis();
      } else if (option === 'library') {
        imageUri = await pickScreenshotForAnalysis();
      }
      
      if (imageUri) {
        setCurrentScreenshotUri(imageUri);
        setExtractedText('');
        setScreenshotModalVisible(true);
        
        // Start analyzing the screenshot
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
      console.error('Screenshot analysis error:', error);
      Alert.alert('Error', 'Could not analyze the screenshot. Please try again.');
      setScreenshotModalVisible(false);
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

  const handleScreenshotRetake = () => {
    setScreenshotModalVisible(false);
    handleScreenshotAnalysis();
  };

  const handleQuickFill = (message: string) => {
    setMessageText(message);
    // Add gentle animation feedback
    setTimeout(() => {
      Alert.alert(
        'Message Added',
        'Message pasted successfully. Tap "Check Message" when ready.',
        [{ text: 'OK' }]
      );
    }, 300);
  };

  const toggleHelp = (section: string) => {
    setExpandedHelp(expandedHelp === section ? null : section);
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
              Alert.alert('Voice Input Failed', result.error || 'Could not understand what you said. Please try again.');
            }
          },
          (error: string) => {
            setIsListening(false);
            Alert.alert('Voice Input Error', error);
          }
        );
      }
    } catch (error) {
      console.error('Voice input error:', error);
      setIsListening(false);
      Alert.alert('Error', 'Could not start voice input. Please try again.');
    }
  };

  const remainingChecks = subscription.tier === 'FREE' 
    ? subscription.monthlyLimit - subscription.messageCheckCount 
    : -1;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section with enhanced visual interest */}
          <LinearGradient
            colors={Gradients.hero.colors}
            start={Gradients.hero.start}
            end={Gradients.hero.end}
            style={styles.heroSection}
          >
            <View style={styles.heroIcon}>
              <LinearGradient
                colors={Colors.gradientPrimary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.heroIconGradient}
              >
                <Text style={styles.heroEmoji}>🛡️</Text>
              </LinearGradient>
            </View>
            <Text style={styles.heroTitle}>Elder Sentry</Text>
            <Text style={styles.heroSubtitle}>
              AI-powered protection for your peace of mind
            </Text>

            {/* Status Badge with enhanced styling */}
            <LinearGradient
              colors={subscription.tier === 'PREMIUM'
                ? Colors.gradientPremium
                : ['#FFFFFF', '#F8FAFC']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.statusBadge,
                subscription.tier === 'PREMIUM' && {
                  borderColor: Colors.premium,
                }
              ]}
            >
              <Text style={styles.statusIcon}>
                {subscription.tier === 'PREMIUM' ? '👑' : '✨'}
              </Text>
              <Text style={[
                styles.statusText,
                subscription.tier === 'PREMIUM' && styles.statusTextPremium
              ]}>
                {subscription.tier === 'PREMIUM'
                  ? 'Premium Protection Active'
                  : `${remainingChecks} free checks remaining`
                }
              </Text>
            </LinearGradient>
          </LinearGradient>

          {/* Main Action Card */}
          <View style={styles.mainCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Check a Message</Text>
              <Text style={styles.cardSubtitle}>
                Paste any suspicious text, email, or message to analyze
              </Text>
            </View>

            {/* Input Section */}
            <View style={styles.inputSection}>
              <TextInput
                style={styles.messageInput}
                multiline
                numberOfLines={6}
                placeholder="Paste your suspicious message here...&#10;&#10;💡 Tip: Use Share Sheet for easier checking!"
                placeholderTextColor={Colors.textTertiary}
                value={messageText}
                onChangeText={setMessageText}
                textAlignVertical="top"
              />
              
              <AnalyzingButton
                isAnalyzing={isAnalyzing}
                onPress={() => handleCheckMessage()}
                disabled={!messageText.trim()}
              />
              
              {/* Voice Input Button */}
              <View style={styles.voiceButton}>
                <SeniorButton
                  title={isListening ? "🎤 Listening..." : "🎤 Speak Message"}
                  onPress={handleVoiceInput}
                  variant="secondary"
                  disabled={isAnalyzing || isListening}
                />
              </View>
              
              {/* Screenshot Analysis Button */}
              <View style={styles.screenshotButton}>
                <SeniorButton
                  title="📸 Analyze Screenshot"
                  onPress={handleScreenshotAnalysis}
                  variant="secondary"
                  disabled={isAnalyzing || isListening}
                />
              </View>
            </View>
          </View>

          {/* Recent Messages Section - Smart Defaults */}
          {recentMessages.length > 0 && !messageText && (
            <View style={styles.recentMessagesCard}>
              <View style={styles.recentHeader}>
                <Text style={styles.recentIcon}>🕐</Text>
                <Text style={styles.recentTitle}>Common Suspicious Messages</Text>
                <Text style={styles.recentSubtitle}>Tap any message to check it</Text>
              </View>
              <View style={styles.recentList}>
                {recentMessages.map((message, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.recentItem}
                    onPress={() => handleQuickFill(message)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.recentEmoji}>⚠️</Text>
                    <Text style={styles.recentText} numberOfLines={2}>
                      {message}
                    </Text>
                    <Text style={styles.recentArrow}>→</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Contextual Help System - Progressive Disclosure */}
          <View style={styles.helpCard}>
            <TouchableOpacity
              style={styles.helpHeader}
              onPress={() => toggleHelp('main')}
              activeOpacity={0.7}
            >
              <Text style={styles.helpIcon}>❓</Text>
              <Text style={styles.helpTitle}>How to Check Messages</Text>
              <Text style={[
                styles.helpToggle,
                expandedHelp === 'main' && styles.helpToggleActive
              ]}>
                {expandedHelp === 'main' ? '−' : '+'}
              </Text>
            </TouchableOpacity>

            {expandedHelp === 'main' && (
              <View style={styles.helpContent}>
                <View style={styles.helpSection}>
                  <TouchableOpacity
                    style={styles.helpMethod}
                    onPress={() => toggleHelp('share')}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.helpMethodIcon}>📱</Text>
                    <View style={styles.helpMethodContent}>
                      <Text style={styles.helpMethodTitle}>Share from Messages/Mail</Text>
                      <Text style={styles.helpMethodDesc}>Long-press → Share → Select Elder Sentry</Text>
                    </View>
                    <Text style={styles.helpMethodToggle}>
                      {expandedHelp === 'share' ? '−' : '+'}
                    </Text>
                  </TouchableOpacity>

                  {expandedHelp === 'share' && (
                    <View style={styles.helpDetail}>
                      <Text style={styles.helpDetailText}>
                        • In Messages: Long-press the suspicious message{'\n'}
                        • Tap "Share" button{'\n'}
                        • Select "Elder Sentry" from the app list{'\n'}
                        • Automatic analysis begins instantly!
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.helpSection}>
                  <TouchableOpacity
                    style={styles.helpMethod}
                    onPress={() => toggleHelp('voice')}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.helpMethodIcon}>🎤</Text>
                    <View style={styles.helpMethodContent}>
                      <Text style={styles.helpMethodTitle}>Voice Input</Text>
                      <Text style={styles.helpMethodDesc}>Speak the message out loud</Text>
                    </View>
                    <Text style={styles.helpMethodToggle}>
                      {expandedHelp === 'voice' ? '−' : '+'}
                    </Text>
                  </TouchableOpacity>

                  {expandedHelp === 'voice' && (
                    <View style={styles.helpDetail}>
                      <Text style={styles.helpDetailText}>
                        • Tap "Speak Message" button{'\n'}
                        • Say the suspicious text clearly{'\n'}
                        • Confirm what you said{'\n'}
                        • Analysis starts automatically!
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.helpSection}>
                  <TouchableOpacity
                    style={styles.helpMethod}
                    onPress={() => toggleHelp('screenshot')}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.helpMethodIcon}>📸</Text>
                    <View style={styles.helpMethodContent}>
                      <Text style={styles.helpMethodTitle}>Screenshot Analysis</Text>
                      <Text style={styles.helpMethodDesc}>For images with text</Text>
                    </View>
                    <Text style={styles.helpMethodToggle}>
                      {expandedHelp === 'screenshot' ? '−' : '+'}
                    </Text>
                  </TouchableOpacity>

                  {expandedHelp === 'screenshot' && (
                    <View style={styles.helpDetail}>
                      <Text style={styles.helpDetailText}>
                        • Take screenshot of suspicious image{'\n'}
                        • Tap "Analyze Screenshot"{'\n'}
                        • Choose camera or photo library{'\n'}
                        • Text is extracted and analyzed!
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>

          {/* Premium CTA */}
          {subscription.tier === 'FREE' && (
            <View style={styles.premiumCard}>
              <View style={styles.premiumHeader}>
                <Text style={styles.premiumIcon}>👑</Text>
                <Text style={styles.premiumTitle}>Unlock Premium Protection</Text>
              </View>
              <Text style={styles.premiumDescription}>
                Get unlimited checks, family alerts, and advanced scam detection
              </Text>
              <SeniorButton
                title="Upgrade to Premium"
                onPress={() => navigation.navigate('Upgrade' as never)}
                variant="premium"
                fullWidth
              />
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
        onRetake={handleScreenshotRetake}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.massive,
  },

  // Hero Section
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: Spacing.screenHorizontal,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
    borderBottomLeftRadius: Spacing.radiusLarge,
    borderBottomRightRadius: Spacing.radiusLarge,
    marginHorizontal: Spacing.screenHorizontal,
  },
  heroIcon: {
    width: 72,
    height: 72,
    borderRadius: Spacing.radiusLarge,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    ...Colors.shadowStrong,
  },
  heroIconGradient: {
    width: '100%',
    height: '100%',
    borderRadius: Spacing.radiusLarge,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroEmoji: {
    fontSize: 32,
    color: Colors.textInverse,
  },
  heroTitle: {
    ...Typography.display,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    textAlign: 'center',
    fontWeight: '700',
  },
  heroSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  statusBadge: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Spacing.radiusLarge,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border, // Will be overridden inline for premium
    ...Colors.shadowSoft,
  },
  statusIcon: {
    fontSize: 18,
    marginRight: Spacing.sm,
  },
  statusText: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  statusTextPremium: {
    color: Colors.premiumDark,
    fontWeight: '700',
  },

  // Main Action Card
  mainCard: {
    marginHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.md,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.cardPadding,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Colors.shadowStrong,
    position: 'relative',
    overflow: 'hidden',
  },
  cardHeader: {
    marginBottom: Spacing.md,
  },
  cardTitle: {
    ...Typography.title,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    fontWeight: '700',
  },
  cardSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  inputSection: {
    gap: Spacing.md,
  },
  messageInput: {
    ...Typography.body,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing.radiusMedium,
    padding: Spacing.md,
    minHeight: 120,
    color: Colors.textPrimary,
    textAlignVertical: 'top',
  },
  voiceButton: {
    marginTop: Spacing.sm,
  },
  screenshotButton: {
    marginTop: Spacing.sm,
  },

  // Contextual Help Card - Progressive Disclosure
  helpCard: {
    marginHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.md,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Spacing.radiusLarge,
    borderWidth: 1,
    borderColor: Colors.info,
    ...Colors.shadowSoft,
    overflow: 'hidden',
  },
  helpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.cardPadding,
    backgroundColor: Colors.infoLight,
  },
  helpIcon: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  helpTitle: {
    ...Typography.subtitle,
    color: Colors.textPrimary,
    fontWeight: '700',
    flex: 1,
  },
  helpToggle: {
    fontSize: 24,
    color: Colors.info,
    fontWeight: '300',
  },
  helpToggleActive: {
    color: Colors.infoDark,
    fontWeight: '700',
  },
  helpContent: {
    padding: Spacing.cardPadding,
  },
  helpSection: {
    marginBottom: Spacing.md,
  },
  helpMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: Spacing.radiusMedium,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
  },
  helpMethodIcon: {
    fontSize: 20,
    marginRight: Spacing.md,
  },
  helpMethodContent: {
    flex: 1,
  },
  helpMethodTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  helpMethodDesc: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  helpMethodToggle: {
    fontSize: 18,
    color: Colors.info,
    fontWeight: '300',
  },
  helpDetail: {
    padding: Spacing.md,
    backgroundColor: Colors.infoLight,
    borderRadius: Spacing.radiusSmall,
    borderWidth: 1,
    borderColor: Colors.info,
    marginTop: Spacing.xs,
  },
  helpDetailText: {
    ...Typography.body,
    color: Colors.textPrimary,
    lineHeight: 24,
  },

  // Recent Messages Card - Smart Defaults
  recentMessagesCard: {
    marginHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.md,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.cardPadding,
    borderWidth: 1,
    borderColor: Colors.info,
    ...Colors.shadowSoft,
  },
  recentHeader: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  recentIcon: {
    fontSize: 24,
    marginBottom: Spacing.xs,
  },
  recentTitle: {
    ...Typography.subtitle,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  recentSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  recentList: {
    gap: Spacing.sm,
  },
  recentItem: {
    backgroundColor: Colors.infoLight,
    padding: Spacing.md,
    borderRadius: Spacing.radiusMedium,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.info,
    ...Colors.shadowSoft,
  },
  recentEmoji: {
    fontSize: 16,
    marginRight: Spacing.sm,
  },
  recentText: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
  },
  recentArrow: {
    fontSize: 18,
    color: Colors.info,
    fontWeight: '700',
    marginLeft: Spacing.sm,
  },

  // Premium Card
  premiumCard: {
    marginHorizontal: Spacing.screenHorizontal,
    backgroundColor: Colors.premiumLight,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.cardPadding,
    borderWidth: 1,
    borderColor: Colors.premium,
    ...Shadows.card,
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  premiumIcon: {
    fontSize: Spacing.iconMedium,
    marginRight: Spacing.xs,
  },
  premiumTitle: {
    ...Typography.subtitle,
    color: Colors.premiumDark,
    fontWeight: '700',
  },
  premiumDescription: {
    ...Typography.body,
    color: Colors.premiumDark,
    marginBottom: Spacing.md,
  },
});

export default HomeScreen;