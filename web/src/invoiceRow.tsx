import type { Invoice} from './invoiceType.ts';
import {
  situationLabel,
  formatCurrency,
  formatDate,
  situationClass
} from './utils.ts';


interface InvoiceRowProps{
    invoice: Invoice;
    edit:(invoice: Invoice )=> void;
}

export default function InvoiceRow(props:InvoiceRowProps) {
    return <tr>
<td>{props.invoice.customer.name}</td>
<td className='numeric'>{formatCurrency(props.invoice.amount)}</td>
<td className='numeric numeric-date'>{formatDate(props.invoice.issueDate)}</td>
<td className='numeric numeric-date'>{formatDate(props.invoice.dueDate)}</td>
<td className={situationClass(props.invoice.status)}>{situationLabel(props.invoice.status)}</td>
<td className='td-button'>
  <button
  className='button-secondary'
  type='button'
  onClick={() => props.edit(props.invoice)}
  >Alterar</button>
   </td>
</tr>;
}