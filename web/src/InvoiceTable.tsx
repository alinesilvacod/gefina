import type{ Invoice } from './invoiceType.ts'
import InvoiceRow from './invoiceRow.tsx';

interface InvoiceTableProps {
invoices: Invoice[];
}

export default function InvoiceTable(props: InvoiceTableProps ) {

    return <table>
        
        <thead>
            <tr>
            <th>cliente</th>
            <th>valor</th>
            <th className='numeric-date'>datad de emisão</th>
            <th className='numeric-date'>data de vencimento</th>
            <th>situação</th>
</tr>
        </thead>
        <tbody>
{props.invoices.map(invoice=> (
    <InvoiceRow 
    key={invoice.id}
    invoice={invoice}
    />
))}
        </tbody>
    </table>
    
}