import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './src/navigation/MainNavigator';
import { AppProvider } from './src/context/AppContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <MainNavigator />
          <StatusBar style="dark" />
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}