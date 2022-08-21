<template>
  <!-- <Banner /> -->
  <div class="main">
    <h2>Monte o seu Burger</h2>
    <section>
    <Form />
    </section>
  </div>
</template>

<script>

import Banner from "../components/Banner.vue"
import Form from "../components/Form.vue"

export default {
  name: 'Home',
  components: {
    Banner,
    Form
  }
}
</script>


<style scoped>
h2{
  text-align: center;
  margin-bottom: 50px;
}

section{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>