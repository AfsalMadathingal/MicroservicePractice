import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PostCreate from './assets/components/PostCreate'
import PostList from './assets/components/PostList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 className='text-lg font-bold'>Microservice Sample Project </h1>
     <PostCreate/>
     <PostList/>
    </>
  )
}

export default App
