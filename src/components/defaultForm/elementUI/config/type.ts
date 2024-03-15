type ElementTag = "input" | "inputNumber" | "date" | "radio" | "upload" | "group" | "select";

export type Options = {
  label: string;
  value: string | Options[];
};



type Size = "small" | "large" | "default";

export interface ItemType<T = any> {
  label: string | null;
  elementTag: ElementTag;
  path: string;
  rules?: {
    required?: boolean;
    min?: number;
    max?: number;
    message?: string;
    trigger?: "blur" | "change" | ["blur" | "change"];
    validator?: () => void;
  }[];
  type?: string;
  inputType?: "text" | "textarea" | "password" | "number";
  inputMain?: number;
  inputMax?: number;
  inputStartSuffix?: string;
  inputEndSuffix?: string;
  inputClearable?: boolean;
  clearableStatus?: boolean;
  uploadListType?: "text" | "picture" | "picture-card";
  uploadLimit?: number;
  autoUpload?: boolean;
  multiple?: boolean;
  darg?: boolean;
  selectRelation?: string;
  selectRelationOption?: {};
  placeholder?: string;
  options?: Options[];
  size?: Size | "medium";
  dateSize?: Size;
  span?: number;
  getOptions?: () => Promise<Options[]> | Options[];
  filterOptions?: ({ formData, item }) => void;
  formatter?: () => void;
  uploadRequest?: () => Promise<T>;
  uploadRemove?: () => Promise<T> | void;
};

export interface FormItem extends ItemType {
  children?: ItemType[];
}
