<template>
  <div class="fullscreen text-white text-center q-pa-md flex flex-center" style="background: #13322B">
    <div class="q-gutter-md" style="max-width: 800px; margin: 0 auto;">
      <div style="font-size: calc(20px + 10vw); margin-bottom: 2rem;">
        404
      </div>
      <q-icon style="font-size: calc(5em + 5vw); margin-bottom: 2rem;" name="fa-solid fa-screwdriver-wrench"/>
      <div class="text-h2" style="opacity:.4; font-size: calc(12px + 1.5vw);">
        Página no encontrada o en construcción <br> <small style="font-size: 14pt">Disculpe las molestias</small>
      </div>
      <div class="row justify-between q-col-gutter-md q-mt-xl">
        <div class="col-auto">
          <q-btn
            class="q-px-xl"
            color="primary"
            text-color="white"
            unelevated
            style="padding: 0 2rem;"
            size="lg"
            icon="arrow_back"
            @click="$router.go(-1)"
            label="Atrás"
            no-caps
          />
        </div>
        <div class="col-auto">
          <q-btn
            flat
            class="q-px-xl"
            color="white"
            unelevated
            style="padding: 0 2rem;"
            size="lg"
            icon="home"
            to="/"
            label="Inicio"
            no-caps
          />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {defineComponent, onMounted} from 'vue'
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default defineComponent({
  name: 'ComponentError404',
  setup() {
    const $store = useStore()
    const $router = useRouter()
    const goBack = () => {
      this.$router.go(-1);
    }
    onMounted(() => {
      if(!$store.state.authentication.isAuth){
        $router.push('/login')
      }
    })
    return {
      goBack
    }
  }
})
</script>
