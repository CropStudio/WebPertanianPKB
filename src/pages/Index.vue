<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page padding>
      <div class="row q-pa-sm q-col-gutter-md">
        <div class="col">
          <q-select
            v-model="kotaSel"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            option-value="id"
            option-label="name"
            :options="optionsKota"
            @filter="filterKota"
            standout="bg-primary text-white"
            label="Pilih Kota"
            @input="loadKecamatan"
          >
            <template v-slot:option="scope">
              <q-item
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
              >
                <q-item-section>
                  <q-item-label caption>{{ scope.opt.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Tidak ada!
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:append>
              <q-icon
                v-if="kotaSel !== null"
                class="cursor-pointer"
                name="clear"
                @click.stop="reset()"
              />
            </template>
          </q-select>
        </div>
        <div class="col">
          <q-select :disable="kotaSel === null" v-model="kecSel"
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    option-value="id"
                    option-label="name"
                    :options="optionsKecamatan"
                    @filter="filterKec"
                    @input="loadKec"
                    standout="bg-primary text-white"
                    label="Pilih Kecamatan">
            <template v-slot:option="scope">
              <q-item
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
              >
                <q-item-section>
                  <q-item-label caption>{{ scope.opt.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Tidak ada!
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:append>
              <q-icon
                v-if="kecSel !== null"
                class="cursor-pointer"
                name="clear"
                @click.stop="kecSel = null"
              />
            </template>
          </q-select>
        </div>
        <div class="col">
          <q-select standout="bg-primary text-white" v-model="model" :options="options" label="Pilih Kelompok Tani" />
        </div>
        <div class="col">
          <q-select standout="bg-primary text-white" v-model="model" :options="options" label="Pilih Status Pengajuan" />
        </div>
      </div>
    <div class="row q-pa-sm q-col-gutter-md">
      <div class="col-md-6 col-sm-12 col-xs-12 col-lg-3">
        <div class="column q-col-gutter-sm">
          <div class="col">
            <bar-chart v-if="chartData" :options="optionChart" :chart-data="datacollection"></bar-chart>
          </div>
          <div class="col">
            <q-card
              class="my-card text-white bg-green-7"
              style="(circle, #35a2ff 0%, #014a88 100%)"
            >
              <q-card-section>
                <div class="text-h6">{{ data.length === 0 ? 0 : data.nik}}</div>
                <div class="text-subtitle2">TOTAL PENERIMA (PER NIK)</div>
                <q-item-section side top>
                  <q-icon name="people" class="text-white"></q-icon>
                </q-item-section>
              </q-card-section>
            </q-card>
          </div>
          <div class="col">
            <q-card
              class="my-card text-white bg-green-7"
              style="(circle, #35a2ff 0%, #014a88 100%)"
            >
              <q-card-section>
                <div class="text-h6">{{data.length === 0 ? 0 : data.poktan}}</div>
                <div class="text-subtitle2">Poktan</div>
                <q-item-section side top>
                  <q-icon name="people" class="text-white"></q-icon>
                </q-item-section>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12 col-lg-3">
        <div class="column q-col-gutter-sm">
          <div class="col">
            <q-card
              class="my-card text-white bg-green-7"
              style="(circle, #35a2ff 0%, #014a88 100%)"
            >
              <q-card-section>
                <div class="text-h6">483,40</div>
                <div class="text-subtitle2">LUAS TANAM (HA)</div>
                <q-icon name="people" class="text-white"></q-icon>
              </q-card-section>
            </q-card>
          </div>
          <div class="col">
            <q-card
              class="my-card text-white bg-green-7"
              style="(circle, #35a2ff 0%, #014a88 100%)"
            >
            <q-card-section>
              <div class="text-h6">114.199</div>
              <div class="text-subtitle2">PUPUK UREA</div>
              <q-icon name="people" class="text-white"></q-icon>
            </q-card-section>
            </q-card>
          </div>
          <div class="col">
            <q-card
              class="my-card text-white bg-green-7"
              style="(circle, #35a2ff 0%, #014a88 100%)"
            >
              <q-card-section>
                <div class="text-h6">0</div>
                <div class="text-subtitle2">PUPUK ZA (KG)</div>
                <q-icon name="people" class="text-white"></q-icon>
              </q-card-section>
            </q-card>
          </div>
          <div class="col">
            <q-card
              class="my-card text-white bg-green-7"
              style="(circle, #35a2ff 0%, #014a88 100%)"
            >
              <q-card-section>
                <div class="text-h6">67.049</div>
                <div class="text-subtitle2">PUPUK SP36 (KG)</div>
                <q-icon name="people" class="text-white"></q-icon>
              </q-card-section>
            </q-card>
          </div>
          <div class="col">
            <q-card
              class="my-card text-white bg-green-7"
              style="(circle, #35a2ff 0%, #014a88 100%)"
            >
              <q-card-section>
                <div class="text-h6">66.837</div>
                <div class="text-subtitle2">PUPUK NPK (KG)</div>
                <q-icon name="people" class="text-white"></q-icon>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <q-inner-loading :showing="loadingData">
        <q-spinner-pie color="deep-orange" size="75px" />
      </q-inner-loading>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { date } from 'quasar'
import BarChart from './chart.js'
export default {
  components: {
    BarChart
  },
  name: 'PageIndex',
  data () {
    return {
      tagihanTab: 'terlambat',
      data: [],
      kotaSel: null,
      kecSel: null,
      options: [],
      optionsKota: [],
      optionsKecamatan: [],
      kota: [],
      kecamatan: [],
      loadingData: true,
      endData: 5,
      model: null,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      tokens: '',
      datacollection: null,
      chartData: [],
      optionChart: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  methods: {
    filterKota (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.optionsKota = this.kota.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterKec (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.optionsKecamatan = this.kecamatan.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    infoDashboard () {
      this.$store.dispatch({
        type: 'user/infoDashboard',
        kabupaten: this.kotaSel ? this.kotaSel.name : null,
        kecamatan: this.kecSel ? this.kecSel.name : null
      })
        .then((response) => {
          this.data = response.data.message
        })
    },
    loadChart () {
      this.loadingData = true

      this.$store.dispatch({
        type: 'user/chart',
        kabupaten: this.kotaSel ? this.kotaSel.name : null,
        kecamatan: this.kecSel ? this.kecSel.name : null
      })
        .then((response) => {
          this.loadingData = false
          if (response.data.success) {
            this.chartData = response.data.message
            this.fillData()
          }
        })
    },
    loadKec () {
      this.infoDashboard()
      this.loadChart()
    },
    loadKota () {
      this.$axios.get('/api/location/regency', {
        params: {
          province: '18'
        }
      })
        .then((response) => {
          this.kota = response.data.data
        })
    },
    loadKecamatan () {
      this.$axios.get('/api/location/district',
        {
          params: {
            regency: this.kotaSel.id
          }
        })
        .then((response) => {
          this.kecamatan = response.data.data
          this.loadChart()
          this.infoDashboard()
        })
    },
    fillData () {
      this.datacollection = {
        labels: ['Petani', 'Pengguna', 'Poktan'],
        datasets: [
          {
            label: 'Jumlah Data',
            backgroundColor: '#C0CA33',
            data: this.chartData
          }
        ]
      }
    },
    reset () {
      this.kecSel = null
      this.kotaSel = null
    }
  },
  mounted () {
    this.infoDashboard()
    this.loadChart()
    this.loadKota()
  },
  watch: {
    data () {
      this.data = this.data
    },
    endData () {
      return this.endData
    }
  },
  filters: {
    dateFormat (val) {
      return date.formatDate(val, 'DD MMMM YYYY')
    }
  }
}
</script>
