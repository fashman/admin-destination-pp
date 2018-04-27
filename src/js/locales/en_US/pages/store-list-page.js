// 店铺列表页
const storeListPage = {
  documentTitle: 'Destination++_Sotre manage',
  addNew: 'Add New Store',
  all: 'All',
  name: 'Name',
  area: 'Push Area',
  notpush: 'Not Push Area',
  query: 'Search',
  country: 'Country',
  city: 'City',
  shopType: {
    name: 'Category',
    list: {'a': 'Store', 'b': 'Other'},
  },
  storeClaimAudit: {
    name: 'Store Claim Audit',
    list: {'a': 'Unclaimed', 'b': 'Approved', 'c': 'Failed', 'd': 'Unaudited'}
  },
  claimStatus: {
    name: 'Claim Status',
    list: {'a': 'Unclaimed', 'b': 'Claimed'}
  },
  auditStatus: {
    name: 'Store Audit',
    list: {'a': 'Unaudited', 'b': 'Approved', 'c': 'Failed'}
  },
  operateStatus: {
    name: 'Operation Status',
    list: {'a': 'Confirming', 'b': 'In Operation', 'c': 'Out Of Business', 'd': 'Not open'}
  },
  modify: 'modifier/modifyTime',
  table: {
    merchantCode: 'Store ID',
    merchantName: 'Store Name',
    country: 'Country',
    city: 'City',
    createTime: 'Application Date',
    status: 'Store Audit Status',
    statuslist: {'a': 'Unaudited', 'b': 'Approved', 'c': 'Failed'},
    do: 'Settings',
  },
  copyModal: {
    title: 'Do you confirm to duplicate the store?',
    name: 'Store Name',
    nametips: 'Please enter your Store Name',
    tips: {
      tit: 'Operating hints',
      a: '1，Please modify and confirm the name of the store. The store name cannot be changed after saving；',
      b: '2，The copied stores need to be reviewed；',
      c: '3，After the review, the store needs to re-select the area；'
    },
    storeId: 'Store ID',
    goedit: 'To modify'
  }
};

export default storeListPage;