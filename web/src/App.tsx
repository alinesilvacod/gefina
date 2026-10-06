import {useState, useEffect } from 'react'

import type {Invoice} from './invoiceType.ts';

import InvoiceTable from './InvoiceTable.tsx';

export default function App () {
const [invoices, setInvoices] = useState<Invoice[]>([]);
const [error,setError] = useState<string | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {async function getInvoices() {
  try {
const response = await fetch('/api/invoices');
if (!response.ok)
setError('não foi possivel carregar sua fatura.');

const datas = await response.json();
setInvoices(datas);
  } catch {
setError('não foi possivel carregar sua fatura.');
  } 
  setLoading (false);
}

getInvoices();

}, []);

if (loading) return <p>Carregarndo faturas...</p>
if (error) return <p>{error}</p>;

return <InvoiceTable invoices = {invoices}/>
    
}