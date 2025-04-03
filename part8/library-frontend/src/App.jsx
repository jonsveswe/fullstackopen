import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify"

const App = () => {
  console.log("App render")
  const [page, setPage] = useState("add");
  const [errorMessage, setErrorMessage] = useState(null)
  const notifyHandler = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>
      <Notify errorMessage={errorMessage} />

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} notifyHandler={notifyHandler} />
    </div>
  );
};

export default App;
