'use client';

// @mui
import CardMedia from '@mui/material/CardMedia';

// @project
import branding from '@/branding.json';

/*************************** LOGO - MAIN  ***************************/

export default function LogoMain() {
  const logoMainPath = branding.logo.main;

  return (
    <CardMedia
      src="https://cdn.jkt48connect.my.id/J-c7e74e4dlq9c.png"
      component="img"
      alt="logo"
      sx={{ width: { xs: 112, lg: 140 } }}
      loading="lazy"
    />
  );
}
