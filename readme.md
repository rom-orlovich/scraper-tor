
# Scraper Tor


## About this project:
This hackathon project collaborated with [Rapid7](https://www.rapid7.com/).  
The app scraps every 10 minutes dark web site that posts illegal pastes such as drugs, pornography content, organs and weapons trade, etc.
Then, if there is new content, the app will display the appropriate message and the pastes list.


## What have I learned?
1. About Docker and its components: images and containers.
2. How to use Docker by creating Dockerfile and docker-compose. 
3. What is web-scrapping, and how I can schedule it with node-cron.
4. How to use Redis for memorization.
5. What is the darknet and how I can connect it via the tor browser.
6. How to proxy HTTP requests to tor-network via Docker.



## Technologies:
- **[React](https://reactjs.org/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Sass](https://www.npmjs.com/package/sass)**
- **[Node.js](https://nodejs.org/en/)**
- **[Docker](https://www.docker.com/)**

## Packages:

- **Front-end** :
  - [Redux RTK & Query](https://www.npmjs.com/package/@reduxjs/toolkit) - For state and data-fetching management.
  - [React Icons](https://www.npmjs.com/package/react-icons) - For icons
  

- **Back-end**:
  - [Express](https://www.npmjs.com/package/express)- For building the server.
  - [Mongoose](https://mongoosejs.com/) - For DB management.
  - [Cheerio](https://cheerio.js.org/) - For web scraping.
  - [Cron](https://www.npmjs.com/package/cron) - For DB management.
  - [Redis](https://www.npmjs.com/package/redis) - For memory caching.
  - [Webpack](https://www.npmjs.com/package/webpack) - For modules bundling of the server side.
  - [Dotenv](https://www.npmjs.com/package/dotenv) - For environment variables.



## Installation
1. **Clone the repo**
   ```
   git@github.com:rom-orlovich/scraper-tor.git
   ```
2. **Install all the dependencies**
   ```
    npm run init-p
   ```
3. **Run all the Docker containers**
   ```
   bash docker_compose_active.sh all
   ```
   
5. **Go to http://localhost:3000 and have fun**!

## Main Features:
1. **Autocomplete Search Input** - Suggests a list of results from the server.
   Infinite scroll: When there are more than ten possible suggestions, the users can scroll and fetch more suggestions from the server.
2. **Table Pagination** - This shows when there are more than ten items. 
3. **Alerts system** -  Alerts displays when new pastes are published.


## Images: 
<img alt="Filter pokemons by their names" src="./readme-images/overview.png" width="600" hight="600">
