<template>
  <div class="row justify-start q-ml-sm q-mt-sm q-mr-sm q-col-gutter-md q-mr-lg">
    <div class="col-12">
      <q-breadcrumbs class="text-black">
        <q-breadcrumbs-el to="/" label="Inicio" icon="fas fa-home"/>
        <q-breadcrumbs-el label="Administración" icon="fas fa-gear"/>
      </q-breadcrumbs>
    </div>
    <div class="col-6" v-for="(item, key) in state.modules" :key="key">
      <q-item clickable @click="router.push(item.route)">
        <q-item-section>
          <q-card :style="'background: ' + item.color" class="shadow-2 text-white" bordered>
            <q-card-section class="row justify-center">
              <div class="text-h4 q-mb-xs">{{ item.name }}</div>
            </q-card-section>
            <q-card-section class="col-5 flex flex-center">
              <q-icon size="13em" :name="item.icon"/>
            </q-card-section>
          </q-card>
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>
<script setup>
import {reactive} from "vue";
import {useRouter} from "vue-router";
const router = useRouter()
let state = reactive({
  modules: [
    {
      name: 'Usuarios',
      icon: 'fas fa-users',
      color: '#8B0000',
      route: '/settings/users'
    },
    {
      name: 'Catalogos',
      icon: 'fas fa-list-dropdown',
      color: '#663399'
    },
    {
      name: 'Productos',
      icon: 'fas fa-warehouse-full',
      color: '#0F4C81',
      route: '/settings/products'
    },
    {
      name: 'Finanzas',
      icon: 'fa-solid fa-file-invoice-dollar',
      color: '#2E8B57'
    },
  ]
})
</script>

<script>
export default {
  name: "AdminIndex"
}
</script>

<style scoped>
.q-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
  transition: all 0.3s ease-in-out;
}
</style>
