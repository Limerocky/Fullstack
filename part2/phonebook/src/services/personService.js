import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const notDeleteTM = id => {
    axios.delete(`${baseUrl}/${id}`)
}

const update = (id, person) => {
    const request = axios.put(`${baseUrl}/${id}`, {number: person.number, name: person.name})
    return request.then(response => response.data)
}


export default {
    getAll,
    create,
    notDeleteTM,
    update,
}