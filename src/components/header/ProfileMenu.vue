<template>
  <div class="col-7 col-sm-3 d-flex justify-content-evenly align-items-center">
    <!-- Cart Icon with Badge -->
    <div  class="icon-container">
      <i class="fa-solid fa-cart-shopping mx-2" style="cursor: pointer;" @click="goToCart"></i>
      <span v-if="cartItems.length > 0" class="badge" >{{ cartItems.length }}</span>
    </div>

    <!-- Heart Icon with Badge -->
    <div class="icon-container">
      <i class="fa-regular fa-heart mx-2 cursor-pointer"></i>
      <span class="badge">{{ heartCount }}</span>
    </div>

    <!-- User Profile Dropdown -->
    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      <img :src="userData.imageLink" alt="image" class="rounded-circle mx-3" v-if="userData.imageLink" width="30" height="30">
      <i v-else class="fa-solid fa-user me-3 border border-dark border-1 rounded-circle p-2"></i>
    </a>

    <!-- Dropdown Menu -->
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <ul class="dropdown-menu">
          <router-link to="/user/personal-info" class="dropdown-item"><span><i class="fa-solid fa-user me-3"></i></span>Profile</router-link>
          <router-link to="/vintage/checkout" class="dropdown-item"><span><i class="fa-regular fa-newspaper me-3"></i></span>Order</router-link>
          <li class="dropdown-item text-danger" @click="showLogoutModal = true" style="cursor: pointer;"><span><i class="fa-solid fa-right-from-bracket text-danger me-3"></i></span>Logout</li>
        </ul>
      </li>
    </ul>

    <!-- Divider and Language Select -->
    <span class="mx-2" style="color: #999; font-weight: bold;">|</span>
    <select class="form-select form-select-sm border-0" style="width: auto;">
      <option value="en" selected>EN</option>
      <option value="id">ID</option>
      <option value="fr">FR</option>
      <option value="de">DE</option>
    </select>

    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutModal" class="modal-backdrop" @click="showLogoutModal = false">
      <div class="modal-content" @click.stop>
        <h3>Logout</h3>
        <p>Are you sure want to logout from vintage?</p>
        <div class="d-flex justify-content-end">
          <button class="btn btn-secondary mx-1" @click="showLogoutModal = false">Close</button>
          <button class="btn btn-danger mx-1" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const showLogoutModal = ref(false)
const store = useStore()
const router = useRouter()

// Set counts to 0

const heartCount = ref(0)

const cartItems = computed(() => store.state.vintage.cart);

const userData = computed(() => {
  return store.state.auth.userLogin;
});

const logout = () => {
  store.commit("auth/setUserLogout")
  router.push("/")
  showLogoutModal.value = false
}

const goToCart = () => {
    router.push("/vintage/cart");
};
</script>

<style>
.icon-container {
  position: relative;
}

.badge {
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0.25em 0.5em;
  font-size: 0.75rem;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  text-align: left;
} 
</style>
