import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PostCreate from './assets/components/PostCreate'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Create Post </h1>
     <PostCreate/>
    </>
  )
}

export default App
