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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SeniorButton } from '../components/SeniorButton';
import { AnalyzingButton } from '../components/AnalyzingButton';
import { useApp } from '../context/AppContext';
import { analyzeMessage } from '../services/scamDetection';
import { useShareIntentHandler, processSharedContent, SharedContent } from '../services/shareIntent';
import { showScreenshotOptions, pickScreenshotForAnalysis, takePhotoForAnalysis, analyzeScreenshot } from '../services/screenshotAnalysis';
import { Colors, Shadows } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';
import { Responsive } from '../theme/responsive';

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
      
      setIsAnalyzing(true);
      
      let imageUri: string | null = null;
      
      if (option === 'camera') {
        imageUri = await takePhotoForAnalysis();
      } else if (option === 'library') {
        imageUri = await pickScreenshotForAnalysis();
      }
      
      if (imageUri) {
        // Analyze the screenshot
        const analysis = await analyzeScreenshot(imageUri);
        
        if (analysis.success && analysis.extractedText) {
          // Analyze the extracted text
          const result = await analyzeMessage(analysis.extractedText);
          addAnalysis(result);
          
          // Navigate to result screen
          (navigation as any).navigate('Result', { result });
        } else {
          Alert.alert('Error', 'Could not read text from the image. Please try again with a clearer photo.');
        }
      }
    } catch (error) {
      console.error('Screenshot analysis error:', error);
      Alert.alert('Error', 'Could not analyze the screenshot. Please try again.');
    } finally {
      setIsAnalyzing(false);
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
          <View style={styles.heroSection}>
            <View style={styles.heroBackground} />
            <View style={styles.heroIcon}>
              <Text style={styles.heroEmoji}>🛡️</Text>
            </View>
            <Text style={styles.heroTitle}>Elder Sentry</Text>
            <Text style={styles.heroSubtitle}>
              AI-powered protection for your peace of mind
            </Text>
            
            {/* Status Badge */}
            <View style={styles.statusBadge}>
              <Text style={styles.statusIcon}>✨</Text>
              <Text style={styles.statusText}>
                {subscription.tier === 'PREMIUM' 
                  ? 'Premium Protection Active' 
                  : `${remainingChecks} free checks remaining`
                }
              </Text>
            </View>
          </View>

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
              
              {/* Screenshot Analysis Button */}
              <View style={styles.screenshotButton}>
                <SeniorButton
                  title="📸 Analyze Screenshot"
                  onPress={handleScreenshotAnalysis}
                  variant="secondary"
                  disabled={isAnalyzing}
                />
              </View>
            </View>
          </View>

          {/* Quick Tips Card */}
          <View style={styles.tipsCard}>
            <Text style={styles.tipsTitle}>How to Check Messages</Text>
            <View style={styles.tipsList}>
              <View style={styles.tipItem}>
                <View style={styles.tipNumber}>
                  <Text style={styles.tipNumberText}>1</Text>
                </View>
                <Text style={styles.tipText}>
                  <Text style={styles.tipBold}>Long-press the message</Text> in Messages or Mail app
                </Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipNumber}>
                  <Text style={styles.tipNumberText}>2</Text>
                </View>
                <Text style={styles.tipText}>
                  <Text style={styles.tipBold}>Tap "Share"</Text> and select "Elder Sentry"
                </Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipNumber}>
                  <Text style={styles.tipNumberText}>3</Text>
                </View>
                <Text style={styles.tipText}>
                  <Text style={styles.tipBold}>Automatic analysis</Text> - no copying needed!
                </Text>
              </View>
            </View>
            
            {/* Alternative methods */}
            <View style={styles.alternativeMethod}>
              <Text style={styles.alternativeTitle}>Other ways to check:</Text>
              <View style={styles.alternativeSteps}>
                <Text style={styles.alternativeStep}>• 📸 Take a screenshot and tap "Analyze Screenshot"</Text>
                <Text style={styles.alternativeStep}>• Copy message → Paste above → Tap blue button</Text>
              </View>
            </View>
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
    backgroundColor: Colors.backgroundTertiary,
  },
  heroBackground: {
    display: 'none',
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: Spacing.radiusLarge,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  heroEmoji: {
    fontSize: Spacing.iconHuge,
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
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Spacing.radiusMedium,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statusIcon: {
    fontSize: Spacing.iconSmall,
    marginRight: Spacing.xs,
  },
  statusText: {
    ...Typography.callout,
    color: Colors.textPrimary,
    fontWeight: '500',
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
    ...Shadows.card,
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
  screenshotButton: {
    marginTop: Spacing.sm,
  },

  // Tips Card
  tipsCard: {
    marginHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.md,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.cardPadding,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  tipsTitle: {
    ...Typography.subtitle,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    fontWeight: '700',
  },
  tipsList: {
    gap: Spacing.sm,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipNumber: {
    width: 24,
    height: 24,
    borderRadius: Spacing.radiusRound,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  tipNumberText: {
    ...Typography.caption,
    color: Colors.textInverse,
    fontWeight: '700',
    fontSize: 12,
  },
  tipText: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
  },
  tipBold: {
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  // Alternative Method
  alternativeMethod: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  alternativeTitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  alternativeSteps: {
    gap: Spacing.xs,
  },
  alternativeStep: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontStyle: 'italic',
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