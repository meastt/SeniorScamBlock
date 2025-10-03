import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { Colors, Shadows } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';
import { Responsive } from '../theme/responsive';
import {
  LifebuoyIcon,
  SettingsIcon,
  AlertCircleIcon,
  PhoneIcon,
  MailIcon,
  BookOpenIcon,
  ShieldIcon,
  AlertTriangleIcon,
} from '../components/Icons';

/**
 * Help Screen - Support resources and emergency contacts
 * Focused on getting help when needed
 */
const HelpScreen = () => {
  const navigation = useNavigation();
  const { subscription } = useApp();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.headerIconContainer, { backgroundColor: colors.primaryLight }]}>
            <LifebuoyIcon size={48} color={colors.primary} />
          </View>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Get Help</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            Resources and support when you need assistance
          </Text>

          {/* Settings Button */}
          <TouchableOpacity
            style={[styles.settingsButton, { backgroundColor: colors.primaryLight }]}
            onPress={() => navigation.navigate('Settings' as never)}
            activeOpacity={0.7}
          >
            <SettingsIcon size={20} color={colors.primary} />
            <Text style={[styles.settingsText, { color: colors.primary }]}>
              App Settings
            </Text>
          </TouchableOpacity>
        </View>

        {/* Subscription Status */}
        <View style={[styles.statusCard, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.statusTitle, { color: colors.textSecondary }]}>Your Plan</Text>
          <Text style={[styles.statusTier, { color: colors.textPrimary }]}>
            {subscription.tier === 'FREE' ? 'Free Plan' : 'Premium Plan'}
          </Text>
          {subscription.tier === 'FREE' && (
            <Text style={[styles.statusText, { color: colors.textPrimary }]}>
              {subscription.monthlyLimit - subscription.messageCheckCount} checks remaining this month
            </Text>
          )}
        </View>

        {/* Support Resources */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Emergency Contacts</Text>
          <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
            Important phone numbers and resources
          </Text>

          <View style={[styles.contactCard, styles.emergencyCard, { backgroundColor: colors.cardBackground }]}>
            <View style={[styles.contactIcon, { backgroundColor: colors.backgroundSecondary }]}>
              <AlertCircleIcon size={24} color={Colors.danger} />
            </View>
            <View style={styles.contactHeaderText}>
              <Text style={[styles.contactTitle, { color: colors.textPrimary }]}>Report a Scam</Text>
              <Text style={[styles.contactSubtitle, { color: colors.textSecondary }]}>Federal Trade Commission</Text>
            </View>
            <Text style={[styles.contactInfo, { color: colors.textPrimary }]}>
              1-877-382-4357{'\n'}
              ReportFraud.ftc.gov
            </Text>
          </View>

          <View style={[styles.contactCard, styles.emergencyCard, { backgroundColor: colors.cardBackground }]}>
            <View style={[styles.contactIcon, { backgroundColor: colors.backgroundSecondary }]}>
              <PhoneIcon size={24} color={Colors.danger} />
            </View>
            <View style={styles.contactHeaderText}>
              <Text style={[styles.contactTitle, { color: colors.textPrimary }]}>Elder Abuse Hotline</Text>
              <Text style={[styles.contactSubtitle, { color: colors.textSecondary }]}>National hotline for abuse reporting</Text>
            </View>
            <Text style={[styles.contactInfo, { color: colors.textPrimary }]}>
              1-800-677-1116{'\n'}
              Available 24/7
            </Text>
          </View>

          <View style={[styles.contactCard, styles.supportCard, { backgroundColor: colors.cardBackground }]}>
            <View style={[styles.contactIcon, { backgroundColor: colors.backgroundSecondary }]}>
              <MailIcon size={24} color={colors.primary} />
            </View>
            <View style={styles.contactHeaderText}>
              <Text style={[styles.contactTitle, { color: colors.textPrimary }]}>Elder Sentry Support</Text>
              <Text style={[styles.contactSubtitle, { color: colors.textSecondary }]}>Help with the app</Text>
            </View>
            <Text style={[styles.contactInfo, { color: colors.textPrimary }]}>
              support@eldersentry.com{'\n'}
              www.eldersentry.com{'\n'}
              Visit our support portal for FAQs
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Quick Actions</Text>

          <View style={[styles.quickActionCard, { backgroundColor: colors.cardBackground }]}>
            <View style={[styles.quickActionIcon, { backgroundColor: colors.backgroundSecondary }]}>
              <BookOpenIcon size={24} color={colors.primary} />
            </View>
            <View style={styles.quickActionContent}>
              <Text style={[styles.quickActionTitle, { color: colors.textPrimary }]}>Learn About Scams</Text>
              <Text style={[styles.quickActionText, { color: colors.textSecondary }]}>
                Visit the Tips tab to read detailed guides about common scams and how to avoid them.
              </Text>
            </View>
          </View>

          <View style={[styles.quickActionCard, { backgroundColor: colors.cardBackground }]}>
            <View style={[styles.quickActionIcon, { backgroundColor: colors.backgroundSecondary }]}>
              <ShieldIcon size={24} color={colors.primary} />
            </View>
            <View style={styles.quickActionContent}>
              <Text style={[styles.quickActionTitle, { color: colors.textPrimary }]}>Check a Message</Text>
              <Text style={[styles.quickActionText, { color: colors.textSecondary }]}>
                Go to the Home tab to analyze any suspicious text, email, or message you receive.
              </Text>
            </View>
          </View>
        </View>

        {/* Important Reminder */}
        <View style={[styles.reminderCard, { backgroundColor: colors.cardBackground }]}>
          <View style={[styles.reminderIcon, { backgroundColor: colors.backgroundSecondary }]}>
            <AlertTriangleIcon size={24} color={Colors.warning} />
          </View>
          <View style={styles.reminderContent}>
            <Text style={[styles.reminderTitle, { color: colors.textPrimary }]}>Remember</Text>
            <Text style={[styles.reminderText, { color: colors.textSecondary }]}>
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
  headerIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    ...Shadows.md,
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
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Spacing.radiusLarge,
    marginTop: Spacing.lg,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  settingsText: {
    ...Typography.subtitle,
    fontWeight: '600',
  },

  // Status Card - Note: uses theme colors from inline styles
  statusCard: {
    marginHorizontal: Responsive.getScreenMargin(),
    marginBottom: Spacing.xl,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.cardPadding,
    ...Shadows.card,
  },
  statusTitle: {
    ...Typography.callout,
    marginBottom: Spacing.xs,
  },
  statusTier: {
    ...Typography.title,
    marginBottom: Spacing.sm,
    fontWeight: '700',
  },
  statusText: {
    ...Typography.body,
  },

  // Sections
  section: {
    marginHorizontal: Responsive.getScreenMargin(),
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.title,
    marginBottom: Spacing.md,
    fontWeight: '700',
  },
  sectionDescription: {
    ...Typography.body,
    marginBottom: Spacing.lg,
    lineHeight: 24,
  },

  // Contact Cards - Note: uses theme colors from inline styles
  contactCard: {
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 2,
    ...Shadows.card,
  },
  emergencyCard: {
    borderColor: Colors.danger,
  },
  supportCard: {
    borderColor: Colors.primary,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  contactHeaderText: {
    marginBottom: Spacing.md,
  },
  contactTitle: {
    ...Typography.subtitle,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  contactSubtitle: {
    ...Typography.caption,
  },
  contactInfo: {
    ...Typography.bodyLarge,
    lineHeight: 28,
  },

  // Quick Actions - Match contact card style
  quickActionsSection: {
    marginHorizontal: Responsive.getScreenMargin(),
    marginBottom: Spacing.xl,
  },
  quickActionCard: {
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 2,
    borderColor: Colors.primary,
    ...Shadows.card,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    ...Typography.subtitle,
    marginBottom: Spacing.xs,
    fontWeight: '700',
  },
  quickActionText: {
    ...Typography.bodyLarge,
    lineHeight: 28,
  },

  // Reminder Card - Match contact card style
  reminderCard: {
    marginHorizontal: Responsive.getScreenMargin(),
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.lg,
    borderWidth: 2,
    borderColor: Colors.warning,
    ...Shadows.card,
  },
  reminderIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  reminderContent: {
    flex: 1,
  },
  reminderTitle: {
    ...Typography.subtitle,
    marginBottom: Spacing.xs,
    fontWeight: '700',
  },
  reminderText: {
    ...Typography.bodyLarge,
    lineHeight: 28,
  },
});

export default HelpScreen;