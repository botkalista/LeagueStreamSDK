<script setup lang="ts">
import { sdk } from '../../core/lib/ClientSDK';

sdk.currentPlayer.query().then(e => console.log(e));

</script>

<template>
    TEST
</template>

