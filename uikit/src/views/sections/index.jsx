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

var SectionCategory;

(function (SectionCategory) {
  SectionCategory['GEAR'] = 'gear';
  SectionCategory['SEEDS'] = 'seeds';
  SectionCategory['EGGS'] = 'eggs';
  SectionCategory['HONEY'] = 'honey';
  SectionCategory['COSMETICS'] = 'cosmetics';
  SectionCategory['NIGHT'] = 'night';
})(SectionCategory || (SectionCategory = {}));

const filterList = [
  { title: 'All Items', value: '' },
  { title: 'Gear Stock', value: SectionCategory.GEAR },
  { title: 'Seeds Stock', value: SectionCategory.SEEDS },
  { title: 'Eggs Stock', value: SectionCategory.EGGS },
  { title: 'Honey Stock', value: SectionCategory.HONEY },
  { title: 'Cosmetics Stock', value: SectionCategory.COSMETICS },
  { title: 'Night Stock', value: SectionCategory.NIGHT }
];

// Emoji mapping for items
const emojiMap = {
  // Fruits/Plants
  'carrot': '🥕',
  'strawberry': '🍓',
  'blueberry': '🫐',
  'orange tulip': '🧡🌷',
  'tomato': '🍅',
  'corn': '🌽',
  'daffodil': '🌼',
  'watermelon': '🍉',
  'pumpkin': '🎃',
  'apple': '🍎',
  'bamboo': '🎍',
  'coconut': '🥥',
  'cactus': '🌵',
  'dragon fruit': '🐉🍇',
  'mango': '🥭',
  'grape': '🍇',
  'mushroom': '🍄',
  'pepper': '🌶️',
  'cacao': '🍫',
  'lemon': '🍋',
  'pineapple': '🍍',
  'peach': '🍑',
  'pear': '🍐',
  'papaya': '🥭',
  'banana': '🍌',
  'passion fruit': '💜🍈',
  'soul fruit': '👻🍇',
  'cursed fruit': '💀🍇',
  'chocolate carrot': '🍫🥕',
  'red lollipop': '🍭',
  'candy sunflower': '🌻🍬',
  'easter egg': '🥚',
  'candy blossom': '🌸🍬',
  'raspberry': '🍓',
  'cranberry': '🍒',
  'durian': '🍈',
  'eggplant': '🍆',
  'venus fly trap': '🌿',
  'lotus': '🌸',
  'glowshroom': '✨🍄',
  'mint': '🍃',
  'moonflower': '🌙🌸',
  'starfruit': '⭐🍇',
  'moonglow': '🌕✨',
  'moon blossom': '🌙🌸',
  'cherry blossom': '🌸🍒',
  'moon melon': '🌙🍉',
  'beanstalk': '🌱',
  'blood banana': '🩸🍌',
  'moon mango': '🌙🥭',
  'celestiberry': '🌌🍓',

  // Gears
  'watering can': '💧🥫',
  'trowel': '🥄',
  'basic sprinkler': '🚿',
  'advanced sprinkler': '🚀🚿',
  'godly sprinkler': '🙏🚿',
  'lightning rod': '⚡️🎣',
  'master sprinkler': '👑🚿',
  'chocolate sprinkler': '🍫🚿',
  'recall wrench': '🔧↩️',
  'favorite tool': '❤️‍🩹🛠️',
  'harvest tool': '🌾🛠️',
  'star caller': '⭐📞',
  'classic trowel': '🥄',

  // Pets
  'golden lab': '🐕🟨',
  'dog': '🐶',
  'bunny': '🐰',
  'black bunny': '🐰🖤',
  'chicken': '🐔',
  'cat': '🐱',
  'deer': '🦌',
  'orange tabby': '🐈🟧',
  'spotted deer': '🦌',
  'pig': '🐷',
  'rooster': '🐓',
  'monkey': '🐒',
  'cow': '🐄',
  'silver monkey': '🐒🥈',
  'sea otter': '🦦🌊',
  'turtle': '🐢',
  'polar bear': '🐻‍❄️',
  'snail': '🐌',
  'giant ant': '🐜',
  'caterpillar': '🐛',
  'praying mantis': '🙏🦗',
  'dragonfly': '🦋',
  'panda': '🐼',
  'hedgehog': '🦔',
  'mole': '🦔',
  'frog': '🐸',
  'echo frog': '🔊🐸',
  'night owl': '🦉🌙',
  'raccoon': '🦝',
  'kiwi': '🥝',
  'owl': '🦉',
  'chicken zombie': '🧟🐔',
  'blood owl': '🩸🦉',
  'blood hedgehog': '🩸🦔',
  'blood kiwi': '🩸🥝',
  'grey mouse': '🐭',
  'brown mouse': '🐭🟫',
  'moon cat': '🌙🐱',
  'squirrel': '🐿️',
  'red giant ant': '🐜🔴',
  'red fox': '🦊',

  // Eggs
  'common egg': '🥚',
  'uncommon egg': '🥚',
  'rare egg': '🥚',
  'legendary egg': '🥚',
  'mythical egg': '🥚',
  'bug egg': '🥚🐛',
  'night egg': '🥚🌙',

  // Seed Packs
  'night seed pack': '🌙🌱📦',
  'seed pack': '🌱📦',
  'seeds': '🌱',

  // Cosmetics
  'twilight crate': '🌌📦',
  'frog fountain': '🐸⛲',
  'wheelbarrow': '🛒',
  'small wood table': '🪵',
  'beta gnome': '🤖🧚‍♂️',
  'green female gnome': '👩‍🌾🟢',
  'blue gnome': '🧚‍♂️🔵',
  'axe stump': '🪓🪵',
  'bamboo wind chimes': '🎍🎐',
  'bird bath': '🐦🛁',
  'blue well': '💙🕳️',
  'brown stone pillar': '🪨🟫',
  'brown bench': '🪵🪑',
  'brick stack': '🧱',
  'bookshelf': '📚',
  'brown well': '🟫🕳️',
  'classic gnome crate': '📦🧚‍♂️',
  'campfire': '🔥',
  'clothesline': '👚👕',
  'common gnome crate': '📦🧚‍♂️',
  'compost bin': '♻️🗑️',
  'cooking pot': '🍲',
  'dark stone pillar': '🪨🌑',
  'curved canopy': '🏕️',
  'farmers gnome crate': '🧑‍🌾📦',
  'flat canopy': '⛺',
  'fun crate': '🎉📦',
  'red tractor': '🚜🔴',
  'green tractor': '🚜🟢',
  'grey stone pillar': '🪨🌫️',
  'hay bale': '🌾📦',
  'lamp post': '💡',
  'large path tile': '🛤️',
  'large stone pad': '🪨',
  'large wood arbour': '🪵🌳',
  'large wood flooring': '🪵',
  'large wood table': '🪵',
  'log': '🪵',
  'log bench': '🪵🪑',
  'sign crate': '🪧📦',
  'bloodmoon crate': '🩸🌕📦',
  'red well': '❤️🕳️',
  'medium circle tile': '🟠',
  'torch': '🔦',
  'small circle tile': '⚪',
  'wood fence': '🪵🚧',
  'small path tile': '🛤️',
  'small wood flooring': '🪵',
  'mini tv': '📺',
  'rock pile': '🪨',
  'light on ground': '💡⬇️',
  'rake': '🍂',
  'orange umbrella': '☂️🍊',
  'medium wood flooring': '🪵',
  'water trough': '💧',
  'shovel grave': '🪦',
  'white pottery': '🏺⚪',
  'white bench': '🪑⚪',
  'small stone pad': '🪨',
  'small stone table': '🪨',
  'small wood arbour': '🪵🌳',
  'viney beam': '🌿🪵',
  'viney ring walkway': '🌿⭕🛤️',
  'square metal arbour': '🔲🌳',
  'small stone lantern': '🪨🏮',
  'hay bail': '🌾📦',
  'long stone table': '🪨',
  'medium stone table': '🪨',
  'metal wind chime': '🎶🎐',
  'mysterious crate': '❓📦',
  'red pottery': '🏺🔴',
  'ring walkway': '⭕🛤️',
  'wood pile': '🪵🪵',
  'yellow umbrella': '☂️🟡'
};

// Default fallback emojis for each category
const defaultEmojis = {
  [SectionCategory.GEAR]: '⚙️',
  [SectionCategory.SEEDS]: '🌱',
  [SectionCategory.EGGS]: '🥚',
  [SectionCategory.HONEY]: '🍯',
  [SectionCategory.COSMETICS]: '💅',
  [SectionCategory.NIGHT]: '🌙'
};

// Function to get emoji for an item
const getEmojiForItem = (itemName, category) => {
  const normalizedName = itemName.toLowerCase().trim();
  return emojiMap[normalizedName] || defaultEmojis[category] || '📦';
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

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/growagarden/stock');

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        // Transform API data to match the expected structure
        const transformedSections = [];

        // Transform each stock category
        if (data.gearStock) {
          data.gearStock.forEach((item, index) => {
            transformedSections.push({
              title: item.name,
              subTitle: `${item.value} in stock`,
              emoji: getEmojiForItem(item.name, SectionCategory.GEAR),
              link: `#gear-${index}`,
              category: SectionCategory.GEAR
            });
          });
        }

        if (data.seedsStock) {
          data.seedsStock.forEach((item, index) => {
            transformedSections.push({
              title: item.name,
              subTitle: `${item.value} in stock`,
              emoji: getEmojiForItem(item.name, SectionCategory.SEEDS),
              link: `#seeds-${index}`,
              category: SectionCategory.SEEDS
            });
          });
        }

        if (data.eggStock) {
          data.eggStock.forEach((item, index) => {
            transformedSections.push({
              title: item.name,
              subTitle: `${item.value} in stock`,
              emoji: getEmojiForItem(item.name, SectionCategory.EGGS),
              link: `#eggs-${index}`,
              category: SectionCategory.EGGS
            });
          });
        }

        if (data.honeyStock) {
          data.honeyStock.forEach((item, index) => {
            transformedSections.push({
              title: item.name,
              subTitle: `${item.value} in stock`,
              emoji: getEmojiForItem(item.name, SectionCategory.HONEY),
              link: `#honey-${index}`,
              category: SectionCategory.HONEY
            });
          });
        }

        if (data.cosmeticsStock) {
          data.cosmeticsStock.forEach((item, index) => {
            transformedSections.push({
              title: item.name,
              subTitle: `${item.value} in stock`,
              emoji: getEmojiForItem(item.name, SectionCategory.COSMETICS),
              link: `#cosmetics-${index}`,
              category: SectionCategory.COSMETICS
            });
          });
        }

        if (data.nightStock) {
          data.nightStock.forEach((item, index) => {
            transformedSections.push({
              title: item.name,
              subTitle: `${item.value} in stock`,
              emoji: getEmojiForItem(item.name, SectionCategory.NIGHT),
              link: `#night-${index}`,
              category: SectionCategory.NIGHT
            });
          });
        }

        setSections(transformedSections);
        setFilterSections(transformedSections);
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
    const newData = sections.filter((value) => {
      if (searchValue) {
        return value.title.toLowerCase().includes(searchValue.toLowerCase());
      } else {
        return value;
      }
    });
    setFilterSections(newData);
  }, [searchValue, sections]);

  const isFocusWithin = useFocusWithin();

  if (loading) {
    return (
      <>
        <SectionHero heading="Craft Stunning Design with SaasAble Blocks" search={false} offer />
        <ContainerWrapper>
          <Stack sx={{ py: 6, alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Loading stock data...
            </Typography>
          </Stack>
        </ContainerWrapper>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SectionHero heading="Craft Stunning Design with SaasAble Blocks" search={false} offer />
        <ContainerWrapper>
          <Stack sx={{ py: 6, alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
            <Typography variant="h6" color="error" sx={{ mb: 2 }}>
              Error loading data: {error}
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
      <SectionHero heading="Grow A Garden Stock Items" search={false} offer />
      <ContainerWrapper>
        <Stack sx={{ py: 6, gap: { xs: 3, sm: 4, md: 5 } }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            sx={{ alignItems: 'center', justifyContent: 'space-between', gap: { xs: 2.5, md: 1.5 } }}
          >
            <OutlinedInput
              placeholder="Search for items... (e.g., Carrot, Trowel, Common Egg)"
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
                  onClick={() => {
                    setFilterBy(item.value);
                    setFilterSections(
                      item.value === '' ? sections : sections.filter((section) => section.category === item.value)
                    );
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </Stack>
          </Stack>

          {filterSections.length === 0 ? (
            <Stack sx={{ alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
              <Typography variant="h6" color="text.secondary">
                {searchValue ? `No items found for "${searchValue}"` : 'No items available'}
              </Typography>
            </Stack>
          ) : (
            <Grid container spacing={1.5}>
              {filterSections.map((item, index) => (
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
                        <Box sx={{ position: 'absolute', top: 0, width: 1, height: 1, textAlign: 'center' }}>
                          {/* Emoji display instead of CardMedia */}
                          <Box
                            sx={{
                              px: '14.5%',
                              pt: '16%',
                              pb: { xs: 2, md: 1 },
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: '60%'
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                                lineHeight: 1,
                                userSelect: 'none'
                              }}
                            >
                              {item.emoji}
                            </Typography>
                          </Box>
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
              ))}
            </Grid>
          )}
        </Stack>
      </ContainerWrapper>
    </>
  );
}
