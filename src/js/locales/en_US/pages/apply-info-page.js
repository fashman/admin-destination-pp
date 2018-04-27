// 审核页面
const applyInfoPage = {
  documentTitle: 'Destination++_Sotre manage_Audit',
  name: 'Status Audits',
  storeAudit: {
    name: 'Store Audit Status',
    status: {
      refuse: 'Failed',
      pass: 'Approved',
      pending: 'Unaudited',
    }
  },
  storeOperationStatus: {
    name: 'Store Operation Status',
    status: {
      confirming: 'Confirming',
      inOperation: 'In Operation',
      outOfBusiness: 'Out Of Business',
      notOpen: 'Not open'
    }
  },
  storeClaimAudit: {
    name: 'Store Claim Audit Status',
    status: {
      refuse: 'Failed',
      pass: 'Approved',
      pending: 'Unaudited',
      notClaim: 'Unclaimed'
    }
  },
  storeClaimStatus: {
    name: 'Store Claim Status',
    status: {
      unclaimed: 'Unclaimed',
      claimed: 'Claimed'
    }
  },
  relatedMerchant: 'Related Merchant',
  auditFailureReason: 'Reasons for Audit Failure',
  auditFailureTips: 'Please fill out the reason for not passing',
  oneclickAudit: 'One-click Audit Through',
  success: 'Success',
  emailEmptyTips: 'Email is empty!',
  notSendEmail: 'Do Not Send Email',
  sendEmail: 'Send Email',
  passTips: 'Audit pass, whether to send mail notification?',
  email: 'Merchant Email',
  save: 'Save'
};

export default applyInfoPage;