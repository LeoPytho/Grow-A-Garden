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
// import Chip from '@mui/material/Chip'; // Removed Chip import

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

// Status color mapping (kept for potential future use or other components)
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
    return `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)} 0%, ${alpha(theme.palette.success.main, 0.3)} 100%)`;
  }
  if (isRecent) {
    return `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.1)} 0%, ${alpha(theme.palette.warning.main, 0.3)} 100%)`;
  }
  return `linear-gradient(135deg, ${alpha(theme.palette.grey[300], 0.1)} 0%, ${alpha(theme.palette.grey[400], 0.2)} 100%)`;
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
  // weatherStats state is still here, but no longer displayed
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
          {/* Removed Weather Stats Section */}
          {/* <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            sx={{ 
              gap: 2, 
              justifyContent: 'center',
              alignItems: 'center',
              p: 3,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary.main">{weatherStats.totalEvents}</Typography>
              <Typography variant="body2" color="text.secondary">Total Events</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main">{weatherStats.activeEvents}</Typography>
              <Typography variant="body2" color="text.secondary">Active Now</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main">{weatherStats.recentEvents}</Typography>
              <Typography variant="body2" color="text.secondary">Recent Events</Typography>
            </Box>
            {weatherStats.lastUpdate && (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body1" color="text.primary">Last Update</Typography>
                <Typography variant="body2" color="text.secondary">{new Date(weatherStats.lastUpdate).toLocaleString()}</Typography>
              </Box>
            )}
          </Stack> 
          */}

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            sx={{ alignItems: 'center', justifyContent: 'space-between', gap: { xs: 2.5, md: 1.5 } }}
          >
            <OutlinedInput
              placeholder="Search weather events... (e.g., Rain, Thunderstorm, Night)"
              slotProps={{ input: { 'aria-label': 'Search weather events' } }}
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
            <Stack sx={{ alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
              <Typography variant="h6" color="text.secondary">
                {searchValue ? `No weather events found for "${searchValue}"` : 'No weather events available'}
              </Typography>
            </Stack>
          ) : (
            <Grid container spacing={1.5}>
              {filterEvents.map((event, index) => (
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
                          height: { xs: 280, sm: 350, md: 400 },
                          position: 'relative',
                          overflow: 'hidden',
                          background: getBackgroundGradient(event.isActive, event.isRecent, theme),
                          border: event.isActive ? `2px solid ${theme.palette.success.main}` : 
                                  event.isRecent ? `2px solid ${theme.palette.warning.main}` : 'none',
                          ...(isFocusWithin && { '&:focus-within': generateFocusVisibleStyles(theme.palette.primary.main) })
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
                            borderRadius: { xs: 6, sm: 8, md: 10 },
                            zIndex: 1
                          }}
                        />
                        <Background />
                        
                        {/* Removed Status Chip */}
                        {/* <Chip
                          label={getStatusText(event.isActive, event.isRecent)}
                          color={getStatusColor(event.isActive, event.isRecent)}
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            zIndex: 2,
                            fontWeight: 'bold'
                          }}
                        />
                        */}

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
                                fontSize: { xs: '4rem', sm: '5rem', md: '6rem' },
                                filter: event.isActive ? 'drop-shadow(0 0 20px rgba(76, 175, 80, 0.5))' :
                                        event.isRecent ? 'drop-shadow(0 0 15px rgba(255, 152, 0, 0.4))' : 'none',
                                transform: event.isActive ? 'scale(1.1)' : 'scale(1)',
                                transition: 'all 0.3s ease'
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
                            background: `linear-gradient(180deg, ${alpha(theme.palette.grey[100], 0)} 0%, ${theme.palette.grey[100]} 100%)`
                          }}
                        >
                          <Typography variant="h4" sx={{ color: 'primary.main', mb: 0.5 }}>
                            {event.title}
                          </Typography>
                          
                          {event.timeRemaining && (
                            <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                              ⏱️ {formatTime(event.timeRemaining)} remaining
                            </Typography>
                          )}
                          
                          {event.timeSinceUpdate && !event.timeRemaining && (
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              🕐 {formatTime(event.timeSinceUpdate)} ago
                            </Typography>
                          )}
                          
                          {event.lastSeen && (
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              Last seen: {new Date(event.lastSeen).toLocaleDateString()}
                            </Typography>
                          )}
                          
                          {/* Display status if no time information is available */}
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
