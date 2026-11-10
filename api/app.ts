import express from 'express';

import path from 'node:path';
import fs from 'node:fs';

import prisma from './prisma.ts';

import dashboard from './dashboard.route.ts';
import customers from './customer.route.ts';
import invoices from './invoice.route.ts';

import handleError from './error.middleware.ts';

const app = express();

app.use(express.json());

const dist = path.join(import.meta.dirname, '..', 'web', 'dist');

app.use((requet, _response, next) => {
  console.log(`${requet.method} ${requet.url}`);
  next();
});
app.get('/api/health', async (_request, response) => {
  try {
 await prisma.$queryRaw`SELETE 1 ;` ;
  response.status(200).json({ 
    status: 'Server is running.',
  database: 'Database available.'
});
} catch (error) {
  console.error(error);

  response.status(500).json({
    status: 'server is running.',
    database: 'Dtabase unvailable.'
  });
}
});

app.use('/api/dashboard', dashboard);
app.use('/api/customers', customers);
app.use('/api/invoices', invoices);

app.use(express.static(dist));

app.use((request,response,next)=> {
  if (request.url.startsWith('/api') || !fs.existsSync(path.join(dist,'index.html'))) {
    next ();
    return;
  }
  response.sendFile(path.join(dist,'index.html'));
});

app.use((_request, response) => {
  response.status(404).json({error: {
    status:400,
message: 'recurso não encontrado.' 
}});
});

app.use(handleError);

export default app;