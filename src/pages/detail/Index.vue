<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
      <q-input v-model="email" filled type="email" hint="" style="width: 300px; height: 50px"
               :loading="loadingState"
               label="Masukan NIK"/>

      <q-btn color="primary" label="Cari " />
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      password: '',
      isPwd: true,
      text: '',
      email: ''
    }
  }
}
</script>
