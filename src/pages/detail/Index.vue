<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
      <div>
        <p class="error">{{ error }}</p>

        <p class="decode-result">Last result: <b>{{ result }}</b></p>
        {{ _id }} {{ nama }}

        <qrcode-stream @decode="onDecode" @init="onInit" />
      </div>
      <q-input v-model="input" filled type="email" hint="" style="width: 300px; height: 50px"
               :loading="loadingState"
               label="Masukan NIK"/>

      <q-btn color="primary" label="Cari " />
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
      input: '',
      result: '',
      eror: '',
      id: '',
      nama: ''
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
              this._id = 'id petani: ' + data._id
              this.nama = 'nama petani: ' + data.nama
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
