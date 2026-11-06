import {
    beforeEach,
    afterAll,
    describe,
    it,
    expect
} from 'vitest';

import supertest from 'supertest';

import app from './app.ts';

import pool from './database.ts';

const user = {
    id: 0,
    email: 'usuario@teste.com.br'
};
const customer = {
    id: 0,
    email: 'cliente@teste.com.br'
};

const invoice = { id: 0 };

async function populate(): Promise<void> {
    const connectUser = await pool.query(`
        INSERT INTO users (name,email,password_hash)
        VALUES ('Usuario de teste', $1, 'placeholder')
        RETURNING id;
        `,
        [user.email]
    );

    user.id = connectUser.rows[0].id;

    const connectCustomer = await pool.query(
        `
        INSERT INTO customers (user_id,name,email)
        VALUES ($1, 'cliente de teste', $2)
        RETURNING id;
        `,
        [user.id, customer.email]
    );
    customer.id = connectCustomer.rows[0].id;

    const connectInvoice = await pool.query(
        `
        INSERT INTO invoices (customer_id,amount,status,issue_date,due_date)
        VALUES ($1, '125037','pending','2026-10-01','2026-10-31')
        RETURNING id;
        `,
        [customer.id]
    );
    invoice.id = connectInvoice.rows[0].id;
}
async function clear(): Promise<void> {
    await pool.query(
        `
        DELETE FROM invoices
        WHERE customer_id IN ($1);
        `,
        [customer.id]
    );
    await pool.query(
        `
        DELETE FROM customers
        WHERE id = $1;
        `,
        [customer.id]
    );

    await pool.query(
        `
        DELETE FROM users
        WHERE id = $1;
        `,
        [user.id]
    );
}

const request = supertest(app);

describe(
    'rotas de fatura',
    () => {
        beforeEach(async () => {
            await clear();
            await populate();
        });

        afterAll(async () => {
            await clear();
            await pool.end();
        });

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