export interface Article {
    author: string;
    content: string;
    description: string;
    id: string;
    publishedAt: string;
    title: string;
    source: {id: string, name: string};
    url: string;
    urlToImage: string;
  }