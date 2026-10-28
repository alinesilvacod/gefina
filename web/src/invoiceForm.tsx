import { useState, type SubmitEvent } from 'react';

import type { Invoice, InvoiceStatus, InvoiceInput } from './invoiceType';

import type { CustomerOption } from './customerType';

interface InvoiceProps {
  invoice: Invoice | null;
  customers: CustomerOption[];
  error: string | null;
  onDelete: () => void;
  onCancel: () => void;
  onSumit: (values: InvoiceInput) => void;
  busy: boolean;
}

export default function InvoiceForm(props: InvoiceProps) {
  const [customerId, setCustomersId] = useState(!props.invoice ? '' : props.invoice.customer.id);
  const [amount, setAmount] = useState(!props.invoice ? '' : (props.invoice.amount / 100).toFixed(2));
  const [status, seTstatus] = useState<InvoiceStatus>(!props.invoice ? 'pending' : props.invoice.status);
  const [issueDate, setIssueDate] = useState(!props.invoice ? '' : props.invoice.issueDate);
  const [dueDate, setdueDate] = useState(!props.invoice ? '' : props.invoice.dueDate);

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault

    props.onSumit({
      customerId: Number(customerId),
      amount: Math.round(Number(amount) * 100),
      status,
      issueDate,
      dueDate
    });
  };

  return <form onSubmit={handleSubmit}>
    <h2>{!props.invoice ? 'criar fatura' : 'Editar fatura'}</h2>

    <div>
      <label htmlFor='customer'>Cliente</label>
      <select
        id='customer'
        value={customerId}
        onChange={(event) => setCustomersId(event.target.value)}
      >
        <option>selecione um cliente</option>
        {props.customers.map((customer) => {
          return <option key={customer.id} value={customer.id}>
            {customer.name} — {customer.email}
          </option>
        })}
      </select>
    </div>
    <div>
      <label htmlFor='amount'>Valor</label>
      <input
        id='amount'
        type="number"
        value={amount}
        step='0.01'
        min='0.01'
        onChange={(event) => setAmount(event.target.value)}
        required
      />
    </div>
    <div>
      <label htmlFor='status'>Situação</label>
      <select
        id='status'
        value={status}
        onChange={(event) => seTstatus(event.target.value as InvoiceStatus)}
      >
        <option value='pending'>Pendente</option>
        <option value="paid">Pago</option>
      </select>
    </div>
    <div>
      <label htmlFor="issueDate">Emisão</label>
      <input
        id='issueDate'
        type='date'
        value={issueDate}
        onChange={(event) => setIssueDate(event.target.value)}
        required
      />
    </div>
    <div>
      <label htmlFor="dueDate">Vencimento</label>
      <input
        id='dueDate'
        type='date'
        value={dueDate}
        onChange={(event) => setdueDate(event.target.value)}
        required
      />
    </div>

    {!props.error ? null : <p>{props.error}</p>}

    <div>
      {!props.invoice ? null : <button
        type='button'
        disabled={props.busy}
        onClick={props.onDelete}
      >Excluir</button>}
      <button
        type='button'
        disabled={props.busy}
        onClick={props.onCancel}
      >Cancelar</button>
      <button
        type='submit'
        disabled={props.busy}
      >{props.busy ? 'salvando...' : 'salvar'}</button>
    </div>
  </form>;
}