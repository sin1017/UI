<script setup lang="ts">
import type { FormItem } from "./config/type";

interface Props<T = any> {
  formItemListConfig: FormItem;
  formDataList: T;
}

const props = withDefaults(defineProps<Props>(), {});
const emits = defineEmits(["submit"]);
const fromData = ref(props.formDataList);

onMounted(async () => {
  fromData.value = await Promise.all(
    props.formItemListConfig.map(async (item) => {
      if (item.elementTag === "select" && item.getOptions) {
        item.options = await item.getOptions();
      }
      if (
        item.children &&
        item.children.elementTag === "select" &&
        item.children.getOptions
      ) {
        item.children.options = await item.children.getOptions();
      }
      return { ...item };
    })
  );
});
</script>

<template>
  <ElForm :model="fromData">
    <ElFormItem v-for="item in props.formItemListConfig">
      <ElInput v-if="item.elementTag === 'input'" v-model="fromData[item.path]" />
    </ElFormItem>
  </ElForm>
</template>
