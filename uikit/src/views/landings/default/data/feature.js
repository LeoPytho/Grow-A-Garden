// Import Tabler Icons (these imports are still needed if you render the icons as components elsewhere)
import {
  IconPlant2,
  IconSeed,
  IconPlant,
  IconMap,
  IconUsersGroup,
  IconLeaf,
  IconUsers,
  IconTrophy,
  IconWateringCan,
  IconPlantPot,
  IconShovel,
  IconStarFilled,
  IconAward,
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
            // Use the Tabler Icon name for rendering
            // You would have a component that takes `icon.name` and renders the appropriate Tabler Icon
            // For example: <SomeIconRenderer iconName={hero.chip.icon.name} size={16} />
            // For the chip icon, it's typically a direct component, but adapting to the pattern:
            { name: 'tabler-plant-2' } // Using the name for IconPlant2
          }
        />
      </>
    )
  },
  headLine: 'Grow Your Dream Garden on Roblox',
  captionLine: 'Cultivate unique plants, explore diverse biomes, and connect with friends in this immersive Roblox gardening game!',
  primaryBtn: { children: 'Play Now', href: 'YOUR_ROBLOX_GAME_LINK_HERE' }, // **Important: Replace with actual Roblox game link**
  videoSrc: 'YOUR_GAME_TRAILER_VIDEO_LINK_HERE', // **Important: Replace with actual game trailer video link**
  videoThumbnail: 'YOUR_GAME_TRAILER_THUMBNAIL_HERE', // **Important: Replace with actual game trailer thumbnail link**
  listData: [
    { icon: { name: 'tabler-seed' }, title: 'Plant & Harvest' },
    { icon: { name: 'tabler-plant' }, title: 'Discover Rare Flora' },
    { icon: { name: 'tabler-map' }, title: 'Explore Lush Biomes' },
    { icon: { name: 'tabler-users-group' }, title: 'Thriving Community' },
    { icon: { name: 'tabler-star-filled' }, title: 'Frequent Content Updates' }, // Changed to star for updates
  ]
};

// --- feature2 ---
export const feature2 = {
  heading: 'Cultivate Your Masterpiece Garden',
  caption:
    'Join a thriving community, grow an array of unique plants, and design your perfect plot in an ever-expanding world.',
  features: [
    {
      icon: { name: 'tabler-leaf', color: 'success.main', stroke: 1 }, // Added color and stroke to icon object
      title: 'Hundreds of Unique Plants',
      content: 'Discover and grow hundreds of rare and exotic plant species, each with unique properties.'
    },
    {
      icon: { name: 'tabler-users', color: 'primary.main', stroke: 1 },
      title: 'Engaging Community Events',
      content: 'Participate in exciting in-game events and friendly contests with fellow gardeners.'
    },
    {
      icon: { name: 'tabler-trophy', color: 'warning.main', stroke: 1 },
      title: 'Rewarding Seasonal Challenges',
      content: 'Test your green thumb in seasonal challenges to earn exclusive rewards and rare items.'
    }
  ]
};

// --- feature5 ---
export const feature5 = {
  heading: 'Beyond Just Planting – A Rich Gaming Experience',
  caption: 'Our game offers deep mechanics and engaging interactions, ensuring endless fun for every gardener.',
  image1: '/assets/images/graphics/game/graphics3-light.svg',
  image2: '/assets/images/graphics/game/graphics2-light.svg',
  features: [
    {
      icon: { name: 'tabler-watering-can' },
      title: 'Automated Garden Care',
      content: 'Streamline your gardening with smart watering and tending systems.'
    },
    {
      icon: { name: 'tabler-plant-pot' },
      title: 'Extensive Customization',
      content: 'Design and decorate your garden plots with a vast collection of items and structures.'
    }
  ],
  features2: [
    {
      icon: { name: 'tabler-shovel' },
      title: 'Exploration & Resource Gathering',
      content: 'Venture out to find rare seeds, valuable materials, and hidden treasures.'
    },
    {
      icon: { name: 'tabler-users' },
      title: 'Vibrant Social Hubs',
      content: 'Connect with friends, trade resources, and showcase your garden in lively social zones.'
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
  content: 'Discover new game modes, expand your garden, and enjoy special events with continuous updates.',
  actionBtn: { children: 'Join Our Official Discord', href: 'YOUR_GAME_DISCORD_LINK_HERE' }
};

// --- feature20 ---
export const feature20 = {
  heading: 'Your Ultimate Gardening Adventure Awaits',
  caption: 'Ready to immerse yourself in the enchanting world of "Grow A Garden Map Game"?',
  actionBtn: { children: 'Play Now on Roblox', href: 'YOUR_ROBLOX_GAME_LINK_HERE', ...linkProps },
  secondaryBtn: { children: 'Watch Game Trailer', href: 'YOUR_GAME_TRAILER_LINK_HERE' },
  features: [
    {
      icon: { name: 'tabler-leaf' },
      title: 'Diverse & Dynamic Biomes',
      content: 'Explore unique environments, each with its own special plants and challenges.'
    },
    {
      icon: { name: 'tabler-watering-can' },
      title: 'Deep Farming Mechanics',
      content: 'Master advanced gardening techniques for optimal yield and rare discoveries.'
    },
    {
      icon: { name: 'tabler-plant-pot' },
      title: 'Limitless Customization',
      content: 'Personalize your garden and avatar with endless creative choices.'
    },
    {
      icon: { name: 'tabler-users' },
      title: 'Engaging Multiplayer Fun',
      content: 'Play with friends, trade unique items, and visit breathtaking gardens.'
    },
    {
      icon: { name: 'tabler-award' },
      title: 'Challenging Quests & Achievements',
      content: 'Embark on exciting quests to unlock rare items and prestigious achievements.'
    },
    {
      icon: { name: 'tabler-star-filled' },
      title: 'Consistent Content Updates',
      content: 'Enjoy fresh content, new plants, and exciting seasonal events regularly.'
    }
  ]
};

// --- feature21 ---
export const feature21 = {
  heading: `Design Your Perfect Garden with Advanced In-Game Tools`,
  caption: 'Unlock powerful creative tools for streamlined, scalable, and visually stunning garden designs within the game.',
  image: '/assets/images/preview/IMG-20250626-WA0415.jpg',
  primaryBtn: { children: 'Start Designing Your Garden', href: 'YOUR_ROBLOX_GAME_LINK_HERE', ...linkProps },
  secondaryBtn: {
    children: 'Explore Community Creations',
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
      title: 'Dynamic Seasonal Themes'
    },
    {
      animationDelay: 0.3,
      icon: { name: 'tabler-shovel' },
      title: 'Intuitive Terraforming Tools'
    },
    {
      animationDelay: 0.4,
      icon: { name: 'tabler-users' },
      title: 'Seamless Social Sharing'
    },
    {
      animationDelay: 0.1,
      icon: { name: 'tabler-watering-can' },
      title: 'Integrated Automated Systems'
    },
    {
      animationDelay: 0.2,
      icon: { name: 'tabler-star-filled' },
      title: 'Player Rating & Recognition'
    },
    {
      animationDelay: 0.3,
      icon: { name: 'tabler-trophy' },
      title: 'Exclusive Design Contests'
    },
    {
      animationDelay: 0.4,
      icon: { name: 'tabler-award' },
      title: 'Unlock Unique Achievements'
    }
  ]
};

// --- feature ---
export const feature = {
  heading: `What Makes "Grow A Garden Map Game" Unforgettable`,
  features: [
    {
      icon: { name: 'tabler-leaf' },
      title: 'Expansive Plant Encyclopedia',
      content: 'Explore hundreds of unique plants with diverse growth patterns and special abilities.'
    },
    {
      icon: { name: 'tabler-watering-can' },
      title: 'User-Friendly Controls',
      content: 'Enjoy an intuitive and easy-to-learn gameplay experience suitable for all ages.'
    },
    {
      icon: { name: 'tabler-shovel' },
      title: 'Unrestricted Creative Freedom',
      content: 'Design your dream garden exactly how you envision it, with endless customization.'
    },
    {
      icon: { name: 'tabler-users' },
      title: 'Thriving & Engaging Community',
      content: 'Connect with fellow gardeners, trade rare items, and share your spectacular designs.'
    },
    {
      icon: { name: 'tabler-trophy' },
      title: 'Exciting Competitive Events',
      content: 'Participate in challenging leaderboards and earn exclusive, prestigious rewards.'
    },
    {
      title: 'Ready to Cultivate?',
      content: 'Jump into the vibrant world of "Grow A Garden Map Game" today!',
      actionBtn: { children: 'Play Now', href: 'YOUR_ROBLOX_GAME_LINK_HERE', ...linkProps }
    }
  ]
};

// --- feature7 ---
export const feature7 = {
  heading: 'Real-Time Garden Progress & Interactions',
  caption: 'Stay fully updated on your garden’s growth, in-game achievements, and social engagements.',
  testimonials: [
    {
      image: '/assets/images/graphics/game/graphics6-light.svg',
      features: [
        {
          icon: { name: 'tabler-leaf' },
          title: 'Dynamic Growth Stages',
          content: 'Track the real-time development of your plants, from tiny seed to full bloom and harvest.'
        }
      ]
    },
    {
      image: '/assets/images/graphics/game/graphics8-light.svg',
      features: [
        {
          icon: { name: 'tabler-users' },
          title: 'Seamless Social Interactions',
          content: 'Receive instant notifications when friends visit your garden, send gifts, or trade items.'
        }
      ]
    },
    {
      image: '/assets/images/graphics/game/graphics3-light.svg',
      features: [
        {
          icon: { name: 'tabler-award' },
          title: 'Achievement Tracking',
          content: 'Monitor your real-time progress towards unlocking new achievements, badges, and exclusive in-game items.'
        }
      ]
    }
  ],
  breadcrumbs: [{ title: 'My Garden Overview' }, { title: 'Friends Activity' }, { title: 'Achievement Tracker' }]
};

// --- feature23 ---
export const feature23 = {
  heading: 'Join Our Flourishing Gardening Community',
  caption:
    'Become an integral part of a friendly and supportive community that shares gardening tips, organizes fun events, and helps each other grow their ultimate dream gardens.',
  heading2: 'Collaborative Community Engagement',
  caption2: 'Our vibrant community thrives on collaboration, actively encouraging sharing, joint projects, and mutual growth. ',
  image: '/assets/images/graphics/game/feature23-light.png',
  primaryBtn: { children: 'Join Our Official Discord', href: 'YOUR_DISCORD_INVITE_LINK_HERE' },

  features: [
    {
      icon: { name: 'tabler-users' },
      title: 'Welcoming Player Base',
      content: 'Connect with a supportive and welcoming community of passionate gardeners from around the world.'
    },
    {
      icon: { name: 'tabler-star-filled' },
      title: 'Exciting Player-Led Events',
      content: 'Participate in and even organize thrilling in-game events and contests crafted by the community itself.'
    }
  ]
};

// --- feature18 ---
export const feature18 = {
  heading: 'Dive Deep into Immersive Gameplay',
  caption: 'Explore the core mechanics, innovative features, and what makes "Grow A Garden Map Game" exceptionally engaging.',
  topics: [
    {
      icon: { name: 'tabler-leaf' },
      title: 'Advanced Planting & Harvesting',
      title2: 'The Heart of the Gardening Loop',
      description: 'Master the fundamentals of planting diverse seeds, nurturing growth, and efficiently harvesting your valuable crops.',
      image: '/assets/images/graphics/game/admin-dashboard.png',
      list: [
        { primary: 'Explore Diverse Seed Types' },
        { primary: 'Optimize for Ideal Growth Conditions' },
        { primary: 'Implement Automated Harvest Systems' },
        { primary: 'Uncover Rare Plant Discoveries' }
      ],
      actionBtn: { children: 'Start Your Garden', href: 'YOUR_ROBLOX_GAME_LINK_HERE', ...linkProps },
      actionBtn2: { children: 'Comprehensive Game Guide', href: 'YOUR_GAME_GUIDE_LINK_HERE', ...linkProps }
    },
    {
      icon: { name: 'tabler-plant-pot' },
      title: 'Extensive Garden Customization',
      title2: 'Craft Your Unique Oasis',
      description: 'Personalize every aspect of your plot with a vast array of decorations, structures, and unique landscaping layouts.',
      image: '/assets/images/graphics/game/admin-dashboard-2.png',
      list: [
        { primary: 'Hundreds of Unique Decor Items' },
        { primary: 'Expandable Garden Plot Sizes' },
        { primary: 'Themed Garden Kits for Inspiration' },
        { primary: 'Seamlessly Shareable Designs' }
      ],
      actionBtn: { children: 'Design Your Dream Garden', href: 'YOUR_ROBLOX_GAME_LINK_HERE', ...linkProps },
      actionBtn2: { children: 'Expert Design Tips', href: 'YOUR_DESIGN_TIPS_LINK_HERE', ...linkProps }
    },
    {
      icon: { name: 'tabler-users' },
      title: 'Dynamic Social Interaction',
      title2: 'Connect, Collaborate & Trade',
      description: 'Interact effortlessly with other players, engage in item trading, and explore their beautifully crafted gardens.',
      image: '/assets/images/graphics/game/admin-dashboard-3.png',
      list: [
        { primary: 'Integrated In-Game Chat System' },
        { primary: 'Secure Player Trading Market' },
        { primary: 'Effortless Friend Garden Visits' },
        { primary: 'Engaging Community Events' }
      ],
      actionBtn: { children: 'Find New Friends', href: 'YOUR_ROBLOX_GAME_LINK_HERE', ...linkProps },
      actionBtn2: { children: 'Join Our Discord Community', href: 'YOUR_DISCORD_INVITE_LINK_HERE', ...linkProps }
    },
    {
      icon: { name: 'tabler-trophy' },
      title: 'Achievements & Competitive Ranks',
      title2: 'Showcase Your Gardening Prowess',
      description: 'Earn prestigious achievements, climb global leaderboards, and ascend to become a true master gardener.',
      image: '/assets/images/graphics/game/admin-dashboard.png',
      list: [
        { primary: 'Engaging Daily & Weekly Challenges' },
        { primary: 'Exclusive Badges & Titles' },
        { primary: 'Intense Leaderboard Competitions' },
        { primary: 'Unlocking Seasonal Rewards' }
      ],
      actionBtn: { children: 'View Global Leaderboards', href: 'YOUR_GAME_LEADERBOARD_LINK_HERE', ...linkProps },
      actionBtn2: { children: 'Discover All Achievements', href: 'YOUR_GAME_ACHIEVEMENT_LINK_HERE', ...linkProps }
    }
  ]
};

