import {useState, useEffect } from 'react'

import type { Dashboard } from './dashboardType.ts';

import SummaryCard from './SummaryCard.tsx';
import InvoiceSummaryTable from './InvoiceSummaryTable.tsx';

import { formatCurrency } from './utils.ts';

export default function DashboardPage () {
  const [dashboard, setDashboard] = useState<null | Dashboard>(null);
  const [error,setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    async function getDashbord() {
    try {
      const response = await fetch('/api/dashboard');

if (!response.ok) {
    setError('não foi possivel carregar sua fatura.');
    setLoading(false);
    return;
}
const datas = await response.json();
  setDashboard(datas);
  } catch {
setError('não foi possivel carregar sua fatura.');
  } 
  setLoading (false);
}

getDashbord();
}, []);

if (loading) return <p>Carregarndo painel inicial...</p>
if (error|| dashboard === null ) return <p>{error}</p>;

return <div>


<h1>Painel inicial</h1>

<div>
<SummaryCard label = 'Total recebido:' value= {formatCurrency(dashboard.totals.paid)} />
<SummaryCard label = 'Total pendente:' value= {formatCurrency(dashboard.totals.pending)} />
<SummaryCard label = 'Faturas' value= {String(dashboard.totals.invoicesCount)} />
<SummaryCard label = 'Clientes' value= {String(dashboard.totals.customerCount)} />
</div>
<div>
  <InvoiceSummaryTable
  title='faturas recentes'
  dateLabel='emisão'
  invoices={dashboard.recetInvoices}
  date={(invoice)=> invoice.issueDate}
  ></InvoiceSummaryTable>
</div>

<div>
<InvoiceSummaryTable
  title='faturas recentes'
  dateLabel='vencimento'
  invoices={dashboard.overdueInvoices}
  date={(invoice)=> invoice.dueDate}
  />
</div>

</div>

}