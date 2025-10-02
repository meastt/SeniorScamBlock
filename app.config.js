export default {
  expo: {
    name: "Elder Sentry",
    slug: "elder-sentry",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    owner: "meastt",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: false,
      bundleIdentifier: "com.eldersentry.app",
      buildNumber: "2",
      appleTeamId: "22PNSFRQ8G",
      associatedDomains: [
        "applinks:eldersentry.com",
        "applinks:eldersentry.com"
      ],
      infoPlist: {
        NSUserActivityTypes: [
          "INSendMessageIntent",
          "INSendMessageIntent"
        ],
        UISupportsDocumentBrowser: true,
        NSPhotoLibraryUsageDescription: "Elder Sentry needs access to save screenshots of scam analysis for your records.",
        NSCameraUsageDescription: "Elder Sentry needs camera access to scan suspicious messages or documents.",
        NSUserTrackingUsageDescription: "We use analytics to improve Elder Sentry and provide better scam protection. Your data is never shared.",
        ITSAppUsesNonExemptEncryption: false
      }
    },
    android: {
      versionCode: 2,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.eldersentry.app",
      intentFilters: [
        {
          action: "SEND",
          category: [
            "DEFAULT"
          ],
          data: {
            mimeType: "text/plain"
          }
        }
      ]
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      [
        "expo-notifications",
        {
          icon: "./assets/notification-icon.png",
          color: "#ffffff"
        }
      ]
    ],
    extra: {
      eas: {
        projectId: "098ae5b6-1d60-40c5-9ce0-d7e926dc1aa9"
      },
      // Pass EAS secrets to the app via expo-constants
      anthropicApiKey: process.env.ANTHROPIC_API_KEY
    }
  }
};
