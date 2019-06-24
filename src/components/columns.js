export const columnTable = () => {
  let columns = [{
      title: "商品名称",
      key: "merchantName",
      align: 'center'

    },
    {
      title: "商品价格(￥)",
      key: "merchantMoney",
      align: 'center'

    },
    {
      title: "购买日期",
      key: "startTime",
      align: 'center'
    },
    {
      title: '操作',
      slot: 'action',
      width: 150,
      align: 'center',
      fixed: 'right'

    }

  ]
  return columns

}