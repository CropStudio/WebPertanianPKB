/*
export function someAction (context) {
}
*/
import { axiosInstance } from 'boot/axios'
import { Cookies } from 'quasar'
const qs = require('qs')
export function simpan ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axiosInstance.defaults.headers.common['token'] = Cookies.get('token')
    axiosInstance.post('petani', qs.stringify({
      nik: payload.form.nik,
      nama: payload.form.nama,
      jenis_kelamin: payload.form.jenis_kelamin,
      komoditas: payload.form.komoditas,
      id_poktan: payload.form.id_poktan,
      luas_lahan: payload.form.luas_lahan,
      id_user: payload.form.id_user
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
    axiosInstance.defaults.headers.common['token'] = Cookies.get('token')
    axiosInstance.put('petani/' + payload.form._id, qs.stringify({
      nik: payload.form.nik,
      nama: payload.form.nama,
      jenis_kelamin: payload.form.jenis_kelamin,
      komoditas: payload.form.komoditas,
      id_poktan: payload.form.id_poktan,
      luas_lahan: payload.form.luas_lahan,
      id_user: payload.form.id_user
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
    axiosInstance.defaults.headers.common['token'] = Cookies.get('token')
    axiosInstance.delete('petani/' + payload._id)
      .then((response) => {
        resolve(response)
      })
      .catch(() => {
        reject()
      })
  })
}
export function show ({ commit }, payload) {
  axiosInstance.defaults.headers.common['token'] = Cookies.get('token')
  return new Promise((resolve, reject) => {
    axiosInstance.get('petani/' + payload.id)
      .then((response) => {
        resolve(response)
      })
      .catch((response) => {
        reject()
      })
  })
}
