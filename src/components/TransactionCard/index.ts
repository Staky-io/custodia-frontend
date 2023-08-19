export { default as TransactionCard } from './TransactionCard'

export type Transaction = {
    txId: number;
    createdAt: Date;
    title: string;
    confirmationCount: number;
    confirmationRemaining: number;
    owner: string;
    address: string;
    custodiaTxHash: string;
}
