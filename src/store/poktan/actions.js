/*
export function someAction (context) {
}
*/
import { axiosInstance } from 'boot/axios'
// import { Cookies } from 'quasar'

export function logout ({ commit }) {
  return new Promise((resolve, reject) => {
    commit('logout')
    // Cookies.remove('token', { path: '/' })
    delete axiosInstance.defaults.headers.common['Authorization']
    resolve()
  })
}
export function retrieveInfo ({ commit }) {
  return new Promise((resolve, reject) => {
    axiosInstance.get('api/poktan')
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
    axiosInstance.post('api/poktan', {
      nama: payload.form.nama,
      kabupaten: payload.form.kabupaten,
      kecamatan: payload.form.kecamatan,
      desa: payload.form.desa
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
    axiosInstance.put('api/poktan/' + payload.form.id, {
      nama: payload.form.nama,
      kabupaten: payload.form.kabupaten,
      kecamatan: payload.form.kecamatan,
      desa: payload.form.desa
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
    axiosInstance.delete('api/poktan/' + payload.id)
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
    axiosInstance.get('api/poktan/' + payload.id)
      .then((response) => {
        resolve(response)
      })
      .catch((response) => {
        reject()
      })
  })
}
