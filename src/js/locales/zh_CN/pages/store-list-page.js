// 店铺列表页
const storeListPage = {
  documentTitle: '目的地++_店铺管理',
  addNew: '新建店铺',
  all: '所有',
  name: '名称',
  query: '搜索',
  area: '投放区域',
  notpush: '暂未投放',
  country: '国家',
  city: '城市',
  shopType: {
    name: '店铺类型',
    list: {'a': '餐厅', 'b': '通用'},
  },
  storeClaimAudit: {
    name: '店铺认领审核',
    list: {'a': '未认领', 'b': '通过', 'c': '不通过', 'd': '待审核'}
  },
  claimStatus: {
    name: '认领状态',
    list: {'a': '未认领', 'b': '已认领'}
  },
  auditStatus: {
    name: '店铺审核',
    list: {'a': '待审核', 'b': '通过', 'c': '不通过'}
  },
  operateStatus: {
    name: '经营状态',
    list: {'a': '确认中', 'b': '正常经营', 'c': '停业', 'd': '未开业'}
  },
  modify: '操作人/操作时间',
  table: {
    merchantCode: '店铺ID',
    merchantName: '店铺名称',
    country: '国家',
    city: '城市',
    createTime: '申请时间',
    status: '店铺审核状态',
    statuslist: {'a': '待审核', 'b': '审核通过', 'c': '审核不通过'},
    do: '操作',
  },
  copyModal: {
    title: '请确认是否复制店铺？',
    name: '店铺名称',
    nametips: '请输入店铺名称',
    tips: {
      tit: '操作提示',
      a: '1，请修改并确认店铺名称，保存后店铺名称不可修改其它信息可修改；',
      b: '2，复制后的店铺需要重新审核；',
      c: '3，审核通过后店铺需要重新选择投放区域；'
    },
    storeId: '店铺 ID',
    goedit: '去修改'
  }
};

export default storeListPage;