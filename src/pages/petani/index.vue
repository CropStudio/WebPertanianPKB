<template>
    <q-page padding>
        <div class="row">
            <div class="col">
                <q-table
                        :data="data"
                        :columns="columns"
                        row-key="id"
                        :selected.sync="terpilih"
                        selection="multiple"
                        @request="onRequest"
                        :loading="loading"
                        :filter="filter"
                        :pagination.sync="pagination"
                        binary-state-sort
                >
                    <template v-slot:top>
                        <span class="text-h5 text-weight-light">Data Petani</span>
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
                        <q-btn
                                icon="ion-cloud-upload"
                                unelevated
                                label="Import Data Petani"
                                size="sm"
                                class="q-ml-xs q-mr-xs q-pa-sm bg-blue-5 text-white"
                                dense
                                @click="upload = true"
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
                            <q-td key="nama" :props="props">{{ props.row.nama }}</q-td>
                            <q-td key="jenis_kelamin" :props="props">{{ props.row.jenis_kelamin }}</q-td>
                            <q-td key="komoditas" :props="props">{{ props.row.komoditas }}</q-td>
                            <q-td key="nama_poktan" :props="props">{{ props.row.nama_poktan }}</q-td>
                            <q-td key="luas_lahan" :props="props">{{ props.row.luas_lahan }}</q-td>
                        </q-tr>
                        <q-tr v-show="props.expand" :props="props">
                            <q-td colspan="100%">
                                <div class="text-left q-gutter-x-xs">
                                    <q-btn color="primary" dense size="sm" class="q-px-xs" icon="edit" @click="edit(props.row.id)" label="Edit"/>
                                    <q-btn
                                            color="red"
                                            dense
                                            size="sm"
                                            @click="hapus(props.row.id, props.row.nik)"
                                            class="q-px-xs"
                                            icon="delete"
                                            label="Delete"
                                    />
                                    <q-btn color="secondary" dense size="sm" class="q-px-xs" icon="info" @click="showQr(props.row.nik)" label="Show QR-Code"/>
                                </div>
                            </q-td>
                        </q-tr>
                    </template>
                </q-table>
            </div>
        </div>
        <q-dialog @show="bukaDialog" v-model="action" persistent>
            <q-card style="width: 500px; max-width: 80vw;">
                <q-card-section class="row items-center">
                    <div class="text-h6">{{ editMode ? 'Edit Data Petani' : 'Tambah Data Petani'}}</div>
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
                                label="Nama Lengkap"
                                :rules="[
                  val => !!val || 'Nama Lengkap dibutuhkan'
                  ]"
                        ></q-input>
                        <q-select
                          dense
                          outlined v-model="form.jenis_kelamin"
                          :options="['Perempuan', 'Laki-Laki']"
                          label="Jenis Kelamin"
                          :rules="[
                          val => !!val || 'Jenis Kelamin dibutuhkan'
                          ]"/>
                        <q-input
                                outlined
                                dense
                                maxlength="50"
                                v-model="form.komoditas"
                                label="Komoditas"
                                :rules="[
                  val => !!val || 'Komoditas dibutuhkan'
                  ]"
                        ></q-input>

                      <q-input
                        outlined
                        dense
                        type="number"
                        maxlength="50"
                        v-model="form.luas_lahan"
                        label="Luas Lahan"
                        :rules="[
                  val => !!val || 'Luas Lahan dibutuhkan'
                  ]"
                      ></q-input>
                      <q-select
                      :rules="[
                      val => !!val || 'Nama Poktan dibutuhkan'
                      ]"
                      outlined
                      v-if="!form.nama_poktan"
                      v-model="form.id_poktan"
                      :options="poktanOptions"
                      label="Nama Poktan"
                      @filter="filterPoktan"
                      use-input
                      map-options
                      clearable
                      emit-value
                      dense
                      >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Tidak ada data
                          </q-item-section>
                        </q-item>
                      </template>
                      </q-select>
                      <q-list dense v-else bordered>
                        <q-item class="q-my-sm">
                          <q-item-section>
                            <q-item-label class="text-weight-regular text-grey">Nama Poktan</q-item-label>
                            <q-item-label class="text-green text-weight-bold" lines="1">{{form.nama_poktan}}</q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <q-btn flat icon="delete" @click="deletePoktan(form.id)" color="red"></q-btn>
                          </q-item-section>
                        </q-item>
                      </q-list>
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
        <q-dialog v-model="upload">
            <q-card class="text-white bg-green-5">
                <q-card-section>
                    <div class="text-h6 text-weight-light">Upload</div>
                    <div class="text-weight-thin">Import data dari data csv.</div>
                </q-card-section>
              <q-card-section style="max-height: 70vh" class="scroll">
                    <div class="column q-col-gutter-y-sm">
                        <div class="col-12">
                            <q-select
                                    dense
                                    ref="delimited"
                                    dark
                                    filled
                                    color="white"
                                    :options="[',',';']"
                                    v-model="delimited"
                                    label="Delimited/Pemisah file CSV"
                            />
                        </div>
                        <div class="col-12">
                            <q-input
                                    color="white"
                                    class="text-white"
                                    @input="val => { file = val[0] }"
                                    filled
                                    type="file"
                                    hint="Silahkan upload file dengan csv dengan header yang telah ditentukan sebelumnya."
                                    @change="loadCSV($event)"
                            />
                        </div>
                      <div class="col" v-if="parse_csv.length !== 0">
                        <q-markup-table class="q-mr-md" separator="vertical">
                          <thead>
                          <tr>
                            <th
                              v-for="(key, index) in parse_header"
                              :key="index"
                              @click="sortBy(key)"
                              :class="{ active: sortKey == key }"
                            >
                              {{ key }}
                            </th>
                          </tr>
                          </thead>
                          <tr v-for="(csv, index) in parse_csv.slice(0, 10)" :key="index">
                            <td class="text-center" v-for="(key, index) in parse_header" :key="index">{{csv[key]}}</td>
                          </tr>
                        </q-markup-table>
                      </div>
                    </div>
                <q-btn v-if="parse_csv.length !== 0" disable flat align="center" color="white" label="Table di atas adalah preview 10 Data yang akan diverifikasi oleh sistem sebagai data yang telah TERBAYAR"/>
              </q-card-section>
                <q-card-actions align="right">
                    <q-btn color="white" flat label="Batal" @click="upload = false"/>
                    <q-btn color="teal" blue @click="uploadData()" label="Upload"/>
                  <q-btn color="red" @click="parse_csv = []" label="Reset"/>
                  <q-space></q-space>
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="qr">
          <q-card>
            <q-card-section>
              <div class="text-h6">Scan Disini</div>
            </q-card-section>

            <q-card-section>
              <qr :text="idAktif"></qr>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
    </q-page>
</template>
<script>
import qr from 'vue-qrcode-component'
export default {
  components: {
    qr
  },
  data () {
    return {
      qr: false,
      idAktif: '',
      error: [],
      parse_header: [],
      parse_csv: [],
      sortOrders: {},
      sortKey: '',
      delimited: ';',
      // tabel
      data: [],
      pagination: {
        sortBy: 'nama',
        descending: false,
        page: 1,
        rowsPerPage: 3,
        rowsNumber: 10
      },
      loading: false,
      filter: '',
      poktanOptions: [],
      poktan: [],
      columns: [
        // {
        //   name: 'nik',
        //   required: true,
        //   label: 'NIK',
        //   align: 'left',
        //   field: row => row.nik,
        //   format: val => `${val}`,
        //   sortable: true
        // },
        { name: 'nik', align: 'center', label: 'NIK', field: 'nik', sortable: true },
        { name: 'nama', align: 'center', label: 'Nama Petani', field: 'nama', sortable: true },
        { name: 'jenis_kelamin', align: 'center', label: 'Jenis Kelamin', field: 'jenis_kelamin' },
        { name: 'komoditas', align: 'center', label: 'Komoditas', field: 'komoditas' },
        { name: 'nama_poktan', align: 'center', label: 'Poktan', field: 'nama_poktan', sortable: true },
        { name: 'luas_lahan', align: 'center', label: 'Luas Lahan', field: 'luas_lahan', sortable: true }
      ],
      terpilih: [],
      // Dialog Action
      upload: false,
      editMode: false,
      action: false,
      form: {},
      loadingAction: false
    }
  },
  methods: {
    csvJSON (csv) {
      var vm = this
      var lines = csv.split('\r\n')
      var result = []
      var delimited = this.delimited
      var headers = lines[0].split(delimited)
      vm.parse_header = lines[0].split(delimited)
      lines[0].split(delimited).forEach(function (key) {
        vm.sortOrders[key] = 1
      })

      lines.map((line, indexLine) => {
        if (indexLine < 1) return // Jump header line
        var obj = {}
        var currentline = line.split(this.delimited)

        headers.map(function (header, indexHeader) {
          obj[header] = currentline[indexHeader]
        })
        result.push(obj)
      })
      result.pop() // remove the last item because undefined values
      // console.log(result)
      return result // JavaScript object
    },
    sortBy: function (key) {
      var vm = this
      vm.sortKey = key
      vm.sortOrders[key] = vm.sortOrders[key] * -1
    },
    loadCSV (e) {
      var vm = this
      if (window.FileReader) {
        if (e.target.files[0].type === 'application/vnd.ms-excel' || e.target.files[0].type === 'text/csv') {
          var reader = new FileReader()
          reader.readAsText(e.target.files[0])
          // Handle errors load
          reader.onload = function (event) {
            var csv = event.target.result
            vm.parse_csv = vm.csvJSON(csv)
          }
          reader.onerror = function (evt) {
            if (evt.target.error.name === 'NotReadableError') {
              alert('Tidak bisa membaca file!')
            }
          }
        } else {
          this.$q.notify({
            icon: 'ion-alert',
            color: 'yellow-10',
            message: 'File format bukan CSV! Silahkan cek file format anda.'
          })
        }
      } else {
        alert('FileReader are not supported in this browser.')
      }
    },
    bukaDialog () {
      this.loadPoktan()
    },
    showQr (id) {
      this.idAktif = id
      this.qr = true
      // console.log(id)
    },
    uploadData () {
      if (this.parse_csv.length > 0) {
        this.$q.loading.show()
        this.$store
          .dispatch({
            type: 'petani/upload',
            data: this.parse_csv
          })
          .then(response => {
            this.$q.loading.hide()
            if (response.success) {
              this.$q.notify({
                icon: 'ion-checkmark',
                color: 'positive',
                message: 'Berhasil mengupload data!'
              })
              this.loadData()
              this.upload = false
              this.parse_csv = []
            } else {
              this.$q.notify({
                icon: 'ion-close',
                color: 'negative',
                message: response.message
              })
              this.error = response.data
            }
          })
      } else {
        this.$q.notify({
          icon: 'ion-alert',
          color: 'warning',
          message: 'Belum memilih file'
        })
      }
    },
    deletePoktan (id) {
      this.$q
        .dialog({
          title: 'Konfirmasi Hapus',
          message: 'Ingin menghapus Poktan dari Petani ini ?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$q.loading.show()
          this.$store
            .dispatch({
              type: 'petani/hapusPoktan',
              id: id
            })
            .then(response => {
              this.$q.loading.hide()
              if (response.data.status) {
                this.form = {}
                this.edit(id)
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
    hapus (id, nik) {
      this.$q
        .dialog({
          title: 'Konfirmasi Hapus',
          message: 'Ingin menghapus NIK: ' + nik + '?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$q.loading.show()
          this.$store
            .dispatch({
              type: 'petani/hapus',
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
          type: 'petani/simpan',
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
          type: 'petani/editsimpan',
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
    filterPoktan (val, update, abort) {
      if (val.length < 2) {
        abort()
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.poktanOptions = this.poktanMapped.filter(v =>
          v !== null ? v.label.toLowerCase().indexOf(needle) > -1 : null
        )
      })
    },
    edit (id) {
      this.loadingAction = true
      this.editMode = true
      this.action = true
      this.$store.dispatch({
        type: 'petani/show',
        id: id
      })
        .then((response) => {
          this.loadingAction = false
          this.form = response.data.message
        })
    },
    loadPoktan () {
      this.$store.dispatch({
        type: 'poktan/index'
      })
        .then(response => {
          if (response.data.status) {
            this.poktan = response.data.message
          }
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
    onRequest (props) {
      console.log(props)
      let { page, rowsPerPage, sortBy, descending } = props.pagination
      let filter = props.filter
      this.loading = true
      this.$axios
        .get('api/petani', {
          params: {
            page: page,
            sortBy: sortBy,
            descending: descending,
            filter: filter,
            jumlahPerRow: rowsPerPage
          }
        })
        .then(response => {
          this.loading = false
          this.data = response.data.message.data
          this.pagination.page = response.data.message.current_page
          this.pagination.rowsPerPage = response.data.message.per_page
          this.pagination.sortBy = sortBy
          this.pagination.descending = descending
          this.pagination.rowsNumber = response.data.message.total
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
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
  },
  computed: {
    poktanMapped () {
      return this.poktan.map(item => (
        {
          label: item.nama,
          value: item.id
        }
      ))
    }
  }
}
</script>
