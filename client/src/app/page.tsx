'use client';
import { 
  Container,
} from '@mui/material';

import NewsGrid from './NewsGrid';
import { useEffect, useState } from 'react';

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3001/news');
      const jsonData = await response.json();
      setArticles(jsonData.articles);
    };

    fetchData();

  }, []);

  return (
    <Container>
      <NewsGrid articles={articles}/>
    </Container>
  );
}