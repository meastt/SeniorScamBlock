import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { SeniorButton } from '../components/SeniorButton';
import { useApp } from '../context/AppContext';
import { analyzeMessage } from '../services/scamDetection';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';

/**
 * Home Screen - Main message checking interface
 * Ultra-simple: paste message and tap Check
 */
const HomeScreen = () => {
  const navigation = useNavigation();
  const { subscription, addAnalysis } = useApp();
  const [messageText, setMessageText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleCheckMessage = async () => {
    if (!messageText.trim()) {
      Alert.alert('No Message', 'Please paste a message to check.', [{ text: 'OK' }]);
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
      const result = await analyzeMessage(messageText);
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
          <Text style={styles.title}>Check Message</Text>
          
          {subscription.tier === 'FREE' && (
            <View style={styles.limitBadge}>
              <Text style={styles.limitText}>
                {remainingChecks} checks left this month
              </Text>
            </View>
          )}

          <View style={styles.instructionBox}>
            <Text style={styles.instructionText}>
              1. Copy the suspicious message{'\n'}
              2. Paste it below{'\n'}
              3. Tap Check Message
            </Text>
          </View>

          <TextInput
            style={styles.input}
            multiline
            numberOfLines={8}
            placeholder="Paste message here..."
            placeholderTextColor={Colors.textSecondary}
            value={messageText}
            onChangeText={setMessageText}
            textAlignVertical="top"
          />

          <SeniorButton
            title={isAnalyzing ? 'Checking...' : 'Check Message'}
            onPress={handleCheckMessage}
            variant="primary"
            fullWidth
            disabled={isAnalyzing || !messageText.trim()}
          />

          {subscription.tier === 'FREE' && (
            <View style={styles.upgradeContainer}>
              <Text style={styles.upgradeText}>
                Want unlimited checks?
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
  },
  title: {
    ...Typography.headline,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  limitBadge: {
    backgroundColor: Colors.cardBackground,
    padding: Spacing.md,
    borderRadius: 8,
    marginBottom: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.lightBorder,
  },
  limitText: {
    ...Typography.body,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  instructionBox: {
    backgroundColor: Colors.cardBackground,
    padding: Spacing.lg,
    borderRadius: 8,
    marginBottom: Spacing.lg,
    borderWidth: 2,
    borderColor: Colors.black,
  },
  instructionText: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  input: {
    ...Typography.body,
    backgroundColor: Colors.white,
    borderWidth: 3,
    borderColor: Colors.black,
    borderRadius: 8,
    padding: Spacing.md,
    minHeight: 200,
    marginBottom: Spacing.lg,
    color: Colors.textPrimary,
  },
  upgradeContainer: {
    marginTop: Spacing.xl,
    padding: Spacing.md,
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.primaryButton,
  },
  upgradeText: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
});

export default HomeScreen;