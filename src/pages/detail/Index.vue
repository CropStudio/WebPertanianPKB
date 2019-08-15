<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
      <div>
        <p class="error">{{ error }}</p>

        <p class="decode-result">NIK: <b>{{ result }}</b></p>
        {{ _id }} <br> {{ nama }} <br> {{ jenis_kelamin }} <br> {{ komoditas }} <br> {{ poktan }} <br> {{ luas_lahan }}

        <qrcode-stream @decode="onDecode" @init="onInit" />
      </div>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
  components: { QrcodeStream },
  data () {
    return {
      text: '',
      result: '',
      eror: '',
      id: '',
      nama: '',
      jenis_kelamin: '',
      komoditas: '',
      poktan: '',
      luas_lahan: ''

    }
  },
  methods: {
    onDecode (result) {
      this.result = result
      this.getpetanibyNIK()
    },
    getpetanibyNIK () {
      return new Promise(async (resolve, reject) => {
        try {
          await this.$axios.get('petani/' + this.result)
            .then(res => {
              console.log(res)
              let data = res.data
              this._id = 'ID Petani: ' + data._id
              this.nama = 'Nama Petani: ' + data.nama
              this.jenis_kelamin = 'Jenis kelamin: ' + data.jenis_kelamin
              this.komoditas = 'Komoditas: ' + data.komoditas
              this.poktan = 'Poktan: ' + data.result[0].nama
              this.luas_lahan = 'Luas Lahan: ' + data.luas_lahan
              // this.datapetani = res.data
            })
        } catch (eror) {
          console.log(eror)
        }
      })
    },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permisson'
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser'
        }
      }
    }
  }
}
</script>

<style scoped>
  .error {
    font-weight: bold;
    color: red;
  }
</style>
