'use client';
import { useEffect, useState } from 'react';
import { 
  Container, 
  Card, 
  CardContent, 
  Typography, 
  Button 
} from '@mui/material';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Full Stack App
          </Typography>
          <Typography variant="body1" gutterBottom>
            Message from server: {message}
          </Typography>
          <Button variant="contained" color="primary">
            Click Me
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}