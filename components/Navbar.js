import { AppBar, Toolbar, Typography, Box, Link, Button } from '@mui/material';

export default function Navbar() {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: '#7e57c2' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" color="inherit" noWrap>
            <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
              <Link href="/" underline="none" color="textPrimary">
                <Box component="span" sx={{ fontSize: '30px', fontWeight: 'bold', color: '#000' }}>
                  🅿️
                </Box>
              </Link>
            </Box>
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="/about" underline="none" color="textPrimary">
              About
            </Link>
            <Link href="/solutions" underline="none" color="textPrimary">
              Solutions
            </Link>
            <Link href="/resources" underline="none" color="textPrimary">
              Resources
            </Link>
            <Link href="/contact" underline="none" color="textPrimary">
              Contact
            </Link>
          </Box>

          <Button variant="outlined" color="inherit" sx={{ borderRadius: '20px' }}>
            Sign In
          </Button>
        </Toolbar>
      </AppBar>
  );
}
