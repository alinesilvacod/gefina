import type {InvoiceSituation} from './invoiceType.ts';

export default function situationLabel(situation: InvoiceSituation) {
    switch (situation)
{
    case 'paid': return 'paga';
    case 'pending': return 'pendente';
    case 'overdue': return 'atrasada';

}
}