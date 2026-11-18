import InvoiceRow from './invoiceRow.tsx';
import type { Invoice } from './invoiceType.ts';

interface InvoiceTableProps {
  invoices: Invoice[];
  edit: (invoice: Invoice) => void;
}

export default function InvoiceTable(props: InvoiceTableProps) {
  const base = 'text-sm font-medium text-text-muted p-3 border-b border-border';
  return (
    <table className='w-full border-collapse'>
      <thead>
        <tr>
          <th className={`${base}text-left`}>Cliente</th>
          <th className={`${base}text-left`}>Valor</th>
          <th className={base}>Data de emisão</th>
          <th className={base}>Data de vencimento</th>
          <th className={base}>Situação</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.invoices.map((invoice) => (
          <InvoiceRow
            key={invoice.id}
            invoice={invoice}
            edit={props.edit}
          />
        ))}
      </tbody>
    </table>
  );
}
