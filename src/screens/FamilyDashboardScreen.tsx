import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { SeniorButton } from '../components/SeniorButton';
import { BackButton } from '../components/BackButton';
import { useApp } from '../context/AppContext';
import { FamilyMember, ScamRiskLevel } from '../types';
import { Colors, Shadows } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';
import { format, subDays } from 'date-fns';

/**
 * Premium Family Dashboard Screen - Elegant monitoring interface
 * Adult children can monitor parent's scam alerts with privacy protection
 */
const FamilyDashboardScreen = () => {
  const { subscription, familyMembers, addFamilyMember, removeFamilyMember, analysisHistory } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');

  // Calculate comprehensive stats
  const weekAgo = subDays(new Date(), 7);
  const monthlyAgo = subDays(new Date(), 30);
  
  const weeklyChecks = analysisHistory.filter(
    item => new Date(item.timestamp) >= weekAgo
  );
  const monthlyChecks = analysisHistory.filter(
    item => new Date(item.timestamp) >= monthlyAgo
  );
  
  const weeklyScams = weeklyChecks.filter(item => item.riskLevel === 'RED').length;
  const weeklySuspicious = weeklyChecks.filter(item => item.riskLevel === 'YELLOW').length;
  const weeklySafe = weeklyChecks.filter(item => item.riskLevel === 'GREEN').length;
  
  const monthlyScams = monthlyChecks.filter(item => item.riskLevel === 'RED').length;
  const totalScamsBlocked = analysisHistory.filter(item => item.riskLevel === 'RED').length;

  const handleAddMember = () => {
    if (!newMemberName.trim() || !newMemberEmail.trim()) {
      Alert.alert('Missing Information', 'Please enter both name and email.', [{ text: 'OK' }]);
      return;
    }

    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name: newMemberName,
      email: newMemberEmail,
      relationship: 'Family Member',
    };

    addFamilyMember(newMember);
    setNewMemberName('');
    setNewMemberEmail('');
    setShowAddForm(false);
    Alert.alert('Added', `${newMemberName} can now see your scam alerts.`, [{ text: 'OK' }]);
  };

  const handleRemoveMember = (member: FamilyMember) => {
    Alert.alert(
      'Remove Family Member',
      `Remove ${member.name} from your family dashboard?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeFamilyMember(member.id),
        },
      ]
    );
  };

  if (subscription.tier !== 'PREMIUM') {
    return (
      <SafeAreaView style={styles.container}>
        <BackButton />
        <View style={styles.upgradePrompt}>
          <View style={styles.upgradeIconContainer}>
            <Text style={styles.upgradeIcon}>👑</Text>
          </View>
          <Text style={styles.upgradeTitle}>Premium Feature</Text>
          <Text style={styles.upgradeText}>
            Family Dashboard allows your loved ones to monitor your safety alerts and get peace of mind.
          </Text>
          <SeniorButton
            title="Upgrade to Premium"
            onPress={() => {}}
            variant="premium"
            fullWidth
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Text style={styles.headerEmoji}>👨‍👩‍👧‍👦</Text>
          </View>
          <Text style={styles.headerTitle}>Family Dashboard</Text>
          <Text style={styles.headerSubtitle}>
            Keep your family informed about your safety
          </Text>
        </View>

        {/* Stats Overview */}
        <View style={styles.statsOverview}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{totalScamsBlocked}</Text>
            <Text style={styles.statLabel}>Total Scams Blocked</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{weeklyScams}</Text>
            <Text style={styles.statLabel}>This Week</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{familyMembers.length}</Text>
            <Text style={styles.statLabel}>Family Members</Text>
          </View>
        </View>

        {/* Weekly Breakdown */}
        <View style={styles.weeklyCard}>
          <Text style={styles.cardTitle}>This Week's Activity</Text>
          <View style={styles.weeklyStats}>
            <View style={[styles.weeklyStat, { backgroundColor: Colors.dangerRedLight }]}>
              <Text style={[styles.weeklyStatNumber, { color: Colors.dangerRed }]}>{weeklyScams}</Text>
              <Text style={styles.weeklyStatLabel}>Scams Blocked</Text>
            </View>
            <View style={[styles.weeklyStat, { backgroundColor: Colors.warningYellowLight }]}>
              <Text style={[styles.weeklyStatNumber, { color: Colors.warningYellow }]}>{weeklySuspicious}</Text>
              <Text style={styles.weeklyStatLabel}>Suspicious</Text>
            </View>
            <View style={[styles.weeklyStat, { backgroundColor: Colors.safeGreenLight }]}>
              <Text style={[styles.weeklyStatNumber, { color: Colors.safeGreen }]}>{weeklySafe}</Text>
              <Text style={styles.weeklyStatLabel}>Safe Messages</Text>
            </View>
          </View>
        </View>

        {/* Privacy Notice */}
        <View style={styles.privacyCard}>
          <Text style={styles.privacyIcon}>🔒</Text>
          <View style={styles.privacyContent}>
            <Text style={styles.privacyTitle}>Privacy Protected</Text>
            <Text style={styles.privacyText}>
              Your family only sees scam alerts and statistics. They never see your actual messages or personal content.
            </Text>
          </View>
        </View>

        {/* Family Members Section */}
        <View style={styles.familySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Family Members</Text>
            <Text style={styles.sectionSubtitle}>
              These people receive alerts when scams are detected
            </Text>
          </View>

          {familyMembers.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>👥</Text>
              <Text style={styles.emptyTitle}>No Family Members Yet</Text>
              <Text style={styles.emptyText}>
                Add family members to keep them informed about your safety
              </Text>
            </View>
          ) : (
            <View style={styles.membersList}>
              {familyMembers.map(member => (
                <View key={member.id} style={styles.memberCard}>
                  <View style={styles.memberAvatar}>
                    <Text style={styles.memberAvatarText}>
                      {member.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.memberInfo}>
                    <Text style={styles.memberName}>{member.name}</Text>
                    <Text style={styles.memberEmail}>{member.email}</Text>
                  </View>
                  <SeniorButton
                    title="Remove"
                    onPress={() => handleRemoveMember(member)}
                    variant="danger"
                    size="small"
                  />
                </View>
              ))}
            </View>
          )}

          {!showAddForm ? (
            <SeniorButton
              title="➕ Add Family Member"
              onPress={() => setShowAddForm(true)}
              variant="primary"
              fullWidth
            />
          ) : (
            <View style={styles.addForm}>
              <Text style={styles.addFormTitle}>Add New Family Member</Text>
              <TextInput
                style={styles.input}
                placeholder="Full name"
                placeholderTextColor={Colors.textTertiary}
                value={newMemberName}
                onChangeText={setNewMemberName}
              />
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor={Colors.textTertiary}
                value={newMemberEmail}
                onChangeText={setNewMemberEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <View style={styles.formButtons}>
                <SeniorButton
                  title="Cancel"
                  onPress={() => setShowAddForm(false)}
                  variant="secondary"
                />
                <SeniorButton
                  title="Add Member"
                  onPress={handleAddMember}
                  variant="primary"
                />
              </View>
            </View>
          )}
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
  
  // Upgrade Prompt
  upgradePrompt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenHorizontal,
  },
  upgradeIconContainer: {
    width: 120,
    height: 120,
    borderRadius: Spacing.radiusRound,
    backgroundColor: Colors.premiumLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    ...Shadows.premium,
  },
  upgradeIcon: {
    fontSize: Spacing.iconEnormous,
  },
  upgradeTitle: {
    ...Typography.display,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
    textAlign: 'center',
    fontWeight: '700',
  },
  upgradeText: {
    ...Typography.bodyLarge,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
    textAlign: 'center',
    lineHeight: 28,
  },

  // Header
  header: {
    alignItems: 'center',
    paddingHorizontal: Spacing.screenHorizontal,
    paddingTop: Spacing.huge,
    paddingBottom: Spacing.xl,
  },
  headerIcon: {
    width: 100,
    height: 100,
    borderRadius: Spacing.radiusRound,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    ...Shadows.lg,
  },
  headerEmoji: {
    fontSize: Spacing.iconEnormous,
  },
  headerTitle: {
    ...Typography.display,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    textAlign: 'center',
    fontWeight: '700',
  },
  headerSubtitle: {
    ...Typography.bodyLarge,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
  },

  // Stats Overview
  statsOverview: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.lg,
    alignItems: 'center',
    ...Shadows.sm,
  },
  statNumber: {
    ...Typography.title,
    color: Colors.primary,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
  },

  // Weekly Card
  weeklyCard: {
    marginHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.xl,
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.radiusXLarge,
    padding: Spacing.cardPaddingLarge,
    ...Shadows.card,
  },
  cardTitle: {
    ...Typography.subtitle,
    color: Colors.textPrimary,
    marginBottom: Spacing.xl,
    fontWeight: '700',
  },
  weeklyStats: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  weeklyStat: {
    flex: 1,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  weeklyStatNumber: {
    ...Typography.title,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  weeklyStatLabel: {
    ...Typography.caption,
    textAlign: 'center',
    fontWeight: '600',
  },

  // Privacy Card
  privacyCard: {
    marginHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.xl,
    backgroundColor: Colors.successLight,
    borderRadius: Spacing.radiusXLarge,
    padding: Spacing.cardPaddingLarge,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.success,
  },
  privacyIcon: {
    fontSize: Spacing.iconXLarge,
    marginRight: Spacing.lg,
  },
  privacyContent: {
    flex: 1,
  },
  privacyTitle: {
    ...Typography.subtitle,
    color: Colors.success,
    marginBottom: Spacing.sm,
    fontWeight: '700',
  },
  privacyText: {
    ...Typography.body,
    color: Colors.success,
    lineHeight: 24,
  },

  // Family Section
  familySection: {
    marginHorizontal: Spacing.screenHorizontal,
  },
  sectionHeader: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.title,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    fontWeight: '700',
  },
  sectionSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 24,
  },

  // Empty State
  emptyState: {
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.radiusXLarge,
    padding: Spacing.cardPaddingLarge,
    alignItems: 'center',
    marginBottom: Spacing.xl,
    ...Shadows.card,
  },
  emptyIcon: {
    fontSize: Spacing.iconEnormous,
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    ...Typography.subtitle,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    fontWeight: '700',
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },

  // Members List
  membersList: {
    gap: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  memberCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.sm,
  },
  memberAvatar: {
    width: 60,
    height: 60,
    borderRadius: Spacing.radiusRound,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.lg,
  },
  memberAvatarText: {
    ...Typography.subtitle,
    color: Colors.textInverse,
    fontWeight: '700',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    ...Typography.subtitle,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    fontWeight: '600',
  },
  memberEmail: {
    ...Typography.body,
    color: Colors.textSecondary,
  },

  // Add Form
  addForm: {
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.radiusXLarge,
    padding: Spacing.cardPaddingLarge,
    ...Shadows.card,
  },
  addFormTitle: {
    ...Typography.subtitle,
    color: Colors.textPrimary,
    marginBottom: Spacing.xl,
    fontWeight: '700',
  },
  input: {
    ...Typography.body,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    color: Colors.textPrimary,
  },
  formButtons: {
    flexDirection: 'row',
    gap: Spacing.lg,
    justifyContent: 'space-between',
  },
});

export default FamilyDashboardScreen;