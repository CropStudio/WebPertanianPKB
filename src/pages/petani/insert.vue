<template>
    <q-page padding>
        <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
        >
            <q-input
                    filled
                    v-model="data.nik"
                    label="NIK"
                    hint="NIK"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type your KTP']"
            />
            <q-input
                    filled
                    v-model="data.nama"
                    label="NAMA"
                    hint="NAMA"
            />
            <q-input
                    filled
                    v-model="data.jenis_kelamin"
                    label="Jenis Kelamin"
                    hint="Jenis Kelamin"
            />
            <q-input
                    filled
                    v-model="data.komoditas"
                    label="Komoditas"
                    hint="Komoditas"
            />
            <q-input
                    filled
                    v-model="data.id_poktan"
                    label="Id Poktan"
                    hint="Id Poktan"
            />
            <q-input
                    filled
                    v-model="data.luas_lahan"
                    label="Luas Lahan"
                    hint="Luas Lahan"
            />
            <div>
                <q-btn label="Submit" type="submit" color="primary"/>
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
        </q-form>
    </q-page>
</template>
<script>
export default {
  data () {
    return {
      data: {},
      id: this.$route.params.id
    }
  },
  methods: {
    onSubmit () {
      if (this.$route.params.id) {
        // ini fungsi simpan edit
        this.$q.loading.show()
        this.$store.dispatch({
          type: 'petani/editsimpan',
          _id: this.data._id,
          nik: this.data.nik,
          nama: this.data.nama,
          jenis_kelamin: this.data.jenis_kelamin,
          komoditas: this.data.komoditas,
          id_poktan: this.data.idpoktan,
          luas_lahan: this.data.luaslahan,
          id_user: this.data.iduser
        })
          .then((response) => {
            this.$q.loading.hide()
            if (response.status) {
              this.loadData()
              this.$q.notify({
                message: 'Berhasil simpan',
                color: 'positive',
                icon: 'checkmark'
              })
            } else {
              this.$q.notify({
                message: 'Gagal simpan',
                color: 'negative',
                icon: 'close'
              })
            }
          })
      } else {
        // ini fungsi simpan
        this.$q.loading.show()
        this.$store.dispatch({
          type: 'petani/simpan',
          nik: this.data.nik,
          nama: this.data.nama,
          jenis_kelamin: this.data.jenis_kelamin,
          komoditas: this.data.komoditas,
          id_poktan: this.data.idpoktan,
          luas_lahan: this.data.luaslahan,
          id_user: this.data.iduser
        })
          .then((response) => {
            this.$q.loading.hide()
            if (response.status) {
              this.$q.notify({
                message: 'Berhasil simpan',
                color: 'positive',
                icon: 'checkmark'
              })
            } else {
              this.$q.notify({
                message: 'Gagal simpan',
                color: 'negative',
                icon: 'close'
              })
            }
          })
      }
    },
    onReset () {
      this._id = null
      this.nik = null
      this.nama = null
      this.jenis_kelamin = null
      this.komoditas = null
      this.id_poktan = null
      this.luas_lahan = null
      this.id_user = null
      this.accept = false
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.$axios.get('petani/' + this.$route.params.id)
        .then((response) => {
          if (response.data.status) {
            this.data = response.data.message
          } else {
            this.$q.notify({
              color: 'negative',
              message: 'Gagal mendapatkan data',
              icon: 'close'
            })
          }
        })
    }
  }
}
</script>
