import { useState } from 'react'
import { create, generateManualCode } from '../entities'
import { IConfig, IOnErrorEvent, IOnSuccessEvent } from '../types/types'
import { usePolling } from './usePolling.hook'

export const useCreateTransaction = (
  sdkConfig: IConfig,
  externalId: string,
  amount: number,
  onSuccess: (event: IOnSuccessEvent) => void,
  onError: (event: IOnErrorEvent) => void,
  returnUrl: string
) => {
  const [isModalShow, setIsModalShow] = useState<boolean>(false)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [qrCode, setQrCode] = useState<string>('')
  const [manualCode, setManualCode] = useState<string>('')
  const [transactionId, setTransactionId] = useState<string>('')

  const showModal = () => {
    setIsModalShow(true)
  }

  const closeModal = () => {
    setIsModalShow(false)
  }

  const { isStatusFinal, transactionStatusPolling, stopInterval } = usePolling({
    businessId: sdkConfig.businessId,
    pollingInterval: sdkConfig.pollingInterval,
    closeModal
  })

  const openAppWithCashierClient = (requestId: string) => {
    const appSchema = `cashiclient://payByIntent?requestId=${requestId}&schemaUrl=${returnUrl}`
    if (window.location && window.location.assign) {
      window.location.assign(appSchema)
    } else {
      window.location.href = appSchema
    }
  }

  const createTransaction = async () => {
    setIsProcessing(true)
    const response = await create({
      externalId,
      amount,
      auth: sdkConfig.merchantToken,
      businessId: sdkConfig.businessId,
      customCreateTransactionFunction: sdkConfig.customCreateTransactionFunction
    })
    if (response.status === 200 && response.data) {
      openAppWithCashierClient(response.data.transactionId)
      setQrCode(response.data.qrCodeAsString)
      setTransactionId(response.data.transactionId)
      const manualCodeResponse = await generateManualCode({
        auth: sdkConfig.merchantToken,
        transactionId: response.data.transactionId,
        businessId: sdkConfig.businessId
      })
      setManualCode(manualCodeResponse?.data!)
      showModal()
      onSuccess(response)
      transactionStatusPolling(response.data.transactionId, sdkConfig.merchantToken)
      setIsProcessing(false)
    } else {
      onError(response)
      setIsProcessing(false)
    }
  }

  return {
    createTransaction,
    showModal,
    closeModal,
    stopInterval,
    transactionId,
    isModalShow,
    isProcessing,
    qrCode,
    manualCode,
    isStatusFinal
  }
}
