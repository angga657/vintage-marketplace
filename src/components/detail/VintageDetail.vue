<template>
    <vintage-description></vintage-description>
</template>


<script setup>
import { onMounted } from "vue"
import { useRoute } from "vue-router"
import { useStore } from "vuex"
import VintageDescription from "./VintageDescription.vue";

const store = useStore()
const route = useRoute()

onMounted (async () => {
    await store.dispatch(
        "vintage/getVintageDetail", route.params.id
    )
})
</script>