import * as React from 'react'
import ButtonComponent from './components/CashButtons/CashiButton'
import { useCreateTransaction } from './hooks/useCreateTransaction.hook'
import { IButtonProps, IConfig } from './types/types'
import { Style, TransactionStatus, Type } from './entities/utils/errorMassages'
import QRCodeModal from './modals/QRCodeModal'
import {
  DEFAULT_POLLING_INTERVAL,
  EMPTY_STRING,
  PROCESSING
} from './constants/constants'
import { cancelTransaction } from './entities'

const sdkConfig: IConfig = {
  username: EMPTY_STRING,
  password: EMPTY_STRING,
  businessId: EMPTY_STRING,
  posVendorId: undefined,
  version: undefined,
  pollingInterval: DEFAULT_POLLING_INTERVAL,
  merchantToken: EMPTY_STRING,
  customCreateTransactionFunction: undefined,
  buttonType: Type.WITH_ICON,
  buttonStyle: Style.BRIGHT
}

const KashCashInit = (config: IConfig) => {
  const {
    username,
    password,
    businessId,
    posVendorId,
    version,
    pollingInterval,
    merchantToken,
    customCreateTransactionFunction,
    buttonStyle,
    buttonType
  } = config
  sdkConfig.username = username
  sdkConfig.password = password
  sdkConfig.businessId = businessId
  sdkConfig.posVendorId = posVendorId
  sdkConfig.version = version
  sdkConfig.pollingInterval = pollingInterval
  sdkConfig.merchantToken = merchantToken
  sdkConfig.customCreateTransactionFunction = customCreateTransactionFunction
  sdkConfig.buttonStyle = buttonStyle
  sdkConfig.buttonType = buttonType
}

const KashCashPay: React.FC<IButtonProps> = ({
  customButtonStyle,
  externalId,
  onSuccess,
  onError,
  amount,
  returnUrl,
  onTransactionStatus
}) => {
  const {
    createTransaction,
    closeModal,
    stopInterval,
    isModalShow,
    isProcessing,
    qrCode,
    manualCode,
    transactionId,
    isStatusFinal
  } = useCreateTransaction(
    sdkConfig,
    externalId,
    amount,
    onSuccess,
    onError,
    returnUrl
  )

  const manualCloseModal = () => {
    closeModal()
    cancelTransaction({
      transactionId,
      auth: sdkConfig.merchantToken,
      businessId: sdkConfig.businessId
    })
  }

  React.useEffect(() => {
    switch (isStatusFinal) {
      case TransactionStatus.CANCELED:
        manualCloseModal()
      // eslint-disable-next-line no-fallthrough
      case TransactionStatus.LIMITED:
      case TransactionStatus.REJECTED:
        closeModal()
        stopInterval()
        break
      case TransactionStatus.SUCCESS:
        closeModal()
        break
      case TransactionStatus.PENDING:
      case TransactionStatus.REQUESTED:
      default:
        break
    }
    onTransactionStatus(isStatusFinal)
    return () => {
      cancelTransaction({
        transactionId,
        auth: sdkConfig.merchantToken,
        businessId: sdkConfig.businessId
      })
    }
  }, [isStatusFinal])

  return (
    <div>
      <ButtonComponent
        sdkConfig={sdkConfig}
        title={isProcessing ? PROCESSING : 'תשלום בקשקאש'}
        onPress={createTransaction}
        customButtonStyle={customButtonStyle}
      />
      <QRCodeModal
        manualCode={manualCode}
        qrValue={qrCode}
        isModalShow={isModalShow}
        closeModal={manualCloseModal}
      />
    </div>
  )
}

export { KashCashInit, IButtonProps, IConfig, Type, Style }
export default KashCashPay
