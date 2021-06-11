import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'

const Alert = ({ message, type }) => <div className={"alert " + (type === 'success' ? 'success' : 'error')} >{message}</div>

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [alertMessages, setAlertMessages] = useState([])
  const [alertType, setAlertType] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      handleAlerts(['Wrong username or password'], 'error')
    }  
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        handleAlerts([`${returnedBlog.title} added`], 'success')
      })
      .catch(error => {
        handleAlerts(Object.values(error.response.data), 'error')
      })
  }

  const handleAlerts = (alerts, type) => {
    setAlertMessages(alerts)
    setAlertType(type)
    setTimeout(() => {
      setAlertMessages([])
    }, 5000)
  }

  const blogForm = () => {
    return (
      <div>
        <Toggable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog}  />
        </Toggable>
      </div>
    )
  }

  if(user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {alertMessages.map(alert =>
          <Alert message={alert} type={alertType} />
        )}
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)} 
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {alertMessages.map(alert =>
        <Alert message={alert} type={alertType} />
      )}
           
      {user.name} logged in <button onClick={handleLogout}>logout</button>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App