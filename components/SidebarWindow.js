import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

export default function SidebarWindow({ open, onClose, children }) {
  const windowRef = useRef(null); // used to keep track of specific DOM components

  // handles clicks outside the window
  const clickOutside = (event) => {
    if (windowRef.current && !windowRef.current.contains(event.target)) {    // makes sure windowRef points to the main Box and event.target is outside the sidebar (aka windowRef)
      onClose();
    }
  };

  // add/remove event listener for detecting clicks outside the window
  useEffect(() => {
    if (open) { // when the side window is open, listen for a click and check to see if it was outside the window
      document.addEventListener('mousedown', clickOutside);
    } else {
      document.removeEventListener('mousedown', clickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [open]);

  return (
    <Box
      ref={windowRef}   // windowRef is a reference to the box containing the sidebar
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        backgroundColor: '#f4f4f4',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
        overflow: 'visible',
        zIndex: 1200,
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        width: 'auto'
      }}
    >
      <Box sx={{ padding: 2 }}>
        {children}
      </Box>
    </Box>
  );
};