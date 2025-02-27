import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAllPersons = () => {
    return axios.get(baseUrl).then(response => {
        console.log('getAllPersons response: ', response)
        return response.data
    })
}

const getOnePerson = (id) => {
    return axios.get(`${baseUrl}/${id}`).then(response => {
        console.log('getOnePerson response: ', response)
        return response.data
    })
} 

const addOnePerson = (personObject) => {
    return axios.post(baseUrl, personObject).then(response => {
        console.log('addOnePerson response: ', response)
        return response.data
    })
}

const deleteOnePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response => {
        console.log('deleteOnePerson response: ', response)
        return response.data
    })
}

const updateOnePerson = (id, personObject) => {
    return axios.put(`${baseUrl}/${id}`, personObject).then(response => {
        console.log('updateOnePerson response: ', response)
        return response.data
    })
}

export default { 
    getAllPersons, 
    getOnePerson, 
    addOnePerson, 
    deleteOnePerson, 
    updateOnePerson 
}