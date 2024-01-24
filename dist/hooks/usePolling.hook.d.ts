import { TransactionStatus } from '../entities/utils/errorMassages';
interface IPollingData {
    businessId: string;
    pollingInterval: number;
    setTransactionStatus?: (status: TransactionStatus) => void;
    closeModal: () => void;
}
export declare const usePolling: (data: IPollingData) => {
    isError: boolean;
    isStatusFinal: TransactionStatus;
    isPollingProcess: boolean;
    stopInterval: () => void;
    transactionStatusPolling: (transactionId: string, auth: string) => Promise<void>;
};
export {};
