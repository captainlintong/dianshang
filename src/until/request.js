import axios from 'axios'
import router from '@/router'
import { getToken } from '@/until/auth'
const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})
http.interceptors.request.use(config => {
  if (config.url !== '/login') {
    config.headers.Authorization = getToken()
  }
  return config
}, error => Promise.reject(error))

http.interceptors.response.use(response => {
  if (response.data.meta.status === 401) {
    return router.replace('/login')
  }
  return response
}, error => Promise.reject(error))
export default http
