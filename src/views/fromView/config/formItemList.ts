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
        span: 8,
        options: cityList,
        placeholder: "請選擇縣市",
        filterOptions: ({ formData, item }) => {
          const target = item.children.find((childrenItem) =>
            Object.keys(childrenItem).includes("selectRelation")
          );
          if (target) {
            formData[item.path][target.path] = null;
          }
        },
      },
      {
        label: null,
        elementTag: "select",
        selectRelation: "city",
        selectRelationOption: Object.fromEntries(
          areaList.map((item) => [item.label, item.value])
        ),
        path: "area",
        span: 8,
        placeholder: "請選擇區域",
      },
      {
        label: null,
        elementTag: "input",
        path: "address",
        span: 24,
        placeholder: "請輸入地址",
      },
    ],
  },
  {
    label: "頭像",
    path: "avatar",
    elementTag: "upload",
    uploadListType: "picture-card",
    uploadLimit: 1,
    uploadRequest: async () => {
      return await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(
            {
              success: true,
              message: "成功"
            }
          );
        }, 1500)
      })
    }
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
