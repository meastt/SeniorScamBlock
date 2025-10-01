# Elder Sentry - Build Configuration

## App Information
- **App Name**: Elder Sentry
- **Bundle ID**: com.eldersentry.app
- **Team ID**: 22PNSFRQ8G
- **Version**: 1.0.0
- **Build Number**: 1

## App Store Connect
- **Bundle ID**: com.eldersentry.app
- **Team ID**: 22PNSFRQ8G
- **Platform**: iOS
- **Primary Language**: English (U.S.)

## Build Configuration Files

### app.json
- ✅ Version: 1.0.0
- ✅ iOS Build Number: 1
- ✅ Android Version Code: 1
- ✅ Team ID: 22PNSFRQ8G
- ✅ Bundle ID: com.eldersentry.app

### package.json
- ✅ Version: 1.0.0
- ✅ Build: 1

### eas.json
- ✅ Created with production profile
- ✅ Team ID configured: 22PNSFRQ8G
- ✅ Bundle ID configured: com.eldersentry.app
- ✅ App Store Connect App ID: 6753316942

## Before First Build

### 1. Update Expo Owner (Required)
In `app.json`, replace:
```json
"owner": "your-expo-username"
```
With your actual Expo username.

To find your Expo username:
```bash
npx expo whoami
```

### 2. App Store Connect App ID ✅
- **App ID**: 6753316942
- **URL**: https://appstoreconnect.apple.com/apps/6753316942/
- Already configured in `eas.json`

### 3. Verify Assets
Ensure all assets are in `/assets/` folder:
- ✅ icon.png (1024x1024)
- ✅ adaptive-icon.png (1024x1024)
- ✅ splash.png (1284x2778)
- ✅ notification-icon.png (96x96+)
- ✅ favicon.png (48x48)

## Build Commands

### Login to Expo
```bash
npx expo login
npx expo whoami
```

### First Build (iOS Production)
```bash
# This will prompt for Apple credentials if needed
npx eas build --platform ios --profile production
```

### Check Build Status
```bash
npx eas build:list
```

### Submit to App Store
```bash
npx eas submit --platform ios --profile production
```

### Alternative: Build and Auto-Submit
```bash
npx eas build --platform ios --profile production --auto-submit
```

## Incrementing Version/Build Numbers

### For App Updates (Version Changes)
Update in both files:

**app.json:**
```json
"version": "1.0.1"  // or 1.1.0, 2.0.0, etc.
```

**package.json:**
```json
"version": "1.0.1"
```

### For Bug Fixes (Build Number Only)
Update build numbers:

**app.json (iOS):**
```json
"ios": {
  "buildNumber": "2"  // increment for each build
}
```

**app.json (Android):**
```json
"android": {
  "versionCode": 2  // must always increment
}
```

**package.json:**
```json
"build": "2"
```

## Version Numbering Strategy

### Semantic Versioning (version)
- **1.0.0** → Initial release
- **1.0.1** → Bug fix
- **1.1.0** → New feature
- **2.0.0** → Major changes

### Build Numbers
- **Build 1** → First submission
- **Build 2** → Second submission (even if same version)
- Always increment for each App Store submission

## Apple Credentials

### During First Build
You'll be prompted to authenticate with Apple. Options:

**Option A: Apple ID + Password**
- Enter Apple ID email
- Enter password
- Complete 2FA verification

**Option B: App Store Connect API Key (Recommended)**
1. Go to App Store Connect → Users and Access → Keys
2. Create new key with Admin or App Manager role
3. Download .p8 file
4. Provide during build:
   - Key ID
   - Issuer ID
   - Path to .p8 file

## Troubleshooting

### Build Fails: "Bundle identifier not found"
- Ensure bundle ID is registered in Apple Developer Portal
- Check Team ID is correct

### Build Fails: "Missing assets"
- Verify all required assets exist in `/assets/`
- Check file names match exactly (case-sensitive)

### Submit Fails: "Invalid ascAppId"
- Update `ascAppId` in eas.json with real App Store Connect App ID
- Find ID in App Store Connect URL

### Authentication Issues
- Run: `npx eas logout` then `npx eas login`
- Clear credentials: `npx eas credentials`

## Next Steps

1. ✅ Update `owner` in app.json with your Expo username
2. ✅ Create app in App Store Connect
3. ✅ Get App Store Connect App ID
4. ✅ Update `ascAppId` in eas.json
5. ✅ Run `npx eas build --platform ios --profile production`
6. ✅ Wait for build (~15-20 minutes)
7. ✅ Submit to App Store
8. ✅ Complete App Store listing (screenshots, description, etc.)
9. ✅ Submit for review

## Support
- **Expo Docs**: https://docs.expo.dev/build/introduction/
- **EAS Build**: https://docs.expo.dev/build/setup/
- **EAS Submit**: https://docs.expo.dev/submit/introduction/
- **Elder Sentry Support**: support@eldersentry.com
