<template>
    <ul class="list-group">
        <vintage-form-header></vintage-form-header>
        <vintage-form-body :isEdit="isEdit" :detailData="detailData"></vintage-form-body>
    </ul>
</template>

<script setup>
    import VintageFormHeader from './VintageFormHeader.vue';
    import VintageFormBody from './VintageFormBody.vue';

    defineProps({
        isEdit: { type: Boolean, default: false },
        detailData: { type: Object, default: () => ({}) },
    });
</script>