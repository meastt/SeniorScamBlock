import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton } from '../components/BackButton';
import { EDUCATION_ARTICLES } from '../data/scamEducation';
import { EducationArticle } from '../types';
import { Colors, Shadows } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';
import { Responsive } from '../theme/responsive';
import { useTheme } from '../context/ThemeContext';
import {
  BookOpenIcon,
  InboxIcon,
  AlertTriangleIcon,
  BuildingIcon,
  FishIcon,
  HeartBrokenIcon,
  DollarSignIcon,
  MonitorIcon,
  ShieldIcon,
  ZapIcon,
} from '../components/Icons';

/**
 * Tips Screen - Scam education library with enhanced styling
 * Educational articles to help seniors recognize and avoid scams
 */
const TipsScreen = () => {
  const [selectedArticle, setSelectedArticle] = useState<EducationArticle | null>(null);
  const { colors } = useTheme();

  const getArticleColor = (scamType: string) => {
    if (scamType.includes('Grandparent')) return Colors.danger;
    if (scamType.includes('Government')) return Colors.warning;
    if (scamType.includes('Phishing')) return Colors.info;
    if (scamType.includes('Romance')) return Colors.premium;
    if (scamType.includes('Lottery')) return Colors.success;
    if (scamType.includes('Tech Support')) return Colors.primary;
    return Colors.primary;
  };

  const getArticleIcon = (scamType: string, color: string) => {
    const size = 24;
    if (scamType.includes('Grandparent')) return <AlertTriangleIcon size={size} color={color} />;
    if (scamType.includes('Government')) return <BuildingIcon size={size} color={color} />;
    if (scamType.includes('Phishing')) return <FishIcon size={size} color={color} />;
    if (scamType.includes('Romance')) return <HeartBrokenIcon size={size} color={color} />;
    if (scamType.includes('Lottery')) return <DollarSignIcon size={size} color={color} />;
    if (scamType.includes('Tech Support')) return <MonitorIcon size={size} color={color} />;
    if (scamType.includes('General')) return <ShieldIcon size={size} color={color} />;
    return <AlertTriangleIcon size={size} color={color} />;
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
            <Text style={[styles.sectionHeader, { color: colors.primary }]}>{header}</Text>
          ) : (
            <Text style={[styles.contentText, { color: colors.textPrimary }]}>{header}</Text>
          )}
          {body.map((line, lineIndex) => (
            <Text key={lineIndex} style={[styles.contentText, { color: colors.textPrimary }]}>
              {line}
            </Text>
          ))}
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.headerIconContainer, { backgroundColor: colors.primaryLight }]}>
            <BookOpenIcon size={48} color={colors.primary} />
          </View>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Scam Protection Tips</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            Learn how to spot and avoid common scams targeting seniors
          </Text>
        </View>

        {/* Article Grid */}
        <View style={styles.articlesContainer}>
          {EDUCATION_ARTICLES.map((article) => {
            const accentColor = getArticleColor(article.scamType);
            const icon = getArticleIcon(article.scamType, accentColor);

            return (
              <TouchableOpacity
                key={article.id}
                style={[styles.articleCard, { borderColor: accentColor, backgroundColor: colors.backgroundSecondary }]}
                onPress={() => setSelectedArticle(article)}
                activeOpacity={0.7}
              >
                <View style={[styles.articleIconContainer, { backgroundColor: accentColor + '15' }]}>
                  {icon}
                </View>
                <View style={styles.articleInfo}>
                  <Text style={[styles.articleTitle, { color: colors.textPrimary }]}>{article.title}</Text>
                  <View style={styles.articleMeta}>
                    <Text style={[styles.readTime, { color: colors.textSecondary }]}>{article.readTime} min read</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Quick Safety Tips Card */}
        <View style={[styles.quickTipsCard, { backgroundColor: colors.backgroundSecondary }]}>
          <View style={styles.quickTipsHeader}>
            <ZapIcon size={24} color={Colors.success} />
            <Text style={[styles.quickTipsTitle, { color: colors.textPrimary }]}>Quick Safety Rules</Text>
          </View>
          <View style={styles.quickTipsList}>
            <View style={[styles.quickTip, { backgroundColor: colors.background }]}>
              <View style={[styles.quickTipDot, { backgroundColor: Colors.success }]} />
              <Text style={[styles.quickTipText, { color: colors.textPrimary }]}>Never rush - scammers use urgency</Text>
            </View>
            <View style={[styles.quickTip, { backgroundColor: colors.background }]}>
              <View style={[styles.quickTipDot, { backgroundColor: Colors.success }]} />
              <Text style={[styles.quickTipText, { color: colors.textPrimary }]}>Verify by calling known numbers</Text>
            </View>
            <View style={[styles.quickTip, { backgroundColor: colors.background }]}>
              <View style={[styles.quickTipDot, { backgroundColor: Colors.success }]} />
              <Text style={[styles.quickTipText, { color: colors.textPrimary }]}>Never pay with gift cards</Text>
            </View>
            <View style={[styles.quickTip, { backgroundColor: colors.background }]}>
              <View style={[styles.quickTipDot, { backgroundColor: Colors.success }]} />
              <Text style={[styles.quickTipText, { color: colors.textPrimary }]}>Ask family before sending money</Text>
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
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: colors.background }]}>
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
                <View style={[
                  styles.modalIconContainer,
                  { backgroundColor: getArticleColor(selectedArticle.scamType) + '20' }
                ]}>
                  {getArticleIcon(selectedArticle.scamType, getArticleColor(selectedArticle.scamType))}
                </View>
                <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>{selectedArticle.title}</Text>
                <View style={styles.modalMetaRow}>
                  <Text style={[
                    styles.modalScamType,
                    { color: getArticleColor(selectedArticle.scamType) }
                  ]}>
                    {selectedArticle.scamType}
                  </Text>
                  <Text style={[styles.modalReadTime, { color: colors.textSecondary }]}>
                    {selectedArticle.readTime} minute read
                  </Text>
                </View>
              </View>

              {/* Article Content */}
              <View style={styles.modalBody}>
                {formatArticleContent(selectedArticle.content)}
              </View>

              {/* Bottom CTA */}
              <View style={styles.modalFooter}>
                <View style={[styles.reminderCard, { backgroundColor: Colors.primaryLight }]}>
                  <View style={styles.reminderHeader}>
                    <ShieldIcon size={20} color={Colors.primary} />
                    <Text style={[styles.reminderTitle, { color: Colors.primary }]}>Remember</Text>
                  </View>
                  <Text style={[styles.reminderText, { color: Colors.primary }]}>
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
  },
  scrollContent: {
    paddingBottom: Spacing.massive,
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
    marginBottom: Spacing.md,
    textAlign: 'center',
    fontWeight: '700',
  },
  headerSubtitle: {
    ...Typography.body,
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
    flexDirection: 'row',
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.lg,
    borderWidth: 2,
    ...Shadows.card,
    alignItems: 'center',
  },
  articleIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  articleInfo: {
    flex: 1,
  },
  articleTitle: {
    ...Typography.subtitle,
    marginBottom: Spacing.xs,
    fontWeight: '700',
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readTime: {
    ...Typography.caption,
  },

  // Quick Tips Card
  quickTipsCard: {
    marginHorizontal: Responsive.getScreenMargin(),
    marginTop: Spacing.xl,
    borderRadius: Spacing.radiusXLarge,
    padding: Spacing.cardPaddingLarge,
    borderWidth: 2,
    borderColor: Colors.success,
  },
  quickTipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  quickTipsTitle: {
    ...Typography.title,
    fontWeight: '700',
  },
  quickTipsList: {
    gap: Spacing.md,
  },
  quickTip: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: Spacing.radiusMedium,
  },
  quickTipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.md,
  },
  quickTipText: {
    ...Typography.body,
    fontWeight: '500',
    flex: 1,
  },

  // Modal
  modalContainer: {
    flex: 1,
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
  modalIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    ...Shadows.md,
  },
  modalTitle: {
    ...Typography.largeTitle,
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
  },
  modalBody: {
    paddingHorizontal: Responsive.getScreenMargin(),
  },
  contentSection: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    ...Typography.subtitle,
    fontWeight: '700',
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contentText: {
    ...Typography.bodyLarge,
    lineHeight: 32,
    marginBottom: Spacing.sm,
  },
  modalFooter: {
    paddingHorizontal: Responsive.getScreenMargin(),
    marginTop: Spacing.xl,
  },
  reminderCard: {
    padding: Spacing.lg,
    borderRadius: Spacing.radiusLarge,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  reminderTitle: {
    ...Typography.subtitle,
    fontWeight: '700',
  },
  reminderText: {
    ...Typography.body,
    fontWeight: '500',
    lineHeight: 26,
  },
});

export default TipsScreen;
