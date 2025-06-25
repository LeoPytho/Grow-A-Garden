// @mui
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
// Assuming SECTION_PATH is still relevant for navigating within your site,
// or you might want to replace it with a direct game link later.
import { SECTION_PATH } from '@/path';

// Helper function to create a simple SVG data URI
const createSvgDataUri = (svgContent) => {
  const encodedSvg = encodeURIComponent(svgContent)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');
  return `data:image/svg+xml,${encodedSvg}`;
};

// Custom SVGs for the game
const sproutSvg = createSvgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M7 20c-2-.9-4-2.5-4-5 0-2.5 2-4 4-5l1-1a4 4 0 0 1 6 0l1 1c2 .9 4 2.5 4 5 0 2.5-2 4-4 5z"/>
    <path d="M12 10a4 4 0 0 0-4-4"/>
    <path d="M16 10a4 4 0 0 1 4 4"/>
  </svg>
`);

const seedSvg = createSvgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2c-.5 0-1 .2-1.4.6L4.6 7.6c-.8.8-.8 2 0 2.8L10 15.8c.8.8 2 .8 2.8 0l5.4-5.4c.8-.8.8-2 0-2.8L13.4 2.6C13 .2 12.5 0 12 0z"/>
    <path d="M17 17c-2 2-4.5 3-7 3s-5-1-7-3"/>
  </svg>
`);

const plantSvg = createSvgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
    <path d="M12 8v8"/>
    <path d="M8 12h8"/>
    <path d="M10 14l4 4"/>
    <path d="M14 10l-4-4"/>
  </svg>
`);

const mapSvg = createSvgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
    <line x1="8" y1="2" x2="8" y2="18"></line>
    <line x1="16" y1="6" x2="16" y2="22"></line>
  </svg>
`);

const communitySvg = createSvgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"></path>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="12" y1="12" x2="12" y2="16"></line>
    <line x1="8" y1="12" x2="8" y2="16"></line>
    <line x1="16" y1="12" x2="16" y2="16"></line>
  </svg>
`);

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
            <CardMedia
              component="img"
              image={sproutSvg} // Using the custom SVG data URI
              sx={{ width: 16, height: 16 }}
              alt="sprout icon"
              loading="lazy"
            />
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
    { image: seedSvg, title: 'Plant & Harvest' },
    { image: plantSvg, title: 'Rare Plants' },
    { image: mapSvg, title: 'Explore Biomes' },
    { image: communitySvg, title: 'Active Community' },
    { image: seedSvg, title: 'Regular Updates' },
  ]
};
