<template>
    <header>
        <div class="container-fluid bg-white py-3 border-bottom position-sticky top-0">
            <div class="container-md d-flex justify-content-center align-items-center">
                <router-link to="/" class="text-decoration-none">
                    <div class="d-flex">
                        <img src="@/assets/images/Logo.png" alt="logo" class="img-fluid" style="height: 50px;">
                    </div>
                </router-link>
                <navigation-bar></navigation-bar>
            </div>
        </div>
    </header>
</template>

<script>
import NavigationBar from "./NavigationBar.vue";
export default {
    components: {
        NavigationBar,
    }
}
</script>