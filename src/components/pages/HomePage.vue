<template>
    
        <div class="hero">
            <div class="container d-flex align-items-center justify-content-sm" style="height: 100vh;">
                <div class="bg-light p-4 rounded" style="width: 360px;">
                    <h2 class="text-dark mb-4">Ready to declutter you closet?</h2>
                    <a href="#" class="btn btn-lg btn-primary w-100">Shop Now</a>
                </div>
            </div>
        </div>
        
        <vintage-list :vintages="vintageList" v-if="vintageListStatus" class="my-5"></vintage-list>
         <!-- //tambahin v-if="vintageListStatus" di tag vintage-list kalau sudah menggunakan firebase -->
</template>

<script setup>
import VintageList from "../vintage/VintageList.vue";
// import VINTAGE_DATA from "../../vintage.js"
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

// const vintageList = VINTAGE_DATA
const store = useStore();
const vintageListStatus = ref(false);
const vintageList = ref();

onMounted (async () => {
    try {
      await store.dispatch("vintage/getVintageData");
      vintageListStatus.value = true;
      vintageList.value = store.state.vintage.vintages;
    } catch (error) {
      console.log(error);
    }
});
</script>