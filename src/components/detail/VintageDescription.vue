<template>
    <div class="col-md-6 mx-auto">
        <img :src="vintageDetail.imageLink" class="img-fluid mb-3" alt="Large Shirt " style="height: 620px;">
    </div>

    <div class="col-md-4 mx-auto ">
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h3 class="card-title">Rp{{ vintageDetail.price }}</h3>
                    <i class="fas fa-heart text-secondary"></i>
                </div>
                <p class="card-text">{{ vintageDetail.name }}</p>
                <div class="text-secondary d-flex justify-content-between">
                    <p class="card-text">{{ vintageDetail.size }}</p>
                    <p class="card-text">{{ vintageDetail.condition }}</p>
                    <p class="card-text">Denpasar</p>
                </div>
                <hr>
                <div class="d-flex justify-content-between">
                    <p class="card-text">Item Description</p>
                    <p class="card-text">{{ vintageDetail.description }}</p>
                </div>

                <div class="d-flex justify-content-between">
                    <p class="card-text">Category</p>
                    <p class="card-text">{{ vintageDetail.category }}</p>
                </div>

                <div class="d-flex justify-content-between">
                    <p class="card-text">Size</p>
                    <p class="card-text">{{ vintageDetail.size }}</p>
                </div>

                <div class="d-flex justify-content-between">
                    <p class="card-text">Codition</p>
                    <p class="card-text">{{ vintageDetail.condition }}</p>
                </div>

                <div class="d-flex justify-content-between">
                    <p class="card-text">Color</p>
                    <p class="card-text">{{ vintageDetail.color }}</p>
                </div>

                <div class="d-flex justify-content-between">
                    <p class="card-text">Uploaded</p>
                    <p class="card-text">{{ timeAgo(vintageDetail.createdAt) }}</p>
                </div>

                <div class="d-flex justify-content-between">
                    <p class="card-text">Shipping</p>
                    <p class="card-text">Rp{{ vintageDetail.shipping }}</p>
                </div>

                <a href="#" class="btn mt-3 w-100 text-light fw-bold" style="background-color: #009C9E;">Buy Now</a>
                <button @click="handleAddToCart" class="btn mt-2 w-100 fw-bold" style="border: 1px solid #009C9E; color: #009C9E;">Add to
                    Cart</button>
                <hr>
                <div class="card">
                    <div class="card-body" height="80">
                        <div class="d-flex align-items-center">
                            <i class="fa-solid fa-user rounded-circle" width="60" height="60" style="object-fit: cover; float: left;" v-if="!userData.imageLink"></i>
                            <img :src="userData.imageLink" v-else class="rounded-circle" width="60" height="60" style="object-fit: cover; float: left;">
                            <div class="d-flex flex-column mx-5">
                                <h5>{{ userData.username }}</h5>
                                <div class="text-warning">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div>
        <div>
            <h2>Other Product</h2>
            <div class="product__list row">
                <div v-for="(item, index) in vintageslist" :key="index" class="col-12 col-lg-2 col-sm-4"
                    style="padding-top: 12px; padding-bottom: 12px;">
                    <div class="card position-relative" style="height: 398px;">
                        <img :src="item.imageLink" class="card-img-top" alt="Vintage Item" height="240" width="285">
                        <div class="card-body">
                            <p class="mb-0 fs-5 fw-bold" style="color: #009C9E;">Rp{{ item.price }}</p>
                            <p class="mb-0">{{ item.name }}</p>
                            <div class="d-flex justify-content-between">
                                <p class="position-absolute bottom-0">{{ item.size }}</p>
                                <i class="fas fa-heart d-flex text-secondary position-absolute bottom-0 end-0 me-2 p-1">
                                    <p class="ms-2">12</p>
                                </i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- Modal -->
    <div v-if="showModal" class="custom-modal-overlay">
        <div class="custom-modal">
            <div class="p-3 text-center">
                <!-- Modal content goes here -->
                <img src="https://cdn-icons-gif.flaticon.com/15576/15576195.gif" alt="Success" style="width: 250px; height: 250px;">
                <h4>You have successfully added this item to cart</h4>
                <p style="color: darkgrey;" class="fs-4">"{{ vintageDetail.name }}" successfully added to cart. Check now on the cart or continue shopping.</p>
            </div>
            <div class="custom-modal-footer d-flex flex-column justify-content-center">
                <button type="button" class="teal-btn-outline w-75" @click="goToHome">Continue Shopping</button>
                <button type="button" class="teal-btn w-75" @click="goToCart">Go to cart</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore()
const router = useRouter();

const vintageslist = computed(() => store.state.vintage.vintages);

const vintageDetail = computed(() => {
    return store.state.vintage.vintageDetail;
});

const userData = computed(() => {
    return store.state.auth.userLogin
});

const showModal = ref(false);
const handleAddToCart = () => {
    if (userData.value) {
        store.dispatch("vintage/addToCart", vintageDetail.value);
        showModal.value = true;
        console.log(vintageDetail.value);
    } else {
        alert("Data failed to add to cart");
    }
};

const goToHome = () => {
    router.push("/");
};

const goToCart = () => {
    router.push("/vintage/cart");
};

defineProps({
    vintages: Array,
})
console.log(vintageDetail.value.name);

const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
};


</script>

<style scoped>
/* Overlay to darken the background */
.custom-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

/* Modal box styling */
.custom-modal {
    width: 90%;
    max-width: 500px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease;
}

.custom-modal-footer {
    padding: 16px;
    display: flex;
    align-items: center;
}

.custom-modal-footer {
    border-top: 1px solid #ddd;
}

/* Button styles */
.teal-btn {
    padding: 8px 16px;
    margin: 4px;
    border: 1px solid #099497;
    border-radius: 6px;
    cursor: pointer;
    background-color: #fff;
    color: #099497;
}

.teal-btn:hover {
    background-color: #099497;
    color: #fff;
}

.teal-btn-outline {
    padding: 8px 16px;
    margin: 4px;
    border: 1px solid #099497;
    border-radius: 6px;
    cursor: pointer;
    background-color: #fff;
    color: #099497;
}

.teal-btn-outline:hover {
    background-color: #099497;
    color: #fff;
}

/* Animation for modal */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}
</style>