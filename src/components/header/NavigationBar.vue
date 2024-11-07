<template>
    <div class="header__navbar row justify-content- align-items-center ms-1" style="width: 1050px;">
        <search-menu></search-menu>
        <component :is="components[menuComponent]"></component>
    </div>
</template>

<script setup>
    import SearchMenu from '@/components/header/SearchMenu.vue';
    import SignupMenu from '@/components/header/SignupMenu.vue';
    import ProfileMenu from "./ProfileMenu.vue";
    import { computed, ref, watch } from "vue";
    import { useStore } from "vuex";

    const menuComponent = ref("signup-menu");
    const store = useStore();

    // Get token
    const components = {
        "signup-menu": SignupMenu,
        "profile-menu": ProfileMenu,
    }

    // Watch for token changes
    const getToken = computed(() => {
        return store.state.auth.token;
    });

    if (!getToken.value) {
        menuComponent.value = "signup-menu";
    } else {
        menuComponent.value = "profile-menu";
    }

    // Watch for token changes
    watch(getToken, (newValue, oldValue) => {
        if (!newValue) {
            menuComponent.value = "signup-menu";
        } else {
            menuComponent.value = "profile-menu";
        }
    });
</script>