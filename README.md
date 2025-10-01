# Elder Sentry

AI-powered scam detection mobile app designed specifically for users 75+ with ultra-simple interface and large fonts.

## Core Purpose

Analyzes text messages and emails for scams using AI, showing simple **RED/YELLOW/GREEN** results with clear explanations.

## Key Features

### FREE Tier
- ✅ Check up to 10 messages per month
- ✅ Get RED/YELLOW/GREEN result with basic explanation
- ✅ Access scam education library

### PREMIUM Tier ($8.99/month)
- ⭐ Unlimited message checking
- ⭐ Auto-monitor incoming messages (optional)
- ⭐ Family dashboard for adult children to see alerts
- ⭐ Detailed explanations of why message is suspicious
- ⭐ Weekly scam alert notifications

## Scam Types Detected

- 🚨 Grandparent scams
- 🚨 Government impersonation
- 🚨 Phishing attacks
- 🚨 Urgency tactics
- 🚨 Romance scams
- 🚨 Lottery/Prize scams
- 🚨 Tech support scams

## Results Display

- 🔴 **RED** = Definite scam with warning
- 🟡 **YELLOW** = Suspicious, verify sender
- 🟢 **GREEN** = Appears safe, still be careful

Each result shows one simple sentence (max 12 words)

## Senior-Friendly Design

### Typography
- Minimum 24pt body text
- 36pt headlines
- 72pt results
- 1.5x line spacing throughout

### Interface
- Massive buttons (88x88pt minimum)
- No gestures - tap only
- One action per screen
- Simple 3-tab navigation: Home / Recent / Help
- Always-visible back button

### Accessibility
- High contrast black text on white background
- Color + icon + text for colorblind users
- No gray-on-gray, no blue/purple
- Simple error messages

## Project Structure

```
/workspace
├── App.tsx                          # Root component
├── app.json                         # Expo configuration
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
└── src/
    ├── components/                  # Reusable components
    │   ├── SeniorButton.tsx        # Large, accessible button
    │   ├── BackButton.tsx          # Always-visible back button
    │   └── ResultCard.tsx          # Color-coded result display
    ├── context/
    │   └── AppContext.tsx          # Global state management
    ├── data/
    │   └── scamEducation.ts        # Educational content library
    ├── navigation/
    │   └── MainNavigator.tsx       # Tab + stack navigation
    ├── screens/
    │   ├── HomeScreen.tsx          # Main message checking
    │   ├── ResultScreen.tsx        # Show analysis result
    │   ├── RecentScreen.tsx        # History of checks
    │   ├── HelpScreen.tsx          # Education & support
    │   ├── UpgradeScreen.tsx       # Premium subscription
    │   └── FamilyDashboardScreen.tsx # Family monitoring
    ├── services/
    │   └── scamDetection.ts        # AI/ML scam analysis
    ├── theme/
    │   ├── colors.ts               # High contrast color system
    │   ├── typography.ts           # Large font specifications
    │   └── spacing.ts              # Touch target sizes
    └── types/
        └── index.ts                # TypeScript interfaces
```

## Setup & Installation

### Prerequisites
- Node.js 16+
- npm or yarn
- Expo CLI

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
# Start Expo
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

## AI Integration

The app currently uses rule-based scam detection. For production, integrate with:

### OpenAI API (Recommended)
```typescript
// Update src/services/scamDetection.ts
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a scam detection expert for seniors...'
      },
      {
        role: 'user',
        content: messageContent
      }
    ]
  })
});
```

### Environment Variables
Create `.env` file:
```
OPENAI_API_KEY=your_api_key_here
STRIPE_PUBLIC_KEY=your_stripe_key
```

## Family Dashboard (Premium)

Adult children can:
- ✅ See summary: "3 scams blocked this week"
- ✅ Receive alerts when parent encounters scams
- 🔒 **Privacy**: Family sees alerts only, NOT message content

## Design Principles

### Key Principle
**If a 90-year-old can't use it independently on first try, redesign it simpler.**

### What's Included
- ✅ Ultra-large fonts and buttons
- ✅ High contrast black/white
- ✅ Tap-only interaction
- ✅ Simple 3-tab navigation
- ✅ Clear error messages
- ✅ Color + icon + text labels

### What's NOT Included
- ❌ No dark mode
- ❌ No social sharing
- ❌ No gestures (swipe/pinch)
- ❌ No video tutorials
- ❌ No gamification
- ❌ Minimal settings (3-5 toggles max)

## Testing

### Manual Testing Checklist
- [ ] Paste and check message (< 3 seconds)
- [ ] Verify RED result for obvious scams
- [ ] Verify YELLOW for suspicious messages
- [ ] Check free tier limit (10 messages)
- [ ] Test premium upgrade flow
- [ ] Verify family dashboard access control
- [ ] Test educational articles display
- [ ] Confirm all buttons are 88pt minimum
- [ ] Verify high contrast throughout

## Deployment

### iOS App Store
1. Update version in `app.json`
2. Build: `eas build --platform ios`
3. Submit: `eas submit --platform ios`

### Google Play Store
1. Update version in `app.json`
2. Build: `eas build --platform android`
3. Submit: `eas submit --platform android`

## Support Resources

### Elder Sentry Support
- 📧 Email: support@eldersentry.com
- 🌐 Website: https://eldersentry.com
- 📱 Support Portal: https://eldersentry.com/support

### Emergency Contacts (Built-in)
- FTC Fraud Reporting: 1-877-382-4357
- Elder Abuse Hotline: 1-800-677-1116

## License

Copyright © 2025 Elder Sentry. All rights reserved.

For more information, visit https://eldersentry.com

## Contributing

This app is designed for seniors. When contributing:
1. Test with users 75+ if possible
2. Maintain minimum 24pt font size
3. Keep interactions tap-only
4. Ensure 88pt minimum touch targets
5. Use high contrast (black/white)
6. Write simple, clear copy (max 12 words)

---

**Remember: Simplicity saves seniors from scams.**