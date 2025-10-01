import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SeniorButton } from '../components/SeniorButton';
import { BackButton } from '../components/BackButton';
import { useApp } from '../context/AppContext';
import { Colors, Shadows } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';

/**
 * Premium Upgrade Screen - Sophisticated subscription interface
 * Compelling value proposition with modern design
 */
const UpgradeScreen = () => {
  const navigation = useNavigation();
  const { upgradeToPremium } = useApp();

  const handleUpgrade = () => {
    // In production, this would integrate with app store payments
    Alert.alert(
      'Confirm Upgrade',
      'Upgrade to Premium for $8.99/month?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Subscribe',
          onPress: async () => {
            await upgradeToPremium();
            Alert.alert(
              'Success!',
              'You are now a Premium member.',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.goBack(),
                },
              ]
            );
          },
        },
      ]
    );
  };

  const premiumFeatures = [
    {
      icon: '🔒',
      title: 'Unlimited Protection',
      description: 'Check as many messages as you need',
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'Family Dashboard',
      description: 'Your family can monitor your safety alerts',
    },
    {
      icon: '🤖',
      title: 'Smart Monitoring',
      description: 'Automatic detection of suspicious messages',
    },
    {
      icon: '📊',
      title: 'Detailed Reports',
      description: 'Comprehensive scam analysis and insights',
    },
    {
      icon: '🚨',
      title: 'Real-time Alerts',
      description: 'Instant notifications for potential threats',
    },
    {
      icon: '🛡️',
      title: 'Priority Support',
      description: 'Get help when you need it most',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroIcon}>
            <Text style={styles.heroEmoji}>👑</Text>
          </View>
          <Text style={styles.heroTitle}>Premium Protection</Text>
          <Text style={styles.heroSubtitle}>
            Advanced AI-powered scam detection for complete peace of mind
          </Text>
        </View>

        {/* Pricing Card */}
        <View style={styles.pricingCard}>
          <View style={styles.pricingHeader}>
            <Text style={styles.pricingTitle}>Premium Plan</Text>
            <View style={styles.popularBadge}>
              <Text style={styles.popularText}>Most Popular</Text>
            </View>
          </View>
          
          <View style={styles.priceSection}>
            <Text style={styles.priceAmount}>$8.99</Text>
            <Text style={styles.pricePeriod}>per month</Text>
            <Text style={styles.priceNote}>Cancel anytime</Text>
          </View>

          <SeniorButton
            title="Start Premium Protection"
            onPress={handleUpgrade}
            variant="premium"
            fullWidth
          />
        </View>

        {/* Features Grid */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Premium Features</Text>
          <View style={styles.featuresGrid}>
            {premiumFeatures.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Comparison Section */}
        <View style={styles.comparisonSection}>
          <Text style={styles.comparisonTitle}>Free vs Premium</Text>
          <View style={styles.comparisonGrid}>
            <View style={styles.comparisonColumn}>
              <Text style={styles.comparisonHeader}>Free Plan</Text>
              <View style={styles.comparisonItem}>
                <Text style={styles.comparisonIcon}>⚠️</Text>
                <Text style={styles.comparisonText}>10 checks per month</Text>
              </View>
              <View style={styles.comparisonItem}>
                <Text style={styles.comparisonIcon}>⚠️</Text>
                <Text style={styles.comparisonText}>Basic analysis</Text>
              </View>
              <View style={styles.comparisonItem}>
                <Text style={styles.comparisonIcon}>❌</Text>
                <Text style={styles.comparisonText}>No family alerts</Text>
              </View>
            </View>
            
            <View style={styles.comparisonColumn}>
              <Text style={[styles.comparisonHeader, styles.premiumHeader]}>Premium Plan</Text>
              <View style={styles.comparisonItem}>
                <Text style={styles.comparisonIcon}>✅</Text>
                <Text style={styles.comparisonText}>Unlimited checks</Text>
              </View>
              <View style={styles.comparisonItem}>
                <Text style={styles.comparisonIcon}>✅</Text>
                <Text style={styles.comparisonText}>Advanced AI analysis</Text>
              </View>
              <View style={styles.comparisonItem}>
                <Text style={styles.comparisonIcon}>✅</Text>
                <Text style={styles.comparisonText}>Family dashboard</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Trust Section */}
        <View style={styles.trustSection}>
          <Text style={styles.trustTitle}>Trusted by Seniors Nationwide</Text>
          <View style={styles.trustStats}>
            <View style={styles.trustStat}>
              <Text style={styles.trustNumber}>10,000+</Text>
              <Text style={styles.trustLabel}>Scams Blocked</Text>
            </View>
            <View style={styles.trustStat}>
              <Text style={styles.trustNumber}>99.9%</Text>
              <Text style={styles.trustLabel}>Accuracy Rate</Text>
            </View>
            <View style={styles.trustStat}>
              <Text style={styles.trustNumber}>24/7</Text>
              <Text style={styles.trustLabel}>Protection</Text>
            </View>
          </View>
        </View>

        {/* Final CTA */}
        <View style={styles.finalCta}>
          <SeniorButton
            title="🛡️ Upgrade to Premium Now"
            onPress={handleUpgrade}
            variant="premium"
            fullWidth
          />
          <Text style={styles.disclaimer}>
            Secure payment • Cancel anytime • No commitment required
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: Spacing.enormous,
  },
  
  // Hero Section
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: Spacing.screenHorizontal,
    paddingTop: Spacing.huge,
    paddingBottom: Spacing.xl,
  },
  heroIcon: {
    width: 120,
    height: 120,
    borderRadius: Spacing.radiusRound,
    backgroundColor: Colors.premiumLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    ...Shadows.premium,
  },
  heroEmoji: {
    fontSize: Spacing.iconEnormous,
  },
  heroTitle: {
    ...Typography.display,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    textAlign: 'center',
    fontWeight: '700',
  },
  heroSubtitle: {
    ...Typography.bodyLarge,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
  },

  // Pricing Card
  pricingCard: {
    marginHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.xl,
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.radiusXLarge,
    padding: Spacing.cardPaddingLarge,
    ...Shadows.lg,
  },
  pricingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  pricingTitle: {
    ...Typography.title,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  popularBadge: {
    backgroundColor: Colors.premium,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Spacing.radiusRound,
  },
  popularText: {
    ...Typography.caption,
    color: Colors.textInverse,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  priceSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  priceAmount: {
    ...Typography.price,
    color: Colors.premium,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  pricePeriod: {
    ...Typography.bodyLarge,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  priceNote: {
    ...Typography.caption,
    color: Colors.textTertiary,
  },

  // Features Section
  featuresSection: {
    marginHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.xl,
  },
  featuresTitle: {
    ...Typography.title,
    color: Colors.textPrimary,
    marginBottom: Spacing.xl,
    fontWeight: '700',
  },
  featuresGrid: {
    gap: Spacing.lg,
  },
  featureCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.lg,
    ...Shadows.sm,
  },
  featureIcon: {
    fontSize: Spacing.iconXLarge,
    marginBottom: Spacing.md,
  },
  featureTitle: {
    ...Typography.subtitle,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    fontWeight: '600',
  },
  featureDescription: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 24,
  },

  // Comparison Section
  comparisonSection: {
    marginHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.xl,
  },
  comparisonTitle: {
    ...Typography.title,
    color: Colors.textPrimary,
    marginBottom: Spacing.xl,
    textAlign: 'center',
    fontWeight: '700',
  },
  comparisonGrid: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  comparisonColumn: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.lg,
    ...Shadows.sm,
  },
  comparisonHeader: {
    ...Typography.subtitle,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
    textAlign: 'center',
    fontWeight: '700',
  },
  premiumHeader: {
    color: Colors.premium,
  },
  comparisonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  comparisonIcon: {
    fontSize: Spacing.iconMedium,
    marginRight: Spacing.md,
  },
  comparisonText: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
  },

  // Trust Section
  trustSection: {
    marginHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.xl,
    backgroundColor: Colors.primaryLight,
    borderRadius: Spacing.radiusXLarge,
    padding: Spacing.cardPaddingLarge,
    alignItems: 'center',
  },
  trustTitle: {
    ...Typography.subtitle,
    color: Colors.primary,
    marginBottom: Spacing.xl,
    textAlign: 'center',
    fontWeight: '700',
  },
  trustStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  trustStat: {
    alignItems: 'center',
  },
  trustNumber: {
    ...Typography.title,
    color: Colors.primary,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  trustLabel: {
    ...Typography.caption,
    color: Colors.primary,
    textAlign: 'center',
  },

  // Final CTA
  finalCta: {
    marginHorizontal: Spacing.screenHorizontal,
    alignItems: 'center',
  },
  disclaimer: {
    ...Typography.caption,
    color: Colors.textTertiary,
    textAlign: 'center',
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.xl,
  },
});

export default UpgradeScreen;