<script setup lang="ts">
import { itemList } from "./config/formItemList";
import ElDefaultForm from "@/components/defaultForm/elementUI/ElDefaultForm.vue";
</script>

<template>
  <div class="w-72">
    <ElDefaultForm :formDataList="itemList" />
  </div>
</template>
