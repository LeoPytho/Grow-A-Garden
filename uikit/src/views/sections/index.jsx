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
import { generateFocusVisibleStyles } from '@/utils/CommonFocusStyle';

// @assets
import Background from '@/images/graphics/Background';
import Wave from '@/images/graphics/Wave';

// @jkt48/core import
const jkt48Api = require('@jkt48/core');

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

// Transform stock data to sections format
const transformStockToSections = (stockData) => {
  const sections = [];
  
  if (stockData.seedsStock) {
    stockData.seedsStock.forEach((item, index) => {
      sections.push({
        title: item.name,
        subTitle: `Stock: ${item.value}`,
        image: item.image || '/assets/images/placeholder.svg',
        link: `#seeds-${index}`,
        category: StockCategory.SEEDS,
        stock: item.value
      });
    });
  }

  if (stockData.gearStock) {
    stockData.gearStock.forEach((item, index) => {
      sections.push({
        title: item.name,
        subTitle: `Stock: ${item.value}`,
        image: item.image || '/assets/images/placeholder.svg',
        link: `#gears-${index}`,
        category: StockCategory.GEARS,
        stock: item.value
      });
    });
  }

  if (stockData.eggStock) {
    stockData.eggStock.forEach((item, index) => {
      sections.push({
        title: item.name,
        subTitle: `Stock: ${item.value}`,
        image: item.image || '/assets/images/placeholder.svg',
        link: `#eggs-${index}`,
        category: StockCategory.EGGS,
        stock: item.value
      });
    });
  }

  if (stockData.honeyStock) {
    stockData.honeyStock.forEach((item, index) => {
      sections.push({
        title: item.name,
        subTitle: `Stock: ${item.value}`,
        image: item.image || '/assets/images/placeholder.svg',
        link: `#honey-${index}`,
        category: StockCategory.HONEY,
        stock: item.value
      });
    });
  }

  if (stockData.cosmeticsStock) {
    stockData.cosmeticsStock.forEach((item, index) => {
      sections.push({
        title: item.name,
        subTitle: `Stock: ${item.value}`,
        image: item.image || '/assets/images/placeholder.svg',
        link: `#cosmetics-${index}`,
        category: StockCategory.COSMETICS,
        stock: item.value
      });
    });
  }

  if (stockData.nightStock) {
    stockData.nightStock.forEach((item, index) => {
      sections.push({
        title: item.name,
        subTitle: `Stock: ${item.value}`,
        image: item.image || '/assets/images/placeholder.svg',
        link: `#night-${index}`,
        category: StockCategory.NIGHT,
        stock: item.value
      });
    });
  }

  if (stockData.easterStock) {
    stockData.easterStock.forEach((item, index) => {
      sections.push({
        title: item.name,
        subTitle: `Stock: ${item.value}`,
        image: item.image || '/assets/images/placeholder.svg',
        link: `#easter-${index}`,
        category: StockCategory.EASTER,
        stock: item.value
      });
    });
  }

  return sections;
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
  const [restockTimers, setRestockTimers] = useState({});

  // Fetch stock data from JKT48 API
  const fetchStockData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apiKey = 'JKTCONNECT';
      const stockData = await jkt48Api.gag.getStock(apiKey);
      
      const transformedSections = transformStockToSections(stockData);
      setSections(transformedSections);
      setFilterSections(transformedSections);
      setRestockTimers(stockData.restockTimers || {});
      
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setError(error.message || 'Failed to fetch stock data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
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

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const isFocusWithin = useFocusWithin();

  if (loading) {
    return (
      <>
        <SectionHero heading="JKT48 GAG Stock Inventory" search={false} offer />
        <ContainerWrapper>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <Stack alignItems="center" spacing={2}>
              <CircularProgress size={60} />
              <Typography variant="h6" color="text.secondary">
                Loading stock data...
              </Typography>
            </Stack>
          </Box>
        </ContainerWrapper>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SectionHero heading="JKT48 GAG Stock Inventory" search={false} offer />
        <ContainerWrapper>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <Stack alignItems="center" spacing={2}>
              <Typography variant="h6" color="error">
                Error: {error}
              </Typography>
              <Button variant="contained" onClick={fetchStockData}>
                Retry
              </Button>
            </Stack>
          </Box>
        </ContainerWrapper>
      </>
    );
  }

  return (
    <>
      <SectionHero heading="JKT48 GAG Stock Inventory" search={false} offer />
      <ContainerWrapper>
        <Stack sx={{ py: 6, gap: { xs: 3, sm: 4, md: 5 } }}>
          {/* Restock Timers */}
          {Object.keys(restockTimers).length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                Restock Timers
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(restockTimers).map(([category, timer]) => (
                  <Grid key={category} size={{ xs: 6, sm: 4, md: 2.4 }}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        border: 1,
                        borderColor: 'divider',
                        textAlign: 'center'
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ textTransform: 'capitalize', color: 'text.primary' }}>
                        {category}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                        {formatTime(timer)}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            sx={{ alignItems: 'center', justifyContent: 'space-between', gap: { xs: 2.5, md: 1.5 } }}
          >
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <OutlinedInput
                placeholder="Search for items... (e.g., Carrot, Watering Can, Common Egg)"
                slotProps={{ input: { 'aria-label': 'Search items' } }}
                sx={{ '.MuiOutlinedInput-input': { pl: 1.5 }, width: { sm: 456, xs: 1 } }}
                startAdornment={<SvgIcon name="tabler-search" color="grey.700" />}
                onChange={handleSearchValue}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={fetchStockData}
                disabled={loading}
                sx={{ whiteSpace: 'nowrap' }}
              >
                Refresh
              </Button>
            </Stack>
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
                    setFilterSections(item.value === '' ? sections : sections.filter((section) => section.category === item.value));
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </Stack>
          </Stack>

          <Grid container spacing={1.5}>
            {filterSections.length > 0 ? (
              filterSections.map((item, index) => (
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
                          sx={{ position: 'absolute', top: 0, height: 1, width: 1, borderRadius: { xs: 6, sm: 8, md: 10 }, zIndex: 1 }}
                        />
                        <Background />
                        <Box sx={{ position: 'absolute', top: 0, width: 1, height: 1, textAlign: 'center' }}>
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
                              e.target.src = '/assets/images/placeholder.svg';
                            }}
                          />
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
                          {item.stock > 0 && (
                            <Box
                              sx={{
                                display: 'inline-flex',
                                alignSelf: 'center',
                                px: 2,
                                py: 0.5,
                                bgcolor: 'success.light',
                                borderRadius: 1,
                                mt: 1
                              }}
                            >
                              <Typography variant="caption" sx={{ color: 'success.dark', fontWeight: 600 }}>
                                In Stock
                              </Typography>
                            </Box>
                          )}
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
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Try adjusting your search or filter criteria
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Stack>
      </ContainerWrapper>
    </>
  );
}
