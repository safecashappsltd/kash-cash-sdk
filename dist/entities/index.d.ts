import { IRequestCreate, IRequestLogin, IGenerateCode, ITransactionStatus, ITransactionCancel } from './utils/errorMassages';
export declare const login: (req: IRequestLogin) => Promise<{
    data: {
        token: string;
    };
    status: number;
    errorCode: number;
    message: string;
} | {
    message: string;
    errorCode: number;
    status: number;
    data?: undefined;
}>;
export declare const create: (req: IRequestCreate) => Promise<{
    data: import("./utils/errorMassages").ICreateResponse;
    status: number;
    errorCode: number;
    message: string;
} | {
    message: string;
    errorCode: number;
    status: number;
    data?: undefined;
}>;
export declare const generateManualCode: (req: IGenerateCode) => Promise<{
    message: string;
    errorCode: number;
    status: number;
    data?: undefined;
} | {
    data: string;
    status: number;
    errorCode: number;
    message: string;
}>;
export declare const getTransactionStatus: (req: ITransactionStatus) => Promise<{
    message: string;
    errorCode: number;
    status: number;
    data?: undefined;
} | {
    data: import("./utils/errorMassages").GetTransactionStatus;
    status: number;
    errorCode: number;
    message: string;
}>;
export declare const cancelTransaction: (req: ITransactionCancel) => Promise<{
    data: import("./utils/errorMassages").CancelTransaction;
    status: number;
    errorCode: number;
    message: string;
} | {
    message: string;
    errorCode: number;
    status: number;
    data?: undefined;
}>;
