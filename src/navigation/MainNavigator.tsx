import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, StyleSheet } from 'react-native';
import { Colors, Shadows } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';

// Screens
import HomeScreen from '../screens/HomeScreen';
import RecentScreen from '../screens/RecentScreen';
import HelpScreen from '../screens/HelpScreen';
import ResultScreen from '../screens/ResultScreen';
import UpgradeScreen from '../screens/UpgradeScreen';
import FamilyDashboardScreen from '../screens/FamilyDashboardScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/**
 * Home Stack Navigator
 */
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="Upgrade" component={UpgradeScreen} />
      <Stack.Screen name="FamilyDashboard" component={FamilyDashboardScreen} />
    </Stack.Navigator>
  );
};

/**
 * Recent Stack Navigator
 */
const RecentStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RecentMain" component={RecentScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
    </Stack.Navigator>
  );
};

/**
 * Help Stack Navigator
 */
const HelpStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HelpMain" component={HelpScreen} />
      <Stack.Screen name="FamilyDashboard" component={FamilyDashboardScreen} />
    </Stack.Navigator>
  );
};

/**
 * Main Tab Navigator
 * Simple 3-tab navigation: Home / Recent / Help
 * Large text, high contrast, tap-only interaction
 */
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.primaryButton,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.tabLabel, { color }]}>Home</Text>
          ),
          tabBarIcon: ({ focused, color }) => (
            <Text style={[styles.tabIcon, { color }]}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Recent"
        component={RecentStack}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.tabLabel, { color }]}>Recent</Text>
          ),
          tabBarIcon: ({ focused, color }) => (
            <Text style={[styles.tabIcon, { color }]}>📋</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Help"
        component={HelpStack}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.tabLabel, { color }]}>Help</Text>
          ),
          tabBarIcon: ({ focused, color }) => (
            <Text style={[styles.tabIcon, { color }]}>❓</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 100,
    paddingBottom: 16,
    paddingTop: 8,
    borderTopWidth: 0,
    backgroundColor: Colors.white,
    ...Shadows.lg,
  },
  tabLabel: {
    ...Typography.tab,
    marginTop: 4,
    fontWeight: '600',
  },
  tabIcon: {
    fontSize: Spacing.iconMedium,
  },
  tabItem: {
    minHeight: Spacing.minTouchTarget,
  },
});

export default MainNavigator;