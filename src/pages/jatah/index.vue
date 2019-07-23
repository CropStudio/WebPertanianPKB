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
                            <q-td key="jumlah" :props="props">
                                {{ props.row.jumlah }}
                                <q-btn dense round flat :icon="props.expand ? 'arrow_drop_up' : 'arrow_drop_down'" @click="props.expand = !props.expand" />
                            </q-td>
                            <q-td key="nama_pupuk" :props="props">{{ props.row.nama_pupuk }}</q-td>
                            <q-td key="nama_poktan" :props="props">{{ props.row.nama_poktan }}</q-td>
                            <q-td key="nama_petani" :props="props">{{ props.row.nama_petani }}</q-td>
                        </q-tr>
                        <q-tr v-show="props.expand" :props="props">
                            <q-td colspan="100%">
                                <div class="text-left q-gutter-x-xs">
                                    <q-btn color="primary" dense size="sm" class="q-px-xs" icon="edit" @click="edit(props.row.id)" label="Edit"/>
                                    <q-btn
                                            color="red"
                                            dense
                                            size="sm"
                                            @click="hapus(props.row.id)"
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
                                :rules="[ val => !!val || 'Jumlah Pupuk dibutuhkan']" ></q-input>
                      <q-select
                        :rules="[
                        val => !!val || 'Nama Pupuk dibutuhkan'
                        ]"
                        v-if="!form.nama_pupuk"
                        outlined
                        v-model="form.id_pupuk"
                        :options="pupukOptions"
                        label="Nama Pupuk"
                        @filter="filterPupuk"
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
                            <q-item-label class="text-weight-regular text-grey">Nama Pupuk</q-item-label>
                            <q-item-label class="text-green text-weight-bold" lines="1">{{ form.nama_pupuk }}</q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <q-btn flat icon="delete" color="red"></q-btn>
                          </q-item-section>
                        </q-item>
                      </q-list>
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
                      <q-select
                        v-if="!form.nama_petani"
                        outlined
                        v-model="form.id_petani"
                        :options="petaniOptions"
                        label="Nama Petani"
                        @filter="filterPetani"
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
                            <q-item-label class="text-weight-regular text-grey">Nama Petani</q-item-label>
                            <q-item-label class="text-green text-weight-bold" lines="1">{{form.nama_petani}}</q-item-label>
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
      columns: [
        { name: 'jumlah', align: 'center', label: 'Jumlah Pupuk', field: 'jumlah', sortable: true },
        { name: 'nama_pupuk', align: 'center', label: 'Nama Pupuk', field: 'nama_pupuk' },
        { name: 'nama_poktan', align: 'center', label: 'Nama Poktan', field: 'nama_poktan', sortable: true },
        { name: 'nama_petani', align: 'center', label: 'Nama Petani', field: 'nama_petani', sortable: true }
      ],
      terpilih: [],
      // Dialog Action
      editMode: false,
      action: false,
      form: {},
      loadingAction: false,
      petaniOptions: [],
      petani: [],
      pupukOptions: [],
      pupuk: [],
      poktanOptions: [],
      poktan: []
    }
  },
  methods: {
    hapus (id) {
      this.$q
        .dialog({
          title: 'Konfirmasi Hapus',
          message: 'Ingin menghapus data ini ?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$q.loading.show()
          this.$store
            .dispatch({
              type: 'jatah/hapus',
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
    loadPupuk: function () {
      this.$store.dispatch({
        type: 'pupuk/index'
      })
        .then(response => {
          if (response.data.status) {
            this.pupuk = response.data.message
          }
        })
    },
    loadPetani () {
      this.$store.dispatch({
        type: 'petani/index'
      })
        .then(response => {
          if (response.data.status) {
            this.petani = response.data.message
          }
        })
    },
    bukaDialog () {
      this.loadPoktan()
      this.loadPupuk()
      this.loadPetani()
    },
    filterPupuk (val, update, abort) {
      if (val.length < 2) {
        abort()
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.pupukOptions = this.pupukMapped.filter(v =>
          v !== null ? v.label.toLowerCase().indexOf(needle) > -1 : null
        )
      })
    },
    filterPetani (val, update, abort) {
      if (val.length < 2) {
        abort()
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.petaniOptions = this.petaniMapped.filter(v =>
          v !== null ? v.label.toLowerCase().indexOf(needle) > -1 : null
        )
      })
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
    }
  },
  mounted () {
    this.loadData()
  },
  computed: {
    pupukMapped () {
      return this.pupuk.map(item => (
        {
          label: item.nama,
          value: item.id
        }
      ))
    },
    petaniMapped () {
      return this.petani.map(item => (
        {
          label: item.nama,
          value: item.id
        }
      ))
    },
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
