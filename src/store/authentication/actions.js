import { api } from "boot/axios";
import {Notify, Loading} from "quasar";

export async function login({ commit }, credentials) {
  Loading.show({
    message: "Iniciando sesión..."
  })
	await api.post('login', credentials).then(response => {
		if (! response.data.success) {
			Notify.create({
				type: 'negative',
				color: 'negative',
				timeout: 1000,
				message: response.data.message
			})

			return false
		}
		sessionStorage.setItem('drugstore_token', response.data.session.token);
		sessionStorage.setItem('spc_hash', response.data.session.hash);

		api.defaults.headers.common = {
			Accept: 'application/json',
			'X-Requested-With': 'XMLHttpRequest',
			Authorization: 'Bearer ' + sessionStorage.getItem('drugstore_token')
		};
		commit('SET_USER', response.data.user)
    commit('SET_AUTH', response.data.authenticated)
	}).catch(e => {
    Notify.create({
      type: 'negative',
      color: 'negative',
      timeout: 2000,
      message: e
    })
  }).finally(f => {
    Loading.hide()
  })
}

export async function getUser({commit}) {

	await api.get('user/' + sessionStorage.getItem('spc_hash')).then(res => {
    if(res == undefined){
       api.post('logout').then(response => {
        Notify.create({
          type: 'positive',
          color: 'positive',
          timeout: 1000,
          message: 'Vuelva a iniciar sesión para continuar.'
        })
      })
       sessionStorage.removeItem('drugstore_token');
       sessionStorage.removeItem('spc_hash');
      let user = {
        username: null,
        email: null,
        name: null
      }
      commit('SET_USER', user)
      this.$router.push('/ingresar')
    }
		if (res.data === '') {
			sessionStorage.removeItem('spc_hash');
		} else {
			commit('SET_USER', res.data.user)
		}
	}).catch(() => {
		commit('SET_USER', null)
	});
}


export async function logout({ commit }) {
	await api.post('logout').then(response => {
		Notify.create({
			type: 'positive',
			color: 'positive',
			timeout: 1000,
			message: 'Su sesión se cerró correctamente'
		})
	}).catch(e => {
    console.log("e logiut ", e)
  })

	await sessionStorage.removeItem('drugstore_token');
	await sessionStorage.removeItem('spc_hash');

	let user = {
		username: null,
		email: null,
		name: null
	}

	commit('SET_USER', user)
}
