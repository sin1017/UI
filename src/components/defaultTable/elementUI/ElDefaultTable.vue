<script setup lang="ts">
import type { ColumnList } from "./config/type";

type Props = {
  columnList: ColumnList[];
  borderStatus?: boolean;
  dataList?: any[];
  defaultSort?: { prop: string; order: "ascending" | "descending" };
  searchBar?: boolean;
  zebraStripes?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  searchBar: false,
  borderStatus: true,
  zebraStripes: false,
});
const availableSlots = computed(() => {
  const { columnList } = props;

  if (!columnList) {
    return [];
  }

  const columnProps = columnList.reduce((props: string[], { prop, children }) => {
    const propsRef = props;

    if (prop) {
      propsRef.push(prop);
    }

    if (children) {
      propsRef.push(...children.map(({ prop }) => prop));
    }

    return propsRef;
  }, <string[]>[]);

  const slots = useSlots();

  return columnProps.reduce((result: string[], prop) => {
    const resultRef = result;

    if (Object.hasOwn(slots, prop)) {
      resultRef.push(prop);
    }

    if (Object.hasOwn(slots, `${prop}-header`)) {
      resultRef.push(`${prop}-header`);
    }

    return resultRef;
  }, <string[]>[]);
});
console.log(availableSlots.value);
</script>

<template>
  <div>
    <ElTable
      :data="dataList"
      :border="borderStatus"
      :defaultSort="defaultSort"
      :stripe="zebraStripes"
      element-loading-background="rgba(255, 255, 255, 0.7)"
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
        <template v-if="item.children">
          <ElTableColumn
            v-for="childItem in item?.children"
            :key="childItem.prop"
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
            <template #default="scope">
              <slot :name="childItem.prop" :scope="scope" />
            </template>
          </ElTableColumn>
        </template>
        <template #default="scope" v-if="availableSlots.includes(item.prop)">
          <slot :name="item.prop" :scope="scope" />
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>
