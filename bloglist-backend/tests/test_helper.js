const Blog = require('../models/blog')

const initialUser = {
  username: 'test_user',
  name: 'David O',
  password: 'test'
}

const initialBlogs = [
  {
    title: 'Lorem ipsum dolor sit amet.',
    author: 'David O.',
    url: 'www.ornell.as',
    likes: 12
  },
  {
    title: 'Mauris condimentum nisi turpis, sed.',
    author: 'David O.',
    url: 'www.ornell.as',
    likes: 10
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialUser, initialBlogs, blogsInDb
}