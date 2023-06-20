<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      unelevated
      class="text-white"
      style="background: #002b36"
      height-hint="61.59">
      <q-toolbar>
        <q-toolbar-title>
          Farmacia Saucedo<small class="text-caption text-bold" style="font-size: 8pt; padding-left: 15px"> {{ appVersionNumber }}</small></q-toolbar-title>
        <q-item v-if="$q.screen.gt.sm">
          <q-item-section>
            <q-btn
              icon="fas fa-bell"
              style="font-size: 10px"
              no-caps
              flat
              no-wrap
              dropdown-toggle>
              <q-badge color="red" floating>22</q-badge>
              <q-menu auto-close>
                <q-list>
                  <q-item clickable>
                    <q-item-section>
                      <q-item-label>Nuevas Peticiones <b class="q-ml-md text-red">11</b></q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>
                      <q-item-label>Nuevas Casos Asignados <b class="q-ml-md text-red">11</b></q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-item-section>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              <q-icon name="maps_home_work"/>
            </q-avatar>
          </q-item-section>
          <q-item-section avatar>
            <q-item-label>{{ $store.state.authentication.user.full_name }}</q-item-label>
            <q-item-label class="text-white" caption lines="1">{{ $store.state.authentication.user.profile.name }}
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-btn
              @click="closeSession"
              no-caps
              dense
              flat
              no-wrap
              dropdown-toggle>
              <q-icon name="logout"/>
              <q-tooltip anchor="top middle" self="center middle">
                Cerrar Sesión
              </q-tooltip>
            </q-btn>
          </q-item-section>
        </q-item>
      </q-toolbar>
      <q-toolbar
        v-if="!$q.screen.gt.sm"
        class="q-py-sm q-px-md q-gutter-sm q-toolbar--standard full-width">
        <q-item class="full-width">
          <q-item-section avatar class="full-width">
            <q-item-label> {{ '$store.state.navigation.menu.pageTitle ' }} <small
              style="font-size: 6pt">{{ 'appVersionNumber' }}</small></q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              <q-btn
                no-caps
                flat
                no-wrap
                dropdown-toggle>
                <q-icon style="font-size: 1em" name="fas fa-bell"/>
                <q-badge style="font-size: 8pt" color="red">22</q-badge>
                <q-menu auto-close>
                  <q-list>
                    <q-item clickable>
                      <q-item-section>
                        <q-item-label>Nuevas Peticiones <b class="q-ml-md text-red">11</b></q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>
                        <q-item-label>Nuevas Casos Asignados <b class="q-ml-md text-red">11</b></q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-avatar>

          </q-item-section>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              <q-icon name="maps_home_work"/>
            </q-avatar>
          </q-item-section>
          <q-item-section avatar>
            <q-item-label>{{ '$store.state.authentication.user.fullName' }}</q-item-label>
            <q-item-label style="font-size: 7pt !important;" class="text-white full-width" caption lines="1">
              {{ '$store.state.authentication.user.officeName' }}
            </q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-btn
              v-if="!$q.screen.gt.sm"
              @click="closeSession"
              no-caps
              dense
              flat
              no-wrap
              dropdown-toggle>
              <q-icon name="logout"/>
              <q-tooltip anchor="top middle" self="center middle">
                Cerrar Sesión
              </q-tooltip>
            </q-btn>
          </q-item-section>
        </q-item>
      </q-toolbar>
    </q-header>
    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      :width="215"
      style="background: #343434"
      class="text-white"
      side="left"
      bordered
    >
      <q-scroll-area
        style="
          height: calc(100% - 20px);
          margin-top: 20px;
          border-right: 1px solid #ddd;
        "
      >
        <div>


        </div>
      </q-scroll-area>
    </q-drawer>
    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      :width="215"
      style="background: #343434"
      class="text-white"
      side="left"
      bordered
    >
      <q-scroll-area
        style="
          height: calc(100% - 20px);
          margin-top: 20px;
          border-right: 1px solid #ddd;
        "
      >
        <div>
          <MenuComponent/>
        </div>
      </q-scroll-area>
    </q-drawer>
    <q-page-container class="q-ml-xs no-scroll">
      <router-view></router-view>
      <q-page-scroller class="q-pb-lg" position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
        <div class="col-6">
          <q-btn
            size="sm"
            no-caps
            fab
            icon="keyboard_arrow_up"
            color="positive">
          </q-btn>

        </div>
      </q-page-scroller>
    </q-page-container>
    <q-footer v-if="!$q.screen.gt.sm"
              bordered
              style="background: #343434"
              class="text-white lt-md">
      <q-tabs
        no-caps
        indicator-color="white"
        class="text-white">
        <q-route-tab
          v-for="(link, key) in menuList"
          :key="key"
          exact
          :name="link.name"
          :title="link.name"
          :to="{ path: link.route }"
          :icon="`${link.icon}`"
          :label="link.name"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import {computed, defineComponent, ref, watch} from "vue";
import {useQuasar} from "quasar";
import {useRouter} from "vue-router";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import _ from "lodash"
import MenuComponent from "pages/partials/Menu.vue";

export default defineComponent({
  name: 'MyLayout',
  components: {
    MenuComponent

  },

  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
    appVersionNumber() {
      return appVersion;
    },
  },

  setup() {
    const $q = useQuasar();
    const $router = useRouter();
    const $route = useRoute();
    const $store = useStore();
    const menuList = [
      {
        icon: "fas fa-home",
        label: "Inicio",
        separator: true,
        route: "/",
      },
      {
        icon: "fas fa-passport",
        label: "SPC",
        separator: true,
        route: "/spc",
      },
      {
        icon: "fas fa-inbox",
        label: "Pre-Registros",
        separator: true,
        route: "/spc/pre-register",
      },
      {
        icon: "fas fa-user",
        label: "Casos Individuales",
        separator: true,
        route: "/spc/single-cases",
      },
      {
        icon: "fas fa-users",
        label: "Casos Grupales",
        separator: true,
        route: "/spc/group-cases",
      },
      {
        icon: "fa-solid fa-ellipsis",
        label: "Casos Pendientes",
        separator: true,
        route: "/spc/pending-cases",
      },
      {
        icon: "fas fa-bell",
        label: "Alertas",
        separator: true,
        route: "/spc/alert-cases",
      },
      {
        icon: "fas fa-folders",
        label: "Cargas Masivas",
        separator: true,
        route: "/spc/massive",
      },
      {
        icon: "fa-solid fa-chart-column",
        label: "Estadísticas",
        separator: true,
        route: "/spc/statistics",
      },
      {
        icon: "fa-solid fa-question",
        label: "Ayuda",
        separator: true,
        route: "/spc/help",
      },
      {
        icon: "fa-solid fa-users-gear",
        label: "Usuarios",
        separator: true,
        route: "/spc/settings/users",
      },
      {
        icon: "fa-solid fa-list",
        label: "Catálogos",
        separator: true,
        route: "/spc/settings/catalogs",
      },
      {
        icon: "fa-solid fa-list-dropdown",
        label: "Formularios Dinámicos",
        separator: true,
        route: "/spc/settings/dynamic-form",
      },
      {
        icon: "fa-solid fa-list-check",
        label: "Admin Ayuda",
        separator: true,
        route: "/spc/settings/admin-help",
      },
    ];
    const leftDrawerOpen = ref(false);
    const menu = computed(() => {
      return $store.getters["navigation/menu"]
    })
    const closeSession = async () => {
      $q.loading.show();
      await $store.dispatch("authentication/logout");
      $q.loading.hide();
      return $router.push("/login");
    };
    watch(() => _.cloneDeep($route.path), async (currentValue, oldValue) => {

      if (currentValue === '/') {
        window.document.title = "EPC"
        await $store.dispatch('navigation/setMenu', {
          id: 0,
          pageTitle: 'Ecosistema de Protección Consular',
          menuItems: []
        })
      }
    });
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      closeSession,
      menuList
    };
  },
});
</script>
