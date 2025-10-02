import React from 'react';
import { useShareIntent, ShareIntent } from 'expo-share-intent';
import { ScamAnalysisResult } from '../types';
import { analyzeMessage } from './scamDetection';

/**
 * Share Intent Service
 * Handles incoming shared content from other iOS apps via Share Sheet
 * Provides seamless integration for elderly users to check messages
 */

export interface SharedContent {
  text?: string;
  url?: string;
  type: 'text' | 'url' | 'mixed';
  sourceApp?: string;
}

/**
 * Hook to handle share intent
 * This should be used in components that need to process shared content
 */
export const useShareIntentHandler = (onSharedContent: (content: SharedContent) => void) => {
  const { shareIntent, hasShareIntent, isReady } = useShareIntent();
  
  React.useEffect(() => {
    if (isReady && hasShareIntent && shareIntent) {
      console.log('Received shared content:', shareIntent);
      
      const processedContent: SharedContent = {
        text: shareIntent.text || undefined,
        url: shareIntent.webUrl || undefined,
        type: determineContentType(shareIntent),
        sourceApp: shareIntent.meta?.title || 'Unknown'
      };
      
      onSharedContent(processedContent);
    }
  }, [shareIntent, hasShareIntent, isReady, onSharedContent]);
  
  return { shareIntent, hasShareIntent, isReady };
};

/**
 * Determine the type of shared content
 */
const determineContentType = (shareIntent: ShareIntent): 'text' | 'url' | 'mixed' => {
  const hasText = shareIntent.text && shareIntent.text.trim().length > 0;
  const hasUrl = shareIntent.webUrl && shareIntent.webUrl.trim().length > 0;
  
  if (hasText && hasUrl) {
    return 'mixed';
  } else if (hasUrl) {
    return 'url';
  } else {
    return 'text';
  }
};

/**
 * Process shared content and analyze for scams
 * Returns the analysis result
 */
export const processSharedContent = async (content: SharedContent): Promise<ScamAnalysisResult> => {
  let textToAnalyze = '';
  
  if (content.type === 'text' && content.text) {
    textToAnalyze = content.text;
  } else if (content.type === 'url' && content.url) {
    // For URLs, we'll analyze the URL itself and any text content
    textToAnalyze = `URL: ${content.url}${content.text ? `\n\nContent: ${content.text}` : ''}`;
  } else if (content.type === 'mixed') {
    textToAnalyze = `${content.text}\n\nURL: ${content.url}`;
  }
  
  if (!textToAnalyze.trim()) {
    throw new Error('No content to analyze');
  }
  
  return await analyzeMessage(textToAnalyze);
};


