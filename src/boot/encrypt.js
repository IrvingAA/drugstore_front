window.CryptoJS = require('crypto-js')
import {boot} from 'quasar/wrappers'
import { api } from 'boot/axios'


const hash = process.env.ENCRYPT_KEY;

export default boot(async ({store}) => {
  let axios = api;
  const except =[
    'access-card'
  ];

  axios.interceptors.request.use(function (config) {
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    config.headers["Accept"] = "application/json";
    config.headers["Accept-C"] = process.env.ENCRYPT_CHANNEL;

    if (config && config.data && process.env.ENCRYPT_CHANNEL === true && config.url
      && except.indexOf(config.url) === -1 && config.headers["Content-Type"] !== "multipart/form-data") {
      let dataApp = JSON.stringify(config.data);

      dataApp = CryptoJS.AES.encrypt(dataApp, hash).toString();
      config.data = {
        'encrypt': dataApp
      };
    }

    if (config && config.params && process.env.ENCRYPT_CHANNEL === true
      && config.url && except.indexOf(config.url) === -1 && config.headers["Content-Type"] !== "multipart/form-data") {
      let paramsApp = JSON.stringify(config.params);

      paramsApp = CryptoJS.AES.encrypt(paramsApp, hash).toString();
      config.params = {
        'encryptParams': paramsApp
      };
    }

    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function (response) {
    if (response && response.data && process.env.ENCRYPT_CHANNEL === true) {
      if (response.config.headers['upf'] === true ||
        response.config.url === '/admin/access/save-file' ||
        response.config.url === '/admin/access/update-file/' ) {

      } else if (response.config &&
        response.config.responseType &&
        (response.config.responseType === 'blob' ||
          response.config.responseType === 'arraybuffer') ) {

      } else {
        let bytes = CryptoJS.AES.decrypt(response.data.toString(), hash);
        response.data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
    }

    return response;
  }, function (error) {
    const originalRequest = error.config;

    if (error.response && error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

    } else if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      delete axios.defaults.headers.common["Authorization"];
      axios.defaults.headers.common = {
        'Authorization': 'Bearer'
      };
    } else if (error.response &&
      error.response.data &&
      (error.response.status === 400 || error.response.status === 500) &&
      process.env.ENCRYPT_CHANNEL === true) {

      if (error.response.config &&
        error.response.config.responseType &&
        error.response.config.responseType === 'blob') {

      } else {
        let bytes = CryptoJS.AES.decrypt(error.response.data.toString(), hash);
        error.response.data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  });
})
