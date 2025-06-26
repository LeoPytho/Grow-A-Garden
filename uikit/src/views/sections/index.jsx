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

// Import the jkt48Api module
import jkt48Api from '@jkt48/core';

// Define SectionCategory as it was in your original code
var SectionCategory;

(function (SectionCategory) {
  SectionCategory['ESSENTIAL'] = 'essential';
  SectionCategory['MARKETING'] = 'marketing';
  SectionCategory['FEATURE'] = 'feature';
})(SectionCategory || (SectionCategory = {}));

const imagePrefix = '/assets/images/presentation';

/*************************** SECTIONS LAYOUT  ***************************/

export default function Sections() {
  const theme = useTheme();
  const [filterBy, setFilterBy] = useState('');
  // Initialize filterSections with an empty array as data will be fetched
  const [filterSections, setFilterSections] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  // New state to store raw stock data from the API
  const [stockData, setStockData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to transform API data into the format your component expects
  const transformStockData = (data) => {
    const transformed = [];
    // Iterate through each category in the stock data
    for (const category in data) {
      if (Array.isArray(data[category])) {
        data[category].forEach((item) => {
          transformed.push({
            title: item.name,
            subTitle: `${item.value || 0} In Stock`, // Display stock quantity
            image: item.image || `${imagePrefix}/default-item.svg`, // Use a default image if none is provided
            // You might want to define a specific link for each item if applicable,
            // or just use a generic link or prevent navigation if there's no specific page
            link: PAGE_PATH.other, // Placeholder link, adjust as needed
            category: SectionCategory.FEATURE, // Categorize as FEATURE or create new categories if needed
          });
        });
      }
    }
    return transformed;
  };

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiKey = 'JKTCONNECT'; // Your API key
        const data = await jkt48Api.gag.getStock(apiKey);
        setStockData(data);
        // Transform and set initial filtered sections
        const transformed = transformStockData(data);
        setFilterSections(transformed);
      } catch (err) {
        console.error('Failed to fetch JKT48 stock data:', err.message);
        setError('Failed to load stock data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []); // Run once on component mount

  useEffect(() => {
    // Filter logic based on searchValue and filterBy
    const allTransformedSections = transformStockData(stockData); // Re-transform if stockData changes or for fresh filtering

    const newData = allTransformedSections.filter((value) => {
      const matchesSearch = searchValue
        ? value.title.toLowerCase().includes(searchValue.toLowerCase())
        : true;
      const matchesCategory = filterBy ? value.category === filterBy : true;
      return matchesSearch && matchesCategory;
    });
    setFilterSections(newData);
  }, [searchValue, filterBy, stockData]); // Re-run when searchValue, filterBy, or stockData changes

  const handleSearchValue = (event) => {
    const search = event.target.value.trim().toLowerCase();
    setSearchValue(search);
  };

  const isFocusWithin = useFocusWithin();

  // Filter list for buttons (unchanged as per your original request)
  const filterList = [
    { title: 'All Section', value: '' },
    { title: 'Marketing', value: SectionCategory.MARKETING },
    { title: 'Feature', value: SectionCategory.FEATURE },
    { title: 'Essential', value: SectionCategory.ESSENTIAL },
  ];

  if (loading) {
    return (
      <ContainerWrapper>
        <Typography variant="h5" sx={{ textAlign: 'center', py: 6 }}>
          Loading stock data...
        </Typography>
      </ContainerWrapper>
    );
  }

  if (error) {
    return (
      <ContainerWrapper>
        <Typography variant="h5" color="error" sx={{ textAlign: 'center', py: 6 }}>
          {error}
        </Typography>
      </ContainerWrapper>
    );
  }

  return (
    <>
      <SectionHero heading="Explore JKT48 Merchandise Stock" search={false} offer />
      <ContainerWrapper>
        <Stack sx={{ py: 6, gap: { xs: 3, sm: 4, md: 5 } }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            sx={{ alignItems: 'center', justifyContent: 'space-between', gap: { xs: 2.5, md: 1.5 } }}
          >
            <OutlinedInput
              placeholder="Search for items... (e.g., Recall Wrench, Carrot)"
              slotProps={{ input: { 'aria-label': 'Search items' } }}
              sx={{ '.MuiOutlinedInput-input': { pl: 1.5 }, width: { sm: 456, xs: 1 } }}
              startAdornment={<SvgIcon name="tabler-search" color="grey.700" />}
              onChange={handleSearchValue}
              value={searchValue} // Make input controlled
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
                    // Filtering will now be handled by the useEffect that depends on filterBy and stockData
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
                <Grid item key={index} xs={6} sm={4} md={4}>
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
                            image={item.image} // Use item.image directly as it's already a full URL or path
                            sx={{ px: '14.5%', pt: '16%', pb: { xs: 2, md: 1 }, objectFit: 'contain' }}
                            alt={item.title}
                            loading="lazy"
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
                        </Stack>
                      </GraphicsCard>
                    </motion.div>
                  </GraphicsCard>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
                  No items found matching your criteria.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Stack>
      </ContainerWrapper>
    </>
  );
}
