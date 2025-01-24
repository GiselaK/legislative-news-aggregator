# Legislative News Aggregator

A web application that gets legislative news articles from News API (https://newsapi.org), allowing users to filter and search through articles.

## Table of Contents

- [Legislative News Aggregator](#legislative-news-aggregator)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Code Quality](#code-quality)
  - [Further Enhancements](#further-enhancements)

## Features

- Fetches legislative news articles from News API
- Search functionality to filter articles by keywords and/or state
- Caches state API searches in Redis for quick retrieval
- Searches News API in real-time for user-input searches

## Installation

Follow the steps below to set up the project locally:
1. Clone the repository:

   ```bash
   git clone https://github.com/GiselaK/legislative-news-aggregator.git
   cd legislative-news-aggregator

2. Get an API Key from News API (https://newsapi.org/) and create a `.env.local` file with NEWS_API_KEY key.

    ```
    NEWS_API_KEY = 
3. Install NVM (https://github.com/nvm-sh/nvm) if you don't have it installed yet and then run.

    ```
    nvm use v21.6.1
4. Install packages

    ``` 
    npm install
5. Install Redis

    ```
    brew install redis
6. Run redis server

    ```
    redis-server
7. Open another terminal tab/window and run

    ```
    npm run dev
8. Open http://localhost:3000/

## Code Quality

To ensure consistent and high-quality code, the project uses **ESLint** for linting.

Run Linting:
   
    npm run lint

## Further Enhancements

1. API Integration & Data Handling
    - The Redis articles table schema currently mirrors the News API structure (with an added id). To scale and support multiple APIs or user-submitted articles, create a relational database for the application. Add helper methods to transform API responses into this unified schema.

   MVP Database Schema for this application:

        Articles:
            author: string
            description: string
            id: uuid
            image_url: string
            link: string
            news_source_id: uuid
            published_date: timestamp
            title: string
            state_id: uuid
   
        Article Topics:
            article_id: uuid
            id: uuid
            topic_id: uuid

        # Seperate Table so that sorting or filtering off of new sources can be added
        News Sources:
            id: uuid
            name: string
   
        States:
            code: string
            id: uuid
            name: string

        Topics:
            id: uuid
            name: string

        Users:
            email: string
            id: uuid

        #In case they want to follow multiple states create many-many relationship 
        User States:
            state_id: uuid
            user_id: uuid

        User Topics:
            topic_id: uuid
            user_id: uuid
       
        #The uuids are nullable so a user can subscribe to all news in their state, everything about a topic (e.g. climate change), or specfically a topic within their state.
        Email Subscriptions:
            id: uuid (primary key)
            state_id: uuid (nullable, foreign key to States)
            topic_id: uuid (nullable, foreign key to Topics)
            user_id: uuid (foreign key to Users)


    - Although the News API "everything" endpoint doesn’t support topics/categories directly, implementing a topics dropdown for users would enhance the experience. This can be done similarly to states, storing topic-based searches in Redis for reuse, as they are likely to be commonly clicked.
    - Introduce indexing for faster data retrieval and scalability. Use indexes for fields used in search such as article names and descriptions

3. Caching & Storage Enhancements
    - In addition to caching by states and topics, track commonly searched combinations of filters (e.g., "fires + California") and store those queries in Redis for faster retrieval without requiring fresh API searches. 
    - Continue using Redis for frequently queried data and use SQL database to query for less common searches.
    - Consider integrating elasticsearch to facilitate filtering capabilities across large datasets. 
    - Currently, Redis waits until a user performs a search to cache results. Instead, implement background tasks to pre-fetch and cache data for popular states and topics. This will improve performance, especially when scaling to multiple APIs.

4. Data Maintenance
    - Sort articles by the newest date in the API endpoints.
    - Implement an expiration policy for articles stored in the database (e.g., depending on application use cases, consider removing old rarely accessed articles).
    - Deduplicate articles by comparing their published date, title, and author. If all match, assume they are identical.

5. Performance & Optimization
    - Retrieve a larger initial page size for news articles and implement infinite scrolling to fetch additional articles to create a seamless UX for large datasets.
    - Add rate limiting to backend endpoints.
    - Account for time zone differences in article timestamps and user activity.

6. Testing & QA
    - Add unit tests for both front-end and back-end components.
    - Implement automated end-to-end test for search text field and state select.
    - Integrate Travis or Jenkins for CI/CD. 

7. Internationalization
   - Use i18n to provide in-app vocabulary translations
   - Utilize language param in News API.
   - Consider a translating service when adding other news API's that don't support language or adding feature for custom articles.

8. Error Handling
   - Handle internal API errors by providing user-friendly error messages.
   - Implement error handling for external API failures so that user ideally doesn't notice (When there are multiple API's it should still be functional if one external API call fails).

9. Styling & UI Improvements
    - Switch from inline to Styled Components
    - Consider caching or not displaying external images.
    - When there are no results display a user friendly message letting them know.
    - Match the shape of loading skeletons exactly to the corresponding data cards.
    - Consider removing source names from titles (e.g., parts after dashes) and displaying them elsewhere. Verify dashes are consistently used for sources only.

10. Developer Experience
    - Add Prettier to maintain consistent code formatting.
    - Add backend logs to track errors, API usage, and performance.
