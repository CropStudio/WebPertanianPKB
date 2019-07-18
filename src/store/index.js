import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import user from './user'
import petani from './petani'
import jatah from './jatah'
import poktan from './poktan'
import anak from './anak'
import pupuk from './pupuk'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      user,
      jatah,
      petani,
      poktan,
      anak,
      pupuk
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })
  if (process.env.DEV && module.hot) {
    module.hot.accept([
      './user',
      './petani',
      './jatah',
      './poktan',
      './anak',
      './poktan',
      './pupuk'
    ], () => {
      const newUserr = require('./user').default
      const newPetani = require('./petani').default
      const newPoktan = require('./poktan').default
      const newJatah = require('./jatah').default
      const newPupuk = require('./pupuk').default
      const newAnak = require('./anak').default
      Store.hotUpdate({ modules: {
        user: newUserr,
        petani: newPetani,
        poktan: newPoktan,
        jatah: newJatah,
        pupuk: newPupuk,
        anak: newAnak
      } })
    })
  }
  return Store
}
