import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import { BackButton } from '../components/BackButton';
import { SeniorButton } from '../components/SeniorButton';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';
import { Shadows } from '../theme/colors';
import {
  SettingsIcon,
  SunIcon,
  MoonIcon,
  PhoneIcon,
  BookOpenIcon,
} from '../components/Icons';

/**
 * Settings Screen - App preferences and theme controls
 * Simple, accessible settings for seniors
 */
const SettingsScreen = () => {
  const { themeMode, colors, toggleTheme } = useTheme();
  const { subscription } = useApp();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <BackButton />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.headerIconContainer, { backgroundColor: colors.primaryLight }]}>
            <SettingsIcon size={48} color={colors.primary} />
          </View>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Settings</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            Customize your app experience
          </Text>
        </View>

        {/* Theme Settings */}
        <View style={[styles.section, { backgroundColor: colors.backgroundSecondary }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Appearance
          </Text>
          
          <View style={styles.settingItem}>
            <View style={[styles.settingIcon, { backgroundColor: colors.primaryLight }]}>
              {themeMode === 'dark' ? (
                <MoonIcon size={20} color={colors.primary} />
              ) : (
                <SunIcon size={20} color={colors.primary} />
              )}
            </View>
            <View style={styles.settingContent}>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>
                  Dark Mode
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  {themeMode === 'dark'
                    ? 'Dark theme active'
                    : 'Light theme active'
                  }
                </Text>
              </View>
            </View>
            <Switch
              value={themeMode === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.lightBorder, true: colors.primary }}
              thumbColor={colors.white}
              style={styles.themeSwitch}
            />
          </View>
        </View>

        {/* Account Settings */}
        <View style={[styles.section, { backgroundColor: colors.backgroundSecondary }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Your Account
          </Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>
                  Current Plan
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  {subscription.tier === 'FREE'
                    ? 'Free Plan - Limited checks'
                    : 'Premium Plan - Unlimited protection'
                  }
                </Text>
              </View>
            </View>
            {subscription.tier === 'FREE' && (
              <SeniorButton
                title="Upgrade"
                onPress={() => {}}
                variant="premium"
                size="small"
              />
            )}
          </View>

          {subscription.tier === 'FREE' && (
            <View style={styles.settingItem}>
              <View style={styles.settingContent}>
                <View style={styles.settingText}>
                  <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>
                    Checks This Month
                  </Text>
                  <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                    {subscription.messageCheckCount} of {subscription.monthlyLimit} used
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* App Info */}
        <View style={[styles.section, { backgroundColor: colors.backgroundSecondary }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            About Elder Sentry
          </Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>
                  Version
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Elder Sentry v1.0.0
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>
                  Purpose
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Protecting seniors from scams with AI
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Help Section */}
        <View style={[styles.section, { backgroundColor: colors.backgroundSecondary }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Need Help?
          </Text>
          
          <TouchableOpacity style={styles.helpButton}>
            <View style={[styles.helpIcon, { backgroundColor: colors.primaryLight }]}>
              <PhoneIcon size={20} color={colors.primary} />
            </View>
            <View style={styles.helpContent}>
              <Text style={[styles.helpTitle, { color: colors.textPrimary }]}>
                Contact Support
              </Text>
              <Text style={[styles.helpDescription, { color: colors.textSecondary }]}>
                Get help with the app or report issues
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.helpButton}>
            <View style={[styles.helpIcon, { backgroundColor: colors.primaryLight }]}>
              <BookOpenIcon size={20} color={colors.primary} />
            </View>
            <View style={styles.helpContent}>
              <Text style={[styles.helpTitle, { color: colors.textPrimary }]}>
                Learn About Scams
              </Text>
              <Text style={[styles.helpDescription, { color: colors.textSecondary }]}>
                Read educational articles in the Tips tab
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.massive,
  },

  // Header
  header: {
    alignItems: 'center',
    paddingHorizontal: Spacing.screenHorizontal,
    paddingTop: Spacing.lg,
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
    marginBottom: Spacing.xs,
    textAlign: 'center',
    fontWeight: '700',
  },
  headerSubtitle: {
    ...Typography.body,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
  },

  // Sections
  section: {
    marginHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.lg,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.cardPadding,
    ...Shadows.card,
  },
  sectionTitle: {
    ...Typography.title,
    marginBottom: Spacing.md,
    fontWeight: '700',
  },

  // Setting Items
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    ...Typography.subtitle,
    marginBottom: Spacing.xs,
    fontWeight: '600',
  },
  settingDescription: {
    ...Typography.caption,
    lineHeight: 18,
  },
  themeSwitch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },

  // Help Buttons
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  helpIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    ...Typography.subtitle,
    marginBottom: Spacing.xs,
    fontWeight: '600',
  },
  helpDescription: {
    ...Typography.caption,
    lineHeight: 18,
  },
});

export default SettingsScreen;
