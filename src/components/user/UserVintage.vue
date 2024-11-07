<template>
    <div class="col-md-8 mb-5">
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item">
                    <div class="d-flex flex-sm-row flex-column justify-content-between align-items-sm-center">
                        <div class="mb-3 mb-sm-0">
                            <p class="my-0 fs-4 fw-semibold">My Vintage</p>
                            <p class="my-0 text-secondary">Add your vintage here</p>
                        </div>
                        <div>
                            <button class="btn add-btn px-3 py-2 rounded-pill" @click="addNewVintage">
                                <i class="fa-solid fa-circle-plus pe-2"></i>Add Vintage
                            </button>
                        </div>
                    </div>
                </li>
                <li class="list-group-item">
                    <p class="mt-2 mb-4 fs-5 fw-semibold">vintage</p>
                    <div class="row">
                        <!-- User Vintage Card -->
                        <user-vintage-card v-for="vintage in vintages" :key="vintage.id" :vintage="vintage"
                            :buttonName="['Delete', 'Edit']" 
                            @btnRemove="deleteVintage(vintage.id)"
                            @btnEdit="editVintage(vintage.id)">
                            <p>{{ timeAgo(vintage.createdAt) }}</p>
                        </user-vintage-card>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import UserVintageCard from "./UserVintageCard.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const vintages = computed(() => {
    const allVintage = store.state.vintage.vintages;
    const userId = store.state.auth.userLogin.userId;
    return allVintage.filter((vintage) => vintage.userId === userId);
});

const deleteVintage = async (id) => {
    await store.dispatch("vintage/deleteVintage", id);
};


const editVintage = async (id) => {
    await store.dispatch("vintage/getVintageDetail", id);
    router.push(`/vintage/edit/${id}`);

};
const addNewVintage = async () => {
    router.push("/new-vintage");
};

const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
};
</script>