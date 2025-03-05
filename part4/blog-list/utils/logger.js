const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

// Create an object first and then export to be able to use VSCode "Find all references".
const ex = {
  info,
  error
}
module.exports = ex