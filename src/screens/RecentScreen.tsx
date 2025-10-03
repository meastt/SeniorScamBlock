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
import { ScamRiskLevel } from '../types';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';
import { format } from 'date-fns';
import { InboxIcon, CircleIcon } from '../components/Icons';

/**
 * Recent Screen - Shows history of checked messages
 * Simple list with color-coded results
 */
const RecentScreen = () => {
  const navigation = useNavigation();
  const { analysisHistory } = useApp();

  const getRiskColor = (riskLevel: ScamRiskLevel) => {
    switch (riskLevel) {
      case 'RED': return Colors.danger;
      case 'YELLOW': return Colors.warning;
      case 'GREEN': return Colors.success;
    }
  };

  const getRiskIcon = (riskLevel: ScamRiskLevel, color: string) => {
    return <CircleIcon size={12} color={color} />;
  };

  const handleItemPress = (result: any) => {
    navigation.navigate('Result' as never, { result } as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Recent Checks</Text>

        {analysisHistory.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <InboxIcon size={64} color={Colors.textTertiary} />
            </View>
            <Text style={styles.emptyText}>
              No messages checked yet.{'\n'}
              Go to Home to check your first message.
            </Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            {analysisHistory.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.listItem,
                  { borderColor: getRiskColor(item.riskLevel) }
                ]}
                onPress={() => handleItemPress(item)}
                activeOpacity={0.7}
              >
                <View style={styles.itemHeader}>
                  <View style={styles.itemRiskContainer}>
                    {getRiskIcon(item.riskLevel, getRiskColor(item.riskLevel))}
                    <Text style={[styles.itemRisk, { color: getRiskColor(item.riskLevel) }]}>
                      {item.riskLevel}
                    </Text>
                  </View>
                </View>

                <Text style={styles.itemMessage} numberOfLines={2}>
                  {item.message}
                </Text>

                <Text style={styles.itemDate}>
                  {format(new Date(item.timestamp), 'MMM d, h:mm a')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  listContainer: {
    gap: Spacing.md,
  },
  listItem: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: 12,
    borderWidth: 2,
    minHeight: Spacing.minTouchTarget,
  },
  itemHeader: {
    marginBottom: Spacing.sm,
  },
  itemRiskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  itemRisk: {
    ...Typography.subtitle,
    fontWeight: '700',
  },
  itemMessage: {
    ...Typography.body,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  itemDate: {
    ...Typography.tab,
    color: Colors.textSecondary,
  },
});

export default RecentScreen;