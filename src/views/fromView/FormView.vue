<script setup lang="ts">
import { itemList } from './config/formItemList'
import type { FormDataList } from './config/formItemList'
import ElDefaultForm from '@/components/defaultForm/elementUI/ElDefaultForm.vue'

const formDataList = ref<FormDataList>({
  name: '',
  birthday: '',
  gender: 'women',
  phone: null,
  address: {
    city: null,
    area: null,
    address: null
  }
})
console.log(itemList)
</script>

<template>
  <div class="w-full flex justify-center p-5">
    <ElDefaultForm :formDataList="formDataList" :formItemList="itemList" />
  </div>
</template>
