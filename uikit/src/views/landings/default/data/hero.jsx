// @mui
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
// Assuming SECTION_PATH is still relevant for navigating within your site,
// or you might want to replace it with a direct game link later.
import { SECTION_PATH } from '@/path';

// --- REMOVE THE LOCAL IMPORTS FOR VIDEO/IMAGE ---
// import gameTrailerVideo from './vid.mp4'; // REMOVE THIS LINE
// import gameTrailerThumbnail from './foto.png'; // REMOVE THIS LINE
// -------------------------------------------------

// Helper function to create a simple SVG data URI
const createSvgDataUri = (svgContent) => {
  const encodedSvg = encodeURIComponent(svgContent)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');
  return `data:image/svg+xml,${encodedSvg}`;
};

// Custom SVGs for the website info
const plantGrowthSvg = createSvgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
    <path d="M12 8v8"/>
    <path d="M8 12h8"/>
    <path d="M10 14l4 4"/>
    <path d="M14 10l-4-4"/>
  </svg>
`);

const weatherSvg = createSvgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 10a4 4 0 0 1 0 8v-8z"/>
    <path d="M12 2a6 6 0 0 0-4 10c0 1.62-.05 3.23-.2 4.8-.42 4.41-3 7.2-4.8 7.2h16c-1.8 0-4.38-2.79-4.8-7.2-.15-1.57-.2-3.18-.2-4.8a6 6 0 0 0-4-10z"/>
  </svg>
`);

const stockSvg = createSvgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"></path>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="12" y1="12" x2="12" y2="16"></line>
    <line x1="8" y1="12" x2="8" y2="16"></line>
    <line x1="16" y1="12" x2="16" y2="16"></line>
  </svg>
`);

const restockSvg = createSvgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
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
          Your guide to
        </Typography>
        <Chip
          label={
            <Typography variant="caption" sx={{ color: 'primary.main' }}>
              Grow A Garden
            </Typography>
          }
          sx={{ height: 24, bgcolor: 'primary.lighter', mr: -1, ml: 0.75, '& .MuiChip-label': { px: 1.25 } }}
          icon={
            <CardMedia
              component="img"
              image={plantGrowthSvg}
              sx={{ width: 16, height: 16 }}
              alt="plant growth icon"
              loading="lazy"
            />
          }
        />
      </>
    )
  },
  headLine: 'Real-time Info for Your Grow A Garden Adventure',
  captionLine: 'Stay updated on in-game stock, current weather, and precise restock times to optimize your gardening strategy!',
  primaryBtn: { children: 'View Stock', href: '/stock' },
  // --- Update these paths to reference the public directory ---
  videoSrc: 'http://cdn.jkt48connect.my.id/J-c27d0e87si1y.mp4',
  videoThumbnail: '/assets/videos/thumbnails/IMG-20250626-WA0384.jpg',
  // ----------------------------------------------------------
  listData: [
    { image: stockSvg, title: 'Current Stock' },
    { image: weatherSvg, title: 'In-Game Weather' },
    { image: restockSvg, title: 'Next Restock' },
    { image: communitySvg, title: 'Community Insights' },
    { image: plantGrowthSvg, title: 'Gardening Tips' },
  ]
};
