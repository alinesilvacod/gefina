import { useState, useEffect, useRef } from 'react'

import type { Invoice, InvoiceInput, InvoiceFieldErrors} from './invoiceType.ts';
import InvoiceTable from './InvoiceTable.tsx';
import InvoiceForm from './invoiceForm.tsx';

import { getAllInvoices, createInvoice, updateInvoice, deleteInvoice } from './invoiceApi.ts';
import type { CustomerOption } from './customerType.ts';

export default function InvoicePage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [CustomersOption, setCustomersOptions] = useState<CustomerOption[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setfieldErrors]= useState<InvoiceFieldErrors>({});
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogContent, setDialogContent] = useState(false);
  const [target, setTarget]= useState<Invoice | null>(null);
  const [confirmDelete,setConfirmDelete]= useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);
  
  function openModal(invoice: Invoice | null) {
    setTarget(invoice);
    setFormError(null);
    setDialogContent(true);

    dialogRef.current?.showModal();
  }

  function closeModal() {
    dialogRef.current?.close();
  }

  useEffect(() => {
    async function getInvoices() {
      try {
        const datas = await getAllInvoices();
        setInvoices(datas);

      } catch (error) {
        if (error instanceof Error) setError(error.message);
      }
      setLoading(false);
    }

    getInvoices();

  }, []);

  useEffect(() => {
    async function getCustomersOptions() {
      try {
        const response = await fetch('/api/customers/options');

        if (!response.ok) throw new Error('falha ao buscar clientes.');

        const datas = await response.json();

        setCustomersOptions(datas);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      }
    }

    getCustomersOptions();
  }, []);

  async function refresh() {
    try {
      const datas = await getAllInvoices();
      setInvoices(datas);

    } catch (error) {
      if (error instanceof Error) throw error;
    }
  }

  async function submit(datas: InvoiceInput) {
    setBusy(true);
    setFormError(null);

    try {
      if (!target) {
       const failure = await createInvoice(datas);

       if (failure) return setfieldErrors(failure.fields);
      } else {
        await updateInvoice(target.id, datas);
      }

      closeModal();
      await refresh();
    } catch (error) {
      if (error instanceof Error) setFormError(error.message);
    } finally {
      setBusy(false);
    }


  }

  async function confirm() {
    if (!target) return;

    setBusy(true);
    setFormError(null); 

    try {
      await deleteInvoice(target.id);
     
      closeModal();
      
      await refresh();
    } catch (error) {
      if (error instanceof Error) setFormError(error.message);
    }

    setBusy(false);

  }

  if (loading) return <p>Carregarndo faturas...</p>
  if (error) return <p>{error}</p>;

  return <>
  <header className='page-header'>
    <h1>Faturas</h1>
    <button
     className='button-primary'
     type='button'
      onClick={() => openModal(null)}
      >Nova fatura</button>
    </header>

    <div className='panel'>
      <InvoiceTable 
      invoices={invoices}
      edit={openModal}
       />
    </div>

<dialog
className='invoice-modal'
 ref={dialogRef} 
 onClose={() => {
  setDialogContent(false);
  setConfirmDelete(false);
  setfieldErrors({});
 }}
 >

  {dialogContent && <InvoiceForm
      invoice={target}
      customers={CustomersOption}
      error={formError}
      fieldErrors={fieldErrors}
      onDelete={() => setConfirmDelete(true)}
      confirmDelete={confirmDelete}
      setConfirmDelete={setConfirmDelete}
      confirm={confirm}
      onCancel={closeModal}
      onSumit={submit}
      busy={busy}

        />}
   </dialog>
</>
}