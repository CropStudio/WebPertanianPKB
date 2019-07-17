<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
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
                        <span class="text-h5 text-weight-light">Data Anak Petani</span>
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
                            <q-td key="nik" :props="props">
                                {{ props.row.nik }}
                                <q-btn dense round flat :icon="props.expand ? 'arrow_drop_up' : 'arrow_drop_down'" @click="props.expand = !props.expand" />
                            </q-td>
                            <q-td key="user" :props="props">{{ props.row.user }}</q-td>
                            <q-td key="nama" :props="props">{{ props.row.nama }}</q-td>
                            <q-td key="tgllahir" :props="props">{{ props.row.tgl_lahir }}</q-td>
                            <q-td key="jeniskelamin" :props="props">{{ props.row.jenis_kelamin }}</q-td>
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
                    <div class="text-h6">{{ editMode ? 'Edit Data Anak' : 'Tambah Data Anak'}}</div>
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
                                v-model="form.user"
                                label="USER"
                                :rules="[
                  val => !!val || 'NIK dibutuhkan'
                  ]"
                        ></q-input>
                        <q-input
                                outlined
                                dense
                                maxlength="50"
                                v-model="form.nama"
                                label="Nama Lengkap"
                                :rules="[
                  val => !!val || 'Nama Lengkap dibutuhkan'
                  ]"
                        ></q-input>
                        <q-input label="Tanggal Lahir" outlined
                                 dense v-model="date" mask="date" :rules="['date']">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                    <q-date v-model="date" @input="() => $refs.qDateProxy.hide()" />
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                        <q-select
                                outlined dense v-model="form.jenis_kelamin"
                                :options="['Perempuan', 'Laki-Laki']"
                                label="Jenis Kelamin"
                                :rules="[
                  val => !!val || 'Status Keluarga dibutuhkan'
                  ]"/>

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
        { name: 'user', align: 'center', label: 'ID user', field: 'user', sortable: true },
        { name: 'nama', label: 'Nama', field: 'nama' },
        { name: 'tgl_lahir', label: 'Tanggal Lahir', field: 'tgl_lahir' },
        { name: 'jenis_kelamin', label: 'Jenis Kelamin', field: 'jeniskelamin' }
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
              type: 'anak/hapus',
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
          type: 'anak/simpan',
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
          type: 'anak/editsimpan',
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
        type: 'anak/show',
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
      this.$axios.defaults.headers.common['token'] = this.$q.cookies.get('token')
      this.$axios
        .get('anak')
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
