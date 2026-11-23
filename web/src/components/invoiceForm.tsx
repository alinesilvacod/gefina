import {
  type SetStateAction,
  type SubmitEvent,
  useState,
} from 'react';
import type { CustomerOption } from '../types/customerType';
import type {
  Invoice,
  InvoiceFieldErrors,
  InvoiceInput,
  InvoiceStatus,
} from '../types/invoiceType';

interface InvoiceProps {
  invoice: Invoice | null;
  customers: CustomerOption[];
  error: string | null;
  fieldErrors: InvoiceFieldErrors;
  onDelete: () => void;
  confirmDelete: boolean;
  setConfirmDelete: React.Dispatch<SetStateAction<boolean>>;
  confirm: () => void;
  onCancel: () => void;
  onSumit: (values: InvoiceInput) => void;
  busy: boolean;
}

export default function InvoiceForm(props: InvoiceProps) {
  const [customerId, setCustomersId] = useState(
    !props.invoice ? undefined : String(props.invoice.customer.id),
  );
  const [amount, setAmount] = useState(
    !props.invoice
      ? undefined
      : (props.invoice.amount / 100).toFixed(2),
  );
  const [status, seTstatus] = useState<InvoiceStatus>(
    !props.invoice ? 'pending' : props.invoice.status,
  );
  const [issueDate, setIssueDate] = useState(
    !props.invoice ? '' : props.invoice.issueDate,
  );
  const [dueDate, setdueDate] = useState(
    !props.invoice ? '' : props.invoice.dueDate,
  );

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    props.setConfirmDelete(false);

    props.onSumit({
      customerId: Number(customerId),
      amount: Math.round(Number(amount) * 100),
      status,
      issueDate,
      dueDate,
    });
  };

  const field = 'flex flex-col gap-1';
  const label = 'text-sm text-text-muted';
  const input =
    'px-3 py-2 border border-border rounded-control bg-surface-raised focus-visible:outline-2 focus-visible:outline-primary';
  const button =
    'flex-1 px-4 py-2 rounded-control cursor-piinter disabled:cursor-defalt disabled:opacity-60 focus-visible:outline-primary';
  const error = 'text-sm text-overdue';

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold">
        {!props.invoice ? 'criar fatura' : 'Editar fatura'}
      </h2>

      <div className={field}>
        <label className={label} htmlFor="customer">
          Cliente
        </label>
        <select
          className={`${input}apperance-none`}
          id="customer"
          value={customerId}
          onChange={(event) => setCustomersId(event.target.value)}
          required
        >
          <option value="">selecione um cliente</option>
          {props.customers.map((customer) => {
            return (
              <option key={customer.id} value={customer.id}>
                {customer.name} — {customer.email}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex gap-2">
        <div className={`${field} flex-1 scheme-dark`}>
          <label className={label} htmlFor="amount">
            Valor
          </label>
          <input
            className={input}
            id="amount"
            type="number"
            value={amount}
            step="0.01"
            min="0.01"
            onChange={(event) => setAmount(event.target.value)}
            required
          />
        </div>
        <div className={field}>
          <label className={label} htmlFor="status">
            Situação
          </label>
          <select
            className={`${input} appearance-none`}
            id="status"
            value={status}
            onChange={(event) =>
              seTstatus(event.target.value as InvoiceStatus)
            }
          >
            <option value="pending">Pendente</option>
            <option value="paid">Pago</option>
          </select>
        </div>
      </div>
      <div className="flex gap-2">
        <div className={`${field} flex-1 scheme-dark`}>
          <label className={label} htmlFor="issueDate">
            Emissão
          </label>
          <input
            className={input}
            id="issueDate"
            type="date"
            value={issueDate}
            onChange={(event) => setIssueDate(event.target.value)}
            required
          />
        </div>
        <div className={`${field} flex-1 scheme-dark`}>
          <label className={label} htmlFor="dueDate">
            Vencimento
          </label>
          <input
            className={input}
            id="dueDate"
            type="date"
            value={dueDate}
            min={issueDate}
            onChange={(event) => setdueDate(event.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        {!props.invoice ? null : (
          <button
            className={`${button} bg-surface-raised text-overdue border border-overdue`}
            type="button"
            disabled={props.busy}
            onClick={props.onDelete}
          >
            {props.busy && props.confirmDelete
              ? 'excluindo'
              : 'Excluir'}
          </button>
        )}
        <button
          className={`${button} bg-surface-raised border border-border`}
          type="button"
          disabled={props.busy}
          onClick={props.onCancel}
        >
          Cancelar
        </button>
        <button
          className={`${button} border border-transparent bg-primary`}
          type="submit"
          disabled={props.busy}
        >
          {props.busy && !props.confirmDelete
            ? 'Salvando...'
            : 'Salvar'}
        </button>
      </div>

      {props.confirmDelete && (
        <div className="flex gap-2 items-center ">
          <p>A exclusão é irreversível. Deseja prosseguir?</p>
          <button
            className={`${button} bg-surface-raised border-border`}
            type="button"
            disabled={props.busy}
            onClick={() => props.setConfirmDelete(false)}
          >
            Não
          </button>
          <button
            className={`${button} bg-surface-raised text-overdue border border-overdue`}
            type="button"
            disabled={props.busy}
            onClick={props.confirm}
          >
            Sim
          </button>
        </div>
      )}

      {props.error && <p className="form-error">{props.error}</p>}
      {props.fieldErrors.customerId && (
        <p className={error}>{props.fieldErrors.customerId}</p>
      )}
      {props.fieldErrors.amount && (
        <p className={error}>{props.fieldErrors.amount}</p>
      )}
      {props.fieldErrors.status && (
        <p className={error}>{props.fieldErrors.status}</p>
      )}
      {props.fieldErrors.issueDate && (
        <p className={error}>{props.fieldErrors.issueDate}</p>
      )}
      {props.fieldErrors.dueDate && (
        <p className={error}>{props.fieldErrors.dueDate}</p>
      )}
    </form>
  );
}
