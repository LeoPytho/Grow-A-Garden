'use client';

// @mui
import CardMedia from '@mui/material/CardMedia';

// @project
// Assuming your logo file is named 'logo.png' or similar and is in the 'public' folder or a subfolder like 'public/images'.
// If your logo file is in './Logo/logo.png', adjust the path accordingly.
import LogoImage from './20250626_154101.png'; // <--- UPDATED LINE

/*************************** LOGO - MAIN  ***************************/

export default function LogoMain() {
  // const logoMainPath = branding.logo.main; // <--- REMOVED LINE

  return (
    <CardMedia
      src={LogoImage.src} // <--- UPDATED LINE
      component="img"
      alt="logo"
      sx={{ width: { xs: 112, lg: 140 } }}
      loading="lazy"
    />
  );
}
