import { Box, Card, CardContent, Grid , Skeleton} from '@mui/material';
import React, { useState } from 'react';
import NewsCard from './NewsCard';
import SearchFilterBar from './SearchFilterBar';
import { Article } from '../types/article';

const NewsGrid = ({ articles, isFetching, setIsFetching }: { articles: Article[] }) => {
  const [filteredArticles, setFilteredArticles] = useState(articles);

  return (
    <Box>
      <SearchFilterBar
        setFilteredArticles={setFilteredArticles}
        setIsFetching={setIsFetching}
      />
      <Grid container spacing={2}>
        {!isFetching && filteredArticles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <NewsCard {...article} />
          </Grid>
        ))}
        
        {isFetching && (
          [...Array(12)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
            <CardContent>
              <Skeleton variant="rectangular" width="100%" height={140} />
              <Skeleton variant="text" width="80%" sx={{ marginTop: 1 }} />
              <Skeleton variant="text" width="60%" />
              </CardContent>
              </Card>
            </Grid>
        )))}
      </Grid>
    </Box>
  );
};

export default NewsGrid;
