import type{ Invoice } from './invoiceType.ts'
import InvoiceRow from './invoiceRow.tsx';

interface InvoiceTableProps {
invoices: Invoice[];
}

export default function InvoiceTable(props: InvoiceTableProps ) {

    return <table>
        
        <thead>
            <tr>
            <td>cliente</td>
            <td>valor</td>
            <td>datad de emisão</td>
            <td>data de vencimento</td>
            <td>situação</td>
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