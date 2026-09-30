

import express from 'express';

import invoices from './invoice.route.ts';


const app = express();

app.use(function (requet, response, next) {
  console.log(requet.method + ' ' + requet.url);
  next();
});
app.get('api/health', function (request, response) {
  response.status(200).json({ status: 'ok' });
app.use('/api/invoice', invoices)

});


app.use(function (request, response) {
  response.status(404).json({ message: 'recurso não encontrado' });
});
app.listen(3000);

