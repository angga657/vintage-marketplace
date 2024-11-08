<template>
    <div class="col-md-8 mb-5 mt-5">
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h4 class="card-title text-secondary">Change Password</h4>
                    <i class="fas fa-times text-secondary fs-6"></i>
                </div>

                <form @submit.prevent="updatePassword">
                    <div class="mb-3">
                        <base-input
                            type="password"
                            identity="oldPassword"
                            placeholder="Enter your Old Password"
                            label="Old Password"
                            v-model="formData.oldPassword"
                        ></base-input>
                    </div>
                    <div class="mb-3">
                        <base-input
                            type="password"
                            identity="newPassword"
                            placeholder="Enter your New Password"
                            label="New Password"
                            v-model="formData.newPassword"
                        ></base-input>
                        <p class="text-danger" v-if="newPasswordError">{{ newPasswordError }}</p>
                    </div>

                    <div class="mb-3">
                        <base-input
                            type="password"
                            identity="confirmationPassword"
                            placeholder="Confirm New Password"
                            label="Confirmation New Password"
                            v-model="formData.confirmationPassword"
                        ></base-input>
                        <p class="text-danger" v-if="confirmPasswordError">{{ confirmPasswordError }}</p>
                    </div>
                    <button type="submit" class="btn btn-teal float-end text-light" style="background-color: #009C9E;">Save Changes</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import BaseInput from '../ui/BaseInput.vue';
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const formData = reactive({
    oldPassword: '',
    newPassword: '',
    confirmationPassword: ''
});

const newPasswordError = ref('');
const confirmPasswordError = ref('');

const updatePassword = async () => {
    newPasswordError.value = '';
    confirmPasswordError.value = '';

    if (formData.newPassword.length < 8) {
        newPasswordError.value = 'Password must be at least 8 characters.';
        return;
    }

    if (formData.newPassword !== formData.confirmationPassword) {
        confirmPasswordError.value = 'The passwords do not match.';
        return;
    }

    try {
        await store.dispatch('auth/updatePassword', {
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
        });
        router.push('/profile'); // Redirect after successful update
    } catch (error) {
        // Handle error (e.g., show notification)
        console.error(error);
    }
};
</script>
