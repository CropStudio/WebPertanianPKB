import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import user from './user'
import petani from './petani'
import jatah from './jatah'

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
      petani,
      jatah
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })
  if (process.env.DEV && module.hot) {
    module.hot.accept([
      './user', './petani', './jatah'
    ], () => {
      const newUserr = require('./user').default
      const newPetani = require('./petani').default
      const newJatah = require('./jatah').default
      Store.hotUpdate({ modules: {
        user: newUserr, petani: newPetani, jatah: newJatah
      } })
    })
  }
  return Store
}
