const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params)
  }
}

// Create an object first and then export to be able to use VSCode "Find all references".
const ex = {
  info,
  error
}
module.exports = ex