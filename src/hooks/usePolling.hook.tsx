import { useState } from 'react'
import { cancelTransaction, getTransactionStatus } from '../entities'
import { TransactionStatus } from '../entities/utils/errorMassages'

interface IPollingData {
  businessId: string
  pollingInterval: number
  setTransactionStatus?: (status: TransactionStatus) => void
  closeModal: ()=> void
}

export const usePolling = (data: IPollingData) => {
  const { businessId, pollingInterval, closeModal } = data
  const [isPollingProcess, setPollingProcess] = useState(false)
  const [isStatusFinal, setIsStatusFinal] = useState<TransactionStatus>(
    TransactionStatus.REQUESTED
  )
  const [isError, setIsError] = useState(false)

  let interval: NodeJS.Timeout
  let timeout: NodeJS.Timeout

  const transactionStatusPolling = async (
    transactionId: string,
    auth: string
  ) => {
    interval = setInterval(async () => {
      getTransactionStatusUpdate(transactionId, auth)
    }, pollingInterval)

    timeout = setTimeout(() => {
      stopInterval();
      cancelTransaction({businessId, transactionId, auth})
    }, 60000)
  }

  const getTransactionStatusUpdate = async (transactionId: string, auth: string)=> {
    const res = await getTransaction(transactionId, auth)
      setIsStatusFinal((prevState: TransactionStatus | any) => {
        if (prevState === res) {
          return prevState
        } else {
          return res
        }
      })
  }

  const getTransaction = async (transactionId: string, auth: string) => {
    let transactionStatus = TransactionStatus.REQUESTED
    try {
      setPollingProcess(true)
      const response = await getTransactionStatus({
        businessId,
        transactionId,
        auth
      })

      if (response.errorCode !== 200) {
        stopInterval()
        setIsStatusFinal(0)
        transactionStatus = TransactionStatus.REQUESTED
        setIsError(true)
        return
      }

      switch (response.data?.transactionStatus) {
        case TransactionStatus.CANCELED:
        case TransactionStatus.REJECTED:
        case TransactionStatus.SUCCESS:
        case TransactionStatus.LIMITED:
          stopInterval()
          transactionStatus = response.data.transactionStatus
          setIsError(true)
          break
        case TransactionStatus.PENDING:
        case TransactionStatus.REQUESTED:
          transactionStatus = response.data.transactionStatus
          break
      }
    } catch (error) {
      transactionStatus = TransactionStatus.CANCELED
      cancelTransaction({businessId, transactionId, auth})
      closeModal()
      setPollingProcess(false)
      setIsError(true)
    }

    return transactionStatus
  }

  const stopInterval = () => {
    closeModal()
    clearTimeout(timeout)
    clearInterval(interval)
    setPollingProcess(false)
  }

  return {
    isError,
    isStatusFinal,
    isPollingProcess,
    stopInterval,
    transactionStatusPolling
  }
}
