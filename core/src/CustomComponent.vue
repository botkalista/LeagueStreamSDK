<script setup lang="ts">

import { ref, markRaw } from 'vue';

const props = defineProps<{ componentName: string }>();

const comp = ref<any>(null);

import(`../../widgets/${props.componentName}/view.vue`).then(e => {
    comp.value = markRaw(e.default)
});

</script>

<template>
    <component :is="comp"></component>
</template>
  
