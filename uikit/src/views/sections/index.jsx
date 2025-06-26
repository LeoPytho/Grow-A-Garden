'use client';
import { useEffect, useState } from 'react';

// @next
import NextLink from 'next/link';

// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

// @third-party
import { motion } from 'framer-motion';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import { GraphicsCard } from '@/components/cards';
import SectionHero from '@/components/SectionHero';
import SvgIcon from '@/components/SvgIcon';

import useFocusWithin from '@/hooks/useFocusWithin';
import { PAGE_PATH } from '@/path';
import { generateFocusVisibleStyles } from '@/utils/CommonFocusStyle';
import GetImagePath from '@/utils/GetImagePath';

// @assets
import Background from '@/images/graphics/Background';
import Wave from '@/images/graphics/Wave';

var SectionCategory;

(function (SectionCategory) {
  SectionCategory['GEAR'] = 'gear';
  SectionCategory['SEEDS'] = 'seeds';
  SectionCategory['EGGS'] = 'eggs';
  SectionCategory['HONEY'] = 'honey';
  SectionCategory['COSMETICS'] = 'cosmetics';
  SectionCategory['NIGHT'] = 'night';
})(SectionCategory || (SectionCategory = {}));

const filterList = [
  { title: 'All Items', value: '' },
  { title: 'Gear Stock', value: SectionCategory.GEAR },
  { title: 'Seeds Stock', value: SectionCategory.SEEDS },
  { title: 'Eggs Stock', value: SectionCategory.EGGS },
  { title: 'Honey Stock', value: SectionCategory.HONEY },
  { title: 'Cosmetics Stock', value: SectionCategory.COSMETICS },
  { title: 'Night Stock', value: SectionCategory.NIGHT }
];

// Default fallback images for each category using data URLs (always work)
const defaultImages = {
  [SectionCategory.GEAR]: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNENBRjUwIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+R0VBUjwvdGV4dD4KPC9zdmc+',
  [SectionCategory.SEEDS]: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjOEJDMzRBIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U0VFRFM8L3RleHQ+CjwvZz4KPC9zdmc+',
  [SectionCategory.EGGS]: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkZDMTA3Ii8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RUdHUzwvdGV4dD4KPC9zdmc+',
  [SectionCategory.HONEY]: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkY5ODAwIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SE9ORVk8L3RleHQ+CjwvZz4KPC9zdmc+',
  [SectionCategory.COSMETICS]: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRTkxRTYzIi8+Cjx0ZXh0IHg9IjUwIiB5PSI0NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q09TTUV0SUNTPC90ZXh0Pgo8L3N2Zz4=',
  [SectionCategory.NIGHT]: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjM0Y1MUI1Ii8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TklHSFQ8L3RleHQ+CjwvZz4KPC9zdmc+'
};

/***************************  SECTIONS LAYOUT  ***************************/

export default function Sections() {
  const theme = useTheme();
  const [filterBy, setFilterBy] = useState('');
  const [sections, setSections] = useState([]);
  const [filterSections, setFilterSections] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/growagarden/stock');

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        // Transform API data to match the expected structure
        const transformedSections = [];

        // Transform each stock category
        if (data.gearStock) {
          data.gearStock.forEach((item, index) => {
            transformedSections.push({
              title: item.name,
              subTitle: `${item.value} in stock`,
              image: getImageSrc(item.image, SectionCategory.GEAR),
              link: `#gear-${index}`,
              category: SectionCategory.GEAR
            });
          });
        }

        if (data.seedsStock) {
          data.seedsStock.forEach((item, index) => {
            transformedSections.push({
              title: item.name,
              subTitle: `${item.value} in stock`,
              image: getImageSrc(item.image, SectionCategory.SEEDS),
              link: `#seeds-${index}`,
              category: SectionCategory.SEEDS
            });
          });
        }

        if (data.eggStock) {
          data.eggStock.forEach((item, index) => {
            transformedSections.push({
              title: item.name,
              subTitle: `${item.value} in stock`,
              image: getImageSrc(item.image, SectionCategory.EGGS),
              link: `#eggs-${index}`,
              category: SectionCategory.EGGS
            });
          });
        }

        if (data.honeyStock) {
          data.honeyStock.forEach((item, index) => {
            transformedSections.push({
              title: item.name,
              subTitle: `${item.value} in stock`,
              image: getImageSrc(item.image, SectionCategory.HONEY),
              link: `#honey-${index}`,
              category: SectionCategory.HONEY
            });
          });
        }

        if (data.cosmeticsStock) {
          data.cosmeticsStock.forEach((item, index) => {
            transformedSections.push({
              title: item.name,
              subTitle: `${item.value} in stock`,
              image: getImageSrc(item.image, SectionCategory.COSMETICS),
              link: `#cosmetics-${index}`,
              category: SectionCategory.COSMETICS
            });
          });
        }

        if (data.nightStock) {
          data.nightStock.forEach((item, index) => {
            transformedSections.push({
              title: item.name,
              subTitle: `${item.value} in stock`,
              image: getImageSrc(item.image, SectionCategory.NIGHT),
              link: `#night-${index}`,
              category: SectionCategory.NIGHT
            });
          });
        }

        setSections(transformedSections);
        setFilterSections(transformedSections);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchValue = (event) => {
    const search = event.target.value.trim().toLowerCase();
    setSearchValue(search);
  };

  useEffect(() => {
    const newData = sections.filter((value) => {
      if (searchValue) {
        return value.title.toLowerCase().includes(searchValue.toLowerCase());
      } else {
        return value;
      }
    });
    setFilterSections(newData);
  }, [searchValue, sections]);

  // Function to handle image loading with proxy for external images
  const getImageSrc = (originalSrc, category) => {
    if (!originalSrc) {
      return defaultImages[category];
    }
    
    // Check if it's an external image (postimg.cc, etc.)
    if (originalSrc.startsWith('http') && !originalSrc.includes(window.location.hostname)) {
      // Option 1: Use a proxy service (more reliable)
      return `https://images.weserv.nl/?url=${encodeURIComponent(originalSrc)}`;
      
      // Option 2: Alternative proxy services (uncomment if the above doesn't work)
      // return `https://cors-anywhere.herokuapp.com/${originalSrc}`;
      // return `/api/proxy-image?url=${encodeURIComponent(originalSrc)}`;
    }
    
    return originalSrc;
  };

  const isFocusWithin = useFocusWithin();

  if (loading) {
    return (
      <>
        <SectionHero heading="Craft Stunning Design with SaasAble Blocks" search={false} offer />
        <ContainerWrapper>
          <Stack sx={{ py: 6, alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Loading stock data...
            </Typography>
          </Stack>
        </ContainerWrapper>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SectionHero heading="Craft Stunning Design with SaasAble Blocks" search={false} offer />
        <ContainerWrapper>
          <Stack sx={{ py: 6, alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
            <Typography variant="h6" color="error" sx={{ mb: 2 }}>
              Error loading data: {error}
            </Typography>
            <Button variant="contained" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </Stack>
        </ContainerWrapper>
      </>
    );
  }

  return (
    <>
      <SectionHero heading="Grow A Garden Stock Items" search={false} offer />
      <ContainerWrapper>
        <Stack sx={{ py: 6, gap: { xs: 3, sm: 4, md: 5 } }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            sx={{ alignItems: 'center', justifyContent: 'space-between', gap: { xs: 2.5, md: 1.5 } }}
          >
            <OutlinedInput
              placeholder="Search for items... (e.g., Carrot, Trowel, Common Egg)"
              slotProps={{ input: { 'aria-label': 'Search items' } }}
              sx={{ '.MuiOutlinedInput-input': { pl: 1.5 }, width: { sm: 456, xs: 1 } }}
              startAdornment={<SvgIcon name="tabler-search" color="grey.700" />}
              onChange={handleSearchValue}
              value={searchValue}
            />
            <Stack direction="row" sx={{ gap: 1.5, flexWrap: 'wrap' }}>
              {filterList.map((item, index) => (
                <Button
                  key={index}
                  variant={filterBy === item.value ? 'contained' : 'outlined'}
                  size="small"
                  sx={{
                    ...theme.typography.subtitle2,
                    whiteSpace: 'nowrap',
                    [theme.breakpoints.down('sm')]: { px: 1.5, py: 1 }
                  }}
                  onClick={() => {
                    setFilterBy(item.value);
                    setFilterSections(
                      item.value === '' ? sections : sections.filter((section) => section.category === item.value)
                    );
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </Stack>
          </Stack>

          {filterSections.length === 0 ? (
            <Stack sx={{ alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
              <Typography variant="h6" color="text.secondary">
                {searchValue ? `No items found for "${searchValue}"` : 'No items available'}
              </Typography>
            </Stack>
          ) : (
            <Grid container spacing={1.5}>
              {filterSections.map((item, index) => (
                <Grid key={index} size={{ xs: 6, sm: 4, md: 4 }}>
                  <GraphicsCard sx={{ overflow: 'hidden', WebkitTapHighlightColor: 'transparent' }}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5
                      }}
                    >
                      <GraphicsCard
                        sx={{
                          height: { xs: 240, sm: 324, md: 380 },
                          position: 'relative',
                          overflow: 'hidden',
                          ...(isFocusWithin && { '&:focus-within': generateFocusVisibleStyles(theme.palette.primary.main) })
                        }}
                      >
                        <Link
                          href={item.link}
                          component={NextLink}
                          aria-label={item.title}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            height: 1,
                            width: 1,
                            borderRadius: { xs: 6, sm: 8, md: 10 },
                            zIndex: 1
                          }}
                        />
                        <Background />
                        <Box sx={{ position: 'absolute', top: 0, width: 1, height: 1, textAlign: 'center' }}>
                          <Box
                            sx={{
                              px: '14.5%',
                              pt: '16%',
                              pb: { xs: 2, md: 1 },
                              maxHeight: '60%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain'
                              }}
                              loading="lazy"
                              onError={(e) => {
                                // Fallback to category-specific placeholder if image fails to load
                                const category = item.category;
                                e.target.src = defaultImages[category];
                              }}
                              onLoad={(e) => {
                                // Hide any loading indicator if you have one
                                e.target.style.opacity = '1';
                              }}
                            />
                          </Box>
                          <Box sx={{ '& div': { alignItems: 'center', pt: 0.875 } }}>
                            <Wave />
                          </Box>
                        </Box>
                        <Stack
                          sx={{
                            height: 177,
                            bottom: 0,
                            width: 1,
                            position: 'absolute',
                            justifyContent: 'end',
                            textAlign: 'center',
                            gap: { xs: 0.25, md: 0.5, sm: 1 },
                            p: 3,
                            background: `linear-gradient(180deg, ${alpha(theme.palette.grey[100], 0)} 0%, ${theme.palette.grey[100]} 100%)`
                          }}
                        >
                          <Typography variant="h4" sx={{ color: 'primary.main' }}>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {item.subTitle}
                          </Typography>
                        </Stack>
                      </GraphicsCard>
                    </motion.div>
                  </GraphicsCard>
                </Grid>
              ))}
            </Grid>
          )}
        </Stack>
      </ContainerWrapper>
    </>
  );
}
