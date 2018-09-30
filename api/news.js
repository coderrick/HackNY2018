const fetch = require('node-fetch')

const apiKey = process.env.NEWS_API_KEY
if (!apiKey) {
  throw new Error('Found invalid NEWS_API_KEY')
}

const topStoriesEndpoint =
  `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
async function topStories() {
  const response = await fetch(topStoriesEndpoint)
  const { articles } = await response.json()
  return articles
}

module.exports = { topStories }
