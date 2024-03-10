import type { FormItem, Options } from "@/components/defaultForm/elementUI/config/type";
import type { UploadProps, UploadUserFile } from "element-plus";
import { cityList, areaList } from "./taiwanMapList";

export const itemList: FormItem[] = [
  {
    label: "姓名",
    path: "name",
    elementTag: "input",
    placeholder: "請輸入姓名",
    clearableStatus: false,
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
    dateSize: "large",
  },
  {
    label: "性別",
    path: "gender",
    elementTag: "radio",
    options: [
      {
        label: "women",
        value: "女",
      },
      {
        label: "man",
        value: "男",
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
        span: 10,
        options: cityList,
        placeholder: "請選擇縣市",
        filterOptions: (value: string) => {
          const filterResult = areaList.find((item) => item.label === value);
          const areas = filterResult ? filterResult.value : [];
          itemList.find(item => item.path === 'address').children.find(child => child.path === 'area').options = areas;
        },
      },
      {
        label: null,
        elementTag: "select",
        path: "area",
        span: 10,
        options:  [],
        placeholder: "請選擇區域",
      },
      {
        label: null,
        elementTag: "input",
        path: "address",
        span: 20,
        placeholder: "請輸入地址",
      },
    ],
  },
  {
    label: "頭像",
    path: "avatar",
    elementTag: "upload",
  },
];

export type FormDataList = {
  name: string;
  birthday: string;
  gender: string;
  phone: number | null;
  address: {
    city: string | null;
    area: string | null;
    address: string | null;
  };
};
