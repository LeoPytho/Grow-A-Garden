'use client';
import PropTypes from 'prop-types';

// @next
import dynamic from 'next/dynamic';
import { Footer7 } from '@/blocks/footer';

// @project
import useDataThemeMode from '@/hooks/useDataThemeMode';

const ScrollFab = dynamic(() => import('@/components/ScrollFab'));
const SectionsLayout = dynamic(() => import('@/views/sections/layout'));
/***************************  LAYOUT - SECTIONS  ***************************/

export default function Sections({ children }) {
  useDataThemeMode();

  return (
    <SectionsLayout>
       <>
        {children}

        {/* scroll to top section */}
        <ScrollFab />
         <Footer7 />
       </>
     </SectionsLayout>
  );
}

Sections.propTypes = { children: PropTypes.any };
