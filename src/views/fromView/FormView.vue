<script setup lang="ts">
import type { FormItem } from "@/components/defaultForm/elementUI/config/type";
import { itemList } from "./config/formItemList";
import ElDefaultForm from "@/components/defaultForm/elementUI/ElDefaultForm.vue";
console.log("iiii", itemList);
</script>

<template>
  <ElDefaultForm :formDataList="itemList" />
</template>
