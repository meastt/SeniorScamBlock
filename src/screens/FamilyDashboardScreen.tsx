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
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';
import { format, subDays } from 'date-fns';

/**
 * Family Dashboard Screen (Premium Only)
 * Adult children can monitor parent's scam alerts
 * Privacy: sees alerts only, NOT message content
 */
const FamilyDashboardScreen = () => {
  const { subscription, familyMembers, addFamilyMember, removeFamilyMember, analysisHistory } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');

  // Calculate weekly stats
  const weekAgo = subDays(new Date(), 7);
  const weeklyChecks = analysisHistory.filter(
    item => new Date(item.timestamp) >= weekAgo
  );
  const weeklyScams = weeklyChecks.filter(item => item.riskLevel === 'RED').length;
  const weeklySuspicious = weeklyChecks.filter(item => item.riskLevel === 'YELLOW').length;

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
          <Text style={styles.upgradeIcon}>⭐</Text>
          <Text style={styles.upgradeTitle}>Premium Feature</Text>
          <Text style={styles.upgradeText}>
            Family Dashboard is only available with Premium.
          </Text>
          <SeniorButton
            title="Upgrade to Premium"
            onPress={() => {}}
            variant="primary"
            fullWidth
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Family Dashboard</Text>

        {/* Weekly Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>This Week</Text>
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{weeklyScams}</Text>
              <Text style={styles.statLabel}>Scams Blocked</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{weeklySuspicious}</Text>
              <Text style={styles.statLabel}>Suspicious</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{weeklyChecks.length}</Text>
              <Text style={styles.statLabel}>Total Checks</Text>
            </View>
          </View>
        </View>

        {/* Privacy Notice */}
        <View style={styles.privacyCard}>
          <Text style={styles.privacyIcon}>🔒</Text>
          <Text style={styles.privacyText}>
            Your family sees alerts only.{'\n'}
            They do NOT see message content.
          </Text>
        </View>

        {/* Family Members */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Family Members</Text>
          <Text style={styles.sectionSubtitle}>
            These people get alerts when scams are detected
          </Text>

          {familyMembers.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                No family members added yet
              </Text>
            </View>
          ) : (
            <View style={styles.membersContainer}>
              {familyMembers.map(member => (
                <View key={member.id} style={styles.memberCard}>
                  <View style={styles.memberInfo}>
                    <Text style={styles.memberName}>{member.name}</Text>
                    <Text style={styles.memberEmail}>{member.email}</Text>
                  </View>
                  <SeniorButton
                    title="Remove"
                    onPress={() => handleRemoveMember(member)}
                    variant="secondary"
                  />
                </View>
              ))}
            </View>
          )}

          {!showAddForm ? (
            <SeniorButton
              title="Add Family Member"
              onPress={() => setShowAddForm(true)}
              variant="primary"
              fullWidth
            />
          ) : (
            <View style={styles.addForm}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor={Colors.textSecondary}
                value={newMemberName}
                onChangeText={setNewMemberName}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={Colors.textSecondary}
                value={newMemberEmail}
                onChangeText={setNewMemberEmail}
                keyboardType="email-address"
              />
              <View style={styles.formButtons}>
                <SeniorButton
                  title="Cancel"
                  onPress={() => setShowAddForm(false)}
                  variant="secondary"
                />
                <SeniorButton
                  title="Add"
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
    padding: Spacing.screenPadding,
  },
  title: {
    ...Typography.headline,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  upgradePrompt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  upgradeIcon: {
    fontSize: 88,
    marginBottom: Spacing.lg,
  },
  upgradeTitle: {
    ...Typography.headline,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  upgradeText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: Colors.primaryButton,
    padding: Spacing.lg,
    borderRadius: 8,
    marginBottom: Spacing.lg,
    borderWidth: 3,
    borderColor: Colors.black,
  },
  summaryTitle: {
    ...Typography.subheadline,
    color: Colors.white,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: Colors.white,
  },
  statLabel: {
    ...Typography.tab,
    color: Colors.white,
    textAlign: 'center',
  },
  privacyCard: {
    backgroundColor: Colors.cardBackground,
    padding: Spacing.lg,
    borderRadius: 8,
    marginBottom: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.safeGreen,
  },
  privacyIcon: {
    fontSize: Spacing.iconLarge,
    marginRight: Spacing.md,
  },
  privacyText: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  sectionSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  emptyState: {
    backgroundColor: Colors.cardBackground,
    padding: Spacing.xl,
    borderRadius: 8,
    marginBottom: Spacing.md,
    alignItems: 'center',
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  membersContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  memberCard: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  memberEmail: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  addForm: {
    backgroundColor: Colors.cardBackground,
    padding: Spacing.lg,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.black,
  },
  input: {
    ...Typography.body,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.black,
    borderRadius: 8,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    color: Colors.textPrimary,
  },
  formButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
    justifyContent: 'space-between',
  },
});

export default FamilyDashboardScreen;