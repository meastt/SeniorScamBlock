import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { ScamRiskLevel } from '../types';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';
import { format } from 'date-fns';

/**
 * Recent Screen - Shows history of checked messages
 * Simple list with color-coded results
 */
const RecentScreen = () => {
  const navigation = useNavigation();
  const { analysisHistory } = useApp();

  const getRiskColor = (riskLevel: ScamRiskLevel) => {
    switch (riskLevel) {
      case 'RED': return Colors.dangerRed;
      case 'YELLOW': return Colors.warningYellow;
      case 'GREEN': return Colors.safeGreen;
    }
  };

  const getRiskIcon = (riskLevel: ScamRiskLevel) => {
    switch (riskLevel) {
      case 'RED': return '🔴';
      case 'YELLOW': return '🟡';
      case 'GREEN': return '🟢';
    }
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
            <Text style={styles.emptyIcon}>📭</Text>
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
                  { borderLeftColor: getRiskColor(item.riskLevel) }
                ]}
                onPress={() => handleItemPress(item)}
                activeOpacity={0.7}
              >
                <View style={styles.itemHeader}>
                  <Text style={styles.itemIcon}>{getRiskIcon(item.riskLevel)}</Text>
                  <Text style={[styles.itemRisk, { color: getRiskColor(item.riskLevel) }]}>
                    {item.riskLevel}
                  </Text>
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
  emptyIcon: {
    fontSize: 88,
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
    borderRadius: 8,
    borderLeftWidth: 8,
    borderWidth: 2,
    borderColor: Colors.lightBorder,
    minHeight: Spacing.minTouchTarget,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  itemIcon: {
    fontSize: Spacing.iconMedium,
    marginRight: Spacing.sm,
  },
  itemRisk: {
    ...Typography.subheadline,
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