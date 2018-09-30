const language = require('@google-cloud/language')
const { resolve: resolvePath } = require('path')

const client = new language.LanguageServiceClient({
  keyFilename: resolvePath(__dirname, 'gcp.keyfile.json'),
})

async function topics(text) {
  const results = await client.analyzeEntities({
    document: {
      content: text,
      type: 'PLAIN_TEXT',
    },
  })

  const { entities } = (results || [{}])[0]
  return (entities || [])
    .filter(({ salience }) => salience > 0.1)
    .map(({ name }) => name)
}

module.exports = { topics }
