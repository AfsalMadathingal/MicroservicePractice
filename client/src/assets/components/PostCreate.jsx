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
    <div className='flex justify-center gap-2 bg-slate-600 p-5'>
      <form onSubmit={onSubmit}>
        <div className='flex m-2 '>
            <label className='font-sans  text-white' htmlFor="">Title</label>
            <input
        
            onChange={e => setTitle(e.target.value)}
            type="text" name="" id="" className='form-control ms-1 border border-black ' />
        </div>
        <button className='bg-blue-500 p-2 rounded text-white hover:bg-slate-500  '>Submit</button>
      </form>
    </div>
  )
}

export default PostCreate
