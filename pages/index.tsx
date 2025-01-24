'use client';
import { 
  Container,
} from '@mui/material';

import NewsGrid from '../components/NewsGrid';

import React, { useEffect, useState } from 'react';

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/news');
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