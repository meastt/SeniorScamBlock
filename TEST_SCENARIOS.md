# Senior Scam Detection App - Test Scenarios

## Test Message Examples

Use these sample messages to test the scam detection system:

### 🔴 RED - Definite Scams

#### Grandparent Scam
```
Hi Grandma, it's me! I'm in trouble and need your help urgently. 
I was arrested and need $2,000 for bail right away. Please don't 
tell Mom and Dad, they'll be so upset. Send money to this address 
via Western Union immediately. I'm scared!
```
**Expected**: RED, "Claims family member needs money urgently."

#### Government Impersonation
```
URGENT: This is the IRS. Your Social Security number has been 
suspended due to suspicious activity. You must call 1-800-XXX-XXXX 
immediately to verify your identity or face arrest within 24 hours. 
Legal action will be taken if you do not respond.
```
**Expected**: RED, "Pretends to be from government agency."

#### Phishing Attack
```
Your Bank of America account has been suspended. Please verify 
your account immediately by clicking this link and entering your 
username, password, and social security number. Your account will 
be permanently closed if you don't act within 24 hours.
```
**Expected**: RED, "Tries to steal your login information."

#### Romance Scam
```
My dear, I love you so much. I'm sorry but I'm in trouble. I'm 
stuck in Nigeria and need money for a plane ticket home. Can you 
wire $5,000 to Western Union? I promise I'll pay you back when 
we meet in person next month. I love you!
```
**Expected**: RED, "Builds fake relationship to steal money."

#### Lottery Scam
```
CONGRATULATIONS! You've won $2.5 million in the Publishers Clearing 
House Sweepstakes! To claim your prize, please send $500 for 
processing fees and taxes. Send via gift cards to this address 
immediately. Limited time offer!
```
**Expected**: RED, "Fake prize to get personal information."

### 🟡 YELLOW - Suspicious Messages

#### Urgency Tactics
```
Your package delivery failed. Click here to reschedule within 
24 hours or your package will be returned to sender. Act now 
before the deadline expires. Time is running out!
```
**Expected**: YELLOW, "Uses pressure to make you act quickly."

#### Investment Scam
```
Exclusive investment opportunity! Get guaranteed returns of 200% 
with our cryptocurrency trading platform. Limited spots available. 
This is a once-in-a-lifetime profit opportunity. Don't miss out!
```
**Expected**: YELLOW, "Too good to be true investment offer."

#### Suspicious Verification
```
Your Amazon account requires verification. Please update your 
payment information. Click here to confirm your account details. 
Failure to verify may result in account suspension.
```
**Expected**: YELLOW, "Some suspicious signs detected."

### 🟢 GREEN - Appears Safe

#### Normal Package Delivery
```
Your Amazon package has been delivered. Track your order at 
amazon.com. Order #123-4567890. Thank you for shopping with us!
```
**Expected**: GREEN, "No obvious scam signs. Still be cautious."

#### Family Message
```
Hi Mom! Just wanted to check in and see how you're doing. 
Can I call you later this evening around 6pm? Love you!
```
**Expected**: GREEN, "Appears safe based on our analysis."

#### Appointment Reminder
```
Reminder: You have a doctor's appointment tomorrow at 2:00 PM 
with Dr. Smith at County Medical Center. Please arrive 15 minutes 
early. Call 555-1234 if you need to reschedule.
```
**Expected**: GREEN, "No obvious scam signs. Still be cautious."

## User Journey Test Cases

### Test Case 1: First-Time User Experience
**Objective**: Ensure a senior can check their first message independently

**Steps**:
1. Open app for the first time
2. User is on Home screen (no onboarding needed)
3. Read instructions: "1. Copy the suspicious message 2. Paste it below 3. Tap Check Message"
4. Paste test message (use Grandparent Scam example)
5. Tap "Check Message" button
6. Wait for result (< 3 seconds)
7. See RED result with clear explanation
8. Tap "Tell Me More" button (optional)
9. Read detailed explanation

**Success Criteria**:
- ✅ Completes in < 2 minutes without help
- ✅ Understands what RED means
- ✅ Knows what action to take (DO NOT RESPOND)
- ✅ Can find back button if needed

### Test Case 2: Free Tier Limit
**Objective**: User understands message limit and upgrade path

**Steps**:
1. Check 9 messages successfully
2. See "1 check left this month" notification
3. Check 10th message
4. Try to check 11th message
5. See "Limit Reached" dialog
6. Tap "Upgrade" button
7. See Premium screen with pricing
8. Understand $8.99/month cost

**Success Criteria**:
- ✅ Clear understanding of limit
- ✅ Not surprised by upgrade prompt
- ✅ Can explain what Premium offers

### Test Case 3: Viewing History
**Objective**: User can review past checks

**Steps**:
1. Check 5 different messages (mix of RED/YELLOW/GREEN)
2. Navigate to Recent tab
3. See list of past checks with color coding
4. Tap on a RED result
5. See full result details again

**Success Criteria**:
- ✅ Can find Recent tab
- ✅ Understands color coding in list
- ✅ Can review past results

### Test Case 4: Learning About Scams
**Objective**: User can access educational content

**Steps**:
1. Navigate to Help tab
2. See list of educational articles
3. Tap "Grandparent Scam" article
4. Read content (should be simple and clear)
5. Use back button to return to list
6. Find emergency contact numbers

**Success Criteria**:
- ✅ Can find and open articles
- ✅ Content is readable and understandable
- ✅ Knows how to report scams (FTC number visible)

### Test Case 5: Family Dashboard Setup (Premium)
**Objective**: Premium user can add family members

**Steps**:
1. Upgrade to Premium
2. Access Family Dashboard
3. See weekly scam summary
4. Tap "Add Family Member"
5. Enter name and email
6. See privacy notice (family sees alerts only, not messages)
7. Confirm family member added

**Success Criteria**:
- ✅ Understands privacy (no message content shared)
- ✅ Successfully adds family member
- ✅ Sees weekly stats clearly

## Accessibility Test Cases

### Test Case A1: VoiceOver (iOS)
**Steps**:
1. Enable VoiceOver in Settings
2. Navigate through app
3. Check that all buttons are labeled
4. Verify result announcements are clear

**Success Criteria**:
- ✅ All interactive elements have clear labels
- ✅ Navigation is logical
- ✅ Results are announced correctly

### Test Case A2: Large System Fonts
**Steps**:
1. Set iOS/Android system font to largest setting
2. Open app
3. Verify all text is still readable
4. Check that buttons don't overlap

**Success Criteria**:
- ✅ Text doesn't overflow
- ✅ Buttons remain tappable
- ✅ Layout adapts gracefully

### Test Case A3: Colorblind Simulation
**Steps**:
1. Use colorblind simulation tool
2. View RED/YELLOW/GREEN results
3. Verify understanding without color

**Success Criteria**:
- ✅ Icons clearly distinguish results
- ✅ Text labels are always present
- ✅ No information lost without color

## Edge Cases

### Edge Case 1: No Internet Connection
**Steps**:
1. Disable internet connection
2. Try to check a message
3. See error: "We couldn't connect. Check your internet and try again."
4. Tap "Try Again"

**Expected**: Clear error message, retry option works when internet returns

### Edge Case 2: Empty Message
**Steps**:
1. Leave message field blank
2. Tap "Check Message"
3. See error: "No Message. Please paste a message to check."

**Expected**: Clear validation error, button disabled when empty

### Edge Case 3: Very Long Message
**Steps**:
1. Paste 5000-character message
2. Tap "Check Message"
3. Analysis completes successfully

**Expected**: System handles long messages, shows first 200 chars in history

### Edge Case 4: Special Characters
**Steps**:
1. Paste message with emojis, foreign characters
2. Tap "Check Message"
3. Analysis works correctly

**Expected**: System handles all text input types

### Edge Case 5: Monthly Reset (Free Tier)
**Steps**:
1. Use all 10 free checks
2. Wait for monthly reset (or manually reset)
3. Verify counter resets to 10

**Expected**: User gets fresh 10 checks next month

## Performance Test Cases

### Performance 1: Analysis Speed
**Requirement**: < 3 seconds per message check

**Test**:
1. Check 10 different messages
2. Time each analysis
3. Calculate average

**Success Criteria**: Average < 3 seconds, max 5 seconds

### Performance 2: App Launch Time
**Requirement**: < 2 seconds cold start

**Test**:
1. Force close app
2. Relaunch
3. Measure time to usable state

**Success Criteria**: < 2 seconds on modern devices

### Performance 3: History Loading
**Requirement**: Instant display of history

**Test**:
1. Navigate to Recent tab with 50 items
2. Measure load time

**Success Criteria**: < 1 second

## Security Test Cases

### Security 1: Data Encryption
**Test**:
1. Store sensitive user data
2. Verify encryption at rest
3. Check secure transmission

**Success Criteria**: All data encrypted, HTTPS only

### Security 2: Privacy - Family Dashboard
**Test**:
1. Add family member
2. Check scam message
3. Verify family sees alert only, NOT message content

**Success Criteria**: Message content never exposed to family

### Security 3: Data Deletion
**Test**:
1. Delete user account
2. Verify all user data removed
3. Check no residual data

**Success Criteria**: Complete data removal

## User Acceptance Testing

### UAT Checklist with Seniors (75+)

#### Pre-Test Setup
- [ ] Recruit 5+ participants aged 75+
- [ ] Mix of tech experience levels
- [ ] Natural lighting conditions
- [ ] Participant's own device if possible

#### During Test - Observe
- [ ] Can they find and open the app?
- [ ] Do they understand the home screen immediately?
- [ ] Can they paste a message without help?
- [ ] Do they tap "Check Message" confidently?
- [ ] Do they understand RED/YELLOW/GREEN?
- [ ] Can they explain what to do after seeing RED?
- [ ] Do they use "Tell Me More" button?
- [ ] Can they navigate to Recent tab?
- [ ] Can they find Help/Education content?
- [ ] Any confusion points?

#### Post-Test Questions
1. "Would you use this app if you received a suspicious message?"
2. "What does RED mean?"
3. "What does YELLOW mean?"
4. "What does GREEN mean?"
5. "Was anything confusing?"
6. "Was the text large enough?"
7. "Were the buttons easy to tap?"
8. "On a scale of 1-10, how easy was this to use?"

#### Success Criteria
- ✅ 90%+ complete first check independently
- ✅ 100% understand RED = do not respond
- ✅ 80%+ say they would use it
- ✅ Average ease-of-use: 8/10 or higher
- ✅ No requests to make text larger

## Regression Testing

Run these tests before each release:

### Critical Path Tests (Must Pass)
- [ ] Home → Check message → See result
- [ ] Result → Tell Me More → See details
- [ ] Recent → View history
- [ ] Help → Read article
- [ ] Free tier limit enforcement
- [ ] Premium upgrade flow
- [ ] Family dashboard (if premium)

### Visual Regression
- [ ] All text minimum 24pt
- [ ] All buttons 88pt minimum
- [ ] High contrast maintained
- [ ] Color coding correct
- [ ] Icons display correctly

### Platform-Specific
- [ ] iOS VoiceOver works
- [ ] Android TalkBack works
- [ ] iPhone notch handling
- [ ] Android back button
- [ ] Keyboard behavior

## Bug Priority Levels

### P0 - Critical (Fix Immediately)
- App crashes
- Data loss
- Security vulnerabilities
- Payment processing failures
- Incorrect scam detection (false negatives)

### P1 - High (Fix in 24-48h)
- Navigation broken
- Buttons not tappable
- Text too small
- Results not displaying
- History not saving

### P2 - Medium (Fix in next release)
- Minor UI glitches
- Text overflow
- Slow performance
- Non-critical errors

### P3 - Low (Backlog)
- Feature requests
- UI enhancements
- Nice-to-have improvements

## Test Automation (Future)

Consider automating:
- [ ] Message analysis with known scam samples
- [ ] Free tier limit enforcement
- [ ] Navigation flows
- [ ] Accessibility checks
- [ ] Performance benchmarks

---

## Testing Sign-Off

Before production release:

**Functional Testing**: ✅ All test cases pass  
**Accessibility Testing**: ✅ WCAG AAA compliance  
**User Acceptance Testing**: ✅ 5+ seniors approve  
**Security Testing**: ✅ Penetration test passed  
**Performance Testing**: ✅ Meets speed requirements  
**Cross-Platform Testing**: ✅ iOS and Android verified  

**Final Approval**: ___________________ Date: ___________