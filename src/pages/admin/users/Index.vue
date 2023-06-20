<template>
  <div class="row justify-start q-ml-sm q-mt-sm q-mr-sm q-col-gutter-md q-mr-lg">
    <div class="col-12">
      <div class="row justify-end q-col-gutter-md q-pa-md q-mb-md">
        <div class="col-10">
          <q-item-label class="subtitle-form q-pb-lg">
            Gestor de Usuarios

            <q-btn class="q-ml-md shadow-2"
                   color="primary"
                   outline
                   @click="handleOpenModal()"
                   icon="fas fa-plus"
                   label="Agregar" no-caps/>
          </q-item-label>
        </div>
        <div class="col-2">
          <router-link :to="{ path: '/settings' }" style="color: #9d2438">
            <q-icon size="sm" name="keyboard_backspace"/>
            {{ !$q.screen.lt.md ? "Regresar" : "Reg." }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="col-12">
      <q-table
        title="Usuarios"
        id="table-data"
        flat
        bordered
        dense
        :rows="state.users"
        :columns="state.columns"
        :separator="'vertical'"
        no-data-label="Sin datos"
        v-model:pagination="pagination"
        hide-pagination
        :loading="state.loading"
      >
        <template v-slot:top-right>
          <q-input
            borderless
            clearable
            @change="getUsers()"
            dense
            debounce="300"
            v-model="state.filter"
            placeholder="Filtrar...">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-description="elements">
          <q-td :props="elements">
            <q-item-label lines="4" class="condense-td">
              {{ elements.row.description }}
            </q-item-label>

          </q-td>
        </template>
        <template v-slot:body-cell-index="props">
          <q-td :props="props">
            {{ props.pageIndex + 1 }}
          </q-td>
        </template>
        <template v-slot:body-cell-actions="elements">
          <q-td :props="elements">
            <q-btn-group glossy flat push>
              <q-btn
                glossy
                outline
                flat
                round
                rounded
                color="blue"
                size="md"
                @click="editUser(elements.row)"
                icon="fas fa-edit">
                <q-tooltip anchor="top middle" self="center middle">
                  Editar
                </q-tooltip>
              </q-btn>
              <q-btn
                v-if="elements.row.is_active"
                glossy
                outline
                flat
                round
                rounded
                @click="deactiveUser(elements.row)"
                color="red"
                size="md"
                icon="fas fa-trash">
                <q-tooltip anchor="top middle" self="center middle">
                  Desactivar
                </q-tooltip>
              </q-btn>
              <q-btn
                v-else
                glossy
                outline
                flat
                round
                rounded
                @click="activeUser(elements.row)"
                color="green"
                size="md"
                icon="fas fa-check">
                <q-tooltip anchor="top middle" self="center middle">
                  Activar
                </q-tooltip>
              </q-btn>
            </q-btn-group>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog v-model="state.modal">
      <q-card style="top:-80px; width: 1000px; max-width: 80vw;">
        <q-form @submit="saveUser">
          <q-card-section>
            <div class="row justify-between">
              <div class="col-9">
                <div class="text-h6">Nuevo Usuario</div>
              </div>
              <div class="col-3">
                <q-btn
                  class="q-ml-sm cursor-pointer"
                  flat style="float:right;"
                  v-close-popup icon="close">

                </q-btn>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="row justify-between q-col-gutter-md">
              <div class="col-6">
                <q-input
                  outlined
                  dense
                  v-model="state.modelUser.name"
                  label="Nombre completo:"
                  :rules="[
												val => !!val || 'Este campo no puede estar vacio.',
												val => val.length < 190 || 'El máximo de caracteres el 190'
											]"/>
              </div>
              <div class="col-6">
                <q-input
                  outlined
                  dense
                  v-model="state.modelUser.username"
                  label="Usuario:"
                  :rules="[isValidUsername]"/>
              </div>
              <div class="col-12">
                <q-select
                  dense
                  label="Perfil:"
                  @mousedown.stop
                  outlined
                  option-value="id"
                  option-label="name"
                  emit-value
                  map-options
                  v-model="state.modelUser.cat_profile_id"
                  :options="state.profiles"
                  :rules="[isRequired] ">
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin datos
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-12">
                <q-toggle
                  v-model="state.showPwd"
                  color="pink"
                  icon="password"
                  :label="state.labelPwd"
                />
              </div>
              <div class="col-6"
                   v-if="state.showPwd">
                <q-input
                  v-model="state.modelUser.password"
                  :rules="[isRequired,needNumber,needLower,needUpper,needSpecialChar,need10Length]"
                  :type="state.isPwd ? 'password' : 'text'"
                  outlined
                  dense
                  color="white"
                  label="Contraseña">
                  <template v-slot:append>
                    <q-icon
                      :name="state.isPwd ? 'fad fa-eye-slash fa-xs' : 'fad fa-eye fa-xs'"
                      class="cursor-pointer"
                      @click.prevent="state.isPwd = !state.isPwd"/>
                  </template>
                </q-input>
              </div>
              <div class="col-6" v-if="state.showPwd">
                <q-input
                  v-model="state.modelUser.confirmPassword"
                  :rules="[isRequired,needNumber,needLower,needUpper,needSpecialChar,need10Length]"
                  :type="state.isPwd ? 'password' : 'text'"
                  outlined
                  dense
                  color="white"
                  label="Confirmar Contraseña">
                  <template v-slot:append>
                    <q-icon
                      :name="state.isPwd ? 'fad fa-eye-slash fa-xs' : 'fad fa-eye fa-xs'"
                      class="cursor-pointer"
                      @click.prevent="state.isPwd = !state.isPwd"/>
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn
              no-caps
              icon="fas fa-save"
              color="primary"
              label="Guardar"
              class="cursor-pointer"
              type="submit"/>
            <q-btn
              no-caps
              icon="fas fa-times"
              color="red"
              label="Cancelar"
              class="cursor-pointer"
              v-close-popup/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

  </div>

</template>
<script setup>
import {reactive, ref, onMounted} from "vue";
import {useQuasar} from "quasar";
import AdminServices from "src/services/admin/AdminServices";

const q = useQuasar()
onMounted(() => {
  getUsers();
  getCatalogs()
})
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 50,
  rowsNumber: 0
})
let state = reactive({
  users: [],
  columns: [
    {
      name: 'index',
      label: '#',
      align: 'center',
      style: 'width: 100px'
    },
    {
      name: 'actions',
      label: 'Acciones',
      align: 'center',
      style: 'width: 100px'
    },
    {
      name: 'username',
      label: 'Usuario',
      align: 'center',
      field: row => row.username,
      format: val => `${val ?? 'Sin información'}`,
    },
    {
      name: 'profile',
      label: 'Perfil',
      align: 'center',
      field: row => row?.profile?.name,
      format: val => `${val ?? 'Sin información'}`,
    },


  ],
  loading: false,
  filter: '',
  modal: false,
  modelUser: {
    name: 'Richard 2',
    username: 'hola_hola',
    cat_profile_id: 1,
    password: '123456789$Rr@',
    confirmPassword: '123456789$Rr@',
  },
  profiles: [],
  isPwd: true,
  showPwd: false,
  labelPwd: 'Cambiar Contraseña'

})

const getUsers = () => {
  const params = {
    pagination: pagination.value,
    search: state.filter
  }
  AdminServices.getUsers(params).then(response => {
    if (response.data.success) {
      state.users = response.data.users.data
    } else {
      q.notify({
        type: 'warning',
        message: response.data.message
      })
    }
  }).catch(e => {
    console.log(" getUsers ", e)
    q.notify({
      type: 'negative',
      message: 'No se pudo procesar su solicitud. '
    })
  })

}
const getCatalogs = () => {
  AdminServices.getCatalogs().then(response => {
    if (response.data.success) {
      state.profiles = response.data.profiles
    } else {
      q.notify({
        type: 'warning',
        message: response.data.message
      })
    }
  }).catch(e => {
    console.log(" getCatalogs ", e)
    q.notify({
      type: 'negative',
      message: 'No se pudo procesar su solicitud. '
    })
  })

}
const deactiveUser = (row) => {

  AdminServices.deactiveUser(row).then(response => {
    q.notify({
      type: response.data.success ? 'positive' : 'warning',
      message: response.data.message
    })
  }).catch(e => {
    console.log(" deactiveUser ", e)
    q.notify({
      type: 'negative',
      message: 'No se pudo procesar su solicitud. '
    })
  }).finally(f => {
    getUsers()
  })

}
const activeUser = (row) => {
  AdminServices.activeUser(row).then(response => {
    q.notify({
      type: response.data.success ? 'positive' : 'warning',
      message: response.data.message
    })
  }).catch(e => {
    console.log(" deactiveUser ", e)
    q.notify({
      type: 'negative',
      message: 'No se pudo procesar su solicitud. '
    })
  }).finally(f => {
    getUsers()
  })
}
const saveUser = (row) => {

  AdminServices.saveUser(state.modelUser).then(response => {
    q.notify({
      type: response.data.success ? 'positive' : 'warning',
      message: response.data.message
    })
    if (response.data.success) {
      state.modal = false
    }
  }).catch(e => {
    console.log(" saveUser ", e)
    q.notify({
      type: 'negative',
      message: 'No se pudo procesar su solicitud. '
    })
  }).finally(f => {
    getUsers()
  })
}
const handleOpenModal = () => {
  /*state.modelUser = {
    name: null,
    username: null,
    cat_profile_id: null,
    password: null,
  }*/
  state.modal = true
  state.showPwd = true
  state.labelPwd = 'Nueva Contraseña'
}
const editUser = (row) => {
  const obj = Object.assign({}, row)
  state.modelUser = {...obj}
  state.modal = true
  state.showPwd = false
  state.labelPwd = 'Cambiar Contraseña'
}

</script>


<script>
export default {
  name: "UsersIndex"
}
</script>

<style scoped>

</style>
