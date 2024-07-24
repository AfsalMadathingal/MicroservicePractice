import React, { useState } from 'react'
import axios from 'axios'

const PostCreate = () => {

    const [title, setTitle ]= useState("");

    const onSubmit = async (event)=>{

        event.preventDefault()

        await axios.post('http://localhost:4000/posts',{
            title
        })

        setTitle('')

    }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="">Title</label>
            <input
            onChange={e => setTitle(e.target.value)}
            type="text" name="" id="" className='form-control' />
        </div>
        <button className='btn'>Submit</button>
      </form>
    </div>
  )
}

export default PostCreate
