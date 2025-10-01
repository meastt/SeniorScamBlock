import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Linking from 'expo-linking';
import MainNavigator from './src/navigation/MainNavigator';
import { AppProvider } from './src/context/AppContext';

export default function App() {
  const navigationRef = useRef<any>(null);

  useEffect(() => {
    // Handle deep links and shared content
    const handleDeepLink = (event: { url: string }) => {
      const { path, queryParams } = Linking.parse(event.url);
      
      // Handle shared text from Messages/Email
      if (queryParams?.text && navigationRef.current) {
        navigationRef.current.navigate('Home', {
          screen: 'HomeMain',
          params: { sharedText: queryParams.text },
        });
      }
    };

    // Listen for deep links
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Check if app was opened via share/deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer ref={navigationRef}>
          <MainNavigator />
          <StatusBar style="dark" />
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}