<template>
  <!-- <Banner /> -->
  <div class="main container">
    <Info title="Monte o seu Burger" />

    <section>
    <Form />
    </section>
  </div>
</template>

<script>

import Banner from "../components/Banner.vue"
import Form from "../components/Form.vue"
import Info from "../components/Info.vue";

export default {
  name: 'Home',
  components: {
    Banner,
    Form,
    Info
}
}
</script>


<style scoped>

section{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>