export type ScamRiskLevel = 'RED' | 'YELLOW' | 'GREEN';

export interface ScamAnalysisResult {
  id: string;
  riskLevel: ScamRiskLevel;
  message: string;
  explanation: string;
  detailedExplanation?: string;
  scamType?: string;
  timestamp: string; // ISO string for navigation serialization
  messageContent: string;
}

export interface UserSubscription {
  tier: 'FREE' | 'PREMIUM';
  messageCheckCount: number;
  monthlyLimit: number;
  subscriptionDate?: string; // ISO string
  expiryDate?: string; // ISO string
}

export interface FamilyMember {
  id: string;
  name: string;
  email: string;
  relationship: string;
}

export interface ScamAlert {
  id: string;
  timestamp: string; // ISO string
  riskLevel: ScamRiskLevel;
  blocked: boolean;
}

export interface EducationArticle {
  id: string;
  title: string;
  content: string;
  scamType: string;
  readTime: number;
}