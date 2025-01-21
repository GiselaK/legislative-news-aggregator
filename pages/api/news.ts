import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import client from '../../server/redis';  // Import the Redis client

// Function to fetch news from the external API
const fetchNewsFromAPI = async () => {
  const response = await axios.get('https://newsapi.org/v2/top-headlines', {
    params: {
        country: 'us',
        apiKey: process.env.NEWS_API_KEY,  // Replace with your actual API key
    },
  });
  return response.data.articles;
};

// API Route Handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if the cached data is available in Redis
    const cachedNews = await client.get('cached_news'); // Use await for async Redis call

    if (cachedNews) {
      // If cached data exists, return it
      return res.status(200).json(JSON.parse(cachedNews));
    }

    // Otherwise, fetch news from the external API
    const newsArticles = await fetchNewsFromAPI();

    // Add unique IDs to the news articles (optional)
    const newsWithIds = newsArticles.map((article, index) => ({
      id: `article_${index + 1}`, // Simple unique ID
      ...article,
    }));

    // Cache the news articles in Redis for 1 hour (3600 seconds)
    await client.setEx('cached_news', 3600, JSON.stringify(newsWithIds));

    // Return the data to the client
    return res.status(200).json(newsWithIds);
  } catch (error) {
    console.error('Error fetching news:', error);
    return res.status(500).json({ error: 'Failed to fetch news' });
  }
}