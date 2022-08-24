<template>
   <h1>{{ title }}</h1>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>

<style>
    h1{
        text-align: center;
        margin-bottom: 50px;
    }

</style>