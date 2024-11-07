<template>
  <div class="container mt-5">
    <div class="row">
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-4 m-auto mb-5">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <h3 class="card-title text-secondary">Sign up</h3>
                  <i class="fas fa-x text-secondary fs-6"></i>
                </div>
                <p class="card-text text-secondary-emphasis">Enter your detail below</p>
                <form @submit.prevent="register">
                  <div class="mb-3">
                    <base-input
                      type="text"
                      identity="fullname"
                      placeholder="Enter your fullname"
                      label="Full Name"
                      v-model="signupData.fullname">
                    </base-input>
                  </div>

                  <div class="mb-3">
                    <base-input
                      type="text"
                      identity="username"
                      placeholder="Enter your username"
                      label="Username"
                      v-model="signupData.username">
                    </base-input>
                  </div>

                  <div class="mb-3">
                    <base-input
                      type="email"
                      identity="email"
                      placeholder="Enter your email"
                      label="Email"
                      v-model="signupData.email">
                    </base-input>
                  </div>

                  <div class="mb-3">
                    <base-input
                      type="password"
                      identity="password"
                      placeholder="Enter your password"
                      label="Password"
                      v-model="signupData.password"
                      @keyInput="passwordCheck">
                    </base-input>
                    <p class="text-danger mt-1 fw-medium" style="font-size: 11px;" :style="{ display: passwordStatusDisplay }">
                      The password field must be at least 8 characters
                    </p>
                  </div>

                  <div class="mb-3">
                    <base-input
                      type="password"
                      identity="confirmationpassword"
                      placeholder="Enter your password"
                      label="Confirmation Password"
                      v-model="signupData.confirmationPassword"
                      @keyInput="confirmationPasswordCheck">
                    </base-input>
                    <p class="text-danger mt-1 fw-medium" style="font-size: 11px;" :style="{ display: confirmPasswordDoesNotMatch }">
                      The password confirmation does not match
                    </p>
                    <p class="text-success mt-1 fw-medium" style="font-size: 11px;" :style="{ display: confirmPasswordMatch }">
                      The password confirmation does match
                    </p>
                  </div>

                  <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="isCheckboxChecked">
                    <label class="form-check-label" for="exampleCheck1">
                      By clicking sign up, I hereby agree and consent to <span style="color: #009C9E;">Terms & Conditions;</span> I confirm that I have read the <span style="color: #009C9E;">Privacy Policy.</span>
                    </label>
                  </div>

                  <base-button 
                    class="login btn mt-3 w-100 text-light fw-bold" 
                    style="background-color: #009C9E;" 
                    :disabled="!isCheckboxChecked">
                    Continue
                  </base-button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div v-if="showModal" class="modal-backdrop">
        <div class="modal-content">
          <div class="modal-body text-center">
            <img src="https://images.squarespace-cdn.com/content/v1/5c99f242f8135a0eab8d661f/8658cfa1-5351-46eb-b637-c8f582b0a275/91068-message-sent-successfully-plane.gif" alt="Success" class="modal-image">
            <h3 class="mt-3">Successfully Registered</h3>
            <p>Thank you for registering at Vintage. Start finding your favorite pre-loved product here.</p>
            <base-button class="btn text-light mt-3" @click="goToHome" style="background-color: #00D1D1; width: 100%; height: 50px;">
              Go to Home Page
            </base-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseInput from "../ui/BaseInput.vue";
import BaseButton from "../ui/BaseButton.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const showModal = ref(false);
const isCheckboxChecked = ref(false); // Reactive variable to track checkbox state

const signupData = ref({
  fullname: "",
  username: "",
  email: "",
  password: "",
  confirmationPassword: "",
  isLogin: false,
});

const passwordStatusDisplay = ref("none");
const passwordCheck = () => {
  if (signupData.value.password.length < 8) {
    passwordStatusDisplay.value = "block";
  } else {
    passwordStatusDisplay.value = "none";
  }
};

const confirmPasswordDoesNotMatch = ref("none");
const confirmPasswordMatch = ref("none");

const confirmationPasswordCheck = () => {
  if (signupData.value.confirmationPassword === "") {
    confirmPasswordDoesNotMatch.value = "none";
    confirmPasswordMatch.value = "none";
    return;
  }

  if (signupData.value.password !== signupData.value.confirmationPassword) {
    confirmPasswordDoesNotMatch.value = "block";
    confirmPasswordMatch.value = "none";
    return;
  }

  confirmPasswordDoesNotMatch.value = "none";
  confirmPasswordMatch.value = "block";
};

const register = async () => {
  if (
    signupData.value.password !== signupData.value.confirmationPassword ||
    signupData.value.password.length < 8
  ) {
    signupData.value.confirmationPassword = "";
    signupData.value.password = "";
    confirmPasswordDoesNotMatch.value = "none";
    confirmPasswordMatch.value = "none";
  } else {
    await store.dispatch("auth/getRegisterData", signupData.value);
    showModal.value = true;
  }
};

const goToHome = () => {
  router.push("/");
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: darkgrey;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.modal-image {
  width: 250px;
  height: 250px;
}
</style>
