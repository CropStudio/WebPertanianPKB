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
            <span class="text-h5 text-weight-light">Informasi Pengguna</span>
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
                {{props.row.nik}}
                <q-btn
                  dense
                  round
                  flat
                  :icon="props.expand ? 'arrow_drop_up' : 'arrow_drop_down'"
                  @click="props.expand = !props.expand"
                />
              </q-td>
              <q-td key="nama" :props="props">{{props.row.nama}}</q-td>
              <q-td key="role" :props="props">{{props.row.role}}</q-td>
              <q-td key="ktp" :props="props">{{props.row.ktp}}</q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
              <q-td colspan="100%">
                <div class="text-left q-gutter-x-xs">
                  <q-btn color="primary" dense size="sm" class="q-px-xs" icon="edit" @click="edit(props.row.id)" label="Edit"/>
                  <q-btn
                    color="red"
                    dense
                    size="sm"
                    @click="hapus(props.row.id, props.row.nama)"
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
          <div class="text-h6">{{ editMode ? 'Edit Data Pengguna' : 'Tambah Data Pengguna'}}</div>
          <q-space/>
          <q-btn icon="close" flat round dense @click="closeDialog()"/>
        </q-card-section>

        <q-separator/>
        <q-form @submit="onSubmit">
          <q-card-section style="max-height: 50vh" class="scroll">
            <q-input
              outlined
              dense
              maxlength="12"
              v-model="form.nik"
              hint="Maksimal 12 huruf terdiri dari angka dan huruf"
              label="NIK"
              :rules="[
                  val => !!val || 'NIK dibutuhkan'
                  ]"
            ></q-input>
            <q-input
              outlined
              dense
              maxlength="50"
              v-model="form.nama"
              hint="Maksimal 50 huruf terdiri dari huruf tidak boleh angka"
              label="Nama Lengkap"
              :rules="[
                  val => !!val || 'Nama Lengkap dibutuhkan'
                  ]"
            ></q-input>
            <q-toggle
                v-if="editMode"
                v-model="gantiPass"
                dense
                label="Ganti Password ?"
              />
              <div v-if="gantiPass || !editMode">
                <q-input
                  ref="password"
                  v-model="form.password"
                  label="Password"
                  dense
                  outlined
                  :type="isPwd ? 'password' : 'text'"
                  hint="Password maksimal 12 huruf!"
                  :rules="[
                  val => !!val || 'Password dibutuhkan!',
                  val => val.length >= 6 || 'Minimal 6 huruf!',
                  val => val.length <= 12 || 'Maksimal 12 huruf!'
                  ]"
                ><template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template></q-input>
                <q-input
                  ref="konfPass"
                  label="Konfirmasi Password"
                  v-model="konfPass"
                  dense
                  outlined
                  :type="isPwd ? 'password' : 'text'"
                  hint="Konfirmasi Password mesti sama"
                  :rules="[
                  val => !!val || 'Konfirmasi Password dibutuhkan!',
                  val => val === this.form.password || 'Password tidak sama!'
                  ]"
                ></q-input>
              </div>
            <p class="text-subtitle2 text-grey-7">
              Role :
              <q-radio
                keep-color
                v-model.trim="form.role"
                :val=1
                label="Admin"
                color="green"
              />
              <q-radio keep-color v-model.trim="form.role" :val=2 label="POKTAN" color="blue"/>
              <q-radio keep-color v-model.trim="form.role" :val=3 label="Petani" color="red"/>
              <q-radio
                keep-color
                v-model.trim="form.role"
                :val=4
                label="Gubernur"
                color="yellow"
              />
            </p>
            <div class="row q-col-gutter-sm">
              <div class="col-12">
                <q-uploader
                  url="http://localhost:4444/upload"
                  label="Kartu KTP"
                  accept=".jpg, image/*"
                  color="teal"
                />
              </div>
              <div class="col-12">
                <q-uploader
                  url="http://localhost:4444/upload"
                  label="Kartu Keluarga"
                  accept=".jpg, image/*"
                  color="red"
                />
              </div>
            </div>
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
        {
          name: 'nik',
          required: true,
          label: 'NIK',
          align: 'center',
          field: 'nik',
          sortable: true
        },
        {
          name: 'nama',
          align: 'center',
          label: 'Nama',
          field: 'nama',
          sortable: true
        },
        {
          name: 'role',
          align: 'center',
          label: 'Role',
          field: 'role',
          sortable: true
        },
        {
          name: 'ktp',
          align: 'center',
          label: 'Photo KTP',
          field: 'ktp',
          sortable: true
        }
      ],
      terpilih: [],
      // Dialog Action
      editMode: false,
      action: false,
      form: {},
      gantiPass: false,
      isPwd: true,
      konfPass: '',
      loadingAction: false
    }
  },
  methods: {
    hapus (id, nama) {
      this.$q
        .dialog({
          title: 'Konfirmasi Hapus',
          message: 'Ingi menghapus pengguna: ' + nama + '?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$q.loading.show()
          this.$store
            .dispatch({
              type: 'user/hapus',
              id: id
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
          type: 'user/simpan',
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
          type: 'user/edit',
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
        type: 'user/show',
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
      this.$axios
        .get('api/user')
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
