<template>
    <div>我是{{this.$route.params.name}}我骄傲</div>
</template>

<script>
import axios from "../../axios/axios"
export default {
    data(){
        return{
            name:this.$route.params.name
        }
    }, 
    created(){

    }
}
</script>

<style>

</style>