<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-green-10 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="left"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="200"
      :breakpoint="500"
      show-if-above
      bordered
      content-class="bg-green-3 text-green-10"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item clickable active-class="active" exact v-ripple to="/">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>

            <q-item-section>
              Dashboard
            </q-item-section>
          </q-item>
          <q-item-label class="text-white" header>Data Master</q-item-label>
          <q-item clickable active-class="active" v-ripple to="/pengguna">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section>
              Pengguna
            </q-item-section>
          </q-item>

          <q-item active-class="active" clickable v-ripple to="/petani">
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>

            <q-item-section>
              Petani
            </q-item-section>
          </q-item>

          <q-item active-class="active" clickable v-ripple to="/anak">
            <q-item-section avatar>
              <q-icon name="child_care" />
            </q-item-section>

            <q-item-section>
              Anak Petani
            </q-item-section>
          </q-item>
          <q-item active-class="active" clickable v-ripple to="/poktan">
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>

            <q-item-section>
              Poktan
            </q-item-section>
          </q-item>
          <q-item active-class="active" to="/pupuk" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="whatshot" />
            </q-item-section>

            <q-item-section>
              Pupuk
            </q-item-section>
          </q-item>
          <q-item-label class="text-white" header>Data Operasional</q-item-label>

          <q-item active-class="active" clickable v-ripple to="/JatahPupuk">
            <q-item-section avatar>
              <q-icon name="store" />
            </q-item-section>

            <q-item-section>
              Jatah Pupuk
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      left: true,
      miniState: true
    }
  }
}
</script>
<style>
  .active {
    color: #ffffff;
  }
</style>
