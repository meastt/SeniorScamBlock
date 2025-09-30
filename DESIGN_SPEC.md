# Senior Scam Detection App - Design Specifications

## Design Philosophy

**Core Principle**: If a 90-year-old can't use it independently on first try, redesign it simpler.

## Typography System

### Font Sizes (iOS/Android points)

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| Result Display | 72pt | 700 (Bold) | 108pt (1.5×) | RED/YELLOW/GREEN text |
| Headline | 36pt | 700 (Bold) | 54pt (1.5×) | Screen titles |
| Subheadline | 28pt | 600 (Semibold) | 42pt (1.5×) | Section headers |
| Body Text | 24pt | 400 (Regular) | 36pt (1.5×) | All body content |
| Button Text | 28pt | 600 (Semibold) | 42pt (1.5×) | Button labels |
| Tab Labels | 20pt | 600 (Semibold) | 30pt (1.5×) | Bottom navigation |

### Typography Rules
- ✅ **Minimum** body text: 24pt (never smaller)
- ✅ Line spacing: **1.5× always**
- ✅ Letter spacing: 0 (default, no adjustments)
- ✅ Font family: System default (San Francisco on iOS, Roboto on Android)
- ❌ **Never** use italic or condensed fonts
- ❌ **Never** use all-caps except for emphasis (RED, YELLOW, GREEN)

## Color System

### Primary Colors

```typescript
// High contrast only - no grays on grays
export const Colors = {
  // Backgrounds
  white: '#FFFFFF',
  background: '#FFFFFF',
  cardBackground: '#F5F5F5',
  
  // Text
  black: '#000000',
  textPrimary: '#000000',
  textSecondary: '#333333',
  
  // Result Colors (with icon + text for colorblind)
  dangerRed: '#D32F2F',      // RED scams
  warningYellow: '#F9A825',  // YELLOW suspicious
  safeGreen: '#388E3C',      // GREEN appears safe
  
  // Interactive
  primaryButton: '#2196F3',  // Clear blue
  secondaryButton: '#757575', // Dark gray
  disabledButton: '#BDBDBD',
  
  // Borders
  border: '#000000',         // Strong borders
  lightBorder: '#CCCCCC',    // Subtle borders
};
```

### Color Contrast Ratios
- Text on white background: **Minimum 7:1** (AAA standard)
- Button text on colored background: **Minimum 4.5:1**
- Border contrast: **3:1 minimum**

### Color Rules
- ✅ Black text on white background (primary)
- ✅ White text on colored buttons only
- ✅ Color + Icon + Text for all status indicators
- ❌ **Never** use gray text on gray background
- ❌ **Never** use blue/purple together
- ❌ **No** dark mode (confusing for seniors)

## Spacing & Layout

### Touch Targets

| Element | Minimum Size | Recommended |
|---------|--------------|-------------|
| All Buttons | 88×88pt | 88×88pt |
| Tab Bar Items | 88×88pt | Full width ÷ 3 |
| List Items | 88pt height | 100-120pt height |
| Icon-only Buttons | 88×88pt | 88×88pt |
| Input Fields | 88pt height | 100pt height |

### Padding & Margins

```typescript
export const Spacing = {
  // Padding
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  xxl: 64,
  
  // Screen margins
  screenPadding: 24,
  cardPadding: 24,
  
  // Icon sizes
  iconSmall: 32,
  iconMedium: 48,
  iconLarge: 64,
  iconXLarge: 88,
  
  // Touch targets
  minTouchTarget: 88,
  buttonHeight: 88,
};
```

### Layout Rules
- ✅ Minimum 24pt padding around screen edges
- ✅ Minimum 24pt spacing between major elements
- ✅ Minimum 16pt spacing between related items
- ✅ Maximum 1-2 columns (never 3+ columns)
- ❌ **Never** overlap interactive elements
- ❌ **No** multi-column text (harder to read)

## Component Design

### Buttons

#### Primary Button
```
┌─────────────────────────────┐
│                             │
│     Check Message           │ ← 28pt Semibold
│                             │
└─────────────────────────────┘
  88pt height, 3pt border
  Blue background (#2196F3)
  White text, black border
```

#### Secondary Button
```
┌─────────────────────────────┐
│                             │
│     Tell Me More            │ ← 28pt Semibold
│                             │
└─────────────────────────────┘
  88pt height, 3pt border
  White background
  Black text, black border
```

#### Button States
- **Default**: Full opacity, black border
- **Pressed**: 70% opacity
- **Disabled**: Gray background, gray border, white text

### Result Cards

#### RED Result (Scam)
```
┌─────────────────────────────────┐
│  🔴  SCAM                        │ ← 88pt icon + 72pt text
│                                 │
│  DO NOT RESPOND                 │ ← 36pt headline
│                                 │
│ ═══════════════════════════════ │ ← 3pt divider
│                                 │
│  Claims family member needs     │
│  money urgently.                │ ← 24pt body
│                                 │
└─────────────────────────────────┘
  6pt red border (#D32F2F)
```

#### YELLOW Result (Suspicious)
```
┌─────────────────────────────────┐
│  🟡  SUSPICIOUS                  │ ← 88pt icon + 72pt text
│                                 │
│  VERIFY SENDER                  │ ← 36pt headline
│                                 │
│ ═══════════════════════════════ │
│                                 │
│  Some suspicious signs          │
│  detected. Verify carefully.    │ ← 24pt body
│                                 │
└─────────────────────────────────┘
  6pt yellow border (#F9A825)
```

#### GREEN Result (Safe)
```
┌─────────────────────────────────┐
│  🟢  APPEARS SAFE                │ ← 88pt icon + 72pt text
│                                 │
│  STILL BE CAREFUL               │ ← 36pt headline
│                                 │
│ ═══════════════════════════════ │
│                                 │
│  No obvious scam signs. Still   │
│  be cautious.                   │ ← 24pt body
│                                 │
└─────────────────────────────────┘
  6pt green border (#388E3C)
```

### Navigation Bar

#### Bottom Tab Bar
```
┌─────────────┬─────────────┬─────────────┐
│             │             │             │
│     🏠      │     📋      │     ❓      │ ← 48pt icons
│             │             │             │
│    Home     │   Recent    │    Help     │ ← 20pt labels
│             │             │             │
└─────────────┴─────────────┴─────────────┘
  100pt height, 2pt top border
  Active: Blue (#2196F3)
  Inactive: Dark gray (#333333)
```

#### Back Button
```
←  Back                              ← 36pt arrow + 28pt text
─────────────────────────────────
  Always at top-left
  88pt touch target
  Black text
```

### Input Fields

#### Text Input
```
┌──────────────────────────────────────┐
│                                      │
│  Paste message here...               │ ← 24pt text
│                                      │
│                                      │
│                                      │
└──────────────────────────────────────┘
  200pt height for multiline
  24pt padding, 3pt black border
  White background
```

### List Items

#### Recent Check Item
```
┌─────────────────────────────────────┐
│ 🔴 RED                              │ ← 48pt icon + 28pt text
│                                     │
│ Claims family member needs...       │ ← 24pt message preview
│                                     │
│ Sep 30, 2:45 PM                     │ ← 20pt timestamp
└─────────────────────────────────────┘
  8pt left border (color-coded)
  100pt+ height
  24pt padding
```

## Screen Layouts

### Home Screen
```
┌─────────────────────────────┐
│                             │
│     Check Message           │ ← 36pt headline
│                             │
│ ┌─────────────────────────┐ │
│ │ 8 checks left this month│ │ ← Limit badge (FREE only)
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ 1. Copy the suspicious  │ │
│ │    message              │ │
│ │ 2. Paste it below       │ │ ← Instructions
│ │ 3. Tap Check Message    │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │                         │ │
│ │ Paste message here...   │ │ ← Input field
│ │                         │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │   Check Message         │ │ ← Primary button
│ └─────────────────────────┘ │
│                             │
└─────────────────────────────┘
│    🏠      📋      ❓       │ ← Tab bar
└─────────────────────────────┘
```

### Result Screen
```
┌─────────────────────────────┐
│ ←  Back                     │ ← Back button
│                             │
│     Result                  │ ← 36pt headline
│                             │
│ ┌─────────────────────────┐ │
│ │                         │ │
│ │  🔴  SCAM               │ │
│ │                         │ │
│ │  DO NOT RESPOND         │ │ ← Result card
│ │                         │ │
│ │  Claims family member   │ │
│ │  needs money urgently.  │ │
│ │                         │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │   Tell Me More          │ │ ← Secondary button
│ └─────────────────────────┘ │
│                             │
│ (Detailed explanation       │
│  appears here when tapped)  │
│                             │
└─────────────────────────────┘
```

### Recent Screen
```
┌─────────────────────────────┐
│                             │
│     Recent Checks           │ ← 36pt headline
│                             │
│ ┌─────────────────────────┐ │
│ │🔴 RED                   │ │
│ │Claims family member...  │ │ ← List item
│ │Sep 30, 2:45 PM         │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │🟡 YELLOW                │ │
│ │Verify your account...   │ │ ← List item
│ │Sep 29, 10:22 AM        │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │🟢 GREEN                 │ │
│ │Package delivered...     │ │ ← List item
│ │Sep 28, 3:15 PM         │ │
│ └─────────────────────────┘ │
│                             │
└─────────────────────────────┘
│    🏠      📋      ❓       │ ← Tab bar
└─────────────────────────────┘
```

### Help Screen
```
┌─────────────────────────────┐
│                             │
│     Help & Learn            │ ← 36pt headline
│                             │
│ ┌─────────────────────────┐ │
│ │Your Plan                │ │
│ │🆓 Free Plan             │ │ ← Status card
│ │8 checks remaining       │ │
│ └─────────────────────────┘ │
│                             │
│  Learn About Scams          │ ← 28pt subheadline
│  Tap any topic to learn more│
│                             │
│ ┌─────────────────────────┐ │
│ │Grandparent Scam         │ │
│ │📖 3 min read            │ │ ← Article card
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │Government Impersonation │ │
│ │📖 3 min read            │ │ ← Article card
│ └─────────────────────────┘ │
│                             │
│  Need Help?                 │
│                             │
│ ┌─────────────────────────┐ │
│ │Report a Scam            │ │
│ │📞 FTC: 1-877-382-4357   │ │ ← Contact card
│ └─────────────────────────┘ │
│                             │
└─────────────────────────────┘
│    🏠      📋      ❓       │ ← Tab bar
└─────────────────────────────┘
```

## Iconography

### Icon Guidelines
- ✅ Use emoji icons (universally recognized, colorful)
- ✅ Minimum 48pt size for tab icons
- ✅ Minimum 88pt size for result indicators
- ❌ **Never** use icon-only buttons without text labels
- ❌ **No** custom icon fonts (confusing)

### Icon Library
| Icon | Usage | Size |
|------|-------|------|
| 🏠 | Home tab | 48pt |
| 📋 | Recent tab | 48pt |
| ❓ | Help tab | 48pt |
| 🔴 | RED scam result | 88pt |
| 🟡 | YELLOW suspicious result | 88pt |
| 🟢 | GREEN safe result | 88pt |
| 🆓 | Free plan badge | 32pt |
| ⭐ | Premium plan badge | 32pt |
| 🔒 | Privacy indicator | 64pt |
| 📖 | Education article | 32pt |
| 📞 | Phone contact | 32pt |
| ← | Back navigation | 36pt |

## Accessibility Features

### For Colorblind Users
- Always combine: **Color + Icon + Text**
- Example: 🔴 RED SCAM (icon + color + text)
- Never rely on color alone

### For Low Vision
- Minimum 24pt text (meets WCAG AAA)
- High contrast ratios (7:1 minimum)
- Large touch targets (88pt minimum)

### For Motor Impairment
- Large buttons with ample spacing
- No small tap targets
- No gesture-only controls
- Tap-only interaction

### For Cognitive Accessibility
- Simple, clear language (max 12 words per sentence)
- One action per screen
- Consistent navigation patterns
- Clear error messages

## Error States

### No Internet Connection
```
❌ We couldn't connect.

Check your internet and try again.

[Try Again]  ← 88pt button
```

### Analysis Failed
```
❌ We couldn't check the message.

Please try again.

[Try Again]  ← 88pt button
```

### Limit Reached (Free)
```
⚠️ Limit Reached

You've used all 10 free checks this month.

Upgrade to Premium for unlimited checks.

[Upgrade]  ← Primary button
```

## Animation & Transitions

### Allowed Animations
- ✅ Simple fade-in (200ms)
- ✅ Screen slide transitions (300ms)
- ✅ Button press opacity (100ms)

### Prohibited Animations
- ❌ No parallax effects
- ❌ No complex gestures
- ❌ No auto-playing videos
- ❌ No spinning/rotating elements

## Copywriting Rules

### General Principles
- Maximum 12 words per sentence
- Use simple, common words
- Active voice only
- No jargon or technical terms
- Be direct and clear

### Examples

#### Good ✅
- "Do not respond to this message."
- "This looks like a scam."
- "Call your family to verify."

#### Bad ❌
- "We recommend exercising caution regarding this communication." (too complex)
- "Potential fraudulent activity detected." (jargon)
- "It's probably best if you don't..." (not direct)

### Button Labels
- "Check Message" (not "Analyze")
- "Tell Me More" (not "Details")
- "Upgrade" (not "Subscribe")
- "Try Again" (not "Retry")

## Testing Checklist

### Visual Design
- [ ] All text minimum 24pt
- [ ] Line height 1.5× everywhere
- [ ] All buttons 88pt minimum
- [ ] High contrast (7:1 minimum)
- [ ] Color + icon + text for status

### Interaction Design
- [ ] Tap-only (no gestures)
- [ ] One action per screen
- [ ] Back button always visible
- [ ] No overlapping touch targets
- [ ] Clear error messages

### Accessibility
- [ ] VoiceOver/TalkBack compatible
- [ ] Colorblind-friendly
- [ ] Works without internet (cached content)
- [ ] No time-based actions
- [ ] Works with large system fonts

### Content
- [ ] Max 12 words per sentence
- [ ] Simple, clear language
- [ ] No jargon
- [ ] Actionable instructions

---

## Final Design Validation

Before launch, verify:
1. ✅ 90-year-old can complete first check independently
2. ✅ All text readable without glasses (if possible)
3. ✅ Clear understanding of RED/YELLOW/GREEN
4. ✅ Can navigate without help
5. ✅ Feels confident using the app

**If any validation fails, redesign and retest.**