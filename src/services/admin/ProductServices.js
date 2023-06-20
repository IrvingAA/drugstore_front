import {api} from 'src/boot/axios';

export default {
  async getProducts(data) {
    return await api.get('/products', {params: {...data}})
  },
  async deactiveUser(data) {
    return await api.delete('/products/' + data.hash_id)
  },
  async activeUser(data) {
    return await api.post('/active-user/' + data.hash_id)
  },
  async saveUser(data) {
    return await api.post('/products', {
      ...data
    })
  },
  async getCatalogs() {
    return await api.get('/user-catalogs')
  },

}
