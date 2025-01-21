import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import client from '../../server/redis';

const fetchNewsFromAPI = async () => {
  const response = await axios.get('https://newsapi.org/v2/top-headlines', {
    params: {
        country: 'us',
        apiKey: process.env.NEWS_API_KEY,
    },
  });
  return response.data.articles;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cachedNews = await client.get('cached_news');

    if (cachedNews) {
      return res.status(200).json({articles: JSON.parse(cachedNews)});
    }

    const newsArticles = await fetchNewsFromAPI();

    const newsWithIds = newsArticles.map((article, index) => ({
      id: `article_${index + 1}`,
      ...article,
    }));

    // Cache the news articles in Redis for 1 hour (3600 seconds)
    await client.setEx('cached_news', 3600, JSON.stringify(newsWithIds));

    return res.status(200).json(newsWithIds);
  } catch (error) {
    console.error('Error fetching news:', error);
    return res.status(500).json({ error: 'Failed to fetch news' });
  }
}