import type { invoiceStatus } from './invoice.schema.ts';

import {
  findOverdueInvoices,
  findRecentInvoices,
  type Invoice,
} from './invoice.service.ts';
import prisma from './prisma.ts';

interface Dashboard {
  totals: {
    paid: number;
    pending: number;
    invoicesCount: number;
    customerCount: number;
  };
  recetInvoices: Invoice[];
  overdueInvoices: Invoice[];
}

async function sumAmountBysstatus(
  status: invoiceStatus,
): Promise<number> {
  const sum = await prisma.invoice.aggregate({
    where: { status },
    _sum: { amount: true },
  });

  return !sum._sum.amount ? 0 : sum._sum.amount;
}

export default async function findDashboard(): Promise<Dashboard> {
  const paid = await sumAmountBysstatus('paid');
  const pending = await sumAmountBysstatus('pending');
  const invoicesCount = await prisma.invoice.count();
  const customerCount = await prisma.customer.count();
  const recetInvoices = await findRecentInvoices();
  const overdueInvoices = await findOverdueInvoices();

  return {
    totals: {
      paid,
      pending,
      invoicesCount,
      customerCount,
    },
    recetInvoices,
    overdueInvoices,
  };
}
