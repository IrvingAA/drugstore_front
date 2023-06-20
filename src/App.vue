<template>
  <router-view/>
</template>
<script>
import { defineComponent } from 'vue';
import {mapActions} from "vuex";
export default defineComponent({
  name: 'App',
  async preFetch ({ store, currentRoute }) {
    if (currentRoute.fullPath !== '/login' && window.sessionStorage.getItem("drugstore_token")) {
      await store.dispatch('authentication/getUser')
    }
  },
  data() {
    return {
      idleActive: false,
    }
  },

  onIdle() {
    if ( window.sessionStorage.getItem("drugstore_token") && this.idleActive === false ) {
      this.idleActive = true;
      this.removeSession();
    }
  },

  methods: {
    ...mapActions("authentication", ['logout']),
    removeSession() {
      let closeIn60Seconds = setTimeout( async () => {
        this.$q.loading.show()
        await this.logout()
        this.$q.loading.hide();
        dialog.hide();
        await this.$router.push('/login')
      }, 30000); // Will close on 10 seconds

      const dialog = this.$q.dialog({
        title: 'La sessión expirará pronto',
        message: 'La aplicación se cerrará en los próximos 10 segundos, ningún cambio será guardado.',
        ok: 'Mantener la sesión',
        cancel: false,
        persistent: true
      }).onOk(() => {
        this.idleActive = false;
        clearTimeout(closeIn60Seconds);
      })
    },
  },
})
</script>
