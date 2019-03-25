import axios from 'axios'
import router from '@/router'
const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})
http.interceptors.request.use(config => {
  if (config.url !== '/login') {
    config.headers.Authorization = window.localStorage.getItem('token')
  }
  return config
}, error => Promise.reject(error))
http.interceptors.response.use(response => {
  if (response.data.meta.staus === 401) {
    router.replace('/login')
  }
  return response
}, error => Promise.reject(error))
export default http
