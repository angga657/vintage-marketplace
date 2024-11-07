<template>
        <div class="card">
            <div class="card-body">   
                    <form @submit.prevent="addNewVintage">
                        <!-- General Information Start -->
                        <div>
                            <p class="my-3 fs-5 fw-semibold">Add Vintage Data</p>
                            <div>
                                <!-- Image Start -->
                                <div class="mb-3">
                                    <base-input type="file" identity="vintageImage" label="Photo Image"
                                        @input="checkImage">
                                    </base-input>
                                    <div>
                                        <img :src="vintageData.imageLink" :alt="vintageData.name" class="image"
                                            width="300">
                                    </div>
                                </div>
                                <!-- Image End -->

                                <!-- Vintage Name Start -->
                                <div class="mb-3">
                                    <base-input type="text" identity="vintageName"
                                        placeholder="Give your vintage a name" label="Vintage Name"
                                        v-model="vintageData.name"></base-input>
                                </div>
                                <!-- Vintage Name  End -->

                                <!-- Vintage Category Start -->
                                <div class="mb-3">
                                    <base-input type="text" identity="vintageCategory"
                                        placeholder="Give your vintage a category" label="Vintage Category"
                                        v-model="vintageData.category"></base-input>
                                </div>
                                <!-- Vintage Category End -->

                                <!-- Vintage Color Start -->
                                <div class="mb-3">
                                    <base-input type="text" identity="vintageColor"
                                        placeholder="Give your vintage a color" label="Vintage Color"
                                        v-model="vintageData.color"></base-input>
                                </div>
                                <!-- Vintage Color End -->

                                <!-- Vintage Description Start -->
                                <div class="mb-3">
                                    <base-text-area identity="vintageDescription" label="Description"
                                        placeholder="Share story behind vintage and what makes it special"
                                        v-model="vintageData.description"></base-text-area>
                                </div>
                                <!-- Vintage Description End -->

                                <!-- Vintage Size Start -->
                                <div class="mb-3">
                                    <base-select :data="['Condition', 'Bad', 'Good', 'Very Good',]"
                                        v-model="vintageData.condition"></base-select>
                                </div>
                                <!-- Vintage Size End -->

                                <!-- Vintage Price Start -->
                                <div class="mb-3">
                                    <base-input type="number" identity="vintagePrice"
                                        placeholder="Give your vintage a price" label="Vintage Price"
                                        v-model="vintageData.price"></base-input>
                                </div>
                                <!-- Vintage Price End -->

                                <!-- Vintage Shipping Start -->
                                <div class="mb-3">
                                    <base-input type="number" identity="vintageShipping"
                                        placeholder="Give your vintage a shipping" label="Vintage Shipping"
                                        v-model="vintageData.shipping"></base-input>
                                </div>
                                <!-- Vintage Shipping End -->

                                <!-- Vintage Size Start -->
                                <div class="mb-3">
                                    <base-select :data="['Size','S', 'M', 'L', 'XL', 'XXL', 'XXXL',]"
                                        v-model="vintageData.size"></base-select>
                                </div>
                                <!-- Vintage Size End -->

                            </div>
                        </div>
                        <!-- General Information End -->

                        <!-- Form Button Start -->
                        <div class="border-top py-3 d-flex my-4 justify-content-end">
                            <!-- Cancel Button Start -->
                            <router-link to="/user/user-vintage" class="btn btn-danger rounded-pill">Cancel</router-link>
                            <!-- Cancel Button End -->

                            <!-- Submit Button Start -->
                            <base-button class="submit-btn btn-primary px-3 py-2 ms-1">Submit</base-button>
                            <!-- Submit Button End -->
                        </div>
                        <!-- Form Button End -->
                    </form>
            </div>
        </div>
</template>

<script setup>
import BaseInput from '../ui/BaseInput.vue';
import BaseButton from '../ui/BaseButton.vue';
import BaseTextArea from '../ui/BaseTextArea.vue';
import BaseSelect from '../ui/BaseSelect.vue';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const store = useStore();
const router = useRouter();
const route = useRoute();

const props = defineProps({
    isEdit: { type: Boolean, default: false },
    detailData: { type: Object, default: () => ({}) },
});

const vintageData = ref({
    imageLink: "",
    name: "",
    category: "",
    color: "",
    description: "",
    condition: "",
    price: "",
    shipping: "",
    size: "",
});


const checkImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.addEventListener("load", () => {
        vintageData.value.imageLink = reader.result;
    });
};

const addNewVintage = async () => {
    if (props.isEdit) {
        console.log(vintageData.value);
        await store.dispatch("vintage/updateVintage", {
            id: route.params.id,
            newVintage: vintageData.value,
        });
    } else {
        await store.dispatch("vintage/addNewVintage", vintageData.value);
    }
    router.push("/user/user-vintage");
};



onMounted(() => {
        if (props.isEdit) {
            vintageData.value = store.state.vintage.vintageDetail;
            console.log(vintageData);
        } else {
            console.error(vintageData);
        }
    });



</script>