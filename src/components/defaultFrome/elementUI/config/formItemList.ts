import type { FormItem, SelectOptions } from "./type";
import type { UploadProps, UploadUserFile } from "element-plus";
import cityList from './taiwanMapList';
import areaList from './taiwanMapList';
const cityOptions = ref<SelectOptions | []>([]);

export const ItemList: FormItem[] = [
  {
    label: "姓名",
    path: "name",
    elementTag: "input",
    placeholder: "請輸入姓名",
    rules: [
      {
        required: true,
        message: "不可空白",
        trigger: "change",
      },
    ],
  },
  {
    label: "生日",
    path: "birthday",
    elementTag: "date",
    placeholder: "請選擇出生年月日",
    size: "large"
  },
  {
    label: "性別",
    path: "gender",
    elementTag: "radio",
    options: [
      {
        label: "women",
        value: "女"
      },
      {
        label: "man",
        value: "男"
      },
    ]
  },
  {
    label: "手機",
    path: "phone",
    elementTag: "input",
    placeholder: "請輸入手機號碼",
    inputMain: 10,
    inputMax: 10,
    inputType: "number",
    rules: [
      {
        required: true,
        message: "不可空白",
        trigger: "change",
      },
    ],
  },
  {
    label: "地址",
    path: "address",
    elementTag: "group",
    children: [
      {
        label: null,
        elementTag: "select",
        path: "city",
        options: cityList,
      },
      {
        label: null,
        elementTag: "select",
        path: "area",
        options: cityOptions.value,
        filterOptions: (id: number) => {
          cityOptions.value = areaList[id];
        }
      },
    ],
  },
];
