import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { useTheme } from '../context/ThemeContext';

// Screens
import HomeScreen from '../screens/HomeScreen';
import TipsScreen from '../screens/TipsScreen';
import HelpScreen from '../screens/HelpScreen';
import ResultScreen from '../screens/ResultScreen';
import UpgradeScreen from '../screens/UpgradeScreen';
import FamilyDashboardScreen from '../screens/FamilyDashboardScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Professional SVG Icons
const ShieldIcon = ({ color, size = 24 }: { color: string; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

const BookOpenIcon = ({ color, size = 24 }: { color: string; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <Path
      d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

const LifebuoyIcon = ({ color, size = 24 }: { color: string; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} fill="none" />
    <Circle cx={12} cy={12} r={4} stroke={color} strokeWidth={2} fill="none" />
    <Path d="M4.93 4.93l4.24 4.24" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M14.83 14.83l4.24 4.24" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M14.83 9.17l4.24-4.24" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M14.83 9.17l-4.24 4.24" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M4.93 19.07l4.24-4.24" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

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
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

/**
 * Main Tab Navigator - Professional, Sophisticated
 *
 * Design principles:
 * - Clean SVG icons (no emojis)
 * - Subtle animations and states
 * - Clear but refined typography
 * - Professional color palette
 */
const MainNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar,
          backgroundColor: colors.backgroundElevated,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.tabLabel, { color, fontWeight: focused ? '600' : '500' }]}>
              Check
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <ShieldIcon color={color} size={22} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Tips"
        component={TipsStack}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.tabLabel, { color, fontWeight: focused ? '600' : '500' }]}>
              Learn
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <BookOpenIcon color={color} size={22} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Help"
        component={HelpStack}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.tabLabel, { color, fontWeight: focused ? '600' : '500' }]}>
              Support
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <LifebuoyIcon color={color} size={22} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 68,
    paddingBottom: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 8,
  },
  tabLabel: {
    fontSize: 13,
    marginTop: 4,
    letterSpacing: 0.2,
  },
  iconContainer: {
    paddingTop: 4,
  },
  iconContainerActive: {
    transform: [{ translateY: -1 }],
  },
  tabItem: {
    paddingVertical: 8,
  },
});

export default MainNavigator;