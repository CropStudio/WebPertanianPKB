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
                        :loading="loading"
                        :filter="filter"
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
                            <q-btn flat icon="delete" color="red"></q-btn>
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
      poktanOptions: [],
      poktan: [],
      columns: [
        {
          name: 'nik',
          required: true,
          label: 'NIK',
          align: 'left',
          field: row => row.nik,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'nama', align: 'center', label: 'Nama Petani', field: 'nama', sortable: true },
        { name: 'jenis_kelamin', align: 'center', label: 'Jenis Kelamin', field: 'jenis_kelamin' },
        { name: 'komoditas', align: 'center', label: 'Komoditas', field: 'komoditas' },
        { name: 'nama_poktan', align: 'center', label: 'Poktan', field: 'nama_poktan', sortable: true },
        { name: 'luas_lahan', align: 'center', label: 'Luas Lahan', field: 'luas_lahan', sortable: true }
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
    bukaDialog () {
      this.loadPoktan()
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
    loadData () {
      this.loading = true
      // this.$axios.defaults.headers.common['token'] = this.$q.cookies.get('token')
      this.$axios
        .get('api/petani')
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
