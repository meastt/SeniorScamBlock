import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SeniorButton } from '../components/SeniorButton';
import { useApp } from '../context/AppContext';
import { analyzeMessage } from '../services/scamDetection';
import { Colors, Shadows } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';

/**
 * Home Screen - Modern message checking interface
 * Supports shared content from Messages/Email apps
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

    setIsAnalyzing(true);

    try {
      const result = await analyzeMessage(textToCheck);
      addAnalysis(result);
      
      // Navigate to result screen
      navigation.navigate('Result' as never, { result } as never);
      setMessageText(''); // Clear input
    } catch (error) {
      Alert.alert('Error', 'We could not check the message. Try again.', [{ text: 'OK' }]);
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
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.emoji}>🛡️</Text>
            <Text style={styles.title}>Scam Guard</Text>
            <Text style={styles.subtitle}>Check any suspicious message</Text>
          </View>
          
          {/* Checks remaining badge */}
          {subscription.tier === 'FREE' && (
            <View style={styles.limitBadge}>
              <Text style={styles.limitEmoji}>✨</Text>
              <Text style={styles.limitText}>
                {remainingChecks} free check{remainingChecks !== 1 ? 's' : ''} remaining
              </Text>
            </View>
          )}

          {/* Quick Start Instructions */}
          <View style={styles.instructionCard}>
            <Text style={styles.instructionTitle}>📱 How to Check a Message:</Text>
            <View style={styles.instructionRow}>
              <Text style={styles.instructionNumber}>1</Text>
              <Text style={styles.instructionText}>
                <Text style={styles.bold}>In Messages app:</Text>{'\n'}
                Long-press suspicious message → Copy
              </Text>
            </View>
            <View style={styles.instructionDivider} />
            <View style={styles.instructionRow}>
              <Text style={styles.instructionNumber}>2</Text>
              <Text style={styles.instructionText}>
                <Text style={styles.bold}>Come back here:</Text>{'\n'}
                Paste message below and tap Check
              </Text>
            </View>
          </View>

          {/* Input Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Message to Check</Text>
            <TextInput
              style={styles.input}
              multiline
              numberOfLines={8}
              placeholder="Paste suspicious message here...&#10;&#10;Tap and hold in this box, then tap Paste"
              placeholderTextColor={Colors.textTertiary}
              value={messageText}
              onChangeText={setMessageText}
              textAlignVertical="top"
            />
            <Text style={styles.helpText}>
              💡 Tip: Share directly from Mail app using the Share button
            </Text>
          </View>

          {/* Check Button */}
          <SeniorButton
            title={isAnalyzing ? '🔍 Checking...' : '🔍 Check Message'}
            onPress={() => handleCheckMessage()}
            variant="primary"
            fullWidth
            disabled={isAnalyzing || !messageText.trim()}
          />

          {/* Upgrade CTA */}
          {subscription.tier === 'FREE' && (
            <View style={styles.upgradeCard}>
              <Text style={styles.upgradeEmoji}>⭐</Text>
              <Text style={styles.upgradeTitle}>Unlimited Protection</Text>
              <Text style={styles.upgradeText}>
                Get unlimited checks + family dashboard
              </Text>
              <SeniorButton
                title="Upgrade to Premium"
                onPress={() => navigation.navigate('Upgrade' as never)}
                variant="secondary"
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
    padding: Spacing.screenPadding,
    paddingBottom: Spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    paddingTop: Spacing.md,
  },
  emoji: {
    fontSize: 64,
    marginBottom: Spacing.sm,
  },
  title: {
    ...Typography.headline,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    textAlign: 'center',
    fontWeight: '800',
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  limitBadge: {
    backgroundColor: Colors.cardBackground,
    padding: Spacing.md,
    borderRadius: 16,
    marginBottom: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },
  limitEmoji: {
    fontSize: 24,
    marginRight: Spacing.sm,
  },
  limitText: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  instructionCard: {
    backgroundColor: Colors.cardBackground,
    padding: Spacing.lg,
    borderRadius: 20,
    marginBottom: Spacing.lg,
    ...Shadows.md,
  },
  instructionTitle: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    fontWeight: '700',
  },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  instructionNumber: {
    ...Typography.subheadline,
    color: Colors.white,
    backgroundColor: Colors.primaryButton,
    width: 40,
    height: 40,
    borderRadius: 20,
    textAlign: 'center',
    lineHeight: 40,
    marginRight: Spacing.md,
    fontWeight: '700',
  },
  instructionText: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
    lineHeight: 28,
  },
  instructionDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
    marginLeft: 56, // Align with text
  },
  bold: {
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    fontWeight: '600',
  },
  input: {
    ...Typography.body,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 16,
    padding: Spacing.md,
    minHeight: 180,
    color: Colors.textPrimary,
    ...Shadows.sm,
  },
  helpText: {
    ...Typography.body,
    fontSize: 18,
    color: Colors.textTertiary,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  upgradeCard: {
    marginTop: Spacing.xl,
    padding: Spacing.lg,
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    alignItems: 'center',
    ...Shadows.lg,
  },
  upgradeEmoji: {
    fontSize: 48,
    marginBottom: Spacing.sm,
  },
  upgradeTitle: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  upgradeText: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
});

export default HomeScreen;