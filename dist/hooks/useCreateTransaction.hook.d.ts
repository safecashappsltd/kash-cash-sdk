import { IConfig, IOnErrorEvent, IOnSuccessEvent } from '../types/types';
export declare const useCreateTransaction: (sdkConfig: IConfig, externalId: string, amount: number, onSuccess: (event: IOnSuccessEvent) => void, onError: (event: IOnErrorEvent) => void, returnUrl: string) => {
    createTransaction: () => Promise<void>;
    showModal: () => void;
    closeModal: () => void;
    stopInterval: () => void;
    transactionId: string;
    isModalShow: boolean;
    isProcessing: boolean;
    qrCode: string;
    manualCode: string;
    isStatusFinal: import("../entities/utils/errorMassages").TransactionStatus;
};
