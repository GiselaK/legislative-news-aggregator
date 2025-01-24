# Legislative News Aggregator

A web application that gets legislative news articles from News API (https://newsapi.org), allowing users to filter and search through articles.

## Table of Contents

- [Legislative News Aggregator](#legislative-news-aggregator)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
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

2. Get an API Key from News API (https://newsapi.org/) and create a .env file with NEWS_API_KEY key.

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


## Further Enhancements

1. API Integration & Data Handling

    Expand API Support:
    The Redis articles table schema currently mirrors the News API structure (with an added id). To scale and support multiple APIs or user-submitted articles, create a relational database for the application. Add helper methods to transform API responses into this unified schema.

    Proposed Database Schema for this application

    Proposed Database Schema:

        Articles:
            author: string
            description: string
            id: uuid
            link: string
            published_date: timestamp
            title: string
            topic_id: uuid
            state_id: uuid

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


    Add Topic Support:
    Although the News API "everything" endpoint doesn’t support topics/categories directly, implementing a topics dropdown for users would enhance the experience. This can be done similarly to states, storing topic-based searches in Redis for reuse, as they are likely to be commonly clicked.

    Indexing for Scalability:
    Introduce indexing for faster data retrieval and scalability. Use indexes for fields used in search such as article names and descriptions

3. Caching & Storage Enhancements

    Optimize Redis for Common Queries:
    In addition to caching by states and topics, track commonly searched combinations of filters (e.g., "fires + California") and store those queries in Redis for faster retrieval without requiring fresh API searches.
    
    Hybrid Storage Approach:
    Continue using Redis for frequently queried data and use SQL database to query for less common searches.

    Elasticsearch for Advanced Search:
    Consider integrating elasticsearch to facilitate filtering capabilities across large datasets. 

    Pre-Fetch Data:
    Currently, Redis waits until a user performs a search to cache results. Instead, implement background tasks to pre-fetch and cache data for popular states and topics. This will improve performance, especially when scaling to multiple APIs.

4. Data Maintenance

    Sorting & Expiry:
    - Sort articles by the newest date in the API endpoints.
    - Implement an expiration policy for articles stored in the database (e.g., depending on application use cases, consider removing old rarely accessed articles).

    
    Deduplication:
    Deduplicate articles by comparing their published date, title, and author. If all match, assume they are identical.

5. Performance & Optimization

    Infinite Scrolling:
    Retrieve a larger initial page size for news articles and implement infinite scrolling to fetch additional articles to create a seamless UX for large datasets.

    Rate-Limiting:
    Add rate limiting to backend endpoints.
    
    Time Zones:
    Account for time zone differences in article timestamps and user activity.

6. Testing & QA

    Unit Testing:
    Add unit tests for both front-end and back-end components.

    Automated Testing:
    Implement automated end-to-end testing for key workflows.

7. Internationalization

    Translations:
    Use i18n to provide in-app vocabulary translations. Utilize language param in News API. Consider a translating service when adding other news API's that don't support language or adding feature for custom articles.

8. Error Handling

    Front-End:
    Handle internal API errors by providing user-friendly error messages.

    Back-End:
    Implement error handling for external API failures so that user ideally doesn't notice (When there are multiple API's it should still be functional if one external API call fails).

9. Styling & UI Improvements

    Switch to Styled Components:
    Replace inline styles with styled-components.

    No Results View:
    When there are no results display a user friendly message letting them know.

    Improve Skeletons:
    Match the shape of loading skeletons exactly to the corresponding data cards.

    Title Cleanup:
    Consider removing source names from titles (e.g., parts after dashes) and displaying them elsewhere. Verify dashes are consistently used for sources only.

10. Developer Experience

    Prettier Integration:
    Add Prettier to maintain consistent code formatting.

    Logging:
    Add detailed backend logs to track errors, API usage, and performance.
