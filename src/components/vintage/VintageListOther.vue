<template>
     <div class="container-md my-4x">
            <h3>Popular Products</h3>
        <div class="product__list row">
            <div class="col-12 col-lg-2 col-sm-4" style="padding-top: 12px; padding-bottom: 12px;"
                v-for="(vintage, index) in vintageslistother" :key="index">
                <div class="card position-relative" style="height: 398px; ">
                    <router-link :to="`/vintage/${ vintage.id }`" style="text-decoration: none; color: black;" >
                    <!-- Tambahkan ${ vintage.id } nanti kalau sudah bisa  -->
                    <img :src="vintage.imageLink" class="card-img-top" alt="Shirt" height="240" width="285"
                        style="object-fit: cover;">
                    <div class="card-body">
                        <p class="mb-0 fs-5">Rp. {{ vintage.price }}</p>

                        <p class="mb-0">{{ vintage.name }}</p>
                        <div class="d-flex justify-content-between">
                            <p class="position-absolute bottom-0">{{ vintage.size }}</p>
                            <i class="fas fa-heart d-flex text-secondary position-absolute bottom-0 end-0 me-2 p-1">
                                <p class="ms-2">12</p>
                            </i>
                        </div>

                    </div>
                    </router-link>
                </div>
            </div>
            </div>
            </div>
</template>

<script setup>
import { computed} from "vue";
import { useStore } from "vuex";

const store = useStore()

const vintageslistother = computed(() => store.state.vintage.vintages);

defineProps({
    vintages: Array,
})


</script>