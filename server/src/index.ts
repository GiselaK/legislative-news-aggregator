import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
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

app.get('/news', (req, res) => {
  res.json({articles: dummyArticles});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});