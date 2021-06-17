import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, handleSort }) => {
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

  const updateLikes = () => {
    const changedBlog = { ...blog, likes: blog.likes += 1, user: blog.user.id }

    blogService
      .update(blog.id, changedBlog)
      .then(returnedBlog => {
        setBlogLikes(returnedBlog.likes)
        handleSort()
      })
      .catch(error => {
        console.log(error)
      })
  }

  const deleteBlog = async () => {
    if(window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(blog.id)
      await handleSort()
    }
  }

  const showDetails = () => {
    if(!detailsVisible) {
      return (
        <div style={blogStyle} className="unexpanded">
          {blog.title} {blog.author} <button id="view-button" onClick={toggleVisibility}>view</button>
        </div>
      )
    } else {
      return (
        <div style={blogStyle} className="expanded">
          <p>{blog.title} <button onClick={toggleVisibility}>hide</button></p>
          <p>{blog.url}</p>
          <p>{likes} <button id="like-button" onClick={() => updateLikes()}>like</button></p>
          <p>{blog.author}</p>
          {(user && user.username === blog.user.username) &&
            <button id="remove-button" onClick={() => deleteBlog()}>remove</button>
          }
        </div>
      )
    }
  }

  return showDetails()
}

export default Blog