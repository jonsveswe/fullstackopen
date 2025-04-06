import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'
import { useState, useEffect } from 'react'

const UserBookRecommendations = (props) => {
  console.log('UserBookRecommendations render')
  // When I clear the cache when logging out, the useQuery hook does not refetch the data when logging back in so the cache will be empty.
  // I must use the network-only fetchPolicy to force the useQuery hook to get the data from the server. 
  /*   const booksResult = useQuery(ALL_BOOKS, {
      fetchPolicy: 'network-only',
    })
    const userResult = useQuery(ME, {
      fetchPolicy: 'network-only',
    })
   */

  // With the skip option, the useQuery hook will force a refetch when the component mounts (when prop.show is true).
  const booksResult = useQuery(ALL_BOOKS, {
    skip: !props.show,
  })
  const userResult = useQuery(ME, {
    skip: !props.show,
  })

  /*   const booksResult = useQuery(ALL_BOOKS)
    const userResult = useQuery(ME) */
  const [filterString, setFilterString] = useState('')

  useEffect(() => {
    // if (userResult.data && booksResult.data) {
    if (userResult.data) {
      console.log(userResult.data)
      setFilterString(userResult.data.me.favoriteGenre)
    }
  }, [userResult.data])

  if (!props.show) {
    return null
  }
  if (booksResult.loading || userResult.loading) {
    return <div>loading...</div>
  }
  const books = booksResult.data.allBooks

  return (
    <div>
      <h2>books</h2>
      <div>in genre {userResult.data.me.favoriteGenre}</div>
      {/* <button onClick={() => setFilterString(userResult.data.me.favoriteGenre)}>recommend</button> */}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books.filter(b => filterString === '' || b.genres.includes(filterString)).map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
              <td>{b.genres.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserBookRecommendations
