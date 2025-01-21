import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',  // Frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

const port = process.env.PORT || 3001;  // Using 3001 since Next.js uses 3000

const dummyArticles = [
  { 
      description: "Uncertainty around the economy, state spending, the Los Angeles wildfires and the Trump administration could still change the state’s budget picture by the May budget revision",
      id: 1,
      state: "CA",
      topic: "California Budget",
      published_date: "01/13/2025",
      title: "Newsom's $322B budget proposes some new spending in light of modest surplus"
  }
];

app.get('/news', async (req, res) => {
  try {
    // Make the external API call (replace with your desired API)
    console.log(process.env.NEWS_API_KEY)
    const response = await axios.get(`https://newsapi.org/v2/everything?q=news&apiKey=${process.env.NEWS_API_KEY}`);
    
    // Send the data back to the client
    res.json({articles: response.data});
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});