import axios from 'axios'
import { Cookies } from 'quasar'

const axiosInstance = axios.create({
  // dev
  baseURL: 'http://172.32.1.14:8000'
  // production
  // baseURL: 'https://api.azzahraschoolsystem.com'
})
export default async ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
  const token = Cookies.get('token')
  if (token) {
    Vue.prototype.$axios.defaults.headers.common['Authorization'] = 'bearer ' + token
  }
}
export { axiosInstance }
