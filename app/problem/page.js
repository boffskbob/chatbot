// app/problem/page.js
import { Box, Container } from '@mui/material';
import Navbar from '../../components/Navbar';
import ProblemDesc from '../../components/ProblemDesc';
import CodeWindow from '../../components/CodeWindow';

export default function ProblemPage() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'row', mt: 4 }}>
        <ProblemDesc />
        <CodeWindow />
      </Container>
    </>
  );
}
