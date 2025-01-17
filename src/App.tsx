import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import Home from './pages/Home'
import ChatRoom from './pages/ChatRoom'

// stylesheet
import './App.css'

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/chat-room' Component={ChatRoom}> </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
