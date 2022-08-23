<template>
  <div class="main container">
    <Info title="Admin de Pedidos" />
    <Admin />
  </div>
</template>

<script>

import Admin from "../components/Admin.vue"
import Info from "../components/Info.vue";
export default {
  components: {
    Admin,
    Info,
}
}
</script>

<style>
  h1{
    text-align: center;
  }
</style>