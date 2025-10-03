import { ScamRiskLevel, ScamAnalysisResult } from '../types';
import Constants from 'expo-constants';

/**
 * AI-powered scam detection service
 * In production, this would call OpenAI API or custom ML model
 * For now, includes rule-based detection
 */

interface ScamPattern {
  keywords: string[];
  riskLevel: ScamRiskLevel;
  scamType: string;
  explanation: string;
}

const SCAM_PATTERNS: ScamPattern[] = [
  {
    keywords: ['grandchild', 'grandson', 'granddaughter', 'arrested', 'bail', 'jail', 'police', 'trouble'],
    riskLevel: 'RED',
    scamType: 'Grandparent Scam',
    explanation: 'Claims family member needs money urgently.',
  },
  {
    keywords: ['irs', 'tax', 'social security', 'medicare', 'government', 'arrest warrant', 'legal action'],
    riskLevel: 'RED',
    scamType: 'Government Impersonation',
    explanation: 'Pretends to be from government agency.',
  },
  {
    keywords: ['verify', 'account', 'suspended', 'click here', 'update', 'confirm', 'password', 'bank'],
    riskLevel: 'RED',
    scamType: 'Phishing',
    explanation: 'Tries to steal your login information.',
  },
  {
    keywords: ['urgent', 'act now', 'immediately', 'limited time', 'expire', 'deadline', '24 hours'],
    riskLevel: 'YELLOW',
    scamType: 'Urgency Tactics',
    explanation: 'Uses pressure to make you act quickly.',
  },
  {
    keywords: ['lonely', 'love', 'romance', 'investment', 'money', 'wire transfer', 'western union'],
    riskLevel: 'RED',
    scamType: 'Romance Scam',
    explanation: 'Builds fake relationship to steal money.',
  },
  {
    keywords: ['won', 'lottery', 'prize', 'claim', 'winner', 'congratulations', 'free'],
    riskLevel: 'RED',
    scamType: 'Lottery/Prize Scam',
    explanation: 'Fake prize to get personal information.',
  },
  {
    keywords: ['bitcoin', 'cryptocurrency', 'investment opportunity', 'guaranteed return', 'profit'],
    riskLevel: 'YELLOW',
    scamType: 'Investment Scam',
    explanation: 'Too good to be true investment offer.',
  },
];

/**
 * Main scam detection function - uses Claude Sonnet 4.5 AI when available
 * Falls back to rule-based detection if API key is not configured
 */
export const analyzeMessage = async (messageContent: string): Promise<ScamAnalysisResult> => {
  // Try AI-powered detection first (Claude Sonnet 4.5)
  try {
    return await analyzeMessageWithAI(messageContent);
  } catch (error) {
    console.warn('AI detection failed, falling back to rule-based detection:', error);
    return await analyzeMessageRuleBased(messageContent);
  }
};

/**
 * Rule-based scam detection (fallback method)
 * Uses pattern matching for basic scam detection
 */
export const analyzeMessageRuleBased = async (messageContent: string): Promise<ScamAnalysisResult> => {
  // Simulate processing delay (< 3 seconds)
  await new Promise(resolve => setTimeout(resolve, 1500));

  const lowerContent = messageContent.toLowerCase();
  let highestRisk: ScamRiskLevel = 'GREEN';
  let detectedPattern: ScamPattern | null = null;
  let matchCount = 0;

  // Check for scam patterns
  for (const pattern of SCAM_PATTERNS) {
    const matches = pattern.keywords.filter(keyword => 
      lowerContent.includes(keyword.toLowerCase())
    ).length;

    if (matches >= 2) {
      if (pattern.riskLevel === 'RED') {
        highestRisk = 'RED';
        detectedPattern = pattern;
        break;
      } else if (pattern.riskLevel === 'YELLOW' && highestRisk !== 'RED') {
        highestRisk = 'YELLOW';
        detectedPattern = pattern;
        matchCount = matches;
      }
    } else if (matches === 1 && highestRisk === 'GREEN') {
      highestRisk = 'YELLOW';
    }
  }

  // Generate explanation based on risk level
  let explanation = '';
  let detailedExplanation = '';
  let scamType = '';

  if (highestRisk === 'RED' && detectedPattern) {
    explanation = `SCAM: ${detectedPattern.explanation}`;
    scamType = detectedPattern.scamType;
    detailedExplanation = `This message shows signs of a ${detectedPattern.scamType}. ` +
      `Scammers use these tactics to steal money or personal information. ` +
      `NEVER send money or share personal details based on unexpected messages. ` +
      `If it mentions a family member, call them directly to verify. ` +
      `Government agencies NEVER demand immediate payment via phone or text.`;
  } else if (highestRisk === 'YELLOW') {
    explanation = 'Some suspicious signs detected. Verify carefully.';
    detailedExplanation = `This message contains some warning signs that could indicate a scam. ` +
      `Before responding: 1) Verify the sender through a known phone number or website. ` +
      `2) Never click links in unexpected messages. ` +
      `3) Be wary of urgent requests for money or personal information. ` +
      `When in doubt, ask a trusted family member for help.`;
    scamType = detectedPattern?.scamType || 'Suspicious Activity';
  } else {
    explanation = 'No obvious scam signs. Still be cautious.';
    detailedExplanation = `This message appears safe based on our analysis, but always stay vigilant. ` +
      `Scammers constantly create new tactics. ` +
      `General safety tips: Never share passwords, Social Security numbers, or bank details via text or email. ` +
      `Always verify unexpected requests through official channels.`;
    scamType = 'General Message';
  }

  return {
    id: Date.now().toString(),
    riskLevel: highestRisk,
    message: messageContent.substring(0, 200), // Store first 200 chars
    explanation,
    detailedExplanation,
    scamType,
    timestamp: new Date().toISOString(), // Convert to string for navigation serialization
    messageContent,
  };
};

/**
 * AI-powered scam detection using Claude Sonnet 4.5 API
 * Enhanced with latest model capabilities for superior scam detection
 */
export const analyzeMessageWithAI = async (messageContent: string): Promise<ScamAnalysisResult> => {
  // Get API key from expo-constants (injected from EAS secrets)
  const ANTHROPIC_API_KEY = Constants.expoConfig?.extra?.anthropicApiKey;

  // Fallback to rule-based if no API key configured
  if (!ANTHROPIC_API_KEY) {
    console.warn('No Anthropic API key found. Using rule-based detection.');
    return analyzeMessage(messageContent);
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: `You are an expert scam detection specialist with deep knowledge of fraud patterns targeting seniors aged 75+. Your role is to protect vulnerable elderly individuals from financial exploitation and identity theft.

TASK: Analyze the following message for scam indicators and provide a comprehensive assessment.

MESSAGE TO ANALYZE:
"${messageContent}"

ANALYSIS CRITERIA:
1. Look for urgency tactics (immediate action required, limited time offers)
2. Identify impersonation attempts (government agencies, family members, tech support)
3. Detect requests for money, personal information, or account access
4. Recognize social engineering techniques (emotional manipulation, authority pressure)
5. Spot suspicious communication patterns (poor grammar, unusual requests)
6. Consider context and plausibility of the request

RESPOND WITH ONLY RAW JSON (no markdown, no code blocks, no additional text):
{"riskLevel": "RED", "scamType": "Grandparent Scam", "explanation": "Family member needs money urgently", "detailedExplanation": "This is a classic grandparent scam. Never send money without verifying the person's identity first. Call your family member directly using a known phone number to confirm their safety."}

RISK LEVEL DEFINITIONS:
- RED: Definite scam with clear malicious intent (immediate threat)
- YELLOW: Suspicious indicators present (requires verification)
- GREEN: Appears legitimate (but maintain general caution)

COMMON SCAM CATEGORIES:
- Grandparent Scam, Government Impersonation, Phishing, Romance Scam, Lottery/Prize Scam, Tech Support Scam, Investment Scam, Medicare/Health Insurance Scam, Charity Fraud, Sweepstakes Scam

Focus on protecting seniors from financial harm and provide clear, actionable guidance.`
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.warn(`Claude API error (${response.status}): ${errorText}. Falling back to rule-based detection.`);
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.content[0].text;

    // Parse Claude's JSON response with error handling
    let parsed;
    try {
      // Clean the response - remove markdown code blocks if present
      let cleanResponse = aiResponse.trim();
      if (cleanResponse.startsWith('```json')) {
        cleanResponse = cleanResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanResponse.startsWith('```')) {
        cleanResponse = cleanResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      parsed = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error('Failed to parse Claude response as JSON:', aiResponse);
      throw new Error('Invalid JSON response from Claude API');
    }

    // Validate response structure
    if (!parsed.riskLevel || !parsed.scamType || !parsed.explanation || !parsed.detailedExplanation) {
      throw new Error('Incomplete response from Claude API');
    }

    // Ensure risk level is valid
    if (!['RED', 'YELLOW', 'GREEN'].includes(parsed.riskLevel)) {
      parsed.riskLevel = 'YELLOW'; // Default to caution
    }

    return {
      id: Date.now().toString(),
      riskLevel: parsed.riskLevel as ScamRiskLevel,
      message: messageContent.substring(0, 200),
      explanation: parsed.explanation,
      detailedExplanation: parsed.detailedExplanation,
      scamType: parsed.scamType,
      timestamp: new Date().toISOString(), // Convert to string for navigation serialization
      messageContent,
    };
  } catch (error) {
    // Only log critical errors, not 503 service unavailable (temporary)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    if (!errorMessage.includes('503')) {
      console.error('Error calling Claude API:', error);
    }
    // Fallback to rule-based detection on error
    return analyzeMessageRuleBased(messageContent);
  }
};