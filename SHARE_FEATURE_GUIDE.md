# Share Feature Guide - Scam Guard

## What's New? 🎉

Seniors can now check suspicious messages **directly from their Messages or Email apps** - no more copy/pasting!

## How to Use the Share Feature

### ⚠️ IMPORTANT: iOS Messages Limitation

**iOS Messages does NOT support the standard Share action.** This is an Apple design decision - Messages has its own interaction model and doesn't allow third-party apps in the message context menu.

### Method 1: Copy/Paste from Messages (iOS - Most Common)

1. Open the **Messages** app
2. Find the suspicious message
3. **Long-press** (press and hold) on the message text
4. Tap **"Copy"** from the popup menu
5. Open **Scam Guard** app
6. Tap and hold in the input box → **"Paste"**
7. Tap **"Check Message"**

### Method 2: Share from Email App (DOES WORK!)

1. Open your **Mail** or **Gmail** app
2. Open the suspicious email
3. Tap the **Share** button (usually looks like ⬆️ or a box with an arrow)
4. Select **"Scam Guard"**
5. The message will be checked automatically!

### Method 3: Share from Other Apps (Safari, Notes, etc.)

1. Select text in **Safari**, **Notes**, or other apps
2. Tap **"Share"**
3. Select **"Scam Guard"**
4. Automatic analysis!

## Why Copy/Paste Works Well for Seniors

✅ **Familiar action** - Copy/paste is well-understood
✅ **Visual feedback** - They see the text being copied
✅ **No app confusion** - Clear two-step process
✅ **Works everywhere** - Messages, emails, any text
✅ **Share works for emails** - Bonus for Mail app users

## Technical Implementation

### For Developers

The share extension is implemented using:

- **iOS**: Associated Domains + Universal Links
- **Android**: Intent Filters for `SEND` action with `text/plain` mime type
- **Deep Linking**: Expo Linking API handles incoming shared content
- **Auto-analysis**: Shared text automatically triggers scam detection

### Configuration

The share functionality is configured in:
- `app.json` - Intent filters and associated domains
- `App.tsx` - Deep link handler with Linking API
- `HomeScreen.tsx` - Auto-analysis on shared content

### Testing the Share Feature

#### On iOS Simulator:
1. Build the app: `npx expo run:ios`
2. Open Messages app
3. Long-press a message
4. Tap Share → Scam Guard

#### On Android Emulator:
1. Build the app: `npx expo run:android`
2. Open any app with text
3. Select text → Share → Scam Guard

#### Note for Expo Go:
Share extensions may not work in Expo Go. You need to build a development build:
```bash
npx expo run:ios
# or
npx expo run:android
```

## Future Enhancements

### For True iOS Messages Integration

To add a button directly in the Messages app, you would need an **iMessage Extension**:

**Pros:**
- Appears as an app icon in the Messages keyboard
- Users can tap it while in a conversation
- More integrated experience

**Cons:**
- Requires native iOS code (Swift/Objective-C)
- Cannot use Expo - must eject to bare React Native or use native modules
- Separate app extension target in Xcode project
- More complex App Store review
- Estimated 2-4 weeks of additional development

**Implementation Overview:**
1. Create iMessage Extension target in Xcode
2. Build native UI with Messages framework
3. Share data between extension and main app via App Groups
4. Handle message composition and sticker packs (if desired)
5. Submit extension for App Store review

**Reference:** [Apple iMessage Extension Documentation](https://developer.apple.com/documentation/messages)

### Other Enhancements

- [ ] Auto-monitor Messages (requires Message Filter Extension - very complex)
- [ ] Share screenshots with OCR text extraction
- [ ] Siri Shortcuts integration ("Hey Siri, check this message for scams")
- [ ] Widget for quick access
- [ ] Keyboard extension (check text from any app)

## Support

If users have trouble with the share feature:
1. Ensure they're using a standalone build (not Expo Go)
2. Check that iOS/Android permissions are granted
3. Restart the app if share option doesn't appear
4. Fall back to copy/paste method

---

**This feature dramatically improves the user experience for seniors, reducing cognitive load and making scam detection as simple as sharing a message!**

