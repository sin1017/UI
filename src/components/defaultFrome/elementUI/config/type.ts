export type Options = {
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
  options?: Options;
  size?: "small" | "medium" | "large";
  getOptions?: () => Promise<Options>;
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
    options?: Options;
    filterOptions?: () => void;
  }[]
}