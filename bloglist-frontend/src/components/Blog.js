import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [likes, setBlogLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const updateLikes = (blog) => {
    const changedBlog = {...blog, likes: blog.likes += 1, user: blog.user.id}

    blogService
      .update(blog.id, changedBlog)
      .then(returnedBlog => {
        setBlogLikes(returnedBlog.likes)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const showDetails = () => {
    if(!detailsVisible) {
      return (
        <div style={blogStyle}>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
        </div>  
      )
    } else {
      return (
        <div style={blogStyle}>
          <p>{blog.title} <button onClick={toggleVisibility}>hide</button></p> 
          <p>{blog.url}</p>
          <p>{likes} <button onClick={() => updateLikes(blog)}>like</button></p>
          <p>{blog.author}</p>
        </div>
      )
    }
  }

  return showDetails()
}

export default Blog