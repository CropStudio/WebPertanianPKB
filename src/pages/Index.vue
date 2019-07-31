<template>
  <q-page padding>
    <div class="row text-center">
      <div class="col-12">
        <bar-chart v-if="chartData" :options="options" :chart-data="datacollection"></bar-chart>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import BarChart from './chart.js'
export default {
  components: {
    BarChart
  },
  name: 'PageIndex',
  data () {
    return {
      datacollection: null,
      chartData: [],
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.loadChart()
  },
  methods: {
    loadChart () {
      this.$store.dispatch({
        type: 'user/chart'
      })
        .then((response) => {
          if (response.data.success) {
            this.chartData = response.data.message
            this.fillData()
          }
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
    }
  }
}
</script>
