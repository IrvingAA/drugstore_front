import {boot} from 'quasar/wrappers'
import axios from 'axios'
window.base_url = process.env.API_URL;
const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
    pragma: 'no-cache',
    'Accept-C': process.env.ENCRYPT_CHANNEL,
    'cache-control': 'no-cache="Set-Cookie", no-store, must-revalidate',
    'no-cache': 'Set-Cookie, Set-Directive Cookie2',
    'Access-Control-Allow-Origin': '*',
  }
})
api.interceptors.request.use(
    function(config) {
      const token = sessionStorage.getItem("drugstore_token");
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;
      }
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
);
export default boot(({app}) => {
  app.config.devtools = true
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file
  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})
export {api}
