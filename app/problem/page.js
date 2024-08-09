'use client'

import { Container, Button } from '@mui/material';
import Navbar from '../../components/Navbar';
import ProblemDesc from '../../components/ProblemDesc';
import CodeWindow from '../../components/CodeEditor';

export default function ProblemPage() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 4 }}>
        <ProblemDesc />
        <CodeWindow />
      </Container>
      <Button
        variant="contained"
        color="primary"
        sx={{
          position: 'absolute',
          bottom: 16, 
          right: 16,
          borderRadius: 50,
        }}
      >
        Stuck? Ask Prep! 🤖
      </Button>
    </>
  );
}