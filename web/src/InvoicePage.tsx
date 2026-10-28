import { useState, useEffect } from 'react'

import type { Invoice, InvoiceInput } from './invoiceType.ts';
import InvoiceTable from './InvoiceTable.tsx';
import InvoiceForm from './invoiceForm.tsx';

import { getAllInvoices, createInvoice } from './invoiceApi.ts';
import type { CustomerOption } from './customerType.ts';

export default function InvoicePage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [CustomersOption, setCustomersOptions] = useState<CustomerOption[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
      await createInvoice(datas);
      await refresh();
    } catch (error) {
      if (error instanceof Error) setFormError(error.message);
    }

    setBusy(false);

  }

  if (loading) return <p>Carregarndo faturas...</p>
  if (error) return <p>{error}</p>;

  return <>
    <h1>Faturas</h1>

    <div className='panel'>
      <InvoiceTable invoices={invoices} />
    </div>

    <InvoiceForm
      invoice={null}
      customers={CustomersOption}
      error={formError}
      onDelete={() => null}
      onCancel={() => null}
      onSumit={submit}
      busy={busy}

    />
  </>
}