<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="row q-gutter-md">
        <div class="col">
          <q-select standout="bg-primary text-white" v-model="model" :options="options" label="Pilih Kota" />
        </div>
        <div class="col">
          <q-select standout="bg-primary text-white" v-model="model" :options="options" label="Pilih Kecamatan" />
        </div>
        <div class="col">
          <q-select standout="bg-primary text-white" v-model="model" :options="options" label="Pilih Kelompok Tani" />
        </div>
        <div class="col">
          <q-select standout="bg-primary text-white" v-model="model" :options="options" label="Pilih Status Pengajuan" />
        </div>
      </div>
    </div>
    <div class="q-pa-md">
      <div class="row q-gutter-x-md">
        <div class="col">
          <q-card
                  class="my-card text-white bg-green-7"
                  style="(circle, #35a2ff 0%, #014a88 100%)"
          >
            <q-card-section>
              <div class="text-h6">382</div>
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
              <div class="text-h6">483,40</div>
              <div class="text-subtitle2">LUAS TANAM (HA)</div>
              <q-icon name="people" class="text-white"></q-icon>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class="q-pa-md">
      <div class="row q-gutter-x-md">
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
      </div>
    </div>
    <div class="q-pa-md">
      <div class="row q-gutter-x-md">
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
    <div class="q-pa-md">
      <div class="row q-gutter-x-md">
        <div class="col">
          <q-card
                  class="my-card text-white bg-green-7"
                  style="(circle, #35a2ff 0%, #014a88 100%)"
          >
            <q-card-section>
              <div class="text-h6">67.049</div>
              <div class="text-subtitle2">PUPUK )</div>
              <q-icon name="people" class="text-white"></q-icon>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { date } from 'quasar'
export default {
  name: 'PageIndex',
  data () {
    return {
      tagihanTab: 'terlambat',
      data: [],
      options: [],
      endData: 5,
      model: null,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      tokens: ''
    }
  },
  methods: {
    infoDashboard () {
      if (this.$store.state.user.infos.length === 0) {
        this.tokens = this.$q.cookies.get('access_token')
        this.$store.dispatch({
          type: 'user/infoDashboard'
        })
          .then(response => {
            this.data = response
          })
      } else {
        this.data = this.$store.state.user.infos
        console.log('already mounted')
      }
    },
    angka (number, decPlaces) {
      decPlaces = Math.pow(10, decPlaces)
      var abbrev = [ 'k', 'm', 'b', 't' ]
      for (var i = abbrev.length - 1; i >= 0; i--) {
        var size = Math.pow(10, (i + 1) * 3)
        if (size <= number) {
          number = Math.round(number * decPlaces / size) / decPlaces
          if ((number === 1000) && (i < abbrev.length - 1)) {
            number = 1
            i++
          }
          number += abbrev[i]
          break
        } else if (-size >= number) {
          number = Math.round(number * decPlaces / -size) / decPlaces
          if ((number === -1000) && (i < abbrev.length - 1)) {
            number = 1
            i++
          }
          number += abbrev[i]
          break
        } else {
          number = Math.round(number * 100) / 100
        }
      }

      return number
    },
    showMore () {
      this.endData = this.endData + 5
    },
    showLess () {
      if (this.endData !== 5) {
        this.endData = this.endData - 5
      }
    }
  },
  mounted () {
    this.infoDashboard()
  },
  watch: {
    data () {
      this.data = this.$store.state.user.infos
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
