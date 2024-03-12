<script setup lang="ts">
import type { FormItem, ItemType } from "./config/type";

interface Props<T = any> {
  formDataList: T;
  formItemList: FormItem[];
}
const props = withDefaults(defineProps<Props>(), {});
const emits = defineEmits(["submit"]);
const formData = ref(props.formDataList);
const formItemList = ref<FormItem[]>();
const formRef = ref();
const formRules = computed(() => getFormRulesConfig(props.formItemList));

type ResultObj = {
  [key: string]: {
    required?: boolean;
    message?: string;
    trigger?: "blur" | "change" | ["blur" | "change"];
  }[];
};

function getFormRulesConfig(param: Pick<FormItem, "path" | "rules" | "children">[]) {
  return param
    .reduce(
      (flatteredOfItem, item) => [...flatteredOfItem, item, ...(item.children ?? [])],
      []
    )
    .reduce(
      (result, { rules, path }) =>
        rules
          ? {
              ...result,
              [path]: rules,
            }
          : result,
      {} as ResultObj
    );
}

onMounted(async () => {
  const promiseResult = await Promise.allSettled(
    props.formItemList?.map(async (item: any) => {
      if (item.elementTag === "select" && item.getOptions) {
        item.options = await item.getOptions();
      }
      item.clearableStatus =
        item.clearableStatus === undefined ? true : item.clearableStatus;

      if (item.children) {
        await Promise.allSettled(
          item.children.map(async (childrenItem) => {
            if (childrenItem.elementTag === "select" && childrenItem.getOptions) {
              childrenItem.options = await childrenItem.getOptions();
            }
          })
        );
      }
      return { ...item };
    })
  );
  formItemList.value = promiseResult
    .filter((result: any) => result.status === "fulfilled")
    .map((result: any) => result.value);
});
</script>

<template>
  <div class="w-96 border border-cyan-950 p-5">
    <ElForm ref="formRef" :model="formData" :rules="formRules">
      <ElFormItem v-for="item in props.formItemList" :label="item.label">
        <ElInput
          v-if="item.elementTag === 'input'"
          v-model="formData[item.path]"
          :minlength="item.inputMain"
          :maxlength="item.inputMax"
          :clearable="item?.clearableStatus"
        />
        <ElInputNumber
          v-if="item.elementTag === 'inputNumber'"
          v-model="formData[item.path]"
          :minlength="item.inputMain"
          :maxlength="item.inputMax"
          :clearable="item?.clearableStatus"
        />
        <ElDatePicker
          v-if="item.elementTag === 'date'"
          v-model="formData[item.path]"
          type="date"
          :placeholder="item.placeholder"
          :size="item.dateSize"
        />
        <ElRadioGroup
          v-if="item.elementTag === 'radio'"
          v-model="formData[item.path]"
          class="flex flex-row"
        >
          <ElRadio v-for="optionsItem in item.options" :value="optionsItem.label">
            {{ optionsItem.value }}
          </ElRadio>
        </ElRadioGroup>
        <ElFormItem v-if="item.elementTag === 'group' && item.children">
          <ElCol
            v-for="childrenItem in item.children"
            :span="childrenItem.span"
            :kye="childrenItem"
            class="mr-2 mb-2"
          >
            <ElSelect
              v-if="childrenItem.elementTag === 'select' && childrenItem.selectRelation"
              v-model="formData[item.path][childrenItem.path]"
              :placeholder="childrenItem.placeholder"
            >
              <ElOption
                v-for="selectOption in childrenItem.selectRelationOption[
                  formData[item.path][childrenItem.selectRelation]
                ]"
                :label="selectOption?.label"
                :value="selectOption?.value"
              />
            </ElSelect>
            <ElSelect
              v-else-if="childrenItem.elementTag === 'select'"
              v-model="formData[item.path][childrenItem.path]"
              :placeholder="childrenItem.placeholder"
              @change="childrenItem.filterOptions({ formData, item })"
            >
              <ElOption
                v-for="selectOption in childrenItem.options"
                :label="selectOption?.label"
                :value="selectOption?.value"
              />
            </ElSelect>
            <ElInput
              v-if="childrenItem.elementTag === 'input'"
              :placeholder="childrenItem.placeholder"
            />
          </ElCol>
        </ElFormItem>
        <ELUpload v-if="item.elementTag === 'upload'" action="#" />
      </ElFormItem>
    </ElForm>
  </div>
</template>
