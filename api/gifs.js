const giphy = require('giphy-api')()

function gifs(topics) {
  return new Promise((resolve, reject) => {
    try {
      giphy.search({ q: topics.join(' ') }, (err, res) => {
        if (err) {
          return reject(err)
        }

        return resolve(
          ((res || {}).data || [])
            .map(
              ({
                images: {
                  original: { mp4 },
                },
              }) => mp4
            )
            .filter(mp4 => !!mp4)
        )
      })
    } catch (err) {
      return reject(`Failed to get gifs: ${err}`)
    }
  })
}

module.exports = { gifs }
