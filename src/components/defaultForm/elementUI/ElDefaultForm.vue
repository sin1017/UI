<script setup lang="ts">
import type { FormItem } from "./config/type";

interface Props {
  formDataList: FormItem[];
}

const props = withDefaults(defineProps<Props>(), {});
const emits = defineEmits(["submit"]);
const fromData = ref(props.formDataList);
console.log(props.formDataList);

onMounted(async () => {
  fromData.value = await Promise.all(
    props.formDataList?.map(async (item) => {
      if (item.elementTag === "select" && item.getOptions) {
        item.options = await item.getOptions();
      }
      if (item.children) {
        item.children.forEach(async (childrenItem) => {
          if (childrenItem.elementTag === "select" && childrenItem.getOptions) {
            childrenItem.options = await childrenItem.getOptions();
          }
        });
      }
      return { ...item };
    })
  );
});
</script>

<template>
  <ElForm :model="fromData">
    <ElFormItem v-for="item in props.formDataList">
      <ElInput v-if="item.elementTag === 'input'" v-model="fromData[item.path]" />
    </ElFormItem>
  </ElForm>
</template>
