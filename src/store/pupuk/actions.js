/*
export function someAction (context) {
}
*/
import { axiosInstance } from 'boot/axios'
// import { Cookies } from 'quasar'
export function simpan ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axiosInstance.post('api/pupuk', {
      nama: payload.form.nama,
      jenis: payload.form.jenis
    })
      .then((response) => {
        resolve(response)
      })
      .catch((response) => {
        reject()
      })
  })
}
export function editsimpan ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axiosInstance.put('api/pupuk/' + payload.form.id, {
      nama: payload.form.nama,
      jenis: payload.form.jenis
    })
      .then((response) => {
        resolve(response)
      })
      .catch((response) => {
        reject()
      })
  })
}
export function hapus ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axiosInstance.delete('api/pupuk/' + payload.id)
      .then((response) => {
        resolve(response)
      })
      .catch((response) => {
        reject()
      })
  })
}
export function show ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axiosInstance.get('api/pupuk/' + payload.id)
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
    axiosInstance.get('api/pupuk')
      .then((response) => {
        resolve(response)
      })
      .catch((response) => {
        reject()
      })
  })
}
