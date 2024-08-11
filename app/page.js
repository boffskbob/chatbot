'use client'

import { Container, Box, Typography, Button, AppBar, Toolbar, Link } from '@mui/material';
import Navbar from '../components/Navbar'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Container 
        maxWidth="lg"
        sx={{ 
          textAlign: 'center',
          height: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center' 
        }}
      >
        <Typography variant="h1" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
          PrepAI
        </Typography>
        <Typography variant="h5" component="h2" sx={{ color: 'gray', mb: 4 }}>
          Your technical interview prep partner.
        </Typography>
        <Link href="/problem">
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: '30px', textTransform: 'none', padding: '10px 30px' }}
            // onClick={handleGetStarted}
          >
            Get Started →
          </Button>
        </Link>
    </Container>
    </>
  );
}
