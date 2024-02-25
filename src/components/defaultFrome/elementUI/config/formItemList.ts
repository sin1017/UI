import type { FormItem, Options, OptionsKey } from "./type";
import type { UploadProps, UploadUserFile } from "element-plus";
import cityList from './taiwanMapList';
import areaList from './taiwanMapList';
const cityOptions = ref<Options | []>([]);

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
        options: cityOptions.value,
        getOptions: () => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(cityList)
            }, 1500)
          })
        }
      },
      {
        label: null,
        elementTag: "select",
        path: "area",
        options: cityOptions.value,
        getOptions: () => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(areaList)
            }, 1500)
          })
        }
      },
    ],
  },
];
