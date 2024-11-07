<template>
    <div class="container mt-5">
        <div class="row d-flex justify-content-between align-items-start">
            <user-menu @changeComponent="$router.push($event)"></user-menu>
            <component :is="component[getRoute]"></component>
        </div>
    </div>
</template>

<script setup>
import UserMenu from '../user/UserMenu.vue';
import ProfileDetail from '../user/ProfileDetail.vue';
import ChangePassword from '../user/ChangePassword.vue';
import TransactionHistory from '../user/TransactionHistory.vue';
import UserVintage from '../user/UserVintage.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const component = {
    "profile-detail": ProfileDetail,
    "change-password": ChangePassword,
    "user-vintage": UserVintage,
    "transaction-history": TransactionHistory
};

const getRoute = computed(() => {
    return route.params.component;
});

</script>