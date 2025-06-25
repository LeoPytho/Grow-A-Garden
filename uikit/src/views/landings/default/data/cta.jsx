// @next
import NextLink from 'next/link';

// @mui
import branding from '@/branding.json';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export const cta4 = {
  headLine: 'Why Trust Phoenixcoded for Your Dashboard Template Needs?',
  primaryBtn: {
    children: 'Read Our story',
    href: 'https://blog.saasable.io/a-decade-of-expertise-the-phoenixcoded-story-and-why-you-should-trust-us',
    target: '_blank',
    rel: 'noopener noreferrer'
  },
  profileGroups: {
    avatarGroups: [
      { avatar: '/assets/images/user/avatar1.png' },
      { avatar: '/assets/images/user/avatar2.png' },
      { avatar: '/assets/images/user/avatar3.png' },
      { avatar: '/assets/images/user/avatar4.png' },
      { avatar: '/assets/images/user/avatar5.png' }
    ],
    review: '250+ Author Reviews (4.65 out of 5)'
  },
  list: [
    { primary: '10+ Years Expertise' },
    { primary: '8k+ Satisfied Customers' },
    { primary: 'Elite Envato Author' },
    { primary: 'Timely Support, Guaranteed' },
    { primary: 'Regular Updates Provided' },
    { primary: 'Proven Industry Leader' }
  ]
};

// --- START OF MODIFIED CTA5 ---
function GardenDescriptionLine() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      Don't miss out on important updates and restock alerts for your favorite items in Grow A Garden Stock!
      {/* Removed the NextLink and branding link as we're going straight to WhatsApp */}
    </Typography>
  );
}

export const cta5 = {
  label: 'Stay Updated!', // Changed label to be more relevant for a game
  heading: 'Join Our WhatsApp Channel for Restock Alerts!', // Clear call to action for restocks
  caption: 'Be the first to know when rare items and new seeds are back in stock.', // Benefit-driven caption
  primaryBtn: {
    children: 'Join WhatsApp Channel', // Clear button text
    href: 'https://whatsapp.com/channel/0029Vah3uvQ11ulW8yfEyt28', // Your WhatsApp Channel link
    target: '_blank',
    rel: 'noopener noreferrer'
  },
  description: <GardenDescriptionLine />, // Using the new description component
  saleData: {
    count: 1, // Placeholder, you might update this with actual player count or channel members
    defaultUnit: 'm+', // Changed to k+ to imply a large growing community
    caption: 'Gardeners already growing their wealth!' // Fun, game-related caption
  },
  profileGroups: {
    avatarGroups: [
      { avatar: '/assets/images/user/avatar1.png' }, // You might want game-themed avatars if available
      { avatar: '/assets/images/user/avatar2.png' },
      { avatar: '/assets/images/user/avatar3.png' },
      { avatar: '/assets/images/user/avatar4.png' },
      { avatar: '/assets/images/user/avatar5.png' }
    ],
    review: 'Join thousands of fellow gardeners!' // More engaging text
  }
};
// --- END OF MODIFIED CTA5 ---

export const cta10 = {
  heading: "Couldn't find the perfect role for you?",
  caption: 'No worries – we encourage you to apply anyway! Your unique skills and talents might be just what we need.',
  primaryBtn: { children: 'Send Your Resume', href: '#' },
  secondaryBtn: { children: 'Contact Us', href: '#' },
  image: '/assets/images/graphics/ai/graphics15-light.svg',
  profileGroups: {
    avatarGroups: [
      { avatar: '/assets/images/user/avatar1.png' },
      { avatar: '/assets/images/user/avatar2.png' },
      { avatar: '/assets/images/user/avatar3.png' },
      { avatar: '/assets/images/user/avatar4.png' },
      { avatar: '/assets/images/user/avatar5.png' }
    ],
    review: '10k+ Reviews (4.5 out of 5)'
  }
};
