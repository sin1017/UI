<script setup lang="ts">
import type { ColumnItem } from "./config/type";

type Props = {
  borderStatus?: boolean;
  columnList: ColumnItem[];
  dataList?: any[];
  defaultSort?: { prop: string; order: "ascending" | "descending" };
  headerBackgroundColor?: string;
  headerFontColor?: string;
  currentPage?: number;
  pagerCount?: number;
  pageTotal: number;
  pageBackground?: boolean;
  searchBar?: boolean;
  handlerSearch?: (param: string) => void | Promise<void>;
  title?: string;
  titlePosition?: "left" | "right" | "center";
  zebraStripes?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  borderStatus: true,
  headerBackgroundColor: "#c0c1c6",
  headerFontColor: "#46484a",
  searchBar: true,
  currentPage: 1,
  pagerCount: 10,
  pageBackground: false,
  title: "",
  titlePosition: "left",
  zebraStripes: false,
});
const emits = defineEmits(["updateCurrentPage"]);
const searchInput = ref("");
const loading = computed(() => props.dataList.length <= 0);
const currentPage = ref(props.currentPage);

async function handlerSearch() {
  await props.handlerSearch(searchInput.value);
  searchInput.value = "";
}

function handleCurrentChange(pageNumber: number) {
  emits("updateCurrentPage", pageNumber);
}
</script>

<template>
  <div
    class="w-full h-full flex flex-col items-center px-3 rounded-md bg-white p-3"
    v-loading="loading"
    element-loading-background="rgba(255, 255, 255, 0.7)"
  >
    <h2 class="mb-3 w-full" :class="'text-' + titlePosition">{{ title }}</h2>
    <div v-if="searchBar" class="w-full mb-3 flex items-center">
      <ElInput
        v-model="searchInput"
        placeholder="搜尋 ..."
        size="large"
        style="width: 240px"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><search /></el-icon>
        </template>
      </ElInput>
      <button @click="handlerSearch" class="btn btn-primary ml-4">搜尋</button>
    </div>
    <ElTable
      :data="dataList"
      :border="borderStatus"
      :defaultSort="defaultSort"
      :stripe="zebraStripes"
      :header-cell-style="{
        backgroundColor: headerBackgroundColor,
        color: headerFontColor,
      }"
    >
      <ElTableColumn
        v-for="item in props.columnList"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :minWidth="item.minWidth"
        :sortOrder="['ascending', 'descending']"
        :sortable="item.sortable"
        :header-align="item.headerAlign ?? 'left'"
        :align="item.align ?? 'left'"
        :fixed="item.fixed"
        :formatter="item.formatter"
        :resizable="item.resizable"
      >
        <template #header>
          <slot :name="'header-' + item.prop" />
        </template>
        <template v-if="item.children">
          <ElTableColumn
            v-for="childItem in item?.children"
            :key="childItem.prop"
            :prop="childItem.prop"
            :label="childItem.label"
            :width="childItem.width"
            :minWidth="childItem.minWidth"
            :sortOrder="['ascending', 'descending']"
            :sortable="childItem.sortable"
            :header-align="childItem.headerAlign ?? 'left'"
            :align="childItem.align ?? 'left'"
            :fixed="childItem.fixed"
            :formatter="childItem.formatter"
            :resizable="childItem.resizable"
          >
            <template #default="scope" v-if="$slots[childItem.prop]">
              <slot :name="childItem.prop" :scope="scope" />
            </template>
          </ElTableColumn>
        </template>
        <template #default="scope" v-if="$slots[item.prop]">
          <slot :name="item.prop" :scope="scope" />
        </template>
      </ElTableColumn>
    </ElTable>
    <template v-if="$slots.footer">
      <slot name="footer" />
    </template>
    <ElPagination
      v-else
      v-model:current-page="currentPage"
      :background="pageBackground"
      :total="pageTotal"
      layout="prev, pager, next"
      class="mt-3"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style>
.testPx {
  padding: 0 2px;
}
.btn {
  @apply relative flex items-center justify-center rounded-md border  px-5 py-2 text-sm font-semibold shadow-lg outline-none transition duration-300 hover:shadow-none;
}
.btn-lg {
  @apply px-7 py-2.5 text-base;
}
.btn-sm {
  @apply px-2.5 py-1.5 text-xs;
}
.btn[disabled],
.btn[disabled]:hover {
  @apply cursor-not-allowed opacity-60;
}

.btn-primary {
  @apply border-[#4361ee] bg-[#4361ee] text-white shadow-[#4361ee]/60;
}
.btn-outline-primary {
  @apply border-[#4361ee] text-[#4361ee]  shadow-[#989595]/60 hover:bg-[#4361ee] hover:text-white;
}

.btn-secondary {
  @apply border-[#805dca] bg-[#805dca] text-white shadow-[#805dca]/60;
}
.btn-outline-secondary {
  @apply border-[#805dca] text-[#805dca]  shadow-[#989595]/60 hover:bg-[#805dca] hover:text-white;
}

.btn-success {
  @apply border-[#00ab55] bg-[#00ab55] text-white shadow-[#00ab55]/60;
}
.btn-outline-success {
  @apply border-[#00ab55] text-[#00ab55]  shadow-[#989595]/60 hover:bg-[#00ab55] hover:text-white;
}

.btn-danger {
  @apply border-[#e7515a] bg-[#e7515a] text-white shadow-[#e7515a]/60;
}
.btn-outline-danger {
  @apply border-[#e7515a] text-[#e7515a] shadow-[#989595]/60  hover:bg-[#e7515a] hover:text-white;
}

.btn-warning {
  @apply border-[#e2a03f] bg-[#e2a03f] text-white shadow-[#e2a03f]/60;
}
.btn-outline-warning {
  @apply border-[#e2a03f] text-[#e2a03f]  shadow-[#989595]/60 hover:bg-[#e2a03f] hover:text-white;
}

.btn-info {
  @apply border-[#2196f3] bg-[#2196f3] text-white shadow-[#2196f3]/60;
}
.btn-outline-info {
  @apply border-[#2196f3] text-[#2196f3]  shadow-[#989595]/60 hover:bg-[#2196f3] hover:text-white;
}
</style>
