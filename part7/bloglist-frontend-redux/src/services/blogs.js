import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const create = async (newObject) => {
  /* newObject example:
  {
    author: "mesa",
    title: "kalix",
    url: "www.me.com"
  } */
  console.log('create. newObject: ', newObject)
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, object) => {
  /* object example:
  {
    author: "mesa",
    id: "67d01f63b32c497cd2e80a9d",
    likes: 3,
    title: "sopl2",
    url: "www.me.com"
    user_id: ""
  } */
  console.log('update. id and newObject: ', id, object)
  const response = await axios.put(`${baseUrl}/${id}`, object)
  return response.data
}

const remove = async (id) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}
export default { getAll, create, update, remove, setToken }