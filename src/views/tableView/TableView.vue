<script setup lang="ts">
import ElDefaultTable from "@/components/defaultTable/elementUI/ElDefaultTable.vue";
import tableData from "./config/tableColumn";
import type { ItemType } from "@/components/defaultTable/elementUI/config/type";
const data = [
  {
    account: "abc123",
    status: false,
    phoneNumber: "09876",
    phoneN: "12345",
    balance: "10",
    wallet: "20",
    loginTime: "2024/3/29",
    operator: "",
  },
  {
    account: "efg 456",
    status: true,
    phoneNumber: "09876",
    phoneN: "12345",
    balance: "100",
    wallet: "20",
    loginTime: "2024/3/29",
    operator: "",
  },
];
const tableColumns: ItemType[] = tableData as ItemType[];
const dataList = ref([]);
function logButton(param) {
  console.log("param", param);
}
function handlerSearch(param) {
  alert(param);
}
function updateCurrentPage(page: number) {
  console.log(page);
}
setTimeout(() => {
  dataList.value = data;
}, 2000);
</script>

<template>
  <ElDefaultTable
    :columnList="tableColumns"
    :dataList="dataList"
    :handlerSearch="handlerSearch"
    :pageTotal="1000"
    @updateCurrentPage="updateCurrentPage"
  >
    <template #header-operator>
      <div></div>
    </template>
    <template #operator="{ scope }">
      <ElButton type="primary" @click="logButton(scope.row)"> 操作 </ElButton>
    </template>
  </ElDefaultTable>
</template>
