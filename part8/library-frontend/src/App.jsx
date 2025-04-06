import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify"
import LoginForm from './components/LoginForm'
import UserBookRecommendations from './components/UserBookRecommendations'
import { useQuery, useApolloClient } from '@apollo/client'

const App = () => {
  console.log("App render")
  const [page, setPage] = useState("add");
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const notifyHandler = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  const logoutHandler = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} notifyHandler={notifyHandler} />
      </>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommend")}>user recommendations</button>
        <button style={{ marginLeft: 40, color: "red" }} onClick={logoutHandler}>logout</button>
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} notifyHandler={notifyHandler} />
      <UserBookRecommendations show={page === "recommend"} />
    </div>
  );
};

export default App;
