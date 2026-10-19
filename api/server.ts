import express from 'express';

import path from 'node:path';

import pool from './database.ts';
import dashboard from './dashboard.route.ts';
import invoices from './invoice.route.ts';

const app = express();

const dist = path.join(import.meta.dirname, '..', 'web', 'dist');

app.use((requet, _response, next) => {
  console.log(`${requet.method} ${requet.url}`);
  next();
});
app.get('api/health', async (_request, response) => {
  try {
 const connect = await pool.query('SELECT datname FROM pg_database WHERE oid = 5;');

  response.status(200).json({ 
    status: 'Server is running.',
  database: connect.rows[0].datname
});
} catch (error) {
  console.error(error);

  response.status(500).json({
    status: 'server is running.',
    database: 'unvaliable'
  });
}
});

app.use('/api/dashboard', dashboard);
app.use('/api/invoices', invoices);

app.use(express.static(dist));

app.use((_request, response) => {
  response.status(404).json({ message: 'recurso não encontrado' });
});
app.listen(Number(process.env.PORT) || 3000);
