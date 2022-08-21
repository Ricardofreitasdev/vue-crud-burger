<template>
  <footer>
    <p>Make your Burger &copy; {{ year }}</p>
  </footer>
</template>

<script>
export default {
name: "Footer",
    data(){
        return {
            year: new Date().getFullYear()
        }
    }
}
</script>

<style scoped>
    footer{
        height: 80px;
        background: var(--color-1);
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 0;
    }

    footer p {
        color: var(--text-color);
    }
</style>