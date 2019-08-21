<template>
    <div class="q-pa-md row items-start q-gutter-md">
      <div id="boxsatu"><img src="statics/kartu.jpeg"></div>
      <div id="boxdua"><qr :text="idAktif"></qr></div>
      <!--<q-card class="my-card">-->

        <!--<q-card-section>-->
          <!---->
        <!--</q-card-section>-->
      <!--</q-card>-->
    </div>
</template>

<script>
import qr from 'vue-qrcode-component'
export default {
  components: {
    qr
  },
  data () {
    return {
      idAktif: 'hgg'
    }
  },
  created () {
    this.idAktif = this.$route.params.nik
    // console.log(this.$route.params)
  }
}
</script>

<style scoped>
  #boxsatu{
    width: 100px;
    left: 0px;
    top: 0px;
    background-size: 100% 100%;
    background-color:white;
    z-index: 1;
  }
  #boxdua{
    width: 100px;
    margin-left: -27px;
    margin-top: 200px;
    background-color:green;
    z-index: 2;
  }
</style>
