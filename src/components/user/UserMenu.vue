<template>
            <div class="col-md-3 d-flex flex-column">
                <h2 class="card-text p-2">Settings</h2>
                <a @click="menuClicked('profile-detail')" class="card-text p-4 text-decoration-none text-black" style="cursor: pointer;">Profile details</a>
                <a @click="menuClicked('change-password')" class=" card-text p-4 text-decoration-none text-black" style="cursor: pointer;">Change Password</a>
                <a @click="menuClicked('user-vintage')" class=" card-text p-4 text-decoration-none text-black" style="cursor: pointer;">Add Vintage Product</a>
                <a @click="menuClicked('transaction-history')" class=" card-text p-4 text-decoration-none text-black" style="cursor: pointer;">Transaction History</a>
            </div>
</template>

<script setup>
const emit = defineEmits(["changeComponent"]);

const menuClicked = (option) => {
  emit("changeComponent", option);
};
</script>