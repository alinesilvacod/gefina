import type {InvoiceSituation} from './invoiceType.ts';

export function situationLabel(situation: InvoiceSituation) {
    switch (situation)
{
    case 'paid': return 'paga';
    case 'pending': return 'pendente';
    case 'overdue': return 'atrasada';

}
}

export function formatCurrency(cents:number): string {
const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});

return formatter.format(cents/100);

}

export function formatDate(isoDate: string): string {
    const formatter = new Intl.DateTimeFormat('pt-BR',{
        day:'2-digit',
        month:'2-digit',
        year: 'numeric'
    });
    return formatter.format(new Date(`${isoDate}T00:00:00`));
}