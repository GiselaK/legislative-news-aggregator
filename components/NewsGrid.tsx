import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import NewsCard from './NewsCard';
import SearchFilterBar from './SearchFilterBar';
import { Article } from '../types/article';

const NewsGrid = ({ articles }: { articles: Article[] }) => {
  const [filteredArticles, setFilteredArticles] = useState(articles);

  return (
    <Box>
      <SearchFilterBar
        setFilteredArticles={setFilteredArticles}
      />
      <Grid container spacing={2}>
        {filteredArticles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <NewsCard {...article} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewsGrid;
