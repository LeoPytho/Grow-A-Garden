'use client';

// @project
import { Feature20 } from '@/blocks/feature';
import { Hero17 } from '@/blocks/hero';
import LazySection from '@/components/LazySection';
import useDataThemeMode from '@/hooks/useDataThemeMode';

// @data
import {
  // benefit, // Removed: Not typically relevant for a game landing page
  // clientele, // Removed: More for business services
  cta4,
  cta5,
  faq,
  feature20,
  feature21,
  feature18,
  hero,
  // integration, // Removed: Not typically relevant for a game landing page
  // other, // Removed: Vague, better to be specific with features
  // pricing, // Removed: Games usually have in-game purchases, not subscription pricing
  testimonial
} from './data';

/*************************** PAGE - MAIN  ***************************/

export default function Main() {
  useDataThemeMode();

  return (
    <>
      {/* Hero Section: Essential for a strong first impression of the game */}
      <Hero17 {...hero} />

      {/* Feature Section: Highlight key aspects of the game */}
      <Feature20 {...feature20} />

      {/*
        LazySection for Features and Call to Action:
        Keeps the page performant by loading these sections only when needed.
        We're focusing on more game features and a primary call to action here.
      */}
      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature18 })), props: feature18 },
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature21 })), props: feature21 }
        ]}
        offset="200px"
      />

      {/*
        LazySection for Testimonials and another Call to Action/FAQ:
        Testimonials can build trust, and FAQs are helpful for common player questions.
        The Cta5 block provides another opportunity for action (e.g., "Play Now").
      */}
      <LazySection
        sections={[
          // Testimonials can be useful if you have positive player feedback
          { importFunc: () => import('@/blocks/faq').then((module) => ({ default: module.Faq6 })), props: faq }
        ]}
        offset="200px"
      />

      {/*
        Removed LazySections:
        The following sections were deemed less critical for a Roblox game landing page:
        <LazySection
          sections={[
            { importFunc: () => import('@/blocks/benefit').then((module) => ({ default: module.Benefit5 })), props: benefit },
            { importFunc: () => import('@/blocks/integration').then((module) => ({ default: module.Integration2 })), props: integration },
            { importFunc: () => import('@/blocks/other').then((module) => ({ default: module.Other1 })), props: other }
          ]}
          offset="200px"
        />

        <LazySection
          sections={[
            { importFunc: () => import('@/blocks/clientele').then((module) => ({ default: module.Clientele3 })), props: clientele },
            { importFunc: () => import('@/blocks/pricing').then((module) => ({ default: module.Pricing9 })), props: pricing }
          ]}
          offset="200px"
        />
      */}
    </>
  );
}
