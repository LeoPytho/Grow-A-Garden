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
import { PAGE_PATH } from '@/path';
import { generateFocusVisibleStyles } from '@/utils/CommonFocusStyle';
import GetImagePath from '@/utils/GetImagePath';

// @assets
import Background from '@/images/graphics/Background';
import Wave from '@/images/graphics/Wave';

var StockCategory;

(function (StockCategory) {
  StockCategory['SEEDS'] = 'seedsStock';
  StockCategory['GEARS'] = 'gearStock';
  StockCategory['EGGS'] = 'eggStock';
  StockCategory['HONEY'] = 'honeyStock';
  StockCategory['COSMETICS'] = 'cosmeticsStock';
  StockCategory['EASTER'] = 'easterStock';
  StockCategory['NIGHT'] = 'nightStock';
})(StockCategory || (StockCategory = {}));

const filterList = [
  { title: 'All Stock', value: '' },
  { title: 'Seeds', value: StockCategory.SEEDS },
  { title: 'Gears', value: StockCategory.GEARS },
  { title: 'Eggs', value: StockCategory.EGGS },
  { title: 'Honey', value: StockCategory.HONEY },
  { title: 'Cosmetics', value: StockCategory.COSMETICS },
  { title: 'Easter', value: StockCategory.EASTER },
  { title: 'Night', value: StockCategory.NIGHT }
];

/***************************  SECTIONS LAYOUT  ***************************/

export default function Sections() {
  const theme = useTheme();
  const [filterBy, setFilterBy] = useState('');
  const [allStockItems, setAllStockItems] = useState([]);
  const [filterSections, setFilterSections] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stockData, setStockData] = useState(null);

  // Function to fetch stock data from JKT48 API
  const fetchStockData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apiKey = 'JKTCONNECT';
      const stock = await jkt48Api.gag.getStock(apiKey);
      
      setStockData(stock);
      
      // Transform stock data into sections format
      const transformedSections = [];
      
      Object.entries(stock).forEach(([categoryKey, items]) => {
        // Skip non-stock categories
        if (!categoryKey.includes('Stock') || !Array.isArray(items)) return;
        
        items.forEach((item, index) => {
          transformedSections.push({
            id: `${categoryKey}-${index}`,
            title: item.name,
            subTitle: `Quantity: ${item.value}`,
            image: item.image || '/assets/images/presentation/default-item.svg',
            link: `#${categoryKey}/${item.name.toLowerCase().replace(/\s+/g, '-')}`,
            category: categoryKey,
            value: item.value,
            originalData: item
          });
        });
      });
      
      setAllStockItems(transformedSections);
      setFilterSections(transformedSections);
      
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setError(error.message || 'Failed to fetch stock data');
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchStockData();
  }, []);

  const handleSearchValue = (event) => {
    const search = event.target.value.trim().toLowerCase();
    setSearchValue(search);
  };

  // Filter sections based on search and category
  useEffect(() => {
    let filteredData = allStockItems;
    
    // Apply category filter
    if (filterBy) {
      filteredData = filteredData.filter(item => item.category === filterBy);
    }
    
    // Apply search filter
    if (searchValue) {
      filteredData = filteredData.filter(item => 
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    
    setFilterSections(filteredData);
  }, [searchValue, filterBy, allStockItems]);

  const isFocusWithin = useFocusWithin();

  // Format category name for display
  const formatCategoryName = (category) => {
    return category.replace('Stock', '').replace(/([A-Z])/g, ' $1').trim();
  };

  // Get stock summary
  const getStockSummary = () => {
    if (!stockData) return '';
    
    const totalItems = Object.values(stockData)
      .filter(value => Array.isArray(value))
      .reduce((total, items) => total + items.length, 0);
    
    return `${totalItems} items across ${Object.keys(stockData).filter(key => key.includes('Stock')).length} categories`;
  };

  if (loading) {
    return (
      <>
        <SectionHero heading="JKT48 GAG Stock Inventory" search={false} offer />
        <ContainerWrapper>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 10 }}>
            <Stack spacing={2} alignItems="center">
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
          <Box sx={{ py: 6 }}>
            <Alert 
              severity="error" 
              action={
                <Button color="inherit" size="small" onClick={fetchStockData}>
                  Retry
                </Button>
              }
            >
              Error: {error}
            </Alert>
          </Box>
        </ContainerWrapper>
      </>
    );
  }

  return (
    <>
      <SectionHero 
        heading="JKT48 GAG Stock Inventory" 
        subheading={getStockSummary()}
        search={false} 
        offer 
      />
      <ContainerWrapper>
        <Stack sx={{ py: 6, gap: { xs: 3, sm: 4, md: 5 } }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            sx={{ alignItems: 'center', justifyContent: 'space-between', gap: { xs: 2.5, md: 1.5 } }}
          >
            <OutlinedInput
              placeholder="Search for items... (e.g., Carrot, Watering Can, Egg)"
              slotProps={{ input: { 'aria-label': 'Search stock items' } }}
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
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </Stack>
          </Stack>

          {/* Refresh Button */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {filterSections.length} items found
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={fetchStockData}
              startIcon={<SvgIcon name="tabler-refresh" />}
            >
              Refresh Stock
            </Button>
          </Box>

          <Grid container spacing={1.5}>
            {filterSections.map((item, index) => (
              <Grid key={item.id || index} size={{ xs: 6, sm: 4, md: 4 }}>
                <GraphicsCard sx={{ overflow: 'hidden', WebkitTapHighlightColor: 'transparent' }}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05
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
                        {item.image && item.image !== '/assets/images/presentation/default-item.svg' ? (
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
                          <Box
                            sx={{
                              px: '14.5%',
                              pt: '16%',
                              pb: { xs: 2, md: 1 },
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: '60%',
                              color: 'grey.400'
                            }}
                          >
                            <SvgIcon name="tabler-package" size={48} />
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
                        <Typography variant="h4" sx={{ color: 'primary.main' }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {item.subTitle}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                          {formatCategoryName(item.category)}
                        </Typography>
                      </Stack>
                    </GraphicsCard>
                  </motion.div>
                </GraphicsCard>
              </Grid>
            ))}
          </Grid>

          {filterSections.length === 0 && !loading && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No items found
              </Typography>
              <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
                Try adjusting your search or filter criteria
              </Typography>
            </Box>
          )}
        </Stack>
      </ContainerWrapper>
    </>
  );
}
