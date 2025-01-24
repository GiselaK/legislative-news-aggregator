import React, { useState } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import { Article } from '../types/article';

const cardHeight = 400;
const fallbackImage = '/assets/stateaffairs_logo.jpg';
const imgHeight = 140;

const NewsCard = ({ author, description, publishedAt, title, url, urlToImage }: Article) => {
  const [open, setOpen] = useState(false); 
  const formattedDate = new Date(publishedAt).toLocaleDateString();

  return (
    <>
    <Card sx={{ height: cardHeight}} onClick={() => setOpen(true)}>
      <CardMedia component="img" height="140" image={urlToImage || fallbackImage} alt={title} />
      <CardContent>
  <Box
  sx={{
    height: cardHeight - imgHeight - 65,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  }}
>
  <Typography
    variant="h6"
    component="div"
    sx={{
      fontWeight: 'bold',
      marginBottom: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 'unset',
      lineHeight: '1.35em',
    }}
  >
    {title}
  </Typography>
  <Box
    sx={{
      overflow: 'hidden',
      flex: 1,
    }}
  >
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        lineHeight: '1.5em',
        WebkitLineClamp: 3
      }}
    >
      {description}
    </Typography>
  </Box>
</Box>

        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          Published on: {formattedDate}
        </Typography>
      </CardContent>
    </Card>

     <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{title}</DialogTitle>
        {urlToImage && (
            <CardMedia
              component="img"
              height="200"
              image={urlToImage}
              alt={title}
              sx={{ marginBottom: 2 }}
            />
          )}
<DialogContent>
<Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Author:</strong> {author || 'Unknown Author'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Published on:</strong> {formattedDate}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
          <strong>Description:</strong> {description}
        </Typography>
        </DialogContent>
<DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
          <Button onClick={() => window.open(url, '_blank')} color="primary">
            Go to Article
          </Button>
        </DialogActions>
      </Dialog>
      </>
  );
};

export default NewsCard;