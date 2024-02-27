<script setup lang="ts">
import { itemList } from "./config/formItemList";
import ElDefaultForm from "@/components/defaultForm/elementUI/ElDefaultForm.vue";
</script>

<template>
  <ElDefaultForm :formDataList="itemList" />
</template>
