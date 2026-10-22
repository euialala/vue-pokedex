
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 15000
})

export default api
