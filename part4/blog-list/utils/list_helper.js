const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikesBlog = blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max), blogs[0])
  return blogs.length === 0 ? {} : maxLikesBlog
}

const mostBlogs = (blogs) => {
  // Create an object to store the blog count for each author
  const authorCount = {}

  // Loop through the blogs and update the count for each author
  blogs.forEach(blog => {
    authorCount[blog.author] = (authorCount[blog.author] || 0) + 1
  })
  console.log('authorCount object: ', authorCount)

  // Initialize variables to track the top author and maximum blog count
  let topAuthor = null
  let maxCount = 0

  // Loop through the count object to find the author with the most blogs
  for (const author in authorCount) {
    if (authorCount[author] > maxCount) {
      maxCount = authorCount[author]
      topAuthor = author
    }
  }

  // Return an object with the top author and the count of blogs
  const result = {
    author: topAuthor,
    blogs: maxCount
  }
  return !topAuthor ? {} : result
}

const mostLikes = (blogs) => {
  // Create an object to store the likes count for each author
  const authorLikesCount = {}

  // Loop through the blogs and update the count for each author
  blogs.forEach(blog => {
    authorLikesCount[blog.author] = (authorLikesCount[blog.author] || 0) + blog.likes
  })
  console.log('authorCount object: ', authorLikesCount)

  // Initialize variables to track the top author and maximum blog count
  let topAuthor = null
  let maxCount = 0

  // Loop through the count object to find the author with the most blogs
  for (const author in authorLikesCount) {
    if (authorLikesCount[author] > maxCount) {
      maxCount = authorLikesCount[author]
      topAuthor = author
    }
  }

  // Return an object with the top author and the count of blogs
  const result = {
    author: topAuthor,
    likes: maxCount
  }
  return !topAuthor ? {} : result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}