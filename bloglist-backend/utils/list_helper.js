const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 1
    ? blogs[0].likes
    : blogs.reduce((accum, item) => accum + item.likes, 0) 
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}