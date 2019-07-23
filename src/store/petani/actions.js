/*
export function someAction (context) {
}
*/
import { axiosInstance } from 'boot/axios'
// import { Cookies } from 'quasar'
const qs = require('qs')
export function simpan ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    // axiosInstance.defaults.headers.common['token'] = Cookies.get('token')
    axiosInstance.post('api/petani', qs.stringify({
      nik: payload.form.nik,
      nama: payload.form.nama,
      jenis_kelamin: payload.form.jenis_kelamin,
      komoditas: payload.form.komoditas,
      id_poktan: payload.form.id_poktan,
      luas_lahan: payload.form.luas_lahan
    }))
      .then((response) => {
        resolve(response)
      })
      .catch(() => {
        reject()
      })
  })
}
export function editsimpan ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    // axiosInstance.defaults.headers.common['token'] = Cookies.get('token')
    axiosInstance.put('api/petani/' + payload.form.id, qs.stringify({
      nik: payload.form.nik,
      nama: payload.form.nama,
      jenis_kelamin: payload.form.jenis_kelamin,
      komoditas: payload.form.komoditas,
      id_poktan: payload.form.id_poktan,
      luas_lahan: payload.form.luas_lahan
    }))
      .then((response) => {
        resolve(response)
      })
      .catch(() => {
        reject()
      })
  })
}
export function hapus ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    // axiosInstance.defaults.headers.common['token'] = Cookies.get('token')
    axiosInstance.delete('api/petani/' + payload.id)
      .then((response) => {
        resolve(response)
      })
      .catch(() => {
        reject()
      })
  })
}
export function show ({ commit }, payload) {
  // axiosInstance.defaults.headers.common['token'] = Cookies.get('token')
  return new Promise((resolve, reject) => {
    axiosInstance.get('api/petani/' + payload.id)
      .then((response) => {
        resolve(response)
      })
      .catch((response) => {
        reject()
      })
  })
}
export function index ({ commit }) {
  return new Promise((resolve, reject) => {
    axiosInstance.get('api/petani')
      .then((response) => {
        resolve(response)
      })
      .catch((response) => {
        reject()
      })
  })
}
