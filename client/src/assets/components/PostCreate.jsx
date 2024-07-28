import React, { useState } from 'react'
import axios from 'axios'

const PostCreate = () => {

    const [title, setTitle ]= useState("");
    const [content, setContent ]= useState("");

    const onSubmit = async (event)=>{

        event.preventDefault()

        console.log(title, content);
        await axios.post('http://localhost:4000/posts',{
            title,
            content
        })

        setContent('')

        setTitle('')

    }

  return (
    <div className='flex justify-center gap-2 bg-slate-600 p-5'>
      <form className='' onSubmit={onSubmit}>
        <div className='flex flex-col m-2 '>
            <label className='font-sans m-1 text-white' htmlFor="">Title</label>
            <input
        
            onChange={e => setTitle(e.target.value)}
            type="text" name="" id="" className='form-control ms-1 border border-black ' />
            <label className='font-sans  text-white m-1' htmlFor="">Content</label>
            <textarea className='form-control ms-1 border border-black ' onChange={e => setContent(e.target.value)} name="" id=""></textarea>
        </div>
        <button className='bg-blue-500 p-2 rounded text-white hover:bg-slate-500  '>Submit</button>
      </form>
    </div>
  )
}

export default PostCreate
