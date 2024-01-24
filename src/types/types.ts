import {
  CreateResponse,
  TransactionStatus
} from '../entities/utils/errorMassages'

export type IError = {
  e: {
    message: string
    errorCode: number
  }
}

export type IOnPress = {
  e: {
    message: string
    body: JSON
    errorCode: number
    status: number
  }
}

export type IOnSuccessEvent = {
  data: any
  status: number
  errorCode: number
  message: string
}

export type IOnErrorEvent = {
  status: number
  errorCode: number
  message: string
}

export type IButtonProps = {
  externalId: string
  customButtonStyle?: JSON
  onSuccess: (event: IOnSuccessEvent) => void
  onError: (event: IOnErrorEvent) => void
  onTransactionStatus: (status: TransactionStatus) => void
  returnUrl: string
  amount: number
}

export type IModalProps = {
  isModalShow: boolean
  closeModal: () => void
  qrValue: string
  manualCode: string
}

export type IConfig = {
  username: string
  password: string
  businessId: string
  posVendorId?: string
  version?: string
  pollingInterval: number
  merchantToken: string
  customCreateTransactionFunction?: () => Promise<CreateResponse>
  buttonType: number
  buttonStyle: number
}
