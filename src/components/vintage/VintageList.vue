<template>
    <div class="container-md my-4x">
        <div class="d-flex justify-content-between mt-2">
            <h3>Popular Products</h3>
            <router-link to="/other" style="text-decoration: none;">
                <a class="fs-5 text-decoration-none" style="color: #009C9E;">See all</a>
            </router-link>
            
        </div>

        <div class="product__list row">
            <div class="col-12 col-lg-2 col-sm-4" style="padding-top: 12px; padding-bottom: 12px;"
                v-for="(vintage, index) in vintages.slice(0, 5)" :key="index">
                <div class="card position-relative" style="height: 398px;">
                    <router-link :to="`/vintage/${vintage.id}`" style="text-decoration: none; color: black;">
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

            <div class="col-12 col-lg-2 col-sm-4" style="padding-top: 12px; padding-bottom: 12px;">
                <router-link to="/other" style="text-decoration: none;">
                    <div class="card position-relative" style="height: 398px;">
                        <div class="card-body d-flex align-items-center justify-content-center"
                            style="background-color: #bdfeff;">
                            <a class="fs-3 text-center text-decoration-none" style="color: #009C9E;">See All Product</a>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>

        <div class="container-md my-4x">
            <div class="d-flex  mt-2">
                <h3>Shop by brands</h3>
            </div>

            <div class="d-flex  flex-wrap mb-3">
                <div class="px-2 mb-2">
                    <input type="checkbox" class="btn-check" id="btn-check-outlined">
                    <label class="btn btn-category text-dark" for="btn-check-outlined">
                        Vans
                    </label>
                </div>

                <div class="px-2 mb-2">
                    <input type="checkbox" class="btn-check" id="btn-check2-outlined">
                    <label class="btn btn-category text-dark" for="btn-check2-outlined">
                        Bohoo
                    </label>
                </div>

                <div class="px-2 mb-2">
                    <input type="checkbox" class="btn-check" id="btn-check3-outlined">
                    <label class="btn btn-category text-dark" for="btn-check3-outlined">
                        Mango
                    </label>
                </div>

                <div class="px-2 mb-2">
                    <input type="checkbox" class="btn-check" id="btn-check4-outlined">
                    <label class="btn btn-category text-dark" for="btn-check4-outlined">
                        Reebok
                    </label>
                </div>

                <div class="px-2 mb-2">
                    <input type="checkbox" class="btn-check" id="btn-check5-outlined">
                    <label class="btn btn-category text-dark" for="btn-check5-outlined">
                        Converse
                    </label>
                </div>

                <div class="px-2 mb-2">
                    <input type="checkbox" class="btn-check" id="btn-check6-outlined">
                    <label class="btn btn-category text-dark" for="btn-check6-outlined">
                        Sandro
                    </label>
                </div>

                <div class="px-2 mb-2">
                    <input type="checkbox" class="btn-check" id="btn-check7-outlined">
                    <label class="btn btn-category text-dark" for="btn-check7-outlined">
                        Nike
                    </label>
                </div>

                <div class="px-2 mb-2">
                    <input type="checkbox" class="btn-check" id="btn-check8-outlined">
                    <label class="btn btn-category text-dark" for="btn-check8-outlined">
                        Adidas
                    </label>
                </div>

                <div class="px-2 mb-2">
                    <input type="checkbox" class="btn-check" id="btn-check9-outlined">
                    <label class="btn btn-category text-dark" for="btn-check9-outlined">
                        Dior
                    </label>
                </div>

                <div class="px-2 mb-2">
                    <input type="checkbox" class="btn-check" id="btn-check10-outlined">
                    <label class="btn btn-category text-dark" for="btn-check10-outlined">
                        Puma
                    </label>
                </div>

                <div class="px-2 mb-2">
                    <input type="checkbox" class="btn-check" id="btn-check11-outlined">
                    <label class="btn btn-category text-dark" for="btn-check11-outlined">
                        Zara
                    </label>
                </div>

                <div class="px-2 mb-2">
                    <input type="checkbox" class="btn-check" id="btn-check12-outlined">
                    <label class="btn btn-category text-dark" for="btn-check12-outlined">
                        Bershka
                    </label>
                </div>

                <div class="px-2 mb-2">
                    <input type="checkbox" class="btn-check" id="btn-check13-outlined">
                    <label class="btn btn-category text-dark" for="btn-check13-outlined">
                        American Eagle
                    </label>
                </div>
            </div>
        </div>

        <div class="product__list row">
            <div class="col-12 col-lg-2 col-sm-4" style="padding-top: 12px; padding-bottom: 12px;"
                v-for="(vintage, index) in vintages.slice(0, 5)" :key="index">
                <div class="card position-relative" style="height: 398px;">
                    <router-link :to="`/vintage/${vintage.id}`" style="text-decoration: none; color: black;">
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

            <div class="col-12 col-lg-2 col-sm-4" style="padding-top: 12px; padding-bottom: 12px;">
                <router-link to="/other" style="text-decoration: none;">
                    <div class="card position-relative" style="height: 398px;">

                        <div class="card-body d-flex align-items-center justify-content-center"
                            style="background-color: #bdfeff;">
                            <a class="fs-3 text-center text-decoration-none" style="color: #009C9E;">See All Product</a>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>

defineProps({
    vintages: Array,
})


</script>