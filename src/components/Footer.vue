<template>
  <footer>
    <p>Make your Burger &copy; {{ getYear }}</p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    getYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  height: 10vh;
  background: var(--color-1);
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;

  p {
    color: var(--text-color);
  }
}
</style>
