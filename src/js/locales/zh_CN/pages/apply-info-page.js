// 审核页面
const applyInfoPage = {
  documentTitle: '目的地++_店铺审核',
  name: '状态审核',
  storeAudit: {
    name: '店铺审核',
    status: {
      refuse: '不通过',
      pass: '通过',
      pending: '待审核',
    }
  },
  storeOperationStatus: {
    name: '店铺经营状态',
    status: {
      confirming: '确认中',
      inOperation: '正常营业',
      outOfBusiness: '停业',
      notOpen: '未开业'
    }
  },
  storeClaimAudit: {
    name: '店铺认领审核',
    status: {
      refuse: '不通过',
      pass: '通过',
      pending: '待审核',
      notClaim: '未认领'
    }
  },
  storeClaimStatus: {
    name: '店铺认领状态',
    status: {
      unclaimed: '未认领',
      claimed: '已认领'
    }
  },
  relatedMerchant: '关联商家',
  auditFailureReason: '审核不通过原因',
  auditFailureTips: '请填写不通过原因',
  oneclickAudit: '一键审核通过',
  success: '操作成功',
  emailEmptyTips: '邮箱为空！',
  notSendEmail: '不发邮件',
  sendEmail: '发送邮件',
  passTips: '审核通过，是否发送邮件通知？',
  email: '商家邮箱',
  save: '保存'
};

export default applyInfoPage;