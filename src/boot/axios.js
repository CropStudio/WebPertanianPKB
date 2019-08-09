import axios from 'axios'
import { Cookies } from 'quasar'

const axiosInstance = axios.create({
  // dev
  baseURL: 'http://api.kartupetaniberjaya.com'
  // production
  // baseURL: 'http://localhost:8000'
})
export default async ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
  const token = Cookies.get('token')
  if (token) {
    Vue.prototype.$axios.defaults.headers.common['Authorization'] = 'bearer ' + token
  }
}
export { axiosInstance }
