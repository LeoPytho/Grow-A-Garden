// @project
// import branding from '@/branding.json'; // Uncomment if branding.brandName is used elsewhere
import { IconType } from '@/enum'; // Ensure IconType is defined and includes CUSTOM_SVG

// Removed unused imports like SECTION_PATH, BUY_NOW_URL, ADMIN_PATH, DOCS_URL
// as they are no longer explicitly used in the data objects below.

const linkProps = { target: '_blank', rel: 'noopener noreferrer' };

// Helper function to create a simple SVG data URI
const createSvgDataUri = (svgContent) => {
  const encodedSvg = encodeURIComponent(svgContent)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');
  return `data:image/svg+xml,${encodedSvg}`;
};

// Custom SVGs for the game
const leafSvg = createSvgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 20.3 8.6 22 14c-1.4 2.4-4.9 5.7-8.2 4.7l-4.9 1.9c-2.7 1.1-5.5-.3-6.6-3A4.995 4.005 0 0 1 11 20z"/>
    <path d="M12 17.56a4.993 4.993 0 0 1-1.67-1.13c-2.5-2.2-1.2-5.7 1.5-7.7L21 2"/>
  </svg>
`);

const wateringCanSvg = createSvgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 22a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2m0 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h2"/>
    <path d="M16 11a4 4 0 0 1 0 8h-4a4 4 0 0 0-4-4V7"/>
    <path d="M7 7v4a2 2 0 0 0 2 2h2"/>
    <line x1="8" y1="12" x2="8" y2="16"></line>
  </svg>
`);

const shovelSvg = createSvgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20 22L4 22L4 16L6 16L6 10L10 10L10 16L12 16L12 22L20 22ZM15 4V10M17 6V12M19 8V14M16 13L13 10L16 7Z"/>
  </svg>
`);

const friendSvg = createSvgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
`);

const plantPotSvg = createSvgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 8c0-2-2-4-4-4H8c-2 0-4 2-4 4v4h16V8z"></path>
    <path d="M20 12H4l-1 8h18l-1-8z"></path>
  </svg>
`);

const starRatingSvg = createSvgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
`);

const trophySvg = createSvgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 11V5a2 2 0 0 1 4 0v6"></path>
    <path d="M12 17v5"></path>
    <path d="M12 17H8.5C7.39 17 6.5 16.11 6.5 15S7.39 13 8.5 13h7c1.11 0 2 .89 2 2s-.89 2-2 2H12Z"></path>
  </svg>
`);

const achievementSvg = createSvgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <polyline points="12 8 8 12 16 16"></polyline>
  </svg>
`);

// --- feature2 ---
export const feature2 = {
  heading: 'Cultivate Your Dream Garden',
  caption:
    'Join a vibrant community of gardeners, grow unique plants, and design your perfect plot in our ever-expanding world.',
  features: [
    {
      icon: { name: leafSvg, type: IconType.CUSTOM_SVG, color: 'success.main', stroke: 1 },
      title: 'Unique Plants',
      content: 'Discover and grow hundreds of rare and exotic plant species.'
    },
    {
      icon: { name: friendSvg, type: IconType.CUSTOM_SVG, color: 'primary.main', stroke: 1 },
      title: 'Community Events',
      content: 'Participate in fun events and contests with fellow gardeners.'
    },
    {
      icon: { name: trophySvg, type: IconType.CUSTOM_SVG, color: 'warning.main', stroke: 1 },
      title: 'Seasonal Challenges',
      content: 'Test your skills in seasonal challenges to earn exclusive rewards.'
    }
  ]
};

// --- feature5 ---
export const feature5 = {
  heading: 'Beyond Just Planting',
  caption: 'Our game offers a rich experience, ensuring endless fun and interaction.',
  image1: '/assets/images/graphics/game/game-graphic1-light.svg', // Placeholder for game-specific graphic
  image2: '/assets/images/graphics/game/game-graphic2-light.svg', // Placeholder for game-specific graphic
  features: [
    {
      icon: { name: wateringCanSvg, type: IconType.CUSTOM_SVG },
      title: 'Automatic Watering',
      content: 'Automate your garden care with smart watering systems.'
    },
    {
      icon: { name: plantPotSvg, type: IconType.CUSTOM_SVG },
      title: 'Customizable Plots',
      content: 'Design and decorate your garden plots with a variety of items.'
    }
  ],
  features2: [
    {
      icon: { name: shovelSvg, type: IconType.CUSTOM_SVG },
      title: 'Resource Gathering',
      content: 'Explore the map to find rare seeds and crafting materials.'
    },
    {
      icon: { name: friendSvg, type: IconType.CUSTOM_SVG },
      title: 'Social Hubs',
      content: 'Connect with friends and trade items in dedicated social zones.'
    }
  ],
  profileGroups: {
    avatarGroups: [
      { avatar: '/assets/images/user/avatar1.png' }, // Placeholder for player avatars
      { avatar: '/assets/images/user/avatar2.png' },
      { avatar: '/assets/images/user/avatar3.png' },
      { avatar: '/assets/images/user/avatar4.png' },
      { avatar: '/assets/images/user/avatar5.png' }
    ],
    review: '10k+ Positive Reviews (4.5 out of 5 Stars)'
  },
  content: 'Discover new game modes, hidden areas, and special events with regular updates.',
  actionBtn: { children: 'Join the Community', href: 'YOUR_GAME_DISCORD_LINK_HERE' } // Placeholder for Discord/Community link
};

// --- feature20 ---
export const feature20 = {
  heading: 'Your Ultimate Gardening Experience',
  caption: 'Ready to immerse yourself in the world of "Grow A Garden Map Game"?',
  actionBtn: { children: 'Play Now on Roblox', href: 'YOUR_ROBLOX_GAME_LINK_HERE', ...linkProps },
  secondaryBtn: { children: 'Watch Trailer', href: 'YOUR_GAME_TRAILER_LINK_HERE' },
  features: [
    {
      icon: { name: leafSvg, type: IconType.CUSTOM_SVG },
      title: 'Diverse Biomes',
      content: 'Explore unique environments, each with its own special plants.'
    },
    {
      icon: { name: wateringCanSvg, type: IconType.CUSTOM_SVG },
      title: 'Farming Mechanics',
      content: 'Master advanced farming techniques for maximum yield.'
    },
    {
      icon: { name: plantPotSvg, type: IconType.CUSTOM_SVG },
      title: 'Customization Options',
      content: 'Personalize your garden and avatar with endless choices.'
    },
    {
      icon: { name: friendSvg, type: IconType.CUSTOM_SVG },
      title: 'Multiplayer Fun',
      content: 'Play with friends, trade items, and visit their gardens.'
    },
    {
      icon: { name: achievementSvg, type: IconType.CUSTOM_SVG },
      title: 'Challenging Quests',
      content: 'Embark on quests to unlock rare items and achievements.'
    },
    {
      icon: { name: starRatingSvg, type: IconType.CUSTOM_SVG },
      title: 'Regular Updates',
      content: 'Enjoy fresh content, new plants, and exciting events.'
    }
  ]
};

// --- feature21 ---
export const feature21 = {
  heading: `Design Your Perfect Garden with In-Game Tools`,
  caption: 'Unlock creative tools for streamlined, scalable, and beautiful garden design within the game.',
  image: '/assets/images/graphics/game/in-game-screenshot1-light.svg', // Placeholder for in-game screenshot
  primaryBtn: { children: 'Start Designing Now', href: 'YOUR_ROBLOX_GAME_LINK_HERE', ...linkProps },
  secondaryBtn: {
    children: 'View Community Creations',
    href: 'YOUR_COMMUNITY_GALLERY_LINK_HERE',
    ...linkProps
  },
  features: [
    {
      animationDelay: 0.1,
      icon: { name: plantPotSvg, type: IconType.CUSTOM_SVG },
      title: 'Modular Garden Layouts'
    },
    {
      animationDelay: 0.2,
      icon: { name: leafSvg, type: IconType.CUSTOM_SVG },
      title: 'Seasonal Themes'
    },
    {
      animationDelay: 0.3,
      icon: { name: shovelSvg, type: IconType.CUSTOM_SVG },
      title: 'Quick Terraforming'
    },
    {
      animationDelay: 0.4,
      icon: { name: friendSvg, type: IconType.CUSTOM_SVG },
      title: 'Social Sharing'
    },
    {
      animationDelay: 0.1,
      icon: { name: wateringCanSvg, type: IconType.CUSTOM_SVG },
      title: 'Automated Systems'
    },
    {
      animationDelay: 0.2,
      icon: { name: starRatingSvg, type: IconType.CUSTOM_SVG },
      title: 'Player Ratings'
    },
    {
      animationDelay: 0.3,
      icon: { name: trophySvg, type: IconType.CUSTOM_SVG },
      title: 'Design Contests'
    },
    {
      animationDelay: 0.4,
      icon: { name: achievementSvg, type: IconType.CUSTOM_SVG },
      title: 'Achievement Unlocks'
    }
  ]
};

// --- feature ---
export const feature = {
  heading: `What Makes "Grow A Garden Map Game" Special`,
  features: [
    {
      image: leafSvg, // Still using direct SVG data URI for 'image' property
      title: 'Vast Plant Library',
      content: 'Explore hundreds of unique plants with diverse growth patterns.'
    },
    {
      image: wateringCanSvg, // Still using direct SVG data URI for 'image' property
      title: 'Intuitive Controls',
      content: 'Easy-to-learn mechanics for all ages of Roblox players.'
    },
    {
      image: shovelSvg, // Still using direct SVG data URI for 'image' property
      title: 'Creative Freedom',
      content: 'Design your garden exactly how you envision it.'
    },
    {
      image: friendSvg, // Still using direct SVG data URI for 'image' property
      title: 'Engaging Community',
      content: 'Connect with fellow gardeners, trade items, and share designs.'
    },
    {
      image: trophySvg, // Still using direct SVG data URI for 'image' property
      title: 'Competitive Events',
      content: 'Participate in leaderboards and earn exclusive rewards.'
    },
    {
      title: 'Ready to Play?',
      content: 'Jump into the world of "Grow A Garden Map Game" today!',
      actionBtn: { children: 'Play Now', href: 'YOUR_ROBLOX_GAME_LINK_HERE', ...linkProps }
    }
  ]
};

// --- feature7 ---
export const feature7 = {
  heading: 'Real-Time Garden Monitoring',
  caption: 'Stay updated on your garden’s growth, progress, and community interactions.',
  testimonials: [
    {
      image: '/assets/images/graphics/game/game-progress-screenshot1-light.svg', // Placeholder for game screenshot
      features: [
        {
          icon: { name: leafSvg, type: IconType.CUSTOM_SVG },
          title: 'Growth Stages',
          content: 'Track the real-time growth of your plants from seed to harvest.'
        }
      ]
    },
    {
      image: '/assets/images/graphics/game/game-progress-screenshot2-light.svg', // Placeholder for game screenshot
      features: [
        {
          icon: { name: friendSvg, type: IconType.CUSTOM_SVG },
          title: 'Social Interactions',
          content: 'See when friends visit your garden or send you gifts.'
        }
      ]
    },
    {
      image: '/assets/images/graphics/game/game-progress-screenshot3-light.svg', // Placeholder for game screenshot
      features: [
        {
          icon: { name: achievementSvg, type: IconType.CUSTOM_SVG },
          title: 'Achievement Progress',
          content: 'Monitor your progress towards unlocking new achievements and items.'
        }
      ]
    }
  ],
  breadcrumbs: [{ title: 'My Garden' }, { title: 'Friends' }, { title: 'Achievements' }]
};

// --- feature23 ---
export const feature23 = {
  heading: 'Join Our Growing Community',
  caption:
    'Become part of a friendly community that shares gardening tips, hosts events, and helps each other grow their dream gardens.',
  heading2: 'Community Engagement',
  caption2: 'Our community prioritizes collaboration, encouraging sharing and joint projects. ',
  image: '/assets/images/graphics/game/community-graphic-light.svg', // Placeholder for a community graphic/screenshot
  primaryBtn: { children: 'Join Our Discord', href: 'YOUR_DISCORD_INVITE_LINK_HERE' },

  features: [
    {
      icon: { name: friendSvg, type: IconType.CUSTOM_SVG },
      title: 'Friendly Players',
      content: 'Connect with a supportive and welcoming player base.'
    },
    {
      icon: { name: starRatingSvg, type: IconType.CUSTOM_SVG },
      title: 'Player-Led Events',
      content: 'Participate in events organized by the community itself.'
    }
  ]
};

// --- feature18 ---
export const feature18 = {
  heading: 'Dive Deep into Gameplay',
  caption: 'Explore core mechanics, game features, and what makes "Grow A Garden Map Game" so engaging.',
  topics: [
    {
      icon: { name: leafSvg, type: IconType.CUSTOM_SVG },
      title: 'Planting & Harvesting',
      title2: 'The Core Gardening Loop',
      description: 'Learn the basics of planting seeds, nurturing plants, and harvesting your crops.',
      image: '/assets/images/graphics/game/planting-screenshot-light.svg', // Placeholder for game screenshot
      list: [
        { primary: 'Diverse Seed Types' },
        { primary: 'Optimal Growth Conditions' },
        { primary: 'Automated Harvest Systems' },
        { primary: 'Rare Plant Discoveries' }
      ],
      actionBtn: { children: 'Start Gardening', href: 'YOUR_ROBLOX_GAME_LINK_HERE', ...linkProps },
      actionBtn2: { children: 'Game Guide', href: 'YOUR_GAME_GUIDE_LINK_HERE', ...linkProps }
    },
    {
      icon: { name: plantPotSvg, type: IconType.CUSTOM_SVG },
      title: 'Garden Customization',
      title2: 'Design Your Unique Space',
      description: 'Personalize your plot with decorations, structures, and unique layouts.',
      image: '/assets/images/graphics/game/customization-screenshot-light.svg', // Placeholder for game screenshot
      list: [
        { primary: 'Hundreds of Decor Items' },
        { primary: 'Expandable Plot Sizes' },
        { primary: 'Themed Garden Kits' },
        { primary: 'Shareable Designs' }
      ],
      actionBtn: { children: 'Design Your Garden', href: 'YOUR_ROBLOX_GAME_LINK_HERE', ...linkProps },
      actionBtn2: { children: 'Design Tips', href: 'YOUR_DESIGN_TIPS_LINK_HERE', ...linkProps }
    },
    {
      icon: { name: friendSvg, type: IconType.CUSTOM_SVG },
      title: 'Social Features',
      title2: 'Connect & Collaborate',
      description: 'Interact with other players, trade items, and visit their gardens.',
      image: '/assets/images/graphics/game/social-screenshot-light.svg', // Placeholder for game screenshot
      list: [
        { primary: 'In-Game Chat' },
        { primary: 'Player Trading System' },
        { primary: 'Friend Visits' },
        { primary: 'Community Events' }
      ],
      actionBtn: { children: 'Find Friends', href: 'YOUR_ROBLOX_GAME_LINK_HERE', ...linkProps },
      actionBtn2: { children: 'Join Discord', href: 'YOUR_DISCORD_INVITE_LINK_HERE', ...linkProps }
    },
    {
      icon: { name: trophySvg, type: IconType.CUSTOM_SVG },
      title: 'Achievements & Ranks',
      title2: 'Prove Your Gardening Prowess',
      description: 'Earn achievements, climb leaderboards, and become a master gardener.',
      image: '/assets/images/graphics/game/achievement-screenshot-light.svg', // Placeholder for game screenshot
      list: [
        { primary: 'Daily & Weekly Challenges' },
        { primary: 'Exclusive Badges & Titles' },
        { primary: 'Leaderboard Competitions' },
        { primary: 'Seasonal Rewards' }
      ],
      actionBtn: { children: 'View Leaderboards', href: 'YOUR_GAME_LEADERBOARD_LINK_HERE', ...linkProps },
      actionBtn2: { children: 'See Achievements', href: 'YOUR_GAME_ACHIEVEMENT_LINK_HERE', ...linkProps }
    }
  ]
};
