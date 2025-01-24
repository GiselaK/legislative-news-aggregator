import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../server/redis'; // Import the centralized Redis client
import NewsAPI from 'newsapi';

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

interface NewsParams {
  country: string;
  language: string;
  pageSize: number;
  q: string;
};

const getArticlesFromAPI = async (q: string | null = null) => {
  const params: NewsParams = {
    language: 'en',
    pageSize: 10,
  };

  if (q) {
    params.q = q.toLowerCase();
  } else {
    // Country param not supported in everything endpoint
    params.country = 'us';
  }

  try {
    let response = {articles: []};
    if (q) {
        response = await newsapi.v2.everything(params);
    } else {
        response = await newsapi.v2.topHeadlines(params);
    }
    return response.articles;
  } catch (error) {
    console.error('Error fetching articles from NewsAPI:', error);
    return [];
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { state, searchTerm } = req.query;

  try {
    if (!state && !searchTerm) {
      const cacheKey = 'top-headlines';
      const cachedArticles = await client.get(cacheKey);

      if (cachedArticles) {
        return res.status(200).json({articles: JSON.parse(cachedArticles)});
      }

      const articles = await getArticlesFromAPI();

      // Cache for one day
      await client.setEx(cacheKey, 86400, JSON.stringify(articles));
      return res.status(200).json({articles: articles});
    }

    if (searchTerm) {
        let query = searchTerm;
        if (state) {
            query +=` ${state}`;
        }
        const articles = await getArticlesFromAPI(query as string);
        return res.status(200).json({articles});
    }

    if (state) {
      const cacheKey = `news-${state}`;
      const cachedArticles = await client.get(cacheKey);

      if (cachedArticles?.length) {
        return res.status(200).json({articles: JSON.parse(cachedArticles)});
      }

      const articles = await getArticlesFromAPI(state as string);

      // Cache for one day
      await client.setEx(cacheKey, 86400, JSON.stringify(articles));
      return res.status(200).json({articles});
    }
    
    res.status(400).json({ error: 'Bad request' });
  } catch (error) {
    console.error('Error in API handler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};