import React, { useCallback, useEffect, useState } from 'react';
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Box,
  Skeleton,
  Grid,
} from '@mui/material';
import USAStates from './USAStates';
import { Article } from '../types/article';

const SearchFilterBar = ({
  setFilteredArticles,
}: {
  setFilteredArticles: React.Dispatch<React.SetStateAction<Article[]>>;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTyping(true);
      const value = e.target.value;
      clearTimeout((handleSearchChange as any)._timeout);

      (handleSearchChange as any)._timeout = setTimeout(() => {
        setTyping(false);
        setSearchTerm(value);
      }, 500); // Wait 500ms after the user stops typing
    },
    []
  );

  const fetchArticles = async () => {
    setLoading(true);
    setIsFetching(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('searchTerm', searchTerm);
      if (selectedState) params.append('state', selectedState);

      const response = await fetch(`/api/news?${params.toString()}`);
      const data = await response.json();

      setFilteredArticles(data.articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setFilteredArticles([]);
    } finally {
      setLoading(false);
      setIsFetching(false); 
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [searchTerm, selectedState]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 2 }}>
      <TextField
        label="Search"
        variant="outlined"
        onChange={handleSearchChange}
        placeholder="Search articles"
        sx={{ flex: 1 }}
      />

      {/* Filter Dropdown */}
      <FormControl variant="outlined" sx={{ width: '100%' }}>
        <InputLabel id="state-select-label">Select State</InputLabel>
        <Select
          labelId="state-select-label"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          label="Select State"
        >
          <MenuItem value="">All States</MenuItem>
          {USAStates.map((state) => (
            <MenuItem key={state.code} value={state.name}>
              {state.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Show Skeletons While Fetching */}
      {isFetching && (
        <Grid container spacing={2}>
          {[...Array(10)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="rectangular" width="100%" height={140} />
              <Skeleton variant="text" width="80%" sx={{ marginTop: 1 }} />
              <Skeleton variant="text" width="60%" />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SearchFilterBar;
