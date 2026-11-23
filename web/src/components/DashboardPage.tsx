import { useEffect, useState } from 'react';

import type { Dashboard } from '../types/dashboardType.ts';
import InvoiceSummaryTable from './InvoiceSummaryTable.tsx';
import SummaryCard from '../components/SummaryCard.tsx';

import { formatCurrency } from '../utils.ts';

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<null | Dashboard>(null);
  const [error, setError] = useState<string | null>(null);
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
      setLoading(false);
    }

    getDashbord();
  }, []);

  if (loading)
    return (
      <p className="text-sm text-text-muted">
        Carregarndo painel inicial...
      </p>
    );
  if (error || dashboard === null)
    return <p className="text-overdue">{error}</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-7">Painel inicial</h1>

      <div className="flex gap-4">
        <SummaryCard
          label="Total recebido:"
          value={formatCurrency(dashboard.totals.paid)}
        />
        <SummaryCard
          label="Total pendente:"
          value={formatCurrency(dashboard.totals.pending)}
        />
        <SummaryCard
          label="Faturas"
          value={String(dashboard.totals.invoicesCount)}
        />
        <SummaryCard
          label="Clientes"
          value={String(dashboard.totals.customerCount)}
        />
      </div>

      <div className="flex gap-6 mt-8">
        <InvoiceSummaryTable
          title="faturas recentes"
          dateLabel="emisão"
          invoices={dashboard.recetInvoices}
          date={(invoice) => invoice.issueDate}
        ></InvoiceSummaryTable>

        <InvoiceSummaryTable
          title="faturas recentes"
          dateLabel="vencimento"
          invoices={dashboard.overdueInvoices}
          date={(invoice) => invoice.dueDate}
        />
      </div>
      <small className="fixed bottom-0 left-[calc(50%+120px)] -translate-x-1/2">
        &copy; 2026. Gefina - Gestor financeiro simples e eficiente.
      </small>
    </div>
  );
}
