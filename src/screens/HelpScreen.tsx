import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { Colors, Shadows } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';
import { Responsive } from '../theme/responsive';

/**
 * Help Screen - Support resources and emergency contacts
 * Focused on getting help when needed
 */
const HelpScreen = () => {
  const { subscription } = useApp();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Text style={styles.headerEmoji}>🆘</Text>
          </View>
          <Text style={styles.headerTitle}>Get Help</Text>
          <Text style={styles.headerSubtitle}>
            Resources and support when you need assistance
          </Text>
        </View>

        {/* Subscription Status */}
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Your Plan</Text>
          <Text style={styles.statusTier}>
            {subscription.tier === 'FREE' ? '🆓 Free Plan' : '⭐ Premium Plan'}
          </Text>
          {subscription.tier === 'FREE' && (
            <Text style={styles.statusText}>
              {subscription.monthlyLimit - subscription.messageCheckCount} checks remaining this month
            </Text>
          )}
        </View>

        {/* Support Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          <Text style={styles.sectionDescription}>
            Important phone numbers and resources
          </Text>

          <View style={[styles.contactCard, styles.emergencyCard]}>
            <View style={styles.contactHeader}>
              <Text style={styles.contactIcon}>🚨</Text>
              <View style={styles.contactHeaderText}>
                <Text style={styles.contactTitle}>Report a Scam</Text>
                <Text style={styles.contactSubtitle}>Federal Trade Commission</Text>
              </View>
            </View>
            <Text style={styles.contactInfo}>
              📞 1-877-382-4357{'\n'}
              🌐 ReportFraud.ftc.gov
            </Text>
          </View>

          <View style={[styles.contactCard, styles.emergencyCard]}>
            <View style={styles.contactHeader}>
              <Text style={styles.contactIcon}>👴</Text>
              <View style={styles.contactHeaderText}>
                <Text style={styles.contactTitle}>Elder Abuse Hotline</Text>
                <Text style={styles.contactSubtitle}>National hotline for abuse reporting</Text>
              </View>
            </View>
            <Text style={styles.contactInfo}>
              📞 1-800-677-1116{'\n'}
              Available 24/7
            </Text>
          </View>

          <View style={[styles.contactCard, styles.supportCard]}>
            <View style={styles.contactHeader}>
              <Text style={styles.contactIcon}>🛡️</Text>
              <View style={styles.contactHeaderText}>
                <Text style={styles.contactTitle}>Elder Sentry Support</Text>
                <Text style={styles.contactSubtitle}>Help with the app</Text>
              </View>
            </View>
            <Text style={styles.contactInfo}>
              📧 support@eldersentry.com{'\n'}
              🌐 www.eldersentry.com{'\n'}
              📱 Visit our support portal for FAQs
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <View style={styles.quickActionCard}>
            <Text style={styles.quickActionIcon}>💡</Text>
            <View style={styles.quickActionContent}>
              <Text style={styles.quickActionTitle}>Learn About Scams</Text>
              <Text style={styles.quickActionText}>
                Visit the Tips tab to read detailed guides about common scams and how to avoid them.
              </Text>
            </View>
          </View>

          <View style={styles.quickActionCard}>
            <Text style={styles.quickActionIcon}>🏠</Text>
            <View style={styles.quickActionContent}>
              <Text style={styles.quickActionTitle}>Check a Message</Text>
              <Text style={styles.quickActionText}>
                Go to the Home tab to analyze any suspicious text, email, or message you receive.
              </Text>
            </View>
          </View>
        </View>

        {/* Important Reminder */}
        <View style={styles.reminderCard}>
          <Text style={styles.reminderIcon}>⚠️</Text>
          <View style={styles.reminderContent}>
            <Text style={styles.reminderTitle}>Remember</Text>
            <Text style={styles.reminderText}>
              If something feels wrong, trust your instincts. Hang up, don't click, and ask for help. It's better to be safe than sorry!
            </Text>
          </View>
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

  // Header
  header: {
    alignItems: 'center',
    paddingHorizontal: Responsive.getScreenMargin(),
    paddingTop: Responsive.isTablet ? Spacing.huge : Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  headerIcon: {
    width: Responsive.isTablet ? 100 : 80,
    height: Responsive.isTablet ? 100 : 80,
    borderRadius: Spacing.radiusRound,
    backgroundColor: Colors.errorLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  headerEmoji: {
    fontSize: Responsive.isTablet ? Spacing.iconEnormous : Spacing.iconMassive,
  },
  headerTitle: {
    ...Typography.largeTitle,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    textAlign: 'center',
    fontWeight: '700',
  },
  headerSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
    lineHeight: 26,
  },

  // Status Card
  statusCard: {
    marginHorizontal: Responsive.getScreenMargin(),
    marginBottom: Spacing.xl,
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.cardPadding,
    ...Shadows.card,
  },
  statusTitle: {
    ...Typography.callout,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  statusTier: {
    ...Typography.title,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    fontWeight: '700',
  },
  statusText: {
    ...Typography.body,
    color: Colors.textPrimary,
  },

  // Sections
  section: {
    marginHorizontal: Responsive.getScreenMargin(),
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.title,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    fontWeight: '700',
  },
  sectionDescription: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
    lineHeight: 24,
  },

  // Contact Cards
  contactCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderLeftWidth: 6,
    ...Shadows.card,
  },
  emergencyCard: {
    borderLeftColor: Colors.error,
  },
  supportCard: {
    borderLeftColor: Colors.primary,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  contactIcon: {
    fontSize: Spacing.iconLarge,
    marginRight: Spacing.md,
  },
  contactHeaderText: {
    flex: 1,
  },
  contactTitle: {
    ...Typography.subtitle,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  contactSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  contactInfo: {
    ...Typography.bodyLarge,
    color: Colors.textPrimary,
    lineHeight: 28,
  },

  // Quick Actions
  quickActionsSection: {
    marginHorizontal: Responsive.getScreenMargin(),
    marginBottom: Spacing.xl,
  },
  quickActionCard: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryLight,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  quickActionIcon: {
    fontSize: Spacing.iconLarge,
    marginRight: Spacing.md,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    ...Typography.subtitle,
    color: Colors.primary,
    marginBottom: Spacing.sm,
    fontWeight: '700',
  },
  quickActionText: {
    ...Typography.body,
    color: Colors.primary,
    lineHeight: 24,
  },

  // Reminder Card
  reminderCard: {
    marginHorizontal: Responsive.getScreenMargin(),
    flexDirection: 'row',
    backgroundColor: Colors.warningLight,
    borderRadius: Spacing.radiusXLarge,
    padding: Spacing.cardPaddingLarge,
    borderWidth: 2,
    borderColor: Colors.warning,
  },
  reminderIcon: {
    fontSize: Spacing.iconXLarge,
    marginRight: Spacing.md,
  },
  reminderContent: {
    flex: 1,
  },
  reminderTitle: {
    ...Typography.subtitle,
    color: Colors.warningYellowDark,
    marginBottom: Spacing.sm,
    fontWeight: '700',
  },
  reminderText: {
    ...Typography.body,
    color: Colors.warningYellowDark,
    lineHeight: 26,
    fontWeight: '500',
  },
});

export default HelpScreen;