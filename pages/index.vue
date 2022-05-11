<template>
  <div>
    <Navbar/>
    <h1>Home Page</h1>
  </div>
</template>

<script>
import Vue from 'vue'
import VueAxentix from '@axentix/vue'
import VueCompositionAPI from '@vue/composition-api'
import '@axentix/vue/dist/vue2/vue-axentix.css'

Vue.use(VueCompositionAPI)
Vue.use(VueAxentix)

export default {
  name: 'IndexPage',
  auth: false,
}
</script>

<style>
* {
  font-family: "Roboto Light", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
