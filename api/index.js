const bodyParser = require('body-parser')
const express = require('express')
const { resolve: resolvePath } = require('path')

const { topics } = require('./lang')
const { gifs } = require('./gifs')
const { topStories } = require('./news')

const app = express()
app.use(express.static(resolvePath(__dirname, '..', 'web', 'build')))
app.use(bodyParser.json())

app.get('/api/stories/top', async (req, res) => {
  try {
    const stories = await topStories()
    return res.status(200).json(stories)
  } catch (err) {
    console.error('Failed to get stories', err)
    return res.status(500).send()
  }
})

app.post('/api/gif/videos', async ({ body: { storyText } }, res) => {
  try {
    const storyTopics = await topics(storyText)
    const storyGifs = await gifs(storyTopics)

    return res.status(200).json(storyGifs)
  } catch (err) {
    console.error('Failed to get topics -> gifs', err)
    return res.status(500).send()
  }
})

const port = process.env.NODE_PORT || 4000
app.listen(port, () => console.log(`Server listening on port ${port}!`))
