import axios from 'axios'
import Vue from 'vue'
import router from '../router'

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})

http.interceptors.request.use(
  config => {
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token || ''
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

http.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    if (err.response.data.message) {
      Vue.prototype.$message.error(err.response.data.message)
    }
    if (err.response.status === 401) {
      router.push('/login')
    }
    return Promise.reject(err)
  }
)
export default http
