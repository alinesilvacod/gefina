import type { Invoice } from "./invoiceType.ts";

export interface Dashboardtotals {
    paid: number;
    pending:number;
    invoicesCount:number;
    customerCount: number;

}

export interface Dashboard {
totals: Dashboardtotals;
recetInvoices: Invoice[];
overdueInvoices: Invoice[];
}