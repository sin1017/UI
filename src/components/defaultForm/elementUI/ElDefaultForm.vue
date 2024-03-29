<script setup lang="ts">
import type { FormItem, ButtonStyle } from "./config/type";

interface Props<T = any> {
  formDataList: T;
  formItemList: FormItem[];
  submitBtnStyle?: ButtonStyle;
  cancelBtnStyle?: ButtonStyle;
}
type ResultObj = {
  [key: string]: {
    required?: boolean;
    message?: string;
    trigger?: "blur" | "change" | ["blur" | "change"];
    validator?: () => void;
  }[];
};

const props = withDefaults(defineProps<Props>(), {
  submitBtnStyle: "btn-info",
  cancelBtnStyle: "btn-outline-danger",
});
const emits = defineEmits(["submit", "cancel"]);
const formData = ref(props.formDataList);
const formItemList = ref<FormItem[]>();
const formRef = ref();
const formRules = computed(() => getFormRulesConfig(props.formItemList));

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
async function handleSubmit() {
  if (!formRef.value) return;
  await formRef.value.validate((valid, fields) => {
    if (!valid) {
      return;
    }
    emits("submit", formData.value);
  });
}
function resetFormData() {
  if (!formRef.value) return;
  formRef.value.resetFields();
  emits("cancel");
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
  <div
    class="w-96 h-fit p-5 border-1 border-solid rounded-lg border-[#bbbdc1] shadow-2xl"
  >
    <ElForm ref="formRef" :model="formData" :rules="formRules" class="drop-shadow-md">
      <ElFormItem
        v-for="item in props.formItemList"
        :label="item.label"
        :prop="item.path"
        :class="{ 'pl-2': !formRules[item.path] }"
        class="flex items-center"
      >
        <ElInput
          v-if="item.elementTag === 'input'"
          v-model="formData[item.path]"
          :minlength="item.inputMain"
          :maxlength="item.inputMax"
          :clearable="item?.clearableStatus"
          class="w-1/4"
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
        <ElFormItem v-if="item.elementTag === 'group' && item.children" class="w-full">
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
              class="w-1/3"
            />
          </ElCol>
        </ElFormItem>
        <ElUpload
          v-if="item.elementTag === 'upload'"
          action=""
          v-model:file-list="formData[item.path]"
          :list-type="item.uploadListType"
          :http-request="item.uploadRequest"
          :limit="item.uploadLimit ?? 1"
        >
          <slot v-if="$slots.upload" name="upload" />
          <el-icon v-else><Plus /></el-icon>
        </ElUpload>
      </ElFormItem>
    </ElForm>
    <slot name="footer" />
    <div class="w-full flex items-center justify-evenly">
      <button class="btn" :class="cancelBtnStyle" @click="resetFormData">取消</button>
      <button class="btn" :class="submitBtnStyle" @click="handleSubmit">送出</button>
    </div>
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
