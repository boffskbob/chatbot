'use client'

import { useState } from 'react';
import { Container, Button } from '@mui/material';
import Navbar from '../../components/Navbar';
import ProblemDesc from '../../components/ProblemDesc';
import CodeWindow from '../../components/CodeEditor';
import SidebarWindow from '../../components/SidebarWindow';
import Chatbot from '../../components/Chatbot';

export default function ProblemPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // helper functions to open/close the sidebar when ask prep button is clicked
  const toggleWindow = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeWindow = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 4 }}>
        <ProblemDesc />
        <CodeWindow />
      </Container>
      {/* triggers chat window to open */}
      <Button
        variant="contained"
        color="primary"
        onClick={toggleWindow}
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          borderRadius: 50,
        }}
      >
        Stuck? Ask Prep! 🤖
      </Button>
      <SidebarWindow open={sidebarOpen} onClose={closeWindow}>
        <Chatbot />
      </SidebarWindow>
    </>
  );
}