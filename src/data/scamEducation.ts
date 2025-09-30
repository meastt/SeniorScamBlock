import { EducationArticle } from '../types';

/**
 * Scam education library with simple, clear explanations
 * Written for seniors with actionable advice
 */

export const EDUCATION_ARTICLES: EducationArticle[] = [
  {
    id: '1',
    title: 'Grandparent Scam',
    scamType: 'Grandparent Scam',
    readTime: 3,
    content: `
HOW IT WORKS:
You get a call or message saying your grandchild is in trouble. They claim to need money immediately for bail, medical bills, or to fix a problem.

The caller might:
• Say "Grandma, it's me!" and wait for you to say a name
• Sound upset or crying
• Beg you not to tell their parents
• Demand immediate payment via gift cards or wire transfer

WHAT TO DO:
1. HANG UP immediately
2. Call your grandchild on their real phone number
3. Call their parents to verify
4. NEVER send money without verifying

REMEMBER:
Real emergencies can wait 10 minutes for you to verify. If they pressure you to act immediately, it's a scam.
    `,
  },
  {
    id: '2',
    title: 'Government Impersonation',
    scamType: 'Government Impersonation',
    readTime: 3,
    content: `
HOW IT WORKS:
Someone claims to be from Social Security, IRS, Medicare, or the police. They say you owe money or there's a problem with your benefits.

Warning signs:
• Threats of arrest or legal action
• Demands for immediate payment
• Asks for payment via gift cards, wire transfer, or cryptocurrency
• Requests your Social Security number

WHAT TO DO:
1. HANG UP - government agencies don't call demanding money
2. Call the agency directly using the official number
3. NEVER give personal information over the phone
4. Report it to the real agency

REMEMBER:
The IRS and Social Security Administration send letters first, not phone calls. They NEVER demand immediate payment or threaten arrest.
    `,
  },
  {
    id: '3',
    title: 'Phishing (Fake Emails)',
    scamType: 'Phishing',
    readTime: 3,
    content: `
HOW IT WORKS:
You get an email or text that looks like it's from your bank, Amazon, Netflix, or another company you use. It says there's a problem with your account.

Warning signs:
• "Verify your account immediately"
• "Your account has been suspended"
• "Click here to update your password"
• Generic greeting like "Dear Customer"

WHAT TO DO:
1. DO NOT click any links in the email
2. DO NOT enter your password
3. Go directly to the website by typing the address yourself
4. Call the company's customer service number

REMEMBER:
Real companies don't ask for passwords via email. When in doubt, call the company using the number on your credit card or statement.
    `,
  },
  {
    id: '4',
    title: 'Romance Scam',
    scamType: 'Romance Scam',
    readTime: 4,
    content: `
HOW IT WORKS:
Someone builds a romantic relationship with you online or through messages. After gaining your trust, they ask for money for an emergency.

Warning signs:
• Met online or on social media
• Professes love very quickly
• Can't meet in person (always has an excuse)
• Asks for money for emergencies, travel, medical bills
• Wants gift cards, wire transfers, or cryptocurrency

WHAT TO DO:
1. STOP all communication immediately
2. DO NOT send money
3. Tell a trusted friend or family member
4. Report to the dating site or social media platform

REMEMBER:
If you've never met someone in person, never send them money. Real relationships don't start with requests for money.
    `,
  },
  {
    id: '5',
    title: 'Prize and Lottery Scams',
    scamType: 'Lottery/Prize Scam',
    readTime: 2,
    content: `
HOW IT WORKS:
You're told you won a prize, lottery, or sweepstakes you don't remember entering. To claim your winnings, you need to pay fees or taxes first.

Warning signs:
• You didn't enter any contest
• Must pay to receive your "prize"
• Pressure to act immediately
• Payment via gift cards or wire transfer

WHAT TO DO:
1. DO NOT pay anything
2. DO NOT give personal information
3. Delete the message
4. Remember: real prizes don't require payment

REMEMBER:
You can't win a lottery you didn't enter. Legitimate prizes never require upfront payment.
    `,
  },
  {
    id: '6',
    title: 'Tech Support Scam',
    scamType: 'Tech Support Scam',
    readTime: 3,
    content: `
HOW IT WORKS:
You get a call, pop-up, or message saying your computer has a virus. They offer to fix it if you give them remote access or payment.

Warning signs:
• Unsolicited call about computer problems
• Pop-up warnings that look scary
• Asks for remote access to your computer
• Demands payment to "fix" the problem

WHAT TO DO:
1. HANG UP immediately
2. DO NOT give remote access to your computer
3. Close pop-up windows (don't click anything)
4. Run your real antivirus software

REMEMBER:
Microsoft, Apple, and real tech companies NEVER call you about computer problems. If you have tech issues, contact a trusted local repair shop or family member.
    `,
  },
  {
    id: '7',
    title: 'How to Protect Yourself',
    scamType: 'General Safety',
    readTime: 4,
    content: `
DAILY SAFETY RULES:

1. VERIFY BEFORE YOU TRUST
• Call people back on known numbers
• Type website addresses yourself
• Ask family members for advice

2. NEVER RUSH
• Scammers create fake urgency
• Real problems can wait for verification
• Take time to think and check

3. PAYMENT RED FLAGS
These are ALWAYS scams:
• Gift cards for payment
• Wire transfers to strangers
• Cryptocurrency payments
• Paying to receive a prize

4. PROTECT YOUR INFORMATION
Never share:
• Social Security number
• Bank account numbers
• Credit card details
• Passwords or PINs

5. WHEN IN DOUBT
• Hang up
• Delete the message
• Ask a family member
• Call the company directly

REMEMBER:
It's better to miss a real opportunity than fall for a scam. Always verify first.
    `,
  },
];

export const getArticlesByScamType = (scamType: string): EducationArticle[] => {
  return EDUCATION_ARTICLES.filter(article => 
    article.scamType.toLowerCase().includes(scamType.toLowerCase())
  );
};

export const getAllArticles = (): EducationArticle[] => {
  return EDUCATION_ARTICLES;
};