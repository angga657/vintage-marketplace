<template>
    <main>
        <div class="container-md my-5 py-5">
            <vintage-form
                v-if="detailData && !isLoading"
                :isEdit="true" 
                :detailData="detailData">
            </vintage-form>
        </div>
    </main>
</template>

<script setup>
import VintageForm from '../vintageForm/VintageForm.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const store = useStore();
const route = useRoute();
const detailData = ref();
const isLoading = ref(false);

onMounted(async () => {
    isLoading.value = true;
    try {
        const vintageId = route.params.id;
        await store.dispatch("vintage/getVintageDetail", vintageId);

        detailData.value = store.state.vintage.vintageDetail;
        console.log(detailData.value);
        console.log(store.state);
        isLoading.value = false;
    } catch (err) {
        console.error(err);
    }
});


</script>