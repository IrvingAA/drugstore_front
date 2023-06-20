<template>
  <q-list bordered padding class="rounded-borders text-white">
    <q-item
      clickable
      v-ripple
      :active="state.link === 'inbox'"
      @click="state.link === 'inbox'"
      active-class="my-menu-link"
    >
      <q-item-section avatar>
        <q-icon name="inbox"/>
      </q-item-section>

      <q-item-section>Inbox</q-item-section>
    </q-item>

    <q-item
      clickable
      v-ripple
      :active="state.link === 'outbox'"
      @click="state.link = 'outbox'"
      active-class="my-menu-link"
    >
      <q-item-section avatar>
        <q-icon name="send"/>
      </q-item-section>

      <q-item-section>Outbox</q-item-section>
    </q-item>

    <q-item
      clickable
      v-ripple
      :active="state.link === 'trash'"
      @click="state.link = 'trash'"
      active-class="my-menu-link"
    >
      <q-item-section avatar>
        <q-icon name="delete"/>
      </q-item-section>

      <q-item-section>Trash</q-item-section>
    </q-item>

    <q-separator spaced/>

    <q-item
      clickable
      v-ripple
      :active="state.link === 'settings'"
      @click="router.push('/settings')"
      active-class="my-menu-link"
    >
      <q-item-section avatar>
        <q-icon name="settings"/>
      </q-item-section>

      <q-item-section>Settings</q-item-section>
    </q-item>

    <q-item
      clickable
      v-ripple
      :active="state.link === 'help'"
      active-class="my-menu-link"
    >
      <q-item-section avatar>
        <q-icon name="help"/>
      </q-item-section>

      <q-item-section>Help</q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import {reactive} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
let state = reactive({
  link: ''
})

</script>
<script>


export default {
  name: "MenuComponent",
}
</script>

