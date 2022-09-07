<template>
  <div class="main container">
    <Production />
    <Info title="Pedidos" />
    <Admin />
  </div>
</template>

<script>
import Admin from "../components/Admin.vue";
import Info from "../components/Info.vue";
import Production from "../components/Production.vue";
export default {
  components: {
    Admin,
    Info,
    Production,
  },
};
</script>

<style>
h1 {
  text-align: center;
}
</style>
