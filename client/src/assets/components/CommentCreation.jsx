import axios from 'axios'
import React, { useState } from 'react'

const CommentCreation = ({postId}) => {

    const [content,setContent] = useState("")

    const onSubmit = async (e)=>{
        e.preventDefault()

        await axios.post(`http://localhost:8000/api/comments/posts/${postId}/comments`,{
            content
        })

        setContent('')

    }

  return (
    <div className='flex justify-center '>
      <form onSubmit={onSubmit} >
        <div className='flex flex-col m-2 '>
            <label htmlFor="">New Comment</label>
            <input value={content} onChange={e=> setContent(e.target.value)} type="text" />
        </div>
        <button className='bg-blue-500 rounded-sm p-1 m-2 text-yellow-200 hover:bg-slate-500  '>Submit</button>
      </form>
    </div>
  )
}

export default CommentCreation
