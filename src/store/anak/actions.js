/*
export function someAction (context) {
}
*/
import { axiosInstance } from 'boot/axios'
// import { Cookies } from 'quasar'
export function simpan ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axiosInstance.post('api/anak', {
      nama: payload.form.nama,
      tanggal_lahir: payload.form.tanggal_lahir,
      jenis_kelamin: payload.form.jenis_kelamin
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
    axiosInstance.put('api/anak/' + payload.form.id, {
      nama: payload.form.nama,
      tanggal_lahir: payload.form.tanggal_lahir,
      jenis_kelamin: payload.form.jenis_kelamin
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
    axiosInstance.delete('api/anak/' + payload.id)
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
    axiosInstance.get('api/anak/' + payload.id)
      .then((response) => {
        resolve(response)
      })
      .catch((response) => {
        reject()
      })
  })
}
