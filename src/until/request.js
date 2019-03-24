import axios from 'axios'
import router from '@/router'
const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})
http.interceptors.request.use(function (config) {
  if (config.url !== '/login') {
    config.headers.Authorization = window.localStorage.getItem('token')
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
http.interceptors.response.use(function (response) {
  console.log('响应经过这里')
  if (response.data.meta.staus === 401) {
    router.replace('/login')
  }
  return response
}, function (error) {
  return Promise.reject(error)
})
export default http
