<script setup lang="ts">
import ElDefaultTable from "@/components/defaultTable/elementUI/ElDefaultTable.vue";
import tableColumns from "./config/tableColumn"
</script>

<template>
  <ElDefaultTable :columnList="tableColumns" />
</template>
