'use client';
import { useEffect, useState, useMemo } from 'react';

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
import CircularProgress from '@mui/material/CircularProgress'; // For loading indicator
import Alert from '@mui/material/Alert'; // For error messages

// @third-party
import { motion } from 'framer-motion';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import { GraphicsCard } from '@/components/cards';
import SectionHero from '@/components/SectionHero';
import SvgIcon from '@/components/SvgIcon';

import useFocusWithin from '@/hooks/useFocusWithin';
import { generateFocusVisibleStyles } from '@/utils/CommonFocusStyle'; // Assuming this utility is correctly defined
// GetImagePath might not be needed if images are direct URLs, we'll use item.image directly
// import GetImagePath from '@/utils/GetImagePath';

// @assets
import Background from '@/images/graphics/Background';
import Wave from '@/images/graphics/Wave';

// Define the API endpoint
const API_URL = 'https://v2.jkt48connect.my.id/api/growagarden/stock?apikey=JKTCONNECT';

export default function Sections() {
  const theme = useTheme();
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchValue, setSearchValue] = useState('');

  // --- Data Fetching and Polling ---
  useEffect(() => {
    const fetchGrowAGardenData = async () => {
      try {
        // Only show loading for the initial fetch or if stockData is null
        if (stockData === null) {
          setLoading(true);
        }
        setError(null); // Clear previous errors

        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStockData(data);
        setLastUpdated(new Date());
      } catch (err) {
        console.error("Failed to fetch Grow A Garden stock data:", err);
        setError("Failed to load Grow A Garden data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch when component mounts
    fetchGrowAGardenData();

    // Set up interval for polling every 7 seconds
    const intervalId = setInterval(fetchGrowAGardenData, 7000); // 7000 ms = 7 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [stockData]); // Depend on stockData to prevent re-rendering when data comes

  // --- Process and Filter Stock Data ---
  const processedItems = useMemo(() => {
    if (!stockData) return [];

    const allItems = [];
    // Map API categories to more readable names and flatten the list
    if (stockData.seedsStock) {
      stockData.seedsStock.forEach(item => allItems.push({ ...item, category: 'Seeds' }));
    }
    if (stockData.gearStock) {
      stockData.gearStock.forEach(item => allItems.push({ ...item, category: 'Gears' }));
    }
    if (stockData.eggStock) {
      stockData.eggStock.forEach(item => allItems.push({ ...item, category: 'Eggs' }));
    }
    if (stockData.honeyStock) {
      stockData.honeyStock.forEach(item => allItems.push({ ...item, category: 'Honey' }));
    }
    if (stockData.cosmeticsStock) {
      stockData.cosmeticsStock.forEach(item => allItems.push({ ...item, category: 'Cosmetics' }));
    }
    if (stockData.nightStock) {
      stockData.nightStock.forEach(item => allItems.push({ ...item, category: 'Night Items' }));
    }
    if (stockData.easterStock) {
      stockData.easterStock.forEach(item => allItems.push({ ...item, category: 'Easter Items' }));
    }

    // Apply category filter
    let filteredByCategory = activeCategory === 'All'
      ? allItems
      : allItems.filter(item => item.category === activeCategory);

    // Apply search filter
    if (searchValue) {
      filteredByCategory = filteredByCategory.filter(item =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    return filteredByCategory;
  }, [stockData, activeCategory, searchValue]);

  const categoryFilters = useMemo(() => {
    if (!stockData) return [{ title: 'All', value: 'All' }];
    const categories = new Set();
    if (stockData.seedsStock && stockData.seedsStock.length > 0) categories.add('Seeds');
    if (stockData.gearStock && stockData.gearStock.length > 0) categories.add('Gears');
    if (stockData.eggStock && stockData.eggStock.length > 0) categories.add('Eggs');
    if (stockData.honeyStock && stockData.honeyStock.length > 0) categories.add('Honey');
    if (stockData.cosmeticsStock && stockData.cosmeticsStock.length > 0) categories.add('Cosmetics');
    if (stockData.nightStock && stockData.nightStock.length > 0) categories.add('Night Items');
    if (stockData.easterStock && stockData.easterStock.length > 0) categories.add('Easter Items');

    return [{ title: 'All', value: 'All' }, ...Array.from(categories).map(cat => ({ title: cat, value: cat }))];
  }, [stockData]);


  const handleSearchValue = (event) => {
    setSearchValue(event.target.value.trim());
  };

  const isFocusWithin = useFocusWithin();

  // Helper to format last updated time
  const formatLastUpdated = (date) => {
    if (!date) return 'N/A';
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSeconds < 60) {
      return `Last updated: ${diffSeconds} seconds ago`;
    } else if (diffSeconds < 3600) {
      const minutes = Math.floor(diffSeconds / 60);
      return `Last updated: ${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else {
      return `Last updated: ${date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`; // Indonesian time format
    }
  };


  return (
    <>
      <SectionHero
        heading="Grow A Garden: Real-time Stock & Info"
        caption="Stay updated on in-game item availability, weather, and restock timers for your gardening adventure!"
        search={false} // Disable search from SectionHero if you have your own
        offer={false} // Assuming 'offer' is not relevant here
      />
      <ContainerWrapper>
        <Stack sx={{ py: 6, gap: { xs: 3, sm: 4, md: 5 } }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            sx={{ alignItems: 'center', justifyContent: 'space-between', gap: { xs: 2.5, md: 1.5 } }}
          >
            <OutlinedInput
              placeholder="Search for items... (e.g., Carrot, Watering Can, Rare Egg)"
              slotProps={{ input: { 'aria-label': 'Search items' } }}
              sx={{ '.MuiOutlinedInput-input': { pl: 1.5 }, width: { sm: 456, xs: 1 } }}
              startAdornment={<SvgIcon name="tabler-search" color="grey.700" />}
              onChange={handleSearchValue}
              value={searchValue}
            />
            <Stack direction="row" sx={{ gap: 1.5, flexWrap: 'wrap' }}>
              {categoryFilters.map((item, index) => (
                <Button
                  key={index}
                  variant={activeCategory === item.value ? 'contained' : 'outlined'}
                  size="small"
                  sx={{
                    ...theme.typography.subtitle2,
                    whiteSpace: 'nowrap',
                    [theme.breakpoints.down('sm')]: { px: 1.5, py: 1 }
                  }}
                  onClick={() => {
                    setActiveCategory(item.value);
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </Stack>
          </Stack>

          {/* Real-time Update Information */}
          <Box sx={{ textAlign: 'center', mt: 2, mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              **Informasi Penting:** Data terbaru selalu tersedia setiap **5 menit**.
              Contohnya, jika data diperbarui pukul 17:00, maka data selanjutnya akan tersedia paling lambat pukul 17:05.
            </Typography>
            <Typography variant="caption" color="text.primary" sx={{ mt: 1, display: 'block' }}>
              {formatLastUpdated(lastUpdated)}
            </Typography>
          </Box>


          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
              <CircularProgress />
              <Typography variant="h6" sx={{ ml: 2 }}>Loading data...</Typography>
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ my: 3 }}>
              {error}
            </Alert>
          )}

          {!loading && !error && processedItems.length === 0 && (
            <Alert severity="info" sx={{ my: 3 }}>
              No items found for the selected category or search term.
            </Alert>
          )}

          {!loading && !error && processedItems.length > 0 && (
            <Grid container spacing={1.5}>
              {processedItems.map((item, index) => (
                <Grid item xs={6} sm={4} md={4} key={item.name + item.category + index}> {/* Added key for uniqueness */}
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
                        {/* Link can be modified to go to item detail if available */}
                        <Link
                          href={`#${item.category.replace(/\s/g, '-')}-${item.name.replace(/\s/g, '-')}`} // Simple anchor link for demonstration
                          aria-label={`${item.name} Stock`}
                          sx={{ position: 'absolute', top: 0, height: 1, width: 1, borderRadius: { xs: 6, sm: 8, md: 10 }, zIndex: 1 }}
                        />
                        <Background /> {/* Re-using background graphic */}
                        <Box sx={{ position: 'absolute', top: 0, width: 1, height: 1, textAlign: 'center' }}>
                          <CardMedia
                            component="img"
                            // Use the image URL directly from the API, if available.
                            // Fallback to a placeholder or empty string if not.
                            image={item.image || '/path/to/placeholder-image.png'} // Provide a fallback image if item.image is empty
                            sx={{ px: '14.5%', pt: '16%', pb: { xs: 2, md: 1 }, objectFit: 'contain' }}
                            alt={`${item.name} image`}
                            loading="lazy"
                          />
                          <Box sx={{ '& div': { alignItems: 'center', pt: 0.875 } }}>
                            <Wave /> {/* Re-using wave graphic */}
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
                            {item.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            **Stock:** {item.value} {item.category}
                          </Typography>
                          {/* Optionally display last seen if available in 'item' */}
                          {item.seen && (
                             <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                               Last seen: {new Date(item.seen).toLocaleTimeString('id-ID')}
                             </Typography>
                          )}
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
