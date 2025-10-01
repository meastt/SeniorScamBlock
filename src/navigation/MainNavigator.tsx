import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, StyleSheet } from 'react-native';
import { Colors, Shadows } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';

// Screens
import HomeScreen from '../screens/HomeScreen';
import TipsScreen from '../screens/TipsScreen';
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
 * Tips Stack Navigator
 */
const TipsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TipsMain" component={TipsScreen} />
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
 * Simple 3-tab navigation: Home / Tips / Help
 * Large text, high contrast, tap-only interaction
 */
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.primary,
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
        name="Tips"
        component={TipsStack}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.tabLabel, { color }]}>Tips</Text>
          ),
          tabBarIcon: ({ focused, color }) => (
            <Text style={[styles.tabIcon, { color }]}>💡</Text>
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
            <Text style={[styles.tabIcon, { color }]}>🆘</Text>
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