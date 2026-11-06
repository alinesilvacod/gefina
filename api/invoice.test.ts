import {
    describe,
    it,
    expect
} from 'vitest';

import supertest from 'supertest';

import app from './app.ts';
import type { from } from 'node:stream/iter';

const request = supertest(app);

describe(
    'rotas de fatura',
    () => {
        it(
            'devolve a relação de faturss',
            async () => {
                const response = await request.get('/api/invoices');

                expect(response.status).toBe(200);
                expect(Array.isArray(response.body)).toBe(true);
            }
        );
    }
);