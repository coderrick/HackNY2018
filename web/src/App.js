import React, { Component } from 'react'
import './App.css'

import { ArticleDetail } from './ArticleDetail'
import { Articles } from './Articles'

class App extends Component {
  state = {
    article: null,
  }

  onArticleClick = article => this.setState({ article })

  render() {
    return (
      <div className="App">
        {this.state.article ? (
          <ArticleDetail article={this.state.article} />
        ) : (
          <Articles onArticleClick={this.onArticleClick} />
        )}
      </div>
    )
  }
}

export default App
