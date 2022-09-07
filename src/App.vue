<template>
  <Navbar :logo="logo_src" :alt="app_name" />
  <Suspense>
    <router-view />
  </Suspense>
  <Footer />
</template>

<script>
import "./assets/style/global.css";
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      logo_src: "/img/logo.png",
      app_name: "Burger Admin",
    };
  },
};
</script>
