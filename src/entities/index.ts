import axios from 'axios'
import {
  CreateResponse,
  IRequestCreate,
  IRequestLogin,
  amountLessThenZero,
  businessIdNotProvided,
  emptyData,
  endPoints,
  externalIdNotProvided,
  mustLoginFirst,
  url,
  usernameOrPasswordEmpty,
  LoginResponse,
  IGenerateCode,
  GenerateCodeResponse,
  ITransactionStatus,
  IGetTransactionStatus,
  ITransactionCancel,
  ICancelTransactionResponse
  // IResponse
} from './utils/errorMassages'

const baseHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Expires: '0'
}

export const login = async (req: IRequestLogin) => {
  const { username, password, businessId } = req

  if (!req) {
    return emptyData()
  }

  if (!username || username === '' || !password || password === '') {
    return usernameOrPasswordEmpty()
  }

  if (!businessId || businessId === '') {
    return businessIdNotProvided()
  }

  try {
    const response: LoginResponse = await axios.post(
      `${url}${endPoints.login}`,
      req
    )
    const { status, data } = response
    return {
      data,
      status,
      errorCode: 200,
      message: 'Ok'
    }
  } catch (error) {
    return {
      message: JSON.stringify(error),
      errorCode: 404,
      status: 404
    }
  }
}

export const create = async (req: IRequestCreate) => {
  try {
    if (!req) {
      return emptyData()
    }

    const { amount, externalId, auth, businessId, customCreateTransactionFunction } = req

    if (!auth) {
      return mustLoginFirst()
    }

    if (externalId === '') {
      return externalIdNotProvided()
    }

    if (amount <= 0) {
      return amountLessThenZero()
    }

    const headers = {
      ...baseHeaders,
      "x-api-key": auth
    }

    if(customCreateTransactionFunction) {
      const response: CreateResponse = await customCreateTransactionFunction(amount, externalId, businessId);
      const { status, data } = response
      return {
        data,
        status,
        errorCode: 200,
        message: 'Ok'
      }
    } else {
      const response: CreateResponse = await axios.post(
        `${url}${endPoints.create}`,
        { amount, externalId, businessId },
        { headers }
      )
      const { status, data } = response
      return {
        data,
        status,
        errorCode: 200,
        message: 'Ok'
      }
    }

  } catch (error) {
    return {
      message: JSON.stringify(error),
      errorCode: 404,
      status: 404
    }
  }
}

export const generateManualCode = async (req: IGenerateCode) => {
  const { auth, transactionId, businessId } = req

  if (!transactionId && transactionId === '') {
    return {
      message: 'generateManualCode not transaction id',
      errorCode: 404,
      status: 404
    }
  }

  const headers = {
    ...baseHeaders,
    "x-api-key": auth
  }

  try {
    const response: GenerateCodeResponse = await axios.post(
      `${url}${endPoints.generatePaymentCode}`,
      { transactionId, businessId },
      { headers }
    )
    const { status, data } = response
    return {
      data,
      status,
      errorCode: 200,
      message: 'Ok'
    }
  } catch (error) {
    return {
      message: JSON.stringify(error),
      errorCode: 404,
      status: 404
    }
  }
}

export const getTransactionStatus = async (req: ITransactionStatus) => {
  const { auth, transactionId, businessId } = req

  if (!transactionId && transactionId === '') {
    return {
      message: 'generateManualCode not transaction id',
      errorCode: 404,
      status: 404
    }
  }

  const headers = {
    ...baseHeaders,
    "x-api-key": auth
  }

  try {
    const response: IGetTransactionStatus = await axios.post(
      `${url}${endPoints.statusForPOS}`,
      { transactionId, businessId },
      { headers }
    )
    const { status, data } = response
    return {
      data,
      status,
      errorCode: 200,
      message: 'Ok'
    }
  } catch (error) {
    return {
      message: JSON.stringify(error),
      errorCode: 404,
      status: 404
    }
  }
}

export const cancelTransaction = async (req: ITransactionCancel)=> {
  const {auth, transactionId, businessId} = req;
  const headers = {
    ...baseHeaders,
    "x-api-key": auth
  }

  try {
    const response: ICancelTransactionResponse = await axios.post(
      `${url}${endPoints.cancel}`,
      { transactionId, businessId },
      { headers }
    )
    const { status, data } = response
    return {
      data,
      status,
      errorCode: 200,
      message: 'Ok'
    }
  } catch (error) {
    return {
      message: JSON.stringify(error),
      errorCode: 404,
      status: 404
    }
  }
}

// const makeRequest = async (
//   url: string,
//   data: IRequestLogin | IRequestCreate,
//   request: (
//     url: string,
//     data: IRequestCreate | IRequestLogin
//     )=> Promise<IResponse>)=> {
//   return await axios.post(url, data);
// }
