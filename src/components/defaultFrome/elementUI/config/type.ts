export type SelectOptionsKey = {
  [key: number]: {
    label: string;
    value: string;
  }[]
}

export type SelectOptions = {
  id?: number;
  label: string;
  value: number | string;
}[];


export type FormItem = {
  label: string;
  elementTag: string;
  path: string;
  rules?: {
    required?: boolean;
    message: string;
    trigger: "blur" | "change" | ["blur" | "change"]
  }[],
  type?: string;
  inputType?: "text" | "textarea" | "password" | "number";
  inputMain?: number;
  inputMax?: number;
  inputStartSuffix?: string;
  inputEndSuffix?: string;
  listType?: "text" | "picture" | "picture-card";
  limit?: number;
  autoUpload?: boolean;
  multiple?: boolean;
  darg?: boolean;
  placeholder?: string;
  options?: SelectOptions;
  size?: "small" | "medium" | "large" | "default";
  getOptions?: () => Promise<SelectOptions | SelectOptionsKey> | SelectOptions | SelectOptionsKey;
  filterOptions?: (value: number | string) => void;
  formatter?: () => void;
  children?: {
    label: string | null;
    elementTag: string;
    path: string;
    type?: string;
    inputStartSuffix?: string;
    inputEndSuffix?: string;
    gutter?: number;
    span?: number;
    placeholder?: string;
    options?: SelectOptions | SelectOptionsKey;
    getOptions?: () => Promise<SelectOptions | SelectOptionsKey> | SelectOptions | SelectOptionsKey;
    filterOptions?: (value: number | string) => void;
    formatter?: () => void;
  }[]
}