'use client';
import { 
  Container,
} from '@mui/material';

import NewsGrid from './NewsGrid';

export default function Home() {

  return (
    <Container>
      <NewsGrid/>
    </Container>
  );
}