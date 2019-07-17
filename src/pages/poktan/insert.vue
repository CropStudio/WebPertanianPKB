<template>
    <q-page padding>
        <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
        >
            <q-input
                    filled
                    v-model="data.nama"
                    label="NAMA"
                    hint="NAMA"
            />
            <q-input
                    filled
                    v-model="data.kabupaten"
                    label="Kabupaten"
                    hint="Kabupaten"
            />
            <q-input
                    filled
                    v-model="data.kecamatan"
                    label="Kecamatan"
                    hint="Kecamatan"
            />
            <q-input
                    filled
                    v-model="data.desa"
                    label="Desa"
                    hint="Desa"
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
          type: 'poktan/editsimpan',
          nama: this.data.nama,
          kabupaten: this.data.kabupaten,
          kecamatan: this.data.kecamatan,
          desa: this.data.desa
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
          type: 'poktan/simpan',
          nama: this.data.nama,
          kabupaten: this.data.kabupaten,
          kecamatan: this.data.kecamatan,
          desa: this.data.desa
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
      this.nama = null
      this.kabupaten = null
      this.kecamatan = null
      this.desa = null
      this.accept = false
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.$axios.get('poktan/' + this.$route.params.id)
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
