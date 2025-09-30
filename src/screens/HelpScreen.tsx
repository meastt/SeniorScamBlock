import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { SeniorButton } from '../components/SeniorButton';
import { BackButton } from '../components/BackButton';
import { EDUCATION_ARTICLES } from '../data/scamEducation';
import { EducationArticle } from '../types';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';

/**
 * Help Screen - Scam education library and app settings
 * Simple list of educational articles
 */
const HelpScreen = () => {
  const { subscription } = useApp();
  const [selectedArticle, setSelectedArticle] = useState<EducationArticle | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Help & Learn</Text>

        {/* Subscription Status */}
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Your Plan</Text>
          <Text style={styles.statusTier}>
            {subscription.tier === 'FREE' ? '🆓 Free Plan' : '⭐ Premium Plan'}
          </Text>
          {subscription.tier === 'FREE' && (
            <Text style={styles.statusText}>
              {subscription.monthlyLimit - subscription.messageCheckCount} checks remaining
            </Text>
          )}
        </View>

        {/* Education Library */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learn About Scams</Text>
          <Text style={styles.sectionSubtitle}>
            Tap any topic to learn more
          </Text>

          <View style={styles.articlesContainer}>
            {EDUCATION_ARTICLES.map((article) => (
              <TouchableOpacity
                key={article.id}
                style={styles.articleCard}
                onPress={() => setSelectedArticle(article)}
                activeOpacity={0.7}
              >
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articleMeta}>
                  📖 {article.readTime} min read
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Need Help?</Text>
          
          <View style={styles.contactCard}>
            <Text style={styles.contactTitle}>Report a Scam</Text>
            <Text style={styles.contactInfo}>
              📞 FTC: 1-877-382-4357{'\n'}
              🌐 ReportFraud.ftc.gov
            </Text>
          </View>

          <View style={styles.contactCard}>
            <Text style={styles.contactTitle}>Elder Abuse Hotline</Text>
            <Text style={styles.contactInfo}>
              📞 1-800-677-1116
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Article Modal */}
      <Modal
        visible={selectedArticle !== null}
        animationType="slide"
        onRequestClose={() => setSelectedArticle(null)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <BackButton onPress={() => setSelectedArticle(null)} />
          
          {selectedArticle && (
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedArticle.title}</Text>
              <Text style={styles.modalMeta}>
                📖 {selectedArticle.readTime} minute read
              </Text>
              <Text style={styles.modalText}>{selectedArticle.content}</Text>
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>
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
  statusCard: {
    backgroundColor: Colors.cardBackground,
    padding: Spacing.lg,
    borderRadius: 8,
    marginBottom: Spacing.lg,
    borderWidth: 3,
    borderColor: Colors.black,
  },
  statusTitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  statusTier: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  statusText: {
    ...Typography.body,
    color: Colors.textPrimary,
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
  articlesContainer: {
    gap: Spacing.md,
  },
  articleCard: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.black,
    minHeight: Spacing.minTouchTarget,
    justifyContent: 'center',
  },
  articleTitle: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  articleMeta: {
    ...Typography.tab,
    color: Colors.textSecondary,
  },
  contactCard: {
    backgroundColor: Colors.cardBackground,
    padding: Spacing.lg,
    borderRadius: 8,
    marginBottom: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.primaryButton,
  },
  contactTitle: {
    ...Typography.body,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  contactInfo: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalContent: {
    padding: Spacing.screenPadding,
  },
  modalTitle: {
    ...Typography.headline,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  modalMeta: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  modalText: {
    ...Typography.body,
    color: Colors.textPrimary,
    lineHeight: 36,
  },
});

export default HelpScreen;