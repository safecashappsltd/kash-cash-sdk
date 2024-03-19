declare const url = "https://prod-api.safecashapps.com/api/external/v1/";
declare const endPoints: {
    login: string;
    create: string;
    cancel: string;
    generatePaymentCode: string;
    statusForPOS: string;
};
declare enum ErrorResponsesMessage {
    EMPTY_REQUEST = "request data are empty",
    MUST_LOGIN = "must login first",
    ZERO_AMOUNT = "Amount cant be zero or less",
    EXTERNAL_ID_EMPTY = "externalId not provided",
    USERNAME_PASSWORD_EMPTY = "username or password not provided",
    BUSINESS_ID_EMPTY = "businessId not provided"
}
declare enum ErrorStatuses {
    EMPTY = 0,
    ZERO = 1,
    NOT_PROVIDED = 2,
    EXTERNAL = 3
}
declare enum Type {
    WITH_ICON = 0,
    WITHOUT_ICON = 1
}
declare enum Style {
    BRIGHT = 0,
    DARK = 1
}
export declare type ICreateResponse = {
    transactionId: string;
    externalId: string;
    transactionStatus: string;
    createDate: Date;
    qrCodeAsString: string;
    qrCodeAsSvg: string;
};
export declare enum TransactionType {
    DEBIT_TRANSACTION = 101,
    REFUND_TRANSACTION = 103
}
export declare enum BuyerMethod {
    BLUETOOTH = 0,
    QR_CODE = 1,
    PAY_BY_CODE = 2
}
export declare enum TransactionStatus {
    PENDING = 0,
    SUCCESS = 1,
    CANCELED = 2,
    REJECTED = 3,
    REQUESTED = 7,
    LIMITED = -1
}
export declare type GetTransactionStatus = {
    transactionId: string;
    originalTransactionId?: string;
    amount: number;
    createdAt: string;
    createdMomentHHmmss: string;
    transactionType: TransactionType;
    transactionStatus?: TransactionStatus;
    branchExternalId: string;
    posId: string;
    genericParams: string;
    externalId: string;
    companyName: string;
    companyBranchName: 'Cafe Roma_Branch';
    buyerMethod: BuyerMethod;
    refundedAmount: null;
    availbleRefund: null;
};
export declare type CancelTransaction = {
    description: string;
    errorCode: number;
    additionalData: string;
    code: number;
};
export declare type ICancelTransactionResponse = {
    data: CancelTransaction;
    status: number;
};
export declare type IGetTransactionStatus = {
    data: GetTransactionStatus;
    status: number;
};
export declare type CreateResponse = {
    data: ICreateResponse;
    status: number;
};
export declare type GenerateCodeResponse = {
    data: string;
    status: number;
};
export declare type LoginResponse = {
    data: {
        token: string;
    };
    status: number;
};
export declare type IRequestCreate = {
    amount: number;
    externalId: string;
    auth: string;
    businessId: string;
    customCreateTransactionFunction?: (amount: number, externalId: string, businessId: string) => Promise<CreateResponse>;
};
export declare type IRequestLogin = {
    username: string;
    password: string;
    businessId: string;
    posVendorId?: string;
    version?: string;
};
export declare type IGenerateCode = {
    businessId: string;
    transactionId: string;
    auth: string;
};
export declare type ITransactionStatus = {
    businessId: string;
    transactionId: string;
    auth: string;
};
export declare type ITransactionCancel = {
    businessId: string;
    transactionId: string;
    auth: string;
};
export declare type IResponse = {
    data: any;
    status: string;
    errorCode: number;
    message: string;
};
export declare type ILoginDataResponse = {
    blockStatus: number;
    refreshToken: string;
    resetPassword: boolean;
    sessionData: {
        major: string;
        minor: string;
        token: string;
        userId: string;
    };
};
declare const emptyData: () => {
    message: ErrorResponsesMessage;
    errorCode: ErrorStatuses;
    status: ErrorStatuses;
};
declare const amountLessThenZero: () => {
    message: ErrorResponsesMessage;
    errorCode: ErrorStatuses;
    status: ErrorStatuses;
};
declare const externalIdNotProvided: () => {
    message: ErrorResponsesMessage;
    errorCode: ErrorStatuses;
    status: ErrorStatuses;
};
declare const mustLoginFirst: () => {
    message: ErrorResponsesMessage;
    errorCode: ErrorStatuses;
    status: ErrorStatuses;
};
declare const usernameOrPasswordEmpty: () => {
    message: ErrorResponsesMessage;
    errorCode: ErrorStatuses;
    status: ErrorStatuses;
};
declare const businessIdNotProvided: () => {
    message: ErrorResponsesMessage;
    errorCode: ErrorStatuses;
    status: ErrorStatuses;
};
export { businessIdNotProvided, usernameOrPasswordEmpty, mustLoginFirst, externalIdNotProvided, amountLessThenZero, emptyData, url, endPoints, ErrorResponsesMessage, ErrorStatuses, Style, Type };
