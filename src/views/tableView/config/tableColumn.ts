export default [
  {
    prop: "account",
    label: "帳號",
  },
  {
    prop: "status",
    label: "狀態",
    // formatter: ({ status }) => (status ? "啟用" : "停用"),
  },
  {
    prop: "phone",
    label: "電話",
    // children: [
    //   {
    //     prop: "phoneNumber",
    //     label: "手機",
    //   },
    //   {
    //     prop: "phoneN",
    //     label: "市話",
    //   },
    // ],
  },
  {
    prop: "balance",
    label: "投籃次數",
    width: "100",
  },
  {
    prop: "wallet",
    label: "錢包(PHP)",
    width: "100",
  },
  {
    prop: "loginTime",
    label: "最後登入時間",
    width: "120",
  },
  {
    prop: "operator",
    label: "動作",
    align: "center",
  },
];
