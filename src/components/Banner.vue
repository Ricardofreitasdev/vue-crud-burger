<template>
<section class="fullbanner">
  <h1>O melhor Burger</h1>
</section>
</template>

<script>
export default {
    name: "Banner"
}
</script>

<style scoped>
.fullbanner{
   background-image: url('/img/burger.jpg');
   background-position: 0 -250px;
   background-size: cover;
   min-height: 300px;
   display: flex;
   align-items: center;
   justify-content: center;
}

h2{
    color: var(--color-text);
    font-size: 55px;
}

</style>