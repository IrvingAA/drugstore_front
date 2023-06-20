<template>
  <q-layout class="bg-image" v-cloak>
    <q-header
      unelevated
      class="text-white"
      style="background: #002b36"
      height-hint="61.59"
    >
      <q-toolbar class="q-py-sm q-px-md q-gutter-sm q-toolbar">
        <q-img style="width: 300px !important;" src="~/assets/sre_logo.svg"/>
        <q-item-label class="text-wrap ">
          Súper Saucedo
        </q-item-label>
        <q-space/>
      </q-toolbar>
    </q-header>
    <q-resize-observer>
      <template v-slot="{ width }">
        <q-header class="text-white" style="background: #13322B">
          <q-toolbar class="q-py-sm q-px-md row items-center">
            <div class="col-auto">
              <q-btn
                dense
                flat
                :ripple="false"
                color="white"
                class="q-mr-sm q-pt-xs"
                no-caps
              >
                <q-img
                  src="~/assets/sre_logo.svg"
                  :width="width <= 100 ? '150px' : '100px'"
                />
              </q-btn>
            </div>
            <div class="col-auto">
              <q-space/>
            </div>
          </q-toolbar>
        </q-header>
      </template>
    </q-resize-observer>


    <q-page-container>
      <q-page class="flex flex-center">
        <q-banner inline-actions class="text-white bg-red" v-if="errors">
          POR FAVOR VERIFIQUE LOS DATOS
          <ul v-for="(error, index) in errors" :key="index">
            <li v-for="(message, index2) in error" :key="index2">
              {{ message }}
            </li>
          </ul>
        </q-banner>
        <q-form
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          @submit="onSubmit"
          class="q-gutter-md">
          <q-card v-if="!$q.screen.lt.sm"
                  style="background: rgba(255, 255, 255, 0.2);box-shadow: 0 0 5px #ffff; width: 50vw"
          >
            <q-card-section>
              <div class="col-12 text-center" style="color: white; font-size: 12pt">
                Su Sau
                <br>
                <small style="font-size: 6pt !important;">{{ appVersionNumber }}</small>
              </div>
            </q-card-section>
            <q-item>
              <q-item-section class="text-white">
                <q-item-label caption>
                  <q-input v-model="username"
                           :rules="[isRequired, isValidUsername]"
                           dark
                           color="white"
                           label="Usuario/Clave de Acceso">
                  </q-input>
                </q-item-label>
                <q-item-label caption>
                  <q-input
                    v-model="password"
                    :rules="[isRequired]"
                    :type="isPwd ? 'password' : 'text'"
                    dark
                    color="white"
                    label="Contraseña"
                    @keyup.enter="onSubmit">
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'fad fa-eye-slash fa-xs' : 'fad fa-eye fa-xs'"
                        class="cursor-pointer"
                        @click.prevent="isPwd = !isPwd"/>
                    </template>
                  </q-input>
                </q-item-label>
              </q-item-section>
            </q-item>
            <div class="row q-pa-md justify-end q-col-gutter-xs">
              <div class="col">
                <q-btn
                  style="width: 100%"
                  size="md"
                  no-caps
                  color="positive"
                  class="full-width"
                  @click="onSubmit">
                  Iniciar Sesión
                </q-btn>
              </div>
            </div>
            <div class="row q-col-gutter-md q-mt-md">
              <CopyrightComponent/>
            </div>
          </q-card>
          <q-card v-else style="background: rgba(255, 255, 255, 0.2);box-shadow: 0 0 5px #ffff; width: 50vw">
            <q-card-section>
              <div class="col-12 text-center" style="color: white; font-size: 12pt">
                E P C
                <br>
                <small style="font-size: 6pt !important;">{{ appVersionNumber }}</small>
              </div>
            </q-card-section>
            <q-item>
              <q-item-section class="text-white">
                <q-item-label caption>
                  <q-input v-model="username"
                           :rules="[isRequired, isValidUsername]"
                           dark
                           color="white"
                           label="Usuario">
                  </q-input>
                </q-item-label>
                <q-item-label caption>
                  <q-input
                    v-model="password"
                    :rules="[isRequired]"
                    :type="isPwd ? 'password' : 'text'"
                    dark
                    color="white"
                    label="Contraseña"
                    @keyup.enter="onSubmit">
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'fad fa-eye-slash fa-xs' : 'fad fa-eye fa-xs'"
                        class="cursor-pointer"
                        @click.prevent="isPwd = !isPwd"/>
                    </template>
                  </q-input>
                </q-item-label>
              </q-item-section>
            </q-item>
            <div class="row q-pa-md justify-end q-col-gutter-xs">
              <div class="col">
                <q-btn
                  style="width: 100%"
                  size="md"
                  type="submit"
                  no-caps
                  color="positive"
                  class="full-width"
                  @click="onSubmit">
                  Iniciar Sesión
                </q-btn>
              </div>
            </div>
            <div class="row q-col-gutter-md q-mt-md">
              <CopyrightComponent/>
            </div>
          </q-card>
        </q-form>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import notify from "src/util/notify";
import {defineComponent, reactive, ref, toRefs, watch} from 'vue'
import {useQuasar} from "quasar";
import {useRouter} from 'vue-router'
import {useStore} from "vuex";
import CopyrightComponent from "pages/partials/Copyright";
import _ from "lodash"

export default defineComponent({
  name: "LoginComponent",
  components: {CopyrightComponent},
  computed: {
    appVersionNumber() {
      return appVersion;
    }
  },

  setup() {
    const $q = useQuasar()
    const $router = useRouter()
    const store = useStore()
    const isPwd = ref(true)

    let state = reactive({errors: null})
    let loginForm = reactive({
      username: '',
      password: ''
    })

    const onSubmit = async () => {
      if (loginForm.username && loginForm.username.trim() !== '' && loginForm.password && loginForm.password.trim() !== '') {
        await store.dispatch('authentication/login', loginForm)
        if (sessionStorage.getItem('drugstore_token')) {
          await $router.push('/')
          window.document.title = "EPC"
          store.dispatch('navigation/setMenu', {
            id: 0,
            pageTitle: 'Ecosistema de Protección Consular',
            menuItems: []
          })
        }
      } else {
        notify.warning('Atención', 'Complete los campos para iniciar sesión.')
      }

    }
    watch(
      () => _.cloneDeep(loginForm),
      _.debounce((currentValue, oldValue) => {
        for (const property in loginForm) {
          if (currentValue[property] !== '' && currentValue[property] != null && property !== 'password') {
            loginForm[property] = currentValue[property]
              ?.replace(/[^\x00-\xFF]/g, "")
              ?.replace(/[#$&^|=*!<>"'/{}[\]\\]/g, "");
          }
        }
      }, 500)
    );

    return {...toRefs(loginForm), ...toRefs(state), isPwd, onSubmit}
  }
})
</script>

<style scoped>
.bg-image {
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  background-color: black;
}

[v-cloak] {
  display: none !important;
}

.q-img {
  max-width: 40%;
  height: auto;
}
</style>
