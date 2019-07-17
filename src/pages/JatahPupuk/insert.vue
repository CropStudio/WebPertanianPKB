<template>
    <q-page padding>
        <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
        >
            <q-input
                    filled
                    v-model.number="data.jumlah"
                    label="Jumlah"
                    hint="Jumlah"
                    type="number"
            />
            <q-input
                    filled
                    v-model="data.id_pupuk"
                    label="Nama Pupuk"
                    hint="Nama Pupuk"
            />
            <q-input
                    filled
                    v-model="data.id_poktan"
                    label="Nama Poktan"
                    hint="Nama Poktan"
            />
            <q-input
                    filled
                    v-model="data.id_petani"
                    label="Nama Petani"
                    hint="Nama Petani"
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
          type: 'JatahPupuk/editsimpan',
          _id: this.data._id,
          jumlah: this.data.jumlah,
          id_pupuk: this.data.idpupuk,
          id_poktan: this.data.idpoktan,
          id_petani: this.data.idpetani
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
          type: 'JatahPupuk/simpan',
          jumlah: this.data.jumlah,
          id_pupuk: this.data.idpupuk,
          id_poktan: this.data.idpoktan,
          id_petani: this.data.idpetani
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
      this.jumlah = null
      this.id_pupuk = null
      this.id_poktan = null
      this.id_petani = null
      this.accept = false
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.$axios.get('JatahPupuk/' + this.$route.params.id)
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
