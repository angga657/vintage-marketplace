<template>
    <div class="container mt-5">
            <div class="row">

                <div class="container mt-5">
                    <div class="row">
                        <div class="col-md-3 m-auto mb-5">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between">
                                    <h3 class="card-title text-secondary">Login</h3>
                                    <i class="fas fa-x text-secondary fs-6"></i>
                                    </div>
                                    <p class="card-text text-secondary-emphasis">Enter your detail below</p>
                                    <form @submit.prevent="login">
                                        <div class="mb-3">
                                            <base-input 
                                                    type="email" 
                                                    identity="email" 
                                                    placeholder="Your email address"  
                                                    label="Email"
                                                    v-model="loginData.email">
                                            </base-input>
                                        </div>
                                        <div class="mb-3">
                                            <base-input 
                                                type="password" 
                                                identity="password" 
                                                placeholder="Your password" 
                                                label="Password"
                                                v-model="loginData.password">
                                            </base-input>
                                        </div>
                                        <base-button class="login btn mt-3 w-100 text-light fw-bold" style="background-color: #009C9E;">
                                            Continue
                                        </base-button>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
</template>

<script setup>
import BaseInput from "../ui/BaseInput.vue";
import BaseButton from "../ui/BaseButton.vue";
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const loginData = reactive ({
  email: "",
  password: "",
  isLogin: true
})

const store = useStore()
const router = useRouter()

const login = async () => {
  await store.dispatch("auth/getLoginData", loginData);
  router.push("/")
}
</script>