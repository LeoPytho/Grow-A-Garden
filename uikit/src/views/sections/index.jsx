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
import Alert from '@mui/material/Alert';

// @third-party
import { motion } from 'framer-motion';
const jkt48Api = require('@jkt48/core');

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import { GraphicsCard } from '@/components/cards';
import SectionHero from '@/components/SectionHero';
import SvgIcon from '@/components/SvgIcon';

import useFocusWithin from '@/hooks/useFocusWithin';
import { generateFocusVisibleStyles } from '@/utils/CommonFocusStyle';

// @assets
import Background from '@/images/graphics/Background';
import Wave from '@/images/graphics/Wave';

var StockCategory;

(function (StockCategory) {
  StockCategory['SEEDS'] = 'seeds';
  StockCategory['GEARS'] = 'gears';
  StockCategory['EGGS'] = 'eggs';
  StockCategory['HONEY'] = 'honey';
  StockCategory['COSMETICS'] = 'cosmetics';
  StockCategory['NIGHT'] = 'night';
  StockCategory['EASTER'] = 'easter';
})(StockCategory || (StockCategory = {}));

const API_KEY = 'JKTCONNECT';

const filterList = [
  { title: 'All Items', value: '' },
  { title: 'Seeds', value: StockCategory.SEEDS },
  { title: 'Gears', value: StockCategory.GEARS },
  { title: 'Eggs', value: StockCategory.EGGS },
  { title: 'Honey', value: StockCategory.HONEY },
  { title: 'Cosmetics', value: StockCategory.COSMETICS },
  { title: 'Night', value: StockCategory.NIGHT },
  { title: 'Easter', value: StockCategory.EASTER }
];

const getCategoryIcon = (category) => {
  const icons = {
    seeds: '🌱',
    gears: '⚙️',
    eggs: '🥚',
    honey: '🍯',
    cosmetics: '💄',
    night: '🌙',
    easter: '🐰'
  };
  return icons[category] || '📦';
};

/***************************  SECTIONS LAYOUT  ***************************/

export default function JKT48StockSections() {
  const theme = useTheme();
  const [filterBy, setFilterBy] = useState('');
  const [stockData, setStockData] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  // Fetch stock data from JKT48 API
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const stockResponse = await jkt48Api.gag.getStock(API_KEY);
        setStockData(stockResponse);
        
        // Convert stock data to sections format
        const allItems = [];
        
        // Process each stock category
        Object.entries(stockResponse).forEach(([categoryKey, items]) => {
          if (Array.isArray(items) && categoryKey.endsWith('Stock')) {
            const category = categoryKey.replace('Stock', '');
            items.forEach((item, index) => {
              allItems.push({
                id: `${category}-${index}`,
                title: item.name,
                subTitle: `Quantity: ${item.value}`,
                image: item.image || '/assets/images/placeholder.png',
                category: category.toLowerCase(),
                value: item.value,
                link: `#${category}-${item.name.replace(/\s+/g, '-').toLowerCase()}`
              });
            });
          }
        });
        
        setFilteredItems(allItems);
      } catch (err) {
        console.error('Error fetching stock data:', err);
        setError(err.message || 'Failed to fetch stock data');
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  // Handle search
  const handleSearchValue = (event) => {
    const search = event.target.value.trim().toLowerCase();
    setSearchValue(search);
  };

  // Filter items based on search and category
  useEffect(() => {
    if (!stockData) return;

    const allItems = [];
    Object.entries(stockData).forEach(([categoryKey, items]) => {
      if (Array.isArray(items) && categoryKey.endsWith('Stock')) {
        const category = categoryKey.replace('Stock', '');
        items.forEach((item, index) => {
          allItems.push({
            id: `${category}-${index}`,
            title: item.name,
            subTitle: `Quantity: ${item.value}`,
            image: item.image || '/assets/images/placeholder.png',
            category: category.toLowerCase(),
            value: item.value,
            link: `#${category}-${item.name.replace(/\s+/g, '-').toLowerCase()}`
          });
        });
      }
    });

    let filtered = allItems;

    // Apply category filter
    if (filterBy) {
      filtered = filtered.filter(item => item.category === filterBy);
    }

    // Apply search filter
    if (searchValue) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [stockData, filterBy, searchValue]);

  const isFocusWithin = useFocusWithin();

  // Loading state
  if (loading) {
    return (
      <>
        <SectionHero heading="JKT48 Game Stock Items" search={false} offer />
        <ContainerWrapper>
          <Stack sx={{ py: 6, alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
              Loading stock data...
            </Typography>
          </Stack>
        </ContainerWrapper>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <SectionHero heading="JKT48 Game Stock Items" search={false} offer />
        <ContainerWrapper>
          <Stack sx={{ py: 6 }}>
            <Alert severity="error" sx={{ mb: 3 }}>
              Error loading stock data: {error}
            </Alert>
            <Button 
              variant="contained" 
              onClick={() => window.location.reload()}
              sx={{ maxWidth: 200 }}
            >
              Retry
            </Button>
          </Stack>
        </ContainerWrapper>
      </>
    );
  }

  return (
    <>
      <SectionHero heading="JKT48 Game Stock Items" search={false} offer />
      <ContainerWrapper>
        <Stack sx={{ py: 6, gap: { xs: 3, sm: 4, md: 5 } }}>
          {/* Stock Summary */}
          {stockData && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Stock Summary
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(stockData).map(([key, items]) => {
                  if (Array.isArray(items) && key.endsWith('Stock')) {
                    const category = key.replace('Stock', '');
                    const totalItems = items.reduce((sum, item) => sum + item.value, 0);
                    return (
                      <Grid key={key} size={{ xs: 6, sm: 4, md: 3 }}>
                        <Box sx={{ 
                          p: 2, 
                          border: 1, 
                          borderColor: 'divider', 
                          borderRadius: 2,
                          textAlign: 'center'
                        }}>
                          <Typography variant="h4">
                            {getCategoryIcon(category.toLowerCase())}
                          </Typography>
                          <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
                            {category}
                          </Typography>
                          <Typography variant="h6" color="primary">
                            {totalItems}
                          </Typography>
                        </Box>
                      </Grid>
                    );
                  }
                  return null;
                })}
              </Grid>
            </Box>
          )}

          {/* Search and Filter Controls */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            sx={{ alignItems: 'center', justifyContent: 'space-between', gap: { xs: 2.5, md: 1.5 } }}
          >
            <OutlinedInput
              placeholder="Search for items... (e.g., Carrot, Watering Can, Egg)"
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
                  onClick={() => setFilterBy(item.value)}
                >
                  {item.title}
                </Button>
              ))}
            </Stack>
          </Stack>

          {/* Results Count */}
          <Typography variant="body2" color="text.secondary">
            Showing {filteredItems.length} items
          </Typography>

          {/* Stock Items Grid */}
          <Grid container spacing={1.5}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <Grid key={item.id} size={{ xs: 6, sm: 4, md: 4 }}>
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
                          sx={{ position: 'absolute', top: 0, height: 1, width: 1, borderRadius: { xs: 6, sm: 8, md: 10 }, zIndex: 1 }}
                        />
                        <Background />
                        <Box sx={{ position: 'absolute', top: 0, width: 1, height: 1, textAlign: 'center' }}>
                          {item.image && item.image !== '/assets/images/placeholder.png' ? (
                            <CardMedia
                              component="img"
                              image={item.image}
                              sx={{ 
                                px: '14.5%', 
                                pt: '16%', 
                                pb: { xs: 2, md: 1 }, 
                                objectFit: 'contain',
                                maxHeight: '60%'
                              }}
                              alt={item.title}
                              loading="lazy"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <Box sx={{ 
                              px: '14.5%', 
                              pt: '16%', 
                              pb: { xs: 2, md: 1 },
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '4rem'
                            }}>
                              {getCategoryIcon(item.category)}
                            </Box>
                          )}
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
                          <Typography variant="h5" sx={{ color: 'primary.main' }}>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {item.subTitle}
                          </Typography>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: 'text.disabled',
                              textTransform: 'capitalize'
                            }}
                          >
                            {getCategoryIcon(item.category)} {item.category}
                          </Typography>
                        </Stack>
                      </GraphicsCard>
                    </motion.div>
                  </GraphicsCard>
                </Grid>
              ))
            ) : (
              <Grid size={12}>
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="h6" color="text.secondary">
                    No items found
                  </Typography>
                  <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
                    Try adjusting your search or filter criteria
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>

          {/* Restock Timers */}
          {stockData?.restockTimers && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Restock Timers
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(stockData.restockTimers).map(([category, timer]) => (
                  <Grid key={category} size={{ xs: 6, sm: 4, md: 3 }}>
                    <Box sx={{ 
                      p: 2, 
                      border: 1, 
                      borderColor: 'divider', 
                      borderRadius: 2,
                      textAlign: 'center'
                    }}>
                      <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
                        {category}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {Math.floor(timer / 1000)} seconds
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Stack>
      </ContainerWrapper>
    </>
  );
}
