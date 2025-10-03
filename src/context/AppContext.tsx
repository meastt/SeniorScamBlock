import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserSubscription, ScamAnalysisResult, FamilyMember } from '../types';

interface AppContextType {
  subscription: UserSubscription;
  analysisHistory: ScamAnalysisResult[];
  familyMembers: FamilyMember[];
  addAnalysis: (analysis: ScamAnalysisResult) => void;
  upgradeToPremium: () => void;
  resetMonthlyCount: () => void;
  addFamilyMember: (member: FamilyMember) => void;
  removeFamilyMember: (id: string) => void;
}

const defaultSubscription: UserSubscription = {
  tier: 'FREE',
  messageCheckCount: 0,
  monthlyLimit: 10,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscription, setSubscription] = useState<UserSubscription>(defaultSubscription);
  const [analysisHistory, setAnalysisHistory] = useState<ScamAnalysisResult[]>([]);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [subData, historyData, familyData] = await Promise.all([
        AsyncStorage.getItem('subscription'),
        AsyncStorage.getItem('analysisHistory'),
        AsyncStorage.getItem('familyMembers'),
      ]);

      if (subData) {
        const parsedSub = JSON.parse(subData);
        setSubscription(parsedSub);
      }
      if (historyData) setAnalysisHistory(JSON.parse(historyData));
      if (familyData) setFamilyMembers(JSON.parse(familyData));
    } catch (error) {
      console.error('Error loading data:', error);
      // Ensure we have a valid subscription object even if loading fails
      setSubscription(defaultSubscription);
    }
  };

  const addAnalysis = async (analysis: ScamAnalysisResult) => {
    const newHistory = [analysis, ...analysisHistory].slice(0, 50); // Keep last 50
    setAnalysisHistory(newHistory);
    await AsyncStorage.setItem('analysisHistory', JSON.stringify(newHistory));

    // Increment check count for free tier
    if (subscription.tier === 'FREE') {
      const newSub = {
        ...subscription,
        messageCheckCount: subscription.messageCheckCount + 1,
      };
      setSubscription(newSub);
      await AsyncStorage.setItem('subscription', JSON.stringify(newSub));
    }
  };

  const upgradeToPremium = async () => {
    const newSub: UserSubscription = {
      tier: 'PREMIUM',
      messageCheckCount: 0,
      monthlyLimit: -1, // Unlimited
      subscriptionDate: new Date(),
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    };
    setSubscription(newSub);
    await AsyncStorage.setItem('subscription', JSON.stringify(newSub));
  };

  const resetMonthlyCount = async () => {
    const newSub = { ...subscription, messageCheckCount: 0 };
    setSubscription(newSub);
    await AsyncStorage.setItem('subscription', JSON.stringify(newSub));
  };

  const addFamilyMember = async (member: FamilyMember) => {
    const newMembers = [...familyMembers, member];
    setFamilyMembers(newMembers);
    await AsyncStorage.setItem('familyMembers', JSON.stringify(newMembers));
  };

  const removeFamilyMember = async (id: string) => {
    const newMembers = familyMembers.filter(m => m.id !== id);
    setFamilyMembers(newMembers);
    await AsyncStorage.setItem('familyMembers', JSON.stringify(newMembers));
  };

  return (
    <AppContext.Provider
      value={{
        subscription,
        analysisHistory,
        familyMembers,
        addAnalysis,
        upgradeToPremium,
        resetMonthlyCount,
        addFamilyMember,
        removeFamilyMember,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }

  // Ensure subscription is always defined
  if (!context.subscription || typeof context.subscription.tier === 'undefined') {
    console.warn('Subscription context not properly initialized, using defaults');
    return {
      ...context,
      subscription: defaultSubscription,
    };
  }

  return context;
};