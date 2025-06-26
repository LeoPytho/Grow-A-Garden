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
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

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

// --- Import the JKT48 API core library ---
// Note: Since this is a 'use client' component,
// you might need to ensure `@jkt48/core` is compatible with client-side bundling.
// If it's a CommonJS module, you might need to dynamically import it or ensure
// your Next.js config handles it correctly. For direct use in client components,
// it's usually designed to be ES module compatible.
// For now, let's assume it can be directly imported.
import jkt48Api from '@jkt48/core'; // Adjust import if it's a default export or named export

// Define your API Key
const API_KEY = 'JKTCONNECT';

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
        if (stockData === null) {
          setLoading(true);
        }
        setError(null);

        // --- Use jkt48Api.gag.getStock to fetch data ---
        // Ensure jkt48Api.gag and jkt48Api.gag.getStock are defined in your @jkt48/core library.
        // Based on your previous request for a 'growAGarden.js' module, this structure is expected.
        const data = await jkt48Api.gag.getStock(API_KEY);
        // -----------------------------------------------

        // Enhanced logging for API response (still useful even with library)
        if (!data) { // Assuming getStock might return null/undefined on internal library error
             console.error("API Error: jkt48Api.gag.getStock returned no data.");
             throw new Error("Failed to retrieve data from Grow A Garden API via library.");
        }

        setStockData(data);
        setLastUpdated(new Date());

      } catch (err) {
        console.error("Failed to fetch Grow A Garden stock data via @jkt48/core. Details:", err);

        let errorMessage = "Gagal memuat data Grow A Garden. Silakan coba lagi nanti.";
        if (err instanceof TypeError && err.message === 'Failed to fetch') {
          errorMessage = "Kesalahan jaringan. Mohon periksa koneksi internet Anda.";
        } else if (err.message.includes("Failed to retrieve data") || err.message.includes("Server responded with status")) {
          // Adapt error message based on potential library-thrown errors or network issues
          errorMessage = `Gagal memuat data: ${err.message}`;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchGrowAGardenData();

    const intervalId = setInterval(fetchGrowAGardenData, 7000);

    return () => clearInterval(intervalId);
  }, [stockData]); // Keep dependency to allow re-fetches if stockData state changes unexpectedly, or remove if you want it to run only once on mount

  // --- Process and Filter Stock Data ---
  const processedItems = useMemo(() => {
    if (!stockData) return [];

    const allItems = [];
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

    let filteredByCategory = activeCategory === 'All'
      ? allItems
      : allItems.filter(item => item.category === activeCategory);

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

  const formatLastUpdated = (date) => {
    if (!date) return 'N/A';
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSeconds < 60) {
      return `Terakhir diperbarui: ${diffSeconds} detik yang lalu`;
    } else if (diffSeconds < 3600) {
      const minutes = Math.floor(diffSeconds / 60);
      return `Terakhir diperbarui: ${minutes} menit yang lalu`;
    } else {
      return `Terakhir diperbarui: ${date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;
    }
  };


  return (
    <>
      <SectionHero
        heading="Grow A Garden: Informasi Stok & Real-time"
        caption="Tetap update dengan ketersediaan item dalam game, kondisi cuaca, dan waktu restock untuk mengoptimalkan strategi berkebun Anda!"
        search={false}
        offer={false}
      />
      <ContainerWrapper>
        <Stack sx={{ py: 6, gap: { xs: 3, sm: 4, md: 5 } }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            sx={{ alignItems: 'center', justifyContent: 'space-between', gap: { xs: 2.5, md: 1.5 } }}
          >
            <OutlinedInput
              placeholder="Cari item... (contoh: Wortel, Alat Siram, Telur Langka)"
              slotProps={{ input: { 'aria-label': 'Cari item' } }}
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
              Contohnya, jika data diperbarui pukul 17.00, maka akan tersedia lagi di 17.05.
            </Typography>
            <Typography variant="caption" color="text.primary" sx={{ mt: 1, display: 'block' }}>
              {formatLastUpdated(lastUpdated)}
            </Typography>
          </Box>


          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
              <CircularProgress />
              <Typography variant="h6" sx={{ ml: 2 }}>Memuat data...</Typography>
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ my: 3 }}>
              {error}
            </Alert>
          )}

          {!loading && !error && processedItems.length === 0 && (
            <Alert severity="info" sx={{ my: 3 }}>
              Tidak ada item yang ditemukan untuk kategori atau istilah pencarian yang dipilih.
            </Alert>
          )}

          {!loading && !error && processedItems.length > 0 && (
            <Grid container spacing={1.5}>
              {processedItems.map((item, index) => (
                <Grid item xs={6} sm={4} md={4} key={item.name + item.category + index}>
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
                          href={`#${item.category.replace(/\s/g, '-')}-${item.name.replace(/\s/g, '-')}`}
                          aria-label={`${item.name} Stock`}
                          sx={{ position: 'absolute', top: 0, height: 1, width: 1, borderRadius: { xs: 6, sm: 8, md: 10 }, zIndex: 1 }}
                        />
                        <Background />
                        <Box sx={{ position: 'absolute', top: 0, width: 1, height: 1, textAlign: 'center' }}>
                          <CardMedia
                            component="img"
                            image={item.image || '/assets/images/placeholder-item.png'} // Fallback placeholder
                            sx={{ px: '14.5%', pt: '16%', pb: { xs: 2, md: 1 }, objectFit: 'contain' }}
                            alt={`${item.name} image`}
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
                            {item.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            **Stok:** {item.value} {item.category}
                          </Typography>
                          {item.seen && (
                             <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                               Terakhir terlihat: {new Date(item.seen).toLocaleTimeString('id-ID')}
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
