query ExampleQuery {
  authorCount
  bookCount
}

query ExampleQuery {
  allAuthors {
    name
    born
  }
}

query ExampleQuery {
  allAuthors {
    name
    born
    bookCount
  }
}

query ExampleQuery {
  allBooks(author: "Robert Martin") {
    title
  }
}

query ExampleQuery {
  allBooks(genre: "refactoring") {
    title
    author
  }
}

mutation {
  addBook(
    title: "Pimeyden tango",
    author: "Reijo Mäki",
    published: 1997,
    genres: ["crime"]
  ) {
    title,
    author
  }
}

mutation {
  editAuthor(name: "Reijo Mäki", setBornTo: 1958) {
    name
    born
  }
}


