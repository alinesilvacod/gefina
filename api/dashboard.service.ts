import pool from './database.ts';

import {
     type Invoice,
     type InvoiceStatus,
     findRecentInvoices,
     findOverdueInvoices
    } from './invoice.service.ts';

async function sumAmountBysstatus(status:InvoiceStatus): Promise<number>{
const  connect = await pool.query(
    'SELECT COALESCE(SUM(amount), 0):: int AS total FROM invoices WHERE status = $1;',
    [status]
    );

    return connect.rows[0].total;
}
type Resource = 'invoices' | 'customers';

async function count(resource: Resource): Promise<number> {
const connect = await pool.query(`SELECT COUNT(*)::int AS total FROM ${resource};`);

return connect.rows[0].total;
}

interface Dashboardtotals {
    paid: number;
    pending:Number;
    invoicesCount:number;
    customerCount: number;

}

interface Dashboard {
totals: Dashboardtotals;
recetInvoices: Invoice[];
overdueInvoices: Invoice[];
}

export default async function findDashboard(): Promise<Dashboard> {
const paid = await sumAmountBysstatus('paid');
const pending = await sumAmountBysstatus('pending');
const invoicesCount = await count ('invoices');
const customerCount = await count ('customers');
const recetInvoices = await findRecentInvoices();
const overdueInvoices = await findOverdueInvoices();

return {
    totals: {
        paid,
        pending,
        invoicesCount,
        customerCount
    },
    recetInvoices,
    overdueInvoices
};
}