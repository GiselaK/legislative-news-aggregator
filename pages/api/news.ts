export default function handler(req, res) {
    const apiKey = process.env.NEWS_API_KEY;
  
    if (!apiKey) {
      return res.status(500).json({ message: 'API key is missing' });
    }
  
    // Fetch data from an external API using the API key
    const url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        res.status(200).json(data);
      })
      .catch(error => {
        res.status(500).json({ message: 'Failed to fetch news' });
      });
  }
  