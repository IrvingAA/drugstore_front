import {store} from 'quasar/wrappers'
import {createStore} from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from "secure-ls";

import authentication from './authentication'

const ls = new SecureLS({encodingType: 'aes', isCompression: true});
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    plugins: [createPersistedState({
      // storage: window.sessionStorage,
      /*storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },*/
      paths: ['authentication']
    })],

    modules: {
      authentication,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
