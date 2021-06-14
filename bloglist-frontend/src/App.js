import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const Alert = ({ message, type }) => <div className={'alert ' + (type === 'success' ? 'success' : 'error')} >{message}</div>

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const [alertMessages, setAlertMessages] = useState([])
  const [alertType, setAlertType] = useState('')

  const blogFormRef = useRef()

  const sortBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
    )
  }

  useEffect(sortBlogs, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
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
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog}  />
        </Togglable>
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
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
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
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleSort={() => sortBlogs()}
        />
      )}
    </div>
  )
}

export default App