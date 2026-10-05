import type {InvoiceStatus} from './invoiceType.ts';

export default function statusLabel(status: InvoiceStatus) {
    return status === 'paid' ? 'pago' : 'pendente';
}