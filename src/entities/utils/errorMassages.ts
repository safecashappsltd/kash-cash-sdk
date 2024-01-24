const url = 'https://stage-api.safecashapps.com/api/external/v1/'

const endPoints = {
  login: 'login',
  create: 'request/create',
  cancel: 'request/cancel',
  generatePaymentCode: 'transactions/generate/code',
  statusForPOS: 'request/statusForPOSByTransactionId'
}

enum ErrorResponsesMessage {
  EMPTY_REQUEST = 'request data are empty',
  MUST_LOGIN = 'must login first',
  ZERO_AMOUNT = 'Amount cant be zero or less',
  EXTERNAL_ID_EMPTY = 'externalId not provided',
  USERNAME_PASSWORD_EMPTY = 'username or password not provided',
  BUSINESS_ID_EMPTY = 'businessId not provided'
}

enum ErrorStatuses {
  EMPTY,
  ZERO,
  NOT_PROVIDED,
  EXTERNAL
}

enum Type {
  WITH_ICON,
  WITHOUT_ICON
}

enum Style {
  BRIGHT,
  DARK
}

export type ICreateResponse = {
  transactionId: string
  externalId: string
  transactionStatus: string
  createDate: Date
  qrCodeAsString: string
  qrCodeAsSvg: string
}

export enum TransactionType {
  DEBIT_TRANSACTION = 101,
  REFUND_TRANSACTION = 103
}

export enum BuyerMethod {
  BLUETOOTH = 0,
  QR_CODE = 1,
  PAY_BY_CODE = 2
}

export enum TransactionStatus {
  PENDING = 0,
  SUCCESS = 1,
  CANCELED = 2,
  REJECTED = 3,
  REQUESTED = 7,
  LIMITED = -1
}

export type GetTransactionStatus = {
  transactionId: string
  originalTransactionId?: string
  amount: number
  createdAt: string
  createdMomentHHmmss: string
  transactionType: TransactionType
  transactionStatus?: TransactionStatus
  branchExternalId: string
  posId: string
  genericParams: string
  externalId: string
  companyName: string
  companyBranchName: 'Cafe Roma_Branch'
  buyerMethod: BuyerMethod
  refundedAmount: null
  availbleRefund: null
}

export type CancelTransaction = {
  description: string
  errorCode: number
  additionalData: string
  code: number
}

export type ICancelTransactionResponse = {
  data: CancelTransaction
  status: number
}

export type IGetTransactionStatus = {
  data: GetTransactionStatus
  status: number
}

export type CreateResponse = {
  data: ICreateResponse
  status: number
}

export type GenerateCodeResponse = {
  data: string
  status: number
}

export type LoginResponse = {
  data: {
    token: string
  }
  status: number
}

export type IRequestCreate = {
  amount: number
  externalId: string
  auth: string
  businessId: string
  customCreateTransactionFunction?: (
    amount: number,
    externalId: string,
    businessId: string
  ) => Promise<CreateResponse>
}

export type IRequestLogin = {
  username: string
  password: string
  businessId: string
  posVendorId?: string
  version?: string
}

export type IGenerateCode = {
  businessId: string
  transactionId: string
  auth: string
}

export type ITransactionStatus = {
  businessId: string
  transactionId: string
  auth: string
}

export type ITransactionCancel = {
  businessId: string
  transactionId: string
  auth: string
}

export type IResponse = {
  data: any
  status: string
  errorCode: number
  message: string
}

export type ILoginDataResponse = {
  blockStatus: number
  refreshToken: string
  resetPassword: boolean
  sessionData: {
    major: string
    minor: string
    token: string
    userId: string
  }
}

const emptyData = () => {
  return {
    message: ErrorResponsesMessage.EMPTY_REQUEST,
    errorCode: ErrorStatuses.EMPTY,
    status: ErrorStatuses.EMPTY
  }
}

const amountLessThenZero = () => {
  return {
    message: ErrorResponsesMessage.ZERO_AMOUNT,
    errorCode: ErrorStatuses.ZERO,
    status: ErrorStatuses.ZERO
  }
}

const externalIdNotProvided = () => {
  return {
    message: ErrorResponsesMessage.EXTERNAL_ID_EMPTY,
    errorCode: ErrorStatuses.NOT_PROVIDED,
    status: ErrorStatuses.NOT_PROVIDED
  }
}

const mustLoginFirst = () => {
  return {
    message: ErrorResponsesMessage.MUST_LOGIN,
    errorCode: ErrorStatuses.EXTERNAL,
    status: ErrorStatuses.EXTERNAL
  }
}

const usernameOrPasswordEmpty = () => {
  return {
    message: ErrorResponsesMessage.USERNAME_PASSWORD_EMPTY,
    errorCode: ErrorStatuses.NOT_PROVIDED,
    status: ErrorStatuses.NOT_PROVIDED
  }
}

const businessIdNotProvided = () => {
  return {
    message: ErrorResponsesMessage.BUSINESS_ID_EMPTY,
    errorCode: ErrorStatuses.NOT_PROVIDED,
    status: ErrorStatuses.NOT_PROVIDED
  }
}

export {
  businessIdNotProvided,
  usernameOrPasswordEmpty,
  mustLoginFirst,
  externalIdNotProvided,
  amountLessThenZero,
  emptyData,
  url,
  endPoints,
  ErrorResponsesMessage,
  ErrorStatuses,
  Style,
  Type
}
