/*
export function someAction (context) {
}
*/
import { axiosInstance } from 'boot/axios'
import { Cookies } from 'quasar'

export function logout ({ commit }) {
  return new Promise((resolve, reject) => {
    commit('logout')
    Cookies.remove('token', { path: '/' })
    delete axiosInstance.defaults.headers.common['Authorization']
    resolve()
  })
}
export function retrieveInfo ({ commit }) {
  return new Promise((resolve, reject) => {
    axiosInstance.get('api/jatah')
      .then((response) => {
        resolve(response)
      })
      .catch((response) => {
        reject()
      })
  })
}
export function simpan ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axiosInstance.post('api/jatah', {
      jumlah: payload.form.jumlah,
      id_pupuk: payload.form.id_pupuk,
      id_poktan: payload.form.id_poktan,
      id_petani: payload.form.id_petani
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
    axiosInstance.put('api/jatah/' + payload.form.id, {
      jumlah: payload.form.jumlah,
      id_pupuk: payload.form.id_pupuk,
      id_poktan: payload.form.id_poktan,
      id_petani: payload.form.id_petani
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
    axiosInstance.delete('api/jatah/' + payload.id)
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
    axiosInstance.get('api/jatah/' + payload.id)
      .then((response) => {
        resolve(response)
      })
      .catch((response) => {
        reject()
      })
  })
}
