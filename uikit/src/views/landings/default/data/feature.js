// Import Tabler Icons
import {
  IconPlant2,
  IconLeaf,
  IconWateringCan,
  IconShovel,
  IconUsers,
  IconPlantPot,
  IconStarFilled, // Use filled for a solid star
  IconTrophy,
  IconAward,
  IconSeed,
  IconPlant,
  IconMap,
  IconUsersGroup, // Or IconBuildingCommunity, depending on desired community icon
} from '@tabler/icons-react';

const linkProps = { target: '_blank', rel: 'noopener noreferrer' };

// --- hero ---
// @mui
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

export const hero = {
  chip: {
    label: (
      <>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Start your virtual
        </Typography>
        <Chip
          label={
            <Typography variant="caption" sx={{ color: 'primary.main' }}>
              Garden Adventure
            </Typography>
          }
          sx={{ height: 24, bgcolor: 'primary.lighter', mr: -1, ml: 0.75, '& .MuiChip-label': { px: 1.25 } }}
          icon={
            // Use the Tabler Icon directly as a component
            <IconPlant2 size={16} color="currentColor" stroke={2} /> // Adjust size and other props as needed
          }
        />
      </>
    )
  },
  headLine: 'Grow A Garden Map Game on Roblox',
  captionLine: 'Cultivate your dream garden, explore unique biomes, and socialize with friends in this immersive Roblox experience!',
  primaryBtn: { children: 'Play Now', href: 'YOUR_ROBLOX_GAME_LINK_HERE' }, // **Important: Replace with actual Roblox game link**
  videoSrc: 'YOUR_GAME_TRAILER_VIDEO_LINK_HERE', // **Important: Replace with actual game trailer video link**
  videoThumbnail: 'YOUR_GAME_TRAILER_THUMBNAIL_HERE', // **Important: Replace with actual game trailer thumbnail link**
  listData: [
    { icon: 'tabler-seed', title: 'Plant & Harvest' }, // Changed to use string for icon
    { icon: 'tabler-plant', title: 'Rare Plants' },
    { icon: 'tabler-map', title: 'Explore Biomes' },
    { icon: 'tabler-users-group', title: 'Active Community' }, // Using a more specific community icon
    { icon: 'tabler-seed', title: 'Regular Updates' },
  ]
};

// --- feature2 ---
export const feature2 = {
  heading: 'Cultivate Your Dream Garden',
  caption:
    'Join a vibrant community of gardeners, grow unique plants, and design your perfect plot in our ever-expanding world.',
  features: [
    {
      icon: { name: 'tabler-leaf', color: 'success.main', stroke: 1 }, // Changed to 'name'
      title: 'Unique Plants',
      content: 'Discover and grow hundreds of rare and exotic plant species.'
    },
    {
      icon: { name: 'tabler-users', color: 'primary.main', stroke: 1 },
      title: 'Community Events',
      content: 'Participate in fun events and contests with fellow gardeners.'
    },
    {
      icon: { name: 'tabler-trophy', color: 'warning.main', stroke: 1 },
      title: 'Seasonal Challenges',
      content: 'Test your skills in seasonal challenges to earn exclusive rewards.'
    }
  ]
};

// --- feature5 ---
export const feature5 = {
  heading: 'Beyond Just Planting',
  caption: 'Our game offers a rich experience, ensuring endless fun and interaction.',
  image1: '/assets/images/graphics/game/graphics3-light.svg',
  image2: '/assets/images/graphics/game/graphics2-light.svg',
  features: [
    {
      icon: { name: 'tabler-watering-can' },
      title: 'Automatic Watering',
      content: 'Automate your garden care with smart watering systems.'
    },
    {
      icon: { name: 'tabler-plant-pot' },
      title: 'Customizable Plots',
      content: 'Design and decorate your garden plots with a variety of items.'
    }
  ],
  features2: [
    {
      icon: { name: 'tabler-shovel' },
      title: 'Resource Gathering',
      content: 'Explore the map to find rare seeds and crafting materials.'
    },
    {
      icon: { name: 'tabler-users' },
      title: 'Social Hubs',
      content: 'Connect with friends and trade items in dedicated social zones.'
    }
  ],
  profileGroups: {
    avatarGroups: [
      { avatar: '/assets/images/user/avatar1.png' },
      { avatar: '/assets/images/user/avatar2.png' },
      { avatar: '/assets/images/user/avatar3.png' },
      { avatar: '/assets/images/user/avatar4.png' },
      { avatar: '/assets/images/user/avatar5.png' }
    ],
    review: '10k+ Positive Reviews (4.5 out of 5 Stars)'
  },
  content: 'Discover new game modes, hidden areas, and special events with regular updates.',
  actionBtn: { children: 'Join the Community', href: 'YOUR_GAME_DISCORD_LINK_HERE' }
};

// --- feature20 ---
export const feature20 = {
  heading: 'Your Ultimate Gardening Experience',
  caption: 'Ready to immerse yourself in the world of "Grow A Garden Map Game"?',
  actionBtn: { children: 'Play Now on Roblox', href: 'YOUR_ROBLOX_GAME_LINK_HERE', ...linkProps },
  secondaryBtn: { children: 'Watch Trailer', href: 'YOUR_GAME_TRAILER_LINK_HERE' },
  features: [
    {
      icon: { name: 'tabler-leaf' },
      title: 'Diverse Biomes',
      content: 'Explore unique environments, each with its own special plants.'
    },
    {
      icon: { name: 'tabler-watering-can' },
      title: 'Farming Mechanics',
      content: 'Master advanced farming techniques for maximum yield.'
    },
    {
      icon: { name: 'tabler-plant-pot' },
      title: 'Customization Options',
      content: 'Personalize your garden and avatar with endless choices.'
    },
    {
      icon: { name: 'tabler-users' },
      title: 'Multiplayer Fun',
      content: 'Play with friends, trade items, and visit their gardens.'
    },
    {
      icon: { name: 'tabler-award' },
      title: 'Challenging Quests',
      content: 'Embark on quests to unlock rare items and achievements.'
    },
    {
      icon: { name: 'tabler-star-filled' },
      title: 'Regular Updates',
      content: 'Enjoy fresh content, new plants, and exciting events.'
    }
  ]
};

// --- feature21 ---
export const feature21 = {
  heading: `Design Your Perfect Garden with In-Game Tools`,
  caption: 'Unlock creative tools for streamlined, scalable, and beautiful garden design within the game.',
  image: '/assets/images/graphics/game/desktop1-light.svg',
  primaryBtn: { children: 'Start Designing Now', href: 'YOUR_ROBLOX_GAME_LINK_HERE', ...linkProps },
  secondaryBtn: {
    children: 'View Community Creations',
    href: 'YOUR_COMMUNITY_GALLERY_LINK_HERE',
    ...linkProps
  },
  features: [
    {
      animationDelay: 0.1,
      icon: { name: 'tabler-plant-pot' },
      title: 'Modular Garden Layouts'
    },
    {
      animationDelay: 0.2,
      icon: { name: 'tabler-leaf' },
      title: 'Seasonal Themes'
    },
    {
      animationDelay: 0.3,
      icon: { name: 'tabler-shovel' },
      title: 'Quick Terraforming'
    },
    {
      animationDelay: 0.4,
      icon: { name: 'tabler-users' },
      title: 'Social Sharing'
    },
    {
      animationDelay: 0.1,
      icon: { name: 'tabler-watering-can' },
      title: 'Automated Systems'
    },
    {
      animationDelay: 0.2,
      icon: { name: 'tabler-star-filled' },
      title: 'Player Ratings'
    },
    {
      animationDelay: 0.3,
      icon: { name: 'tabler-trophy' },
      title: 'Design Contests'
    },
    {
      animationDelay: 0.4,
      icon: { name: 'tabler-award' },
      title: 'Achievement Unlocks'
    }
  ]
};

// --- feature ---
export const feature = {
  heading: `What Makes "Grow A Garden Map Game" Special`,
  features: [
    {
      icon: { name: 'tabler-leaf' }, // Assuming this will be rendered as an icon
      title: 'Vast Plant Library',
      content: 'Explore hundreds of unique plants with diverse growth patterns.'
    },
    {
      icon: { name: 'tabler-watering-can' },
      title: 'Intuitive Controls',
      content: 'Easy-to-learn mechanics for all ages of Roblox players.'
    },
    {
      icon: { name: 'tabler-shovel' },
      title: 'Creative Freedom',
      content: 'Design your garden exactly how you envision it.'
    },
    {
      icon: { name: 'tabler-users' },
      title: 'Engaging Community',
      content: 'Connect with fellow gardeners, trade items, and share designs.'
    },
    {
      icon: { name: 'tabler-trophy' },
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
      image: '/assets/images/graphics/game/graphics6-light.svg',
      features: [
        {
          icon: { name: 'tabler-leaf' },
          title: 'Growth Stages',
          content: 'Track the real-time growth of your plants from seed to harvest.'
        }
      ]
    },
    {
      image: '/assets/images/graphics/game/graphics8-light.svg',
      features: [
        {
          icon: { name: 'tabler-users' },
          title: 'Social Interactions',
          content: 'See when friends visit your garden or send you gifts.'
        }
      ]
    },
    {
      image: '/assets/images/graphics/game/graphics3-light.svg',
      features: [
        {
          icon: { name: 'tabler-award' },
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
  image: '/assets/images/graphics/game/feature23-light.png',
  primaryBtn: { children: 'Join Our Discord', href: 'YOUR_DISCORD_INVITE_LINK_HERE' },

  features: [
    {
      icon: { name: 'tabler-users' },
      title: 'Friendly Players',
      content: 'Connect with a supportive and welcoming player base.'
    },
    {
      icon: { name: 'tabler-star-filled' },
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
      icon: { name: 'tabler-leaf' },
      title: 'Planting & Harvesting',
      title2: 'The Core Gardening Loop',
      description: 'Learn the basics of planting seeds, nurturing plants, and harvesting your crops.',
      image: '/assets/images/graphics/game/admin-dashboard.png',
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
      icon: { name: 'tabler-plant-pot' },
      title: 'Garden Customization',
      title2: 'Design Your Unique Space',
      description: 'Personalize your plot with decorations, structures, and unique layouts.',
      image: '/assets/images/graphics/game/admin-dashboard-2.png',
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
      icon: { name: 'tabler-users' },
      title: 'Social Features',
      title2: 'Connect & Collaborate',
      description: 'Interact with other players, trade items, and visit their gardens.',
      image: '/assets/images/graphics/game/admin-dashboard-3.png',
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
      icon: { name: 'tabler-trophy' },
      title: 'Achievements & Ranks',
      title2: 'Prove Your Gardening Prowess',
      description: 'Earn achievements, climb leaderboards, and become a master gardener.',
      image: '/assets/images/graphics/game/admin-dashboard.png',
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
