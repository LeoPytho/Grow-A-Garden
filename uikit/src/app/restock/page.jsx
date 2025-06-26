'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { alpha } from '@mui/material/styles';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import SectionHero from '@/components/SectionHero';
import SvgIcon from '@/components/SvgIcon'; // Assuming SvgIcon is a component for Tabler icons

// Define a mapping for item names to display names and icons
const ITEM_CONFIG = {
  egg: { displayName: 'Egg', icon: 'tabler-egg' },
  gear: { displayName: 'Gear', icon: 'tabler-tools' },
  seeds: { displayName: 'Seeds', icon: 'tabler-plant-seed' },
  cosmetic: { displayName: 'Cosmetics', icon: 'tabler-hat' },
  SwarmEvent: { displayName: 'Swarm Event', icon: 'tabler-butterfly' },
  // Add more items here as needed with their respective icons
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

    // Set up an interval to refresh data or countdowns if needed
    // For countdown accuracy, it's often better to update on a shorter interval
    // or rely on server-side logic if countdowns are pre-calculated.
    // For simplicity, this example just fetches once on mount.
    // const interval = setInterval(fetchRestockData, 60000); // Refresh every minute
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
              Loading restock data...
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
              Error loading restock data: {error}
            </Typography>
            <Button variant="contained" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </Stack>
        </ContainerWrapper>
      </>
    );
  }

  // Check if restockData is null or empty after loading
  if (!restockData || Object.keys(restockData).length === 0) {
    return (
      <>
        <SectionHero heading="Restock Timers" search={false} offer />
        <ContainerWrapper>
          <Stack sx={{ py: 6, alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
            <Typography variant="h6" color="text.secondary">
              No restock information available.
            </Typography>
          </Stack>
        </ContainerWrapper>
      </>
    );
  }

  return (
    <>
      <SectionHero heading="Restock Timers" search={false} offer />
      <ContainerWrapper>
        <Grid container spacing={3} sx={{ py: 6 }}>
          {Object.entries(restockData).map(([key, item]) => {
            const config = ITEM_CONFIG[key] || { displayName: key, icon: 'tabler-question-mark' }; // Default if not found

            return (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 3,
                    borderRadius: 3,
                    boxShadow: theme.shadows[3],
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: theme.shadows[6],
                    },
                    bgcolor: alpha(theme.palette.background.paper, 0.9), // Slightly transparent background
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', width: '100%' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        boxShadow: `0px 0px 15px ${alpha(theme.palette.primary.main, 0.3)}`,
                      }}
                    >
                      <SvgIcon name={config.icon} color="primary.main" size={48} />
                    </Box>
                    <Typography variant="h5" component="div" sx={{ mb: 1, color: 'primary.dark' }}>
                      {config.displayName}
                    </Typography>

                    <Stack spacing={1} sx={{ mt: 2 }}>
                      <Box sx={{
                          p: 1,
                          borderRadius: 1,
                          bgcolor: alpha(theme.palette.info.main, 0.08),
                          border: `1px dashed ${alpha(theme.palette.info.main, 0.3)}`
                      }}>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'info.dark' }}>
                              Next Restock: {item.countdown}
                          </Typography>
                      </Box>
                      <Box sx={{
                          p: 1,
                          borderRadius: 1,
                          bgcolor: alpha(theme.palette.text.secondary, 0.05),
                          border: `1px dashed ${alpha(theme.palette.text.secondary, 0.2)}`
                      }}>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              Last Restock: {item.LastRestock} ({item.timeSinceLastRestock})
                          </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </ContainerWrapper>
    </>
  );
}
