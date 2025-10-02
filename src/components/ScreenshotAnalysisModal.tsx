import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SeniorButton } from './SeniorButton';
import { Colors, Shadows } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';

interface ScreenshotAnalysisModalProps {
  visible: boolean;
  imageUri: string | null;
  extractedText: string;
  isAnalyzing: boolean;
  onClose: () => void;
  onAnalyze: () => void;
  onRetake: () => void;
}

/**
 * Enhanced Screenshot Analysis Modal
 * Provides clear visual feedback and instructions for seniors
 */
export const ScreenshotAnalysisModal: React.FC<ScreenshotAnalysisModalProps> = ({
  visible,
  imageUri,
  extractedText,
  isAnalyzing,
  onClose,
  onAnalyze,
  onRetake,
}) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleAnalyze = () => {
    if (!extractedText.trim()) {
      Alert.alert(
        'No Text Found',
        'We couldn\'t read any text from this image. Please try taking a clearer photo or retake the screenshot.',
        [
          { text: 'Retake Photo', onPress: onRetake },
          { text: 'Cancel', style: 'cancel' }
        ]
      );
      return;
    }
    onAnalyze();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>📸 Screenshot Analysis</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Image Preview */}
          {imageUri && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
              <View style={styles.imageOverlay}>
                <Text style={styles.imageLabel}>Your Screenshot</Text>
              </View>
            </View>
          )}

          {/* Analysis Status */}
          <View style={styles.statusContainer}>
            {isAnalyzing ? (
              <View style={styles.analyzingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={styles.analyzingText}>Reading text from image...</Text>
                <Text style={styles.analyzingSubtext}>This may take a few seconds</Text>
              </View>
            ) : extractedText ? (
              <View style={styles.extractedTextContainer}>
                <View style={styles.extractedTextHeader}>
                  <Text style={styles.extractedTextTitle}>✅ Text Found!</Text>
                  <TouchableOpacity
                    onPress={() => setShowInstructions(!showInstructions)}
                    style={styles.helpButton}
                  >
                    <Text style={styles.helpButtonText}>?</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.extractedTextBox}>
                  <Text style={styles.extractedText}>{extractedText}</Text>
                </View>
                
                {showInstructions && (
                  <View style={styles.instructionsContainer}>
                    <Text style={styles.instructionsTitle}>💡 Tips for Better Results:</Text>
                    <Text style={styles.instructionText}>• Make sure text is clear and readable</Text>
                    <Text style={styles.instructionText}>• Avoid shadows or glare on the screen</Text>
                    <Text style={styles.instructionText}>• Hold the phone steady while taking the photo</Text>
                    <Text style={styles.instructionText}>• Ensure good lighting around the device</Text>
                  </View>
                )}
              </View>
            ) : (
              <View style={styles.noTextContainer}>
                <Text style={styles.noTextTitle}>❌ No Text Detected</Text>
                <Text style={styles.noTextSubtext}>
                  We couldn't read any text from this image. Please try again with a clearer photo.
                </Text>
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            {!isAnalyzing && (
              <>
                <SeniorButton
                  title="🔄 Retake Photo"
                  onPress={onRetake}
                  variant="secondary"
                  fullWidth
                />
                
                {extractedText && (
                  <SeniorButton
                    title="🔍 Check for Scams"
                    onPress={handleAnalyze}
                    variant="primary"
                    fullWidth
                  />
                )}
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenHorizontal,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    ...Typography.title,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    ...Typography.subtitle,
    color: Colors.textSecondary,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.screenHorizontal,
  },
  imageContainer: {
    marginVertical: Spacing.md,
    borderRadius: Spacing.radiusMedium,
    overflow: 'hidden',
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: {
    width: '100%',
    height: 200,
  },
  imageOverlay: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.radiusSmall,
  },
  imageLabel: {
    ...Typography.caption,
    color: Colors.white,
    fontWeight: '600',
  },
  statusContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  analyzingContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  analyzingText: {
    ...Typography.subtitle,
    color: Colors.textPrimary,
    marginTop: Spacing.md,
    textAlign: 'center',
  },
  analyzingSubtext: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  extractedTextContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Spacing.radiusMedium,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  extractedTextHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  extractedTextTitle: {
    ...Typography.subtitle,
    color: Colors.success,
    fontWeight: '700',
  },
  helpButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButtonText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '700',
  },
  extractedTextBox: {
    backgroundColor: Colors.white,
    borderRadius: Spacing.radiusSmall,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    maxHeight: 150,
  },
  extractedText: {
    ...Typography.body,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  instructionsContainer: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  instructionsTitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  instructionText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  noTextContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  noTextTitle: {
    ...Typography.subtitle,
    color: Colors.error,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  noTextSubtext: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
  },
  actionButtons: {
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
  },
});