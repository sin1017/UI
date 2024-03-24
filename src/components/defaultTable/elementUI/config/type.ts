type ColumnItem = {
  label: string;
  prop: string;
  formatter?: (prop: any) => string;
  width?: string | number;
  minWidth?: string | number;
  sortable?: boolean | "custom";
  headerAlign?: "left" | "center" | "right";
  align?: "left" | "center" | "right";
  fixed?: boolean | "left" | "right";
  resizable?: boolean;
};

export interface ColumnList extends ColumnItem {
  children?: ColumnItem[];
}
