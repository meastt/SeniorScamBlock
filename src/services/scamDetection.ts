import { ScamRiskLevel, ScamAnalysisResult } from '../types';

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

export const analyzeMessage = async (messageContent: string): Promise<ScamAnalysisResult> => {
  // Simulate AI processing delay (< 3 seconds)
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
    timestamp: new Date(),
    messageContent,
  };
};

/**
 * AI-powered scam detection using Claude API
 */
export const analyzeMessageWithAI = async (messageContent: string): Promise<ScamAnalysisResult> => {
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

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
        model: 'claude-sonnet-3-5-20240620',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: `You are a scam detection expert for seniors aged 75+. Analyze this message and determine if it's a scam.

Message to analyze:
"${messageContent}"

Respond with ONLY a JSON object in this exact format:
{
  "riskLevel": "RED" | "YELLOW" | "GREEN",
  "scamType": "string (e.g., 'Grandparent Scam', 'Phishing', 'Romance Scam')",
  "explanation": "string (max 12 words)",
  "detailedExplanation": "string (2-3 sentences explaining why it's suspicious and what to do)"
}

Risk levels:
- RED: Definite scam (urgency tactics, requests for money/info, impersonation)
- YELLOW: Suspicious signs (some red flags but not conclusive)
- GREEN: Appears safe (but always remind to stay cautious)

Common scam types: Grandparent Scam, Government Impersonation, Phishing, Romance Scam, Lottery/Prize Scam, Tech Support Scam, Investment Scam`
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.content[0].text;

    // Parse Claude's JSON response
    const parsed = JSON.parse(aiResponse);

    return {
      id: Date.now().toString(),
      riskLevel: parsed.riskLevel,
      message: messageContent.substring(0, 200),
      explanation: parsed.explanation,
      detailedExplanation: parsed.detailedExplanation,
      scamType: parsed.scamType,
      timestamp: new Date(),
      messageContent,
    };
  } catch (error) {
    console.error('Error calling Claude API:', error);
    // Fallback to rule-based detection on error
    return analyzeMessage(messageContent);
  }
};