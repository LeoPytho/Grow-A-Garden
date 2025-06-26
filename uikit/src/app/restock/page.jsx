'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Typography,
  useTheme,
  Button // Added Button for retry
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { motion } from 'framer-motion'; // Import motion for animations

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import SectionHero from '@/components/SectionHero';
import SvgIcon from '@/components/SvgIcon';

// Define a mapping for item names to display names and icons
const ITEM_CONFIG = {
  egg: { displayName: 'Shiny Eggs', icon: 'tabler-egg', description: 'Catch them before they hatch!' },
  gear: { displayName: 'Gardener\'s Gear', icon: 'tabler-tools', description: 'Essential tools for every green thumb.' },
  seeds: { displayName: 'Rare Seeds', icon: 'tabler-plant-seed', description: 'Plant the future, grow something amazing.' },
  cosmetic: { displayName: 'Exclusive Cosmetics', icon: 'tabler-hat', description: 'Stand out in your garden with unique styles.' },
  SwarmEvent: { displayName: 'Mysterious Swarm', icon: 'tabler-butterfly', description: 'A rare and bountiful event appears!' },
  // Add more items here as needed with their respective icons and descriptions
};

// Animation variants for Framer Motion
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
      duration: 0.5
    }
  },
  hover: {
    scale: 1.03,
    y: -5,
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)',
    transition: { type: 'spring', stiffness: 300, damping: 10 }
  }
};

export default function RestockTime() {
  const theme = useTheme();
  const [restockData, setRestockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestockData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/growagarden/restock');
        if (!response.ok) {
          throw new Error('Failed to fetch restock data');
        }
        const data = await response.json();
        setRestockData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestockData();

    // Optionally, refresh data periodically for countdown accuracy
    // const interval = setInterval(fetchRestockData, 60000); // Every minute
    // return () => clearInterval(interval);

  }, []);

  if (loading) {
    return (
      <>
        <SectionHero heading="Restock Timers" search={false} offer />
        <ContainerWrapper>
          <Stack sx={{ py: 6, alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Memuat jadwal restock... Bersiaplah untuk panen baru!
            </Typography>
          </Stack>
        </ContainerWrapper>
        </>
    );
  }

  if (error) {
    return (
      <>
        <SectionHero heading="Restock Timers" search={false} offer />
        <ContainerWrapper>
          <Stack sx={{ py: 6, alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
            <Typography variant="h6" color="error" sx={{ mb: 2 }}>
              Terjadi kesalahan saat memuat data restock: {error}
            </Typography>
            <Button variant="contained" onClick={() => window.location.reload()}>
              Coba Lagi
            </Button>
          </Stack>
        </ContainerWrapper>
        {/* Footer will be rendered here after content */}
        <Footer />
      </>
    );
  }

  if (!restockData || Object.keys(restockData).length === 0) {
    return (
      <>
        <SectionHero heading="Restock Timers" search={false} offer />
        <ContainerWrapper>
          <Stack sx={{ py: 6, alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
            <Typography variant="h6" color="text.secondary">
              Tidak ada informasi restock yang tersedia saat ini. Periksa kembali nanti!
            </Typography>
          </Stack>
        </ContainerWrapper>
        {/* Footer will be rendered here after content */}
        <Footer />
      </>
    );
  }

  return (
    <>
      <SectionHero heading="Restock Timers" search={false} offer />
      <ContainerWrapper>
        <Stack sx={{ py: 6, gap: { xs: 3, sm: 4, md: 5 } }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" sx={{ color: 'text.primary', mb: 1 }}>
              Jangan lewatkan! Temukan jadwal restock terbaru untuk item-item penting di Grow A Garden.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Rencanakan strategimu dan siap sedia untuk mendapatkan item incaranmu begitu mereka tersedia!
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {Object.entries(restockData).map(([key, item], index) => {
              const config = ITEM_CONFIG[key] || {
                displayName: key.charAt(0).toUpperCase() + key.slice(1),
                icon: 'tabler-question-mark',
                description: 'Informasi restock untuk item ini.'
              };

              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={key}> {/* Adjusted Grid sizes */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardVariants}
                    custom={index}
                  >
                    <Card
                      sx={{
                        height: '100%', // Ensure cards take full height of grid item
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 3,
                        borderRadius: 4,
                        overflow: 'hidden',
                        position: 'relative',
                        bgcolor: alpha(theme.palette.background.paper, 0.9),
                        backdropFilter: 'blur(5px)',
                        border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
                        boxShadow: theme.shadows[6],
                        transition: 'all 0.3s ease-in-out', // Added transition for smooth hover
                        '&:hover': {
                            boxShadow: theme.shadows[10],
                        }
                      }}
                    >
                        {/* Abstract background elements for modern look */}
                        <Box sx={{
                            position: 'absolute',
                            top: -50,
                            left: -50,
                            width: 150,
                            height: 150,
                            borderRadius: '50%',
                            bgcolor: alpha(theme.palette.primary.light, 0.05),
                            zIndex: 0,
                            filter: 'blur(30px)'
                        }} />
                        <Box sx={{
                            position: 'absolute',
                            bottom: -30,
                            right: -30,
                            width: 100,
                            height: 100,
                            borderRadius: '50%',
                            bgcolor: alpha(theme.palette.secondary.light, 0.05),
                            zIndex: 0,
                            filter: 'blur(20px)'
                        }} />

                      <CardContent sx={{ textAlign: 'center', width: '100%', zIndex: 1, flexGrow: 1 }}> {/* flexGrow to make content fill space */}
                        <Box
                          sx={{
                            width: 100,
                            height: 100,
                            borderRadius: '50%',
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2.5,
                            boxShadow: `0px 0px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                              bgcolor: alpha(theme.palette.primary.main, 0.2),
                              transform: 'rotate(5deg) scale(1.05)'
                            }
                          }}
                        >
                          <SvgIcon name={config.icon} color="primary.main" size={56} />
                        </Box>
                        <Typography variant="h5" component="div" sx={{ mb: 0.5, color: 'primary.dark', fontWeight: 'bold' }}>
                          {config.displayName}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                          {config.description}
                        </Typography>

                        <Stack spacing={1.5} sx={{ mt: 'auto' }}> {/* Push to bottom with mt: 'auto' */}
                          <Box sx={{
                              p: 1.5,
                              borderRadius: 2,
                              bgcolor: alpha(theme.palette.info.main, 0.1),
                              border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 1
                          }}>
                              <SvgIcon name="tabler-hourglass-high" color="info.main" size={20} />
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'info.dark' }}>
                                  Berikutnya: {item.countdown}
                              </Typography>
                          </Box>
                          <Box sx={{
                              p: 1.5,
                              borderRadius: 2,
                              bgcolor: alpha(theme.palette.text.secondary, 0.05),
                              border: `1px solid ${alpha(theme.palette.text.secondary, 0.15)}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 1
                          }}>
                            <SvgIcon name="tabler-history" color="text.secondary" size={20} />
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Terakhir: {item.LastRestock} ({item.timeSinceLastRestock})
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      </ContainerWrapper>
      <Footer /> {/* Render the Footer component here */}
    </>
  );
}
