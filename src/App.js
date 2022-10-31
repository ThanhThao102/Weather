import React, { Component } from 'react'
import Content from './Component/Content/Content'
import Search from './Component/Search/Search'
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className='main'>
        <Search/>
        <Content/>
      </div>
    )
  }
}
