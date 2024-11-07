<template>
    <div class="col-md-8 mb-5">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h4 class="card-title text-secondary">Edit Profile</h4>
                            <i class="fas fa-x text-secondary fs-6"></i>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="card-text text-secondary-emphasis fs-2 fw-bold py-5">Photo</p>
                            <div class="d-flex justify-content-center align-items-center">
                                <div v-if="!userData.imageLink">
                                    <i class="fa-solid fa-user rounded-circle p-3 me-3 fs-4" style="background-color: #eafeff;"></i>
                                </div>
                                <div v-else>
                                    <img :src="userData.imageLink" :alt="userData.imgAlt" class="rounded-circle me-3" style="width: 50px; height: 50px; object-fit: cover;">
                                </div>
                                <base-input type="file" class="btn  me-2" identity="profileImage" label="Choose" isImage="true"
                                    @input="checkImage">
                                </base-input>
                                <p class="text-danger mt-2" v-if="errorMsg">{{ errorMsg }}</p>
                                <p class="mt-2" v-else>JPG, JPEG, or PNG, 1MB Max</p>
                            </div>
                            <div>
                                <i class="fa-solid fa-trash-can cursor-pointer me-3" @click="deleteImage" style="cursor: pointer;"></i>
                            </div>

                        </div>
                        <hr>
                        <form>
                            <div class="mb-3">
                                <base-input
                                    type="text" identity="fullname" placeholder="Enter your full name" label="Fullname" v-model="userData.fullname">
                                </base-input>
                            </div>
                            <div class="mb-3">
                                <base-input
                                    type="text" identity="username" placeholder="Enter your username" label="Username" v-model="userData.username">
                                </base-input>
                            </div>

                            <div class="mb-3">
                                <base-input
                                    type="email" identity="email" placeholder="Enter your email" label="Email" v-model="userData.email">
                                </base-input>
                            </div>
                            <button type="button" class="btn btn-teal float-end text-light"  @click="updateProfile" style="background-color: #009C9E;">Update Profile</button>
                        </form>
                    </div>
                </div>
            </div>
</template>

<script setup>
import BaseInput from '../ui/BaseInput.vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';


const router = useRouter();
const store = useStore();
const userData = computed(() => {
    return store.state.auth.userLogin;
});

const errorMsg = ref("");
const checkImage = (e) => {
    const file = e.target.files[0];
    errorMsg.value = "";

    if (file.size > 1024 * 1024) {
        errorMsg.value = "Max image size is 1MB";
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
        userData.value.imageLink = reader.result;
    });
};

const updateProfile = () => {
    store.dispatch("auth/updateUser", userData.value);
    router.push("/user/profile-setting");
    alert("Profile updated successfully");
};

const deleteImage = () => {
    userData.value.imageLink = "";
};
</script>