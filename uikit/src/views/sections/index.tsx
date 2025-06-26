'use client';
import { useEffect, useState } from 'react';

// @next
import NextLink from 'next/link';

// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
//import CardMedia from '@mui/material/CardMedia';
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
//import { PAGE_PATH } from '@/path';
import { generateFocusVisibleStyles } from '@/utils/CommonFocusStyle';
// import GetImagePath from '@/utils/GetImagePath'; // Not needed anymore for this approach

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

// Default fallback images for each category using data URLs (always work)
const defaultImages = {
  [SectionCategory.GEAR]: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNENBRjUwIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+R0VBUjwvdGV4dD4KPC9zdmc+',
  [SectionCategory.SEEDS]: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjOEJDMzRBIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U0VFRFM8L3RleHQ+CjwvZz4KPC9zdmc+',
  [SectionCategory.EGGS]: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkZDMTA3Ii8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RUdHUzwvdGV4dD4KPC9zdmc+',
  [SectionCategory.HONEY]: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkY5ODAwIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SE9ORVk8L3RleHQ+CjwvZz4KPC9zdmc+',
  [SectionCategory.COSMETICS]: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRTkxRTYzIi8+Cjx0ZXh0IHg9IjUwIiB5PSI0NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q09TTUV0SUNTPC90ZXh0Pgo8L2c+PC9zdmc+',
  [SectionCategory.NIGHT]: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjM0Y1MUI1Ii8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TklHSFQ8L3RleHQ+CjwvZz4KPC9zdmc+'
};

// Mapping of item names to their corresponding image file names
const itemImageMap = {
  // Seeds & Fruits
  'carrot': 'Carrot.png',
  'strawberry': 'Strawberry.png',
  'blueberry': 'Blueberry.png',
  'orange tulip': 'Orange-Tulip.png',
  'tomato': 'Tomato.png',
  'corn': 'Corn.png',
  'daffodil': 'Daffodil.png',
  'watermelon': 'Watermelon.png',
  'pumpkin': 'Pumpkin.png',
  'apple': 'Apple.png',
  'bamboo': 'Bamboo.png',
  'coconut': 'Coconut.png',
  'cactus': 'Cactus.png',
  'dragon fruit': 'Dragon-Fruit.png',
  'mango': 'Mango.png',
  'grape': 'Grape.png',
  'mushroom': 'Mushroom.png',
  'pepper': 'Pepper.png',
  'cacao': 'Cacao.png',
  'lemon': 'Lemon.png',
  'pineapple': 'Pineapple.png',
  'peach': 'Peach.png',
  'pear': 'Pear.png',
  'papaya': 'Papaya.png',
  'banana': 'Banana.png',
  'passion fruit': 'Passion-Fruit.png',
  'soul fruit': 'Soul-Fruit.png',
  'cursed fruit': 'Cursed-Fruit.png',
  'chocolate carrot': 'Chocolate-Carrot.png',
  'red lollipop': 'Red-Lollipop.png',
  'candy sunflower': 'Candy-Sunflower.png',
  'easter egg': 'Easter-Egg.png',
  'candy blossom': 'Candy-Blossom.png',
  'raspberry': 'Raspberry.png',
  'cranberry': 'Cranberry.png',
  'durian': 'Durian.png',
  'eggplant': 'Eggplant.png',
  'venus fly trap': 'Venus-Fly-Trap.png',
  'lotus': 'Lotus.png',
  'glowshroom': 'Glowshroom.png',
  'mint': 'Mint.png',
  'moonflower': 'Moonflower.png',
  'starfruit': 'Starfruit.png',
  'moonglow': 'Moonglow.png',
  'moon blossom': 'Moon-Blossom.png',
  'cherry blossom': 'Cherry-Blossom.png',
  'moon melon': 'Moon-Melon.png',
  'beanstalk': 'Beanstalk.png',
  'blood banana': 'Blood-Banana.png',
  'moon mango': 'Moon-Mango.png',
  'celestiberry': 'Celestiberry.png',

  // Gears
  'watering can': 'Watering-Can.png',
  'trowel': 'Trowel.png',
  'basic sprinkler': 'Basic-Sprinkler.png',
  'advanced sprinkler': 'Advanced-Sprinkler.png',
  'godly sprinkler': 'Godly-Sprinkler.png',
  'lightning rod': 'Lightning-Rod.png',
  'master sprinkler': 'Master-Sprinkler.png',
  'chocolate sprinkler': 'Chocolate-Sprinkler.png',
  'recall wrench': 'Recall-Wrench.png',
  'favorite tool': 'Favorite-Tool.png',
  'harvest tool': 'Harvest-Tool.png',
  'star caller': 'Star-Caller.png',
  'classic trowel': 'Classic-Trowel.png',

  // Pets
  'golden lab': 'Golden-Lab.png',
  'dog': 'Dog.png',
  'bunny': 'Bunny.png',
  'black bunny': 'Black-Bunny.png',
  'chicken': 'Chicken.png',
  'cat': 'Cat.png',
  'deer': 'Deer.png',
  'orange tabby': 'Orange-Tabby.png',
  'spotted deer': 'Spotted-Deer.png',
  'pig': 'Pig.png',
  'rooster': 'Rooster.png',
  'monkey': 'Monkey.png',
  'cow': 'Cow.png',
  'silver monkey': 'Silver-Monkey.png',
  'sea otter': 'Sea-Otter.png',
  'turtle': 'Turtle.png',
  'polar bear': 'Polar-Bear.png',
  'snail': 'Snail.png',
  'giant ant': 'Giant-Ant.png',
  'caterpillar': 'Caterpillar.png',
  'praying mantis': 'Praying-Mantis.png',
  'dragonfly': 'Dragonfly.png',
  'panda': 'Panda.png',
  'hedgehog': 'Hedgehog.png',
  'mole': 'Mole.png',
  'frog': 'Frog.png',
  'echo frog': 'Echo-Frog.png',
  'night owl': 'Night-Owl.png',
  'raccoon': 'Raccoon.png',
  'kiwi': 'Kiwi.png',
  'owl': 'Owl.png',
  'chicken zombie': 'Chicken-Zombie.png',
  'blood owl': 'Blood-Owl.png',
  'blood hedgehog': 'Blood-Hedgehog.png',
  'blood kiwi': 'Blood-Kiwi.png',
  'grey mouse': 'Grey-Mouse.png',
  'brown mouse': 'Brown-Mouse.png',
  'moon cat': 'Moon-Cat.png',
  'squirrel': 'Squirrel.png',
  'red giant ant': 'Red-Giant-Ant.png',
  'red fox': 'Red-Fox.png',

  // Eggs
  'common egg': 'Common-Egg.png',
  'uncommon egg': 'Uncommon-Egg.png',
  'rare egg': 'Rare-Egg.png',
  'legendary egg': 'Legendary-Egg.png',
  'mythical egg': 'Mythical-Egg.png',
  'bug egg': 'Bug-Egg.png',
  'night egg': 'Night-Egg.png',

  // Seed Packs
  'night seed pack': 'Night-Seed-Pack.png',
  'seed pack': 'Seed-Pack.png', // Assuming a generic seed pack image
  'seeds': 'Seed-Pack.png', // Assuming a generic seeds image

  // Cosmetics
  'twilight crate': 'Twilight-Crate.png',
  'frog fountain': 'Frog-Fountain.png',
  'wheelbarrow': 'Wheelbarrow.png',
  'small wood table': 'Small-Wood-Table.png',
  'beta gnome': 'Beta-Gnome.png',
  'green female gnome': 'Green-Female-Gnome.png',
  'blue gnome': 'Blue-Gnome.png',
  'axe stump': 'Axe-Stump.png',
  'bamboo wind chimes': 'Bamboo-Wind-Chimes.png',
  'bird bath': 'Bird-Bath.png',
  'blue well': 'Blue-Well.png',
  'brown stone pillar': 'Brown-Stone-Pillar.png',
  'brown bench': 'Brown-Bench.png',
  'brick stack': 'Brick-Stack.png',
  'bookshelf': 'Bookshelf.png',
  'brown well': 'Brown-Well.png',
  'classic gnome crate': 'Classic-Gnome-Crate.png',
  'campfire': 'Campfire.png',
  'clothesline': 'Clothesline.png',
  'common gnome crate': 'Common-Gnome-Crate.png',
  'compost bin': 'Compost-Bin.png',
  'cooking pot': 'Cooking-Pot.png',
  'dark stone pillar': 'Dark-Stone-Pillar.png',
  'curved canopy': 'Curved-Canopy.png',
  'farmers gnome crate': 'Farmers-Gnome-Crate.png',
  'flat canopy': 'Flat-Canopy.png',
  'fun crate': 'Fun-Crate.png',
  'red tractor': 'Red-Tractor.png',
  'green tractor': 'Green-Tractor.png',
  'grey stone pillar': 'Grey-Stone-Pillar.png',
  'hay bale': 'Hay-Bale.png',
  'lamp post': 'Lamp-Post.png',
  'large path tile': 'Large-Path-Tile.png',
  'large stone pad': 'Large-Stone-Pad.png',
  'large wood arbour': 'Large-Wood-Arbour.png',
  'large wood flooring': 'Large-Wood-Flooring.png',
  'large wood table': 'Large-Wood-Table.png',
  'log': 'Log.png',
  'log bench': 'Log-Bench.png',
  'sign crate': 'Sign-Crate.png',
  'bloodmoon crate': 'Bloodmoon-Crate.png',
  'red well': 'Red-Well.png',
  'medium circle tile': 'Medium-Circle-Tile.png',
  'torch': 'Torch.png',
  'small circle tile': 'Small-Circle-Tile.png',
  'wood fence': 'Wood-Fence.png',
  'small path tile': 'Small-Path-Tile.png',
  'small wood flooring': 'Small-Wood-Flooring.png',
  'mini tv': 'Mini-TV.png',
  'rock pile': 'Rock-Pile.png',
  'light on ground': 'Light-On-Ground.png',
  'rake': 'Rake.png',
  'orange umbrella': 'Orange-Umbrella.png',
  'medium wood flooring': 'Medium-Wood-Flooring.png',
  'water trough': 'Water-Trough.png',
  'shovel grave': 'Shovel-Grave.png',
  'white pottery': 'White-Pottery.png',
  'white bench': 'White-Bench.png',
  'small stone pad': 'Small-Stone-Pad.png',
  'small stone table': 'Small-Stone-Table.png',
  'small wood arbour': 'Small-Wood-Arbour.png',
  'viney beam': 'Viney-Beam.png',
  'viney ring walkway': 'Viney-Ring-Walkway.png',
  'square metal arbour': 'Square-Metal-Arbour.png',
  'small stone lantern': 'Small-Stone-Lantern.png',
  'hay bail': 'Hay-Bale.png', // Corrected 'hay bale' to 'hay bail' if it's the actual name in data
  'long stone table': 'Long-Stone-Table.png',
  'medium stone table': 'Medium-Stone-Table.png',
  'metal wind chime': 'Metal-Wind-Chime.png',
  'mysterious crate': 'Mysterious-Crate.png',
  'red pottery': 'Red-Pottery.png',
  'ring walkway': 'Ring-Walkway.png',
  'wood pile': 'Wood-Pile.png',
  'yellow umbrella': 'Yellow-Umbrella.png'
};

/*************************** SECTIONS LAYOUT  ***************************/

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
              image: getImageSrc(item.name, SectionCategory.GEAR), // Pass item.name instead of item.image
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
              image: getImageSrc(item.name, SectionCategory.SEEDS), // Pass item.name
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
              image: getImageSrc(item.name, SectionCategory.EGGS), // Pass item.name
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
              image: getImageSrc(item.name, SectionCategory.HONEY), // Pass item.name
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
              image: getImageSrc(item.name, SectionCategory.COSMETICS), // Pass item.name
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
              image: getImageSrc(item.name, SectionCategory.NIGHT), // Pass item.name
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

  /**
   * Generates the image source based on the item name and category.
   * Prioritizes local images from the itemImageMap, falling back to default category images.
   * @param {string} itemName The name of the item from the API.
   * @param {SectionCategory} category The category of the item.
   * @returns {string} The image source URL.
   */
  const getImageSrc = (itemName, category) => {
    const normalizedItemName = itemName.toLowerCase();
    const imageFileName = itemImageMap[normalizedItemName];

    if (imageFileName) {
      return `/assets/images/gag/${imageFileName}`;
    }

    // Fallback to category-specific default image if no specific image is found
    return defaultImages[category];
  };

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
                          <Box
                            sx={{
                              px: '14.5%',
                              pt: '16%',
                              pb: { xs: 2, md: 1 },
                              maxHeight: '60%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain'
                              }}
                              loading="lazy"
                              onError={(e) => {
                                // Fallback to category-specific placeholder if image fails to load
                                const category = item.category;
                                e.target.src = defaultImages[category];
                              }}
                              onLoad={(e) => {
                                // Hide any loading indicator if you have one
                                e.target.style.opacity = '1';
                              }}
                            />
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
