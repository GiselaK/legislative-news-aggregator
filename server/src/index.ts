import axios from 'axios';
import cors from 'cors';

const redis = new Redis(); 

const port = 3000; 

app.use(cors({
  origin: 'http://localhost:3000',  // Frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

async function fetchAndCacheNews() {
  const cacheKey = "news_articles";

  // Check if the data is already cached in Redis
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    console.log("Returning cached data");
    return JSON.parse(cachedData); // Return cached data if available
  }

  // Fetch new data from the external API
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=news&apiKey=${process.env.NEWS_API_KEY}`);
    const data = response.data;

    // Add unique ID to each article
    const articlesWithIds = data.map((article, index) => ({
      ...article,
      id: `article-${index}`,
    }));

    // Cache the processed articles for 1 day (86400 seconds)
    await redis.set(cacheKey, JSON.stringify(articlesWithIds), 'EX', 86400);

    return articlesWithIds;
  } catch (error) {
    console.error("Error fetching data from external API:", error);
    throw new Error("Failed to fetch data");
  }
}

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
//
// Express route to serve cached data
// app.get('/news', async (req, res) => {
//   try {
//     const articles = await fetchAndCacheNews();
//     res.json(articles); // Return the processed articles
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Cron job to fetch data and recache it once a day
// cron.schedule('0 0 * * *', () => {  // Run at midnight every day
//   console.log('Running scheduled task to fetch and cache news articles');
//   fetchAndCacheNews();
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});