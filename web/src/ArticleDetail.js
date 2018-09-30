import React, { Component } from 'react'
import './ArticleDetail.css'

import { Loading } from './Loading'

export class ArticleDetail extends Component {
  state = {
    isLoading: false,
    gifVideos: [],
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    const gifVideos = await this.loadGifVideos(this.props.article.content)
    this.setState({ isLoading: false, gifVideos })
  }

  async loadGifVideos(articleContent) {
    const response = await fetch('/api/gif/videos', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ storyText: articleContent }),
    })

    if (!response.ok) {
      return []
    }

    return await response.json()
  }

  render() {
    const { isLoading, gifVideos } = this.state

    return (
      <div className="ArticleDetail">
      {isLoading ? (
          null
        ) : (
          <div className="ArticleDetail__header">{this.props.article.title}</div>
        )}
        {isLoading ? (
          <Loading />
        ) : (
          gifVideos.map(gifVideo => (
            <GifVideo key={gifVideo} mp4Url={gifVideo} />
          ))
        )}
      </div>
    )
  }
}

function GifVideo({ mp4Url }) {
  return (
    <div className="GifVideo">
      <video className="GifVideo__video" autoPlay loop>
        <source src={mp4Url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
