export default [
  {
    prop: "account",
    label: "帳號",
  },
  {
    prop: "status",
    label: "狀態",
    formatter: ({ status }) => (status ? "啟用" : "停用"),
  },
  {
    prop: "phone",
    label: "手機",
    children: [
      {
        prop: "phone",
        label: "手機2",
      },
    ],
  },
  {
    prop: "balance",
    label: "投籃次數",
  },
  {
    prop: "wallet",
    label: "錢包(PHP)",
  },
  {
    prop: "loginTime",
    label: "最後登入時間",
  },
  {
    prop: "operator",
    label: "操作",
  },
];
