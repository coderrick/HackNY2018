import React, { Component } from 'react'
import './Articles.css'

import { Loading } from './Loading'

export class Articles extends Component {
  state = {
    isLoading: false,
    articles: [],
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    const articles = await this.loadArticles()
    this.setState({ isLoading: false, articles })
  }

  async loadArticles() {
    const response = await fetch('/api/stories/top')
    return await response.json()
  }

  render() {
    const { isLoading, articles } = this.state

    return (
      <div className="Articles">
        {isLoading ? (
          <Loading />
        ) : (
          articles.map(article => (
            <Article key={article.title} article={article} onClick={this.props.onArticleClick.bind(this, article)} />
          ))
        )}
      </div>
    )
  }
}

function Article({ article: { title, urlToImage }, onClick }) {
  return (
    <div
      className="Article"
      style={urlToImage ? { backgroundImage: `url(${urlToImage})` } : {}}
      onClick={onClick}>
      <div className="Article__title">{title}</div>
    </div>
  )
}
