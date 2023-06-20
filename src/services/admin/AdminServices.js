import {api} from 'src/boot/axios';

export default {
  async getUsers(data) {
    return await api.get('/users', {params: {...data}})
  },
  async deactiveUser(data) {
    return await api.delete('/users/' + data.hash_id)
  },
  async activeUser(data) {
    return await api.post('/active-user/' + data.hash_id)
  },
  async saveUser(data) {
    return await api.post('/users', {
      ...data
    })
  },
  async getCatalogs() {
    return await api.get('/user-catalogs')
  },

}
