import { CreateResponse, TransactionStatus } from '../entities/utils/errorMassages';
export declare type IError = {
    e: {
        message: string;
        errorCode: number;
    };
};
export declare type IOnPress = {
    e: {
        message: string;
        body: JSON;
        errorCode: number;
        status: number;
    };
};
export declare type IOnSuccessEvent = {
    data: any;
    status: number;
    errorCode: number;
    message: string;
};
export declare type IOnErrorEvent = {
    status: number;
    errorCode: number;
    message: string;
};
export declare type IButtonProps = {
    externalId: string;
    customButtonStyle?: JSON;
    onSuccess: (event: IOnSuccessEvent) => void;
    onError: (event: IOnErrorEvent) => void;
    onTransactionStatus: (status: TransactionStatus) => void;
    returnUrl: string;
    amount: number;
};
export declare type IModalProps = {
    isModalShow: boolean;
    closeModal: () => void;
    qrValue: string;
    manualCode: string;
};
export declare type IConfig = {
    username: string;
    password: string;
    businessId: string;
    posVendorId?: string;
    version?: string;
    pollingInterval: number;
    merchantToken: string;
    customCreateTransactionFunction?: () => Promise<CreateResponse>;
    buttonType: number;
    buttonStyle: number;
};
