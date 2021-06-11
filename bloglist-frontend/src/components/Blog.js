import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

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
          <p>{blog.likes} <button>like</button></p>
          <p>{blog.author}</p>
        </div>
      )
    }
  }

  return showDetails()
}

export default Blog