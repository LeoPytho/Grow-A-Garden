'use client';
import { useEffect, useState } from 'react';

// @next
import NextLink from 'next/link';

// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper'; // Added Paper for elevation

// @third-party
import { motion } from 'framer-motion';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import { GraphicsCard } from '@/components/cards'; // Assuming GraphicsCard is a styled component
import SectionHero from '@/components/SectionHero';
import SvgIcon from '@/components/SvgIcon';

import useFocusWithin from '@/hooks/useFocusWithin';
import { generateFocusVisibleStyles } from '@/utils/CommonFocusStyle';

// @assets
import Background from '@/images/graphics/Background'; // Assuming these are SVG components
import Wave from '@/images/graphics/Wave';

var EventStatus;

(function (EventStatus) {
  EventStatus['ACTIVE'] = 'active';
  EventStatus['RECENT'] = 'recent';
  EventStatus['INACTIVE'] = 'inactive';
})(EventStatus || (EventStatus = {}));

const filterList = [
  { title: 'All Events', value: '' },
  { title: 'Active Events', value: EventStatus.ACTIVE },
  { title: 'Recent Events', value: EventStatus.RECENT },
  { title: 'Inactive Events', value: EventStatus.INACTIVE }
];

// Status color mapping
const getStatusColor = (isActive, isRecent) => {
  if (isActive) return 'success';
  if (isRecent) return 'warning';
  return 'default';
};

const getStatusText = (isActive, isRecent) => {
  if (isActive) return 'Active';
  if (isRecent) return 'Recent';
  return 'Inactive';
};

const getBackgroundGradient = (isActive, isRecent, theme) => {
  if (isActive) {
    // More vibrant active gradient
    return `linear-gradient(135deg, ${alpha(theme.palette.success.light, 0.2)} 0%, ${alpha(theme.palette.success.main, 0.4)} 100%)`;
  }
  if (isRecent) {
    // Slightly more defined recent gradient
    return `linear-gradient(135deg, ${alpha(theme.palette.warning.light, 0.2)} 0%, ${alpha(theme.palette.warning.main, 0.4)} 100%)`;
  }
  // Softer inactive gradient for a modern feel
  return `linear-gradient(135deg, ${alpha(theme.palette.grey[200], 0.3)} 0%, ${alpha(theme.palette.grey[300], 0.5)} 100%)`;
};

// Format time remaining or time since update
const formatTime = (timeString) => {
  if (!timeString) return null;
  
  // Parse the time string (assuming format like "2h 30m" or "45m")
  const hours = timeString.match(/(\d+)h/);
  const minutes = timeString.match(/(\d+)m/);
  
  let result = '';
  if (hours) result += `${hours[1]}h `;
  if (minutes) result += `${minutes[1]}m`;
  
  return result.trim() || timeString;
};

/*************************** WEATHER EVENTS LAYOUT  ***************************/

export default function WeatherEvents() {
  const theme = useTheme();
  const [filterBy, setFilterBy] = useState('');
  const [events, setEvents] = useState([]);
  const [filterEvents, setFilterEvents] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weatherStats, setWeatherStats] = useState({
    totalEvents: 0,
    activeEvents: 0,
    recentEvents: 0,
    lastUpdate: null
  });

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/growagarden/weather');

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();

        // Transform API data to match the expected structure
        const transformedEvents = data.events.map((event, index) => ({
          id: event.name,
          title: event.displayName,
          emoji: event.emoji,
          isActive: event.isActive,
          isRecent: event.isRecent,
          lastSeen: event.lastSeen,
          timeSinceUpdate: event.timeSinceUpdate,
          timeRemaining: event.timeRemaining,
          link: `#event-${event.name}`,
          status: event.isActive ? EventStatus.ACTIVE : (event.isRecent ? EventStatus.RECENT : EventStatus.INACTIVE)
        }));

        setEvents(transformedEvents);
        setFilterEvents(transformedEvents);
        setWeatherStats({
          totalEvents: data.totalEvents,
          activeEvents: data.activeEvents,
          recentEvents: data.recentEvents,
          lastUpdate: data.lastUpdate
        });
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
    const newData = events.filter((value) => {
      if (searchValue) {
        return value.title.toLowerCase().includes(searchValue.toLowerCase());
      } else {
        return value;
      }
    });
    setFilterEvents(newData);
  }, [searchValue, events]);

  const isFocusWithin = useFocusWithin();

  if (loading) {
    return (
      <>
        <SectionHero heading="Grow A Garden Weather Events" search={false} offer />
        <ContainerWrapper>
          <Stack sx={{ py: 6, alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Loading weather data...
            </Typography>
          </Stack>
        </ContainerWrapper>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SectionHero heading="Grow A Garden Weather Events" search={false} offer />
        <ContainerWrapper>
          <Stack sx={{ py: 6, alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
            <Typography variant="h6" color="error" sx={{ mb: 2 }}>
              Error loading weather data: {error}
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
      <SectionHero heading="Grow A Garden Weather Events" search={false} offer />
      <ContainerWrapper>
        <Stack sx={{ py: 6, gap: { xs: 3, sm: 4, md: 5 } }}>
          {/* Weather Stats - Enhanced with Paper and subtle shadows for modern look */}
          <Paper
            elevation={3} // Added elevation for depth
            sx={{ 
              p: 3,
              borderRadius: 3, // Increased border radius
              bgcolor: alpha(theme.palette.background.paper, 0.9), // Slightly translucent background
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`, // Subtle border
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' }, 
              gap: { xs: 2, sm: 4, md: 6 }, // Increased gap
              justifyContent: 'space-around', // Distribute items
              alignItems: 'center',
              boxShadow: theme.shadows[6] // More pronounced shadow
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="primary.main" sx={{ fontWeight: 700 }}>{weatherStats.totalEvents}</Typography> {/* Larger font size */}
              <Typography variant="body1" color="text.secondary">Total Events</Typography> {/* Changed to body1 */}
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="success.main" sx={{ fontWeight: 700 }}>{weatherStats.activeEvents}</Typography>
              <Typography variant="body1" color="text.secondary">Active Now</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="warning.main" sx={{ fontWeight: 700 }}>{weatherStats.recentEvents}</Typography>
              <Typography variant="body1" color="text.secondary">Recent Events</Typography>
            </Box>
            {weatherStats.lastUpdate && (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" color="text.primary">Last Update</Typography> {/* Changed to subtitle2 */}
                <Typography variant="body2" color="text.secondary">{new Date(weatherStats.lastUpdate).toLocaleString()}</Typography>
              </Box>
            )}
          </Paper>

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            sx={{ 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              gap: { xs: 2.5, md: 1.5 },
              width: 1 // Ensure stack takes full width
            }}
          >
            <OutlinedInput
              placeholder="Search weather events... (e.g., Rain, Thunderstorm, Night)"
              slotProps={{ input: { 'aria-label': 'Search weather events' } }}
              sx={{ 
                '.MuiOutlinedInput-input': { pl: 1.5 }, 
                width: { xs: 1, sm: 456 }, // Responsive width for search input
                borderRadius: theme.shape.borderRadius * 1.5, // More rounded corners
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main, // Primary color on focus
                  borderWidth: '2px', // Thicker border on focus
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: alpha(theme.palette.primary.main, 0.5), // Subtle hover border
                }
              }}
              startAdornment={<SvgIcon name="tabler-search" color="grey.600" />} 
              onChange={handleSearchValue}
              value={searchValue}
            />
            <Stack direction="row" sx={{ gap: 1.5, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-end' } }}> {/* Centered buttons on small screens */}
              {filterList.map((item, index) => (
                <Button
                  key={index}
                  variant={filterBy === item.value ? 'contained' : 'outlined'}
                  size="medium" // Slightly larger buttons
                  sx={{
                    ...theme.typography.subtitle2,
                    whiteSpace: 'nowrap',
                    px: 2, // Increased horizontal padding
                    py: 1, // Increased vertical padding
                    borderRadius: theme.shape.borderRadius * 1.5, // More rounded corners
                    transition: 'all 0.3s ease-in-out', // Smooth transition
                    '&:hover': {
                      backgroundColor: filterBy === item.value ? theme.palette.primary.dark : alpha(theme.palette.primary.main, 0.1),
                      borderColor: filterBy === item.value ? theme.palette.primary.dark : theme.palette.primary.main,
                      color: filterBy === item.value ? theme.palette.common.white : theme.palette.primary.main,
                    },
                    // Style for outlined buttons
                    ...(filterBy !== item.value && {
                      borderColor: theme.palette.divider,
                      color: theme.palette.text.secondary,
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                      },
                    }),
                  }}
                  onClick={() => {
                    setFilterBy(item.value);
                    setFilterEvents(
                      item.value === '' ? events : events.filter((event) => event.status === item.value)
                    );
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </Stack>
          </Stack>

          {filterEvents.length === 0 ? (
            <Stack sx={{ alignItems: 'center', justifyContent: 'center', minHeight: 200, py: 4 }}>
              <Typography variant="h5" color="text.secondary" sx={{ mb: 1 }}> {/* Larger empty state text */}
                {searchValue ? `No weather events found for "${searchValue}"` : 'No weather events available'}
              </Typography>
              {!searchValue && (
                <Typography variant="body1" color="text.disabled">
                  Check back later for updates!
                </Typography>
              )}
            </Stack>
          ) : (
            <Grid container spacing={2}> {/* Increased grid spacing */}
              {filterEvents.map((event, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}> {/* Changed size to item and added xs, sm, md */}
                  <GraphicsCard 
                    sx={{ 
                      overflow: 'hidden', 
                      WebkitTapHighlightColor: 'transparent',
                      borderRadius: 3, // More rounded corners for the card itself
                      boxShadow: theme.shadows[4], // Subtle shadow for cards
                      transition: 'box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        boxShadow: theme.shadows[10], // Lift on hover
                      }
                    }}
                  >
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
                          height: { xs: 280, sm: 350, md: 400 },
                          position: 'relative',
                          overflow: 'hidden',
                          background: getBackgroundGradient(event.isActive, event.isRecent, theme),
                          border: event.isActive ? `2px solid ${theme.palette.success.main}` : 
                                  event.isRecent ? `2px solid ${theme.palette.warning.main}` : 'none',
                          borderRadius: 'inherit', // Inherit border radius from parent GraphicsCard
                          // Removed focus-within from here as it's handled by the link overlay
                        }}
                      >
                        <Link
                          href={event.link}
                          component={NextLink}
                          aria-label={event.title}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            height: 1,
                            width: 1,
                            borderRadius: 'inherit', // Inherit border radius
                            zIndex: 1,
                            // Apply focus styles directly to the Link component
                            ...(isFocusWithin && generateFocusVisibleStyles(theme.palette.primary.main))
                          }}
                        />
                        <Background />
                        
                        {/* Status Chip - Enhanced styling */}
                        <Chip
                          label={getStatusText(event.isActive, event.isRecent)}
                          color={getStatusColor(event.isActive, event.isRecent)}
                          size="medium" // Slightly larger chip
                          sx={{
                            position: 'absolute',
                            top: 18, // Adjusted position
                            right: 18, // Adjusted position
                            zIndex: 2,
                            fontWeight: 'bold',
                            borderRadius: '8px', // More modern rounded corners for chip
                            boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.1)}` // Subtle shadow for chip
                          }}
                        />

                        <Box sx={{ position: 'absolute', top: 0, width: 1, height: 1, textAlign: 'center' }}>
                          <Box
                            sx={{
                              px: '14.5%',
                              pt: '20%',
                              pb: { xs: 2, md: 1 },
                              maxHeight: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Typography 
                              variant="h1" 
                              sx={{ 
                                fontSize: { xs: '4.5rem', sm: '5.5rem', md: '7rem' }, // Larger emojis
                                filter: event.isActive ? 'drop-shadow(0 0 25px rgba(76, 175, 80, 0.6))' : // Stronger shadow
                                        event.isRecent ? 'drop-shadow(0 0 20px rgba(255, 152, 0, 0.5))' : 'none',
                                transform: event.isActive ? 'scale(1.15) rotate(-5deg)' : 'scale(1)', // More dynamic active state
                                transition: 'all 0.4s ease-out', // Smoother transition
                                // Optional: Add subtle animation for all emojis
                                '&:hover': {
                                  transform: 'scale(1.05)',
                                }
                              }}
                            >
                              {event.emoji}
                            </Typography>
                          </Box>
                          <Box sx={{ '& div': { alignItems: 'center', pt: 0.875 } }}>
                            <Wave />
                          </Box>
                        </Box>
                        
                        <Stack
                          sx={{
                            height: 200,
                            bottom: 0,
                            width: 1,
                            position: 'absolute',
                            justifyContent: 'end',
                            textAlign: 'center',
                            gap: { xs: 0.5, md: 0.75, sm: 1 },
                            p: 3,
                            background: `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0)} 0%, ${theme.palette.background.paper} 100%)`, // Use background.paper for consistency
                            borderBottomLeftRadius: 'inherit', // Match parent card radius
                            borderBottomRightRadius: 'inherit', // Match parent card radius
                          }}
                        >
                          <Typography variant="h5" sx={{ color: 'text.primary', mb: 0.5, fontWeight: 600 }}> {/* Larger, bolder title */}
                            {event.title}
                          </Typography>
                          
                          {event.timeRemaining && (
                            <Typography variant="body1" sx={{ color: 'success.dark', fontWeight: 'bold' }}> {/* Darker success color for contrast */}
                              ⏱️ {formatTime(event.timeRemaining)} remaining
                            </Typography>
                          )}
                          
                          {event.timeSinceUpdate && !event.timeRemaining && (
                            <Typography variant="body2" sx={{ color: 'text.secondary', opacity: 0.8 }}> {/* Slightly less prominent */}
                              🕐 {formatTime(event.timeSinceUpdate)} ago
                            </Typography>
                          )}
                          
                          {event.lastSeen && (
                            <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.7 }}> {/* Softer text */}
                              Last seen: {new Date(event.lastSeen).toLocaleDateString()}
                            </Typography>
                          )}
                          
                          {!event.lastSeen && !event.timeSinceUpdate && !event.timeRemaining && (
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              📊 Status: {getStatusText(event.isActive, event.isRecent)}
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
