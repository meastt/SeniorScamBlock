export type ScamRiskLevel = 'RED' | 'YELLOW' | 'GREEN';

export interface ScamAnalysisResult {
  id: string;
  riskLevel: ScamRiskLevel;
  message: string;
  explanation: string;
  detailedExplanation?: string;
  scamType?: string;
  timestamp: Date;
  messageContent: string;
}

export interface UserSubscription {
  tier: 'FREE' | 'PREMIUM';
  messageCheckCount: number;
  monthlyLimit: number;
  subscriptionDate?: Date;
  expiryDate?: Date;
}

export interface FamilyMember {
  id: string;
  name: string;
  email: string;
  relationship: string;
}

export interface ScamAlert {
  id: string;
  timestamp: Date;
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