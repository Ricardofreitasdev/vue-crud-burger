<template>
 <header>
    <div class="container">
        <router-link to="/">
         <img :src="logo" :alt="alt">
        </router-link> 
        <router-link to="/orders">Pedidos</router-link>
    </div>
  </header>
</template>

<script>
export default {
name: "Navbar",
props: ["logo", "alt"]
}
</script>

<style scoped>
    header{
        width: 100%;
        padding: 15px;
        background: var(--color-1);
    }

    header div{
        display: flex;
        align-content: center;
        justify-content: space-between;
    }

    img{
        max-height: 50px;
    }

    a{
        color:var(--color-2);
        display: flex;
        align-items: center;
        transition: ease-in-out 0.3s;
    }


    a:hover{
        color:var(--text-color);
    }
</style>