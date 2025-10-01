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
import { BackButton } from '../components/BackButton';
import { EDUCATION_ARTICLES } from '../data/scamEducation';
import { EducationArticle } from '../types';
import { Colors, Shadows } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';
import { Responsive } from '../theme/responsive';

/**
 * Tips Screen - Scam education library with enhanced styling
 * Educational articles to help seniors recognize and avoid scams
 */
const TipsScreen = () => {
  const [selectedArticle, setSelectedArticle] = useState<EducationArticle | null>(null);

  const getArticleColor = (scamType: string) => {
    if (scamType.includes('Grandparent')) return Colors.dangerRed;
    if (scamType.includes('Government')) return Colors.warningYellow;
    if (scamType.includes('Phishing')) return Colors.info;
    if (scamType.includes('Romance')) return Colors.premium;
    if (scamType.includes('Lottery')) return Colors.success;
    if (scamType.includes('Tech Support')) return Colors.primary;
    return Colors.primaryButton;
  };

  const getArticleIcon = (scamType: string) => {
    if (scamType.includes('Grandparent')) return '👴';
    if (scamType.includes('Government')) return '🏛️';
    if (scamType.includes('Phishing')) return '🎣';
    if (scamType.includes('Romance')) return '💔';
    if (scamType.includes('Lottery')) return '🎰';
    if (scamType.includes('Tech Support')) return '💻';
    if (scamType.includes('General')) return '🛡️';
    return '⚠️';
  };

  const formatArticleContent = (content: string) => {
    // Split content into sections
    const sections = content.trim().split('\n\n');
    return sections.map((section, index) => {
      const lines = section.split('\n');
      const header = lines[0];
      const body = lines.slice(1);

      // Check if it's a header section
      const isHeader = header.endsWith(':') && header === header.toUpperCase();

      return (
        <View key={index} style={styles.contentSection}>
          {isHeader ? (
            <Text style={styles.sectionHeader}>{header}</Text>
          ) : (
            <Text style={styles.contentText}>{header}</Text>
          )}
          {body.map((line, lineIndex) => (
            <Text key={lineIndex} style={styles.contentText}>
              {line}
            </Text>
          ))}
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Text style={styles.headerEmoji}>💡</Text>
          </View>
          <Text style={styles.headerTitle}>Scam Protection Tips</Text>
          <Text style={styles.headerSubtitle}>
            Learn how to spot and avoid common scams targeting seniors
          </Text>
        </View>

        {/* Article Grid */}
        <View style={styles.articlesContainer}>
          {EDUCATION_ARTICLES.map((article) => {
            const accentColor = getArticleColor(article.scamType);
            const icon = getArticleIcon(article.scamType);

            return (
              <TouchableOpacity
                key={article.id}
                style={[styles.articleCard, { borderLeftColor: accentColor }]}
                onPress={() => setSelectedArticle(article)}
                activeOpacity={0.7}
              >
                <View style={styles.articleHeader}>
                  <View style={[styles.articleIconBadge, { backgroundColor: accentColor + '20' }]}>
                    <Text style={styles.articleIcon}>{icon}</Text>
                  </View>
                  <View style={styles.articleInfo}>
                    <Text style={styles.articleTitle}>{article.title}</Text>
                    <View style={styles.articleMeta}>
                      <Text style={styles.readTime}>📖 {article.readTime} min read</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.articleFooter}>
                  <Text style={[styles.scamTypeBadge, { color: accentColor }]}>
                    {article.scamType}
                  </Text>
                  <Text style={styles.readMoreText}>Tap to read →</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Quick Safety Tips Card */}
        <View style={styles.quickTipsCard}>
          <Text style={styles.quickTipsTitle}>⚡ Quick Safety Rules</Text>
          <View style={styles.quickTipsList}>
            <View style={styles.quickTip}>
              <Text style={styles.quickTipIcon}>🛑</Text>
              <Text style={styles.quickTipText}>Never rush - scammers use urgency</Text>
            </View>
            <View style={styles.quickTip}>
              <Text style={styles.quickTipIcon}>📞</Text>
              <Text style={styles.quickTipText}>Verify by calling known numbers</Text>
            </View>
            <View style={styles.quickTip}>
              <Text style={styles.quickTipIcon}>💳</Text>
              <Text style={styles.quickTipText}>Never pay with gift cards</Text>
            </View>
            <View style={styles.quickTip}>
              <Text style={styles.quickTipIcon}>👨‍👩‍👧‍👦</Text>
              <Text style={styles.quickTipText}>Ask family before sending money</Text>
            </View>
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
            <ScrollView
              contentContainerStyle={styles.modalContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Article Header */}
              <View style={[
                styles.modalHeader,
                { backgroundColor: getArticleColor(selectedArticle.scamType) + '15' }
              ]}>
                <Text style={styles.modalIcon}>
                  {getArticleIcon(selectedArticle.scamType)}
                </Text>
                <Text style={styles.modalTitle}>{selectedArticle.title}</Text>
                <View style={styles.modalMetaRow}>
                  <Text style={[
                    styles.modalScamType,
                    { color: getArticleColor(selectedArticle.scamType) }
                  ]}>
                    {selectedArticle.scamType}
                  </Text>
                  <Text style={styles.modalReadTime}>
                    📖 {selectedArticle.readTime} minute read
                  </Text>
                </View>
              </View>

              {/* Article Content */}
              <View style={styles.modalBody}>
                {formatArticleContent(selectedArticle.content)}
              </View>

              {/* Bottom CTA */}
              <View style={styles.modalFooter}>
                <View style={styles.reminderCard}>
                  <Text style={styles.reminderIcon}>💡</Text>
                  <Text style={styles.reminderText}>
                    When in doubt, use Elder Sentry to check any suspicious message before responding!
                  </Text>
                </View>
              </View>
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
    backgroundColor: Colors.primaryLight,
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

  // Articles Grid
  articlesContainer: {
    paddingHorizontal: Responsive.getScreenMargin(),
    gap: Spacing.lg,
  },
  articleCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.lg,
    borderLeftWidth: 6,
    ...Shadows.card,
  },
  articleHeader: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  articleIconBadge: {
    width: 60,
    height: 60,
    borderRadius: Spacing.radiusMedium,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  articleIcon: {
    fontSize: Spacing.iconLarge,
  },
  articleInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  articleTitle: {
    ...Typography.subtitle,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    fontWeight: '700',
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readTime: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  scamTypeBadge: {
    ...Typography.caption,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  readMoreText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
  },

  // Quick Tips Card
  quickTipsCard: {
    marginHorizontal: Responsive.getScreenMargin(),
    marginTop: Spacing.xl,
    backgroundColor: Colors.successLight,
    borderRadius: Spacing.radiusXLarge,
    padding: Spacing.cardPaddingLarge,
    borderWidth: 2,
    borderColor: Colors.success,
  },
  quickTipsTitle: {
    ...Typography.title,
    color: Colors.successDark,
    marginBottom: Spacing.lg,
    fontWeight: '700',
  },
  quickTipsList: {
    gap: Spacing.md,
  },
  quickTip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: Spacing.radiusMedium,
  },
  quickTipIcon: {
    fontSize: Spacing.iconMedium,
    marginRight: Spacing.md,
  },
  quickTipText: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
    fontWeight: '500',
  },

  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalContent: {
    paddingBottom: Spacing.enormous,
  },
  modalHeader: {
    alignItems: 'center',
    paddingHorizontal: Responsive.getScreenMargin(),
    paddingTop: Spacing.huge,
    paddingBottom: Spacing.xl,
  },
  modalIcon: {
    fontSize: Spacing.iconEnormous,
    marginBottom: Spacing.lg,
  },
  modalTitle: {
    ...Typography.largeTitle,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
    textAlign: 'center',
    fontWeight: '700',
  },
  modalMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  modalScamType: {
    ...Typography.callout,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  modalReadTime: {
    ...Typography.callout,
    color: Colors.textSecondary,
  },
  modalBody: {
    paddingHorizontal: Responsive.getScreenMargin(),
  },
  contentSection: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    ...Typography.subtitle,
    color: Colors.primary,
    fontWeight: '700',
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contentText: {
    ...Typography.bodyLarge,
    color: Colors.textPrimary,
    lineHeight: 32,
    marginBottom: Spacing.sm,
  },
  modalFooter: {
    paddingHorizontal: Responsive.getScreenMargin(),
    marginTop: Spacing.xl,
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    padding: Spacing.lg,
    borderRadius: Spacing.radiusLarge,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  reminderIcon: {
    fontSize: Spacing.iconLarge,
    marginRight: Spacing.md,
  },
  reminderText: {
    ...Typography.body,
    color: Colors.primary,
    flex: 1,
    fontWeight: '600',
    lineHeight: 26,
  },
});

export default TipsScreen;
