<template>
    <q-page padding>
        <div class="row">
            <div class="col">
                <q-table
                        :data="data"
                        :columns="columns"
                        row-key="nik"
                        :selected.sync="terpilih"
                        selection="multiple"
                        :loading="loading"
                        :filter="filter"
                >
                    <template v-slot:top>
                        <span class="text-h5 text-weight-light">Jatah Pupuk</span>
                        <q-space></q-space>
                        <q-input outlined dense debounce="300" color="primary" v-model.trim="filter">
                            <template v-slot:append>
                                <q-icon name="search"/>
                            </template>
                        </q-input>
                        <q-btn
                                icon="ion-add"
                                unelevated
                                label="Tambah"
                                size="sm"
                                class="q-ml-xs q-mr-xs q-pa-sm bg-green-5 text-white"
                                dense
                                @click="tambah()"
                        />
                    </template>
                    <template v-slot:body="props">
                        <q-tr :props="props">
                            <q-td auto-width>
                                <q-toggle dense v-model="props.selected"/>
                            </q-td>
                            <q-td key="jumlah" :props="props">{{ props.row.jumlah }}</q-td>
                            <q-td key="id_pupuk" :props="props">{{ props.row.id_pupuk }}</q-td>
                            <q-td key="id_poktan" :props="props">{{ props.row.id_poktan }}</q-td>
                            <q-td key="id_petani" :props="props">{{ props.row.id_petani }}</q-td>
                        </q-tr>
                        <q-tr v-show="props.expand" :props="props">
                            <q-td colspan="100%">
                                <div class="text-left q-gutter-x-xs">
                                    <q-btn color="primary" dense size="sm" class="q-px-xs" icon="edit" @click="edit(props.row._id)" label="Edit"/>
                                    <q-btn
                                            color="red"
                                            dense
                                            size="sm"
                                            @click="hapus(props.row._id)"
                                            class="q-px-xs"
                                            icon="delete"
                                            label="Delete"
                                    />
                                </div>
                            </q-td>
                        </q-tr>
                    </template>
                </q-table>
            </div>
        </div>
        <q-dialog v-model="action" persistent>
            <q-card style="width: 500px; max-width: 80vw;">
                <q-card-section class="row items-center">
                    <div class="text-h6">{{ editMode ? 'Edit Jatah Pupuk' : 'Tambah Jatah Pupuk'}}</div>
                    <q-space/>
                    <q-btn icon="close" flat round dense @click="closeDialog()"/>
                </q-card-section>

                <q-separator/>
                <q-form @submit="onSubmit">
                    <q-card-section style="max-height: 50vh" class="scroll">
                        <q-input
                                outlined
                                dense
                                maxlength="50"
                                v-model="form.jumlah"
                                label="Jumlah Pupuk"
                                :rules="[
                  val => !!val || 'Jumlah Pupuk dibutuhkan'
                  ]"
                        ></q-input>
                        <q-input
                                outlined
                                dense
                                maxlength="50"
                                v-model="form.id_pupuk"
                                label="Nama Pupuk"
                                :rules="[
                  val => !!val || 'Nama Pupuk dibutuhkan'
                  ]"
                        ></q-input>
                        <q-input
                                outlined
                                dense
                                maxlength="50"
                                v-model="form.id_poktan"
                                label="Nama Poktan"
                                :rules="[
                  val => !!val || 'Nama Poktan dibutuhkan'
                  ]"
                        ></q-input>
                        <q-input
                                outlined
                                dense
                                maxlength="50"
                                v-model="form.id_petani"
                                label="Nama Petani"
                                :rules="[
                  val => !!val || 'Nama Petani dibutuhkan'
                  ]"
                        ></q-input>

                    </q-card-section>
                    <q-separator/>

                    <q-card-actions align="right">
                        <q-btn flat label="Simpan" type="submit" color="primary"/>
                    </q-card-actions>
                </q-form>
                <q-inner-loading :showing="loadingAction">
                    <q-spinner-dots size="50px" color="primary"/>
                </q-inner-loading>
            </q-card>
        </q-dialog>
    </q-page>
</template>
<script>
export default {
  data () {
    return {
      // tabel
      data: [],
      loading: false,
      filter: '',
      columns: [
        { name: 'jumlah', align: 'center', label: 'Jumlah Pupuk', field: 'jumlah', sortable: true },
        { name: 'id_pupuk', label: 'Nama Pupuk', field: 'id_pupuk' },
        { name: 'id_poktan', label: 'Nama Poktan', field: 'id_poktan', sortable: true },
        { name: 'id_petani', label: 'Nama Petani', field: 'id_petani', sortable: true }
      ],
      terpilih: [],
      // Dialog Action
      editMode: false,
      action: false,
      form: {},
      loadingAction: false
    }
  },
  methods: {
    hapus (_id) {
      this.$q
        .dialog({
          title: 'Konfirmasi Hapus',
          message: 'Ingin menghapus username: ' + _id + '?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$q.loading.show()
          this.$store
            .dispatch({
              type: 'jatah/hapus',
              _id: _id
            })
            .then(response => {
              this.$q.loading.hide()
              if (response.data.status) {
                this.loadData()
                this.$q.notify({
                  color: 'positive',
                  message: response.data.message,
                  icon: 'ion-checkmark'
                })
              } else {
                this.$q.notify({
                  color: 'negative',
                  icon: 'ion-close',
                  message: response.data.message
                })
              }
            })
        })
    },
    onSubmit () {
      this.$q.loading.show()
      if (!this.editMode) {
        // ini fungsi simpan ke database
        this.$store.dispatch({
          type: 'jatah/simpan',
          form: this.form
        })
          .then((response) => {
            this.$q.loading.hide()
            if (response.data.status) {
              this.closeDialog()
              this.loadData()
              this.$q.notify({
                color: 'positive',
                message: response.data.message,
                icon: 'ion-checkmark'
              })
            } else {
              this.$q.notify({
                color: 'negative',
                message: response.data.message,
                icon: 'ion-close'
              })
            }
          })
      } else {
        // ini fungsi edit ke database
        this.$store.dispatch({
          type: 'jatah/editsimpan',
          form: this.form
        })
          .then((response) => {
            this.$q.loading.hide()
            if (response.data.status) {
              this.closeDialog()
              this.loadData()
              this.$q.notify({
                color: 'positive',
                message: response.data.message,
                icon: 'ion-checkmark'
              })
            } else {
              this.$q.notify({
                color: 'negative',
                message: response.data.message,
                icon: 'ion-close'
              })
            }
          })
      }
    },
    edit (id) {
      this.loadingAction = true
      this.editMode = true
      this.action = true
      this.$store.dispatch({
        type: 'jatah/show',
        id: id
      })
        .then((response) => {
          this.loadingAction = false
          this.form = response.data.message
        })
    },
    tambah () {
      this.action = true
      this.editMode = false
    },
    closeDialog () {
      this.action = false
      this.editMode = false
      this.form = {}
    },
    loadData () {
      this.loading = true
      // this.$axios.defaults.headers.common['token'] = this.$q.cookies.get('token')
      this.$axios
        .get('api/jatah')
        .then(response => {
          this.loading = false
          this.data = response.data.message
        })
        .catch(error => {
          this.loading = false
          console.log(error)
          this.$q.notify({
            color: 'negative',
            icon: 'ion-close',
            message: 'Sambungan ke server bermasalah!'
          })
        })
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>
