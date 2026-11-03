import pool from './database.ts';

interface CustomersOption {
id:number;
name: string
email:string;
}

export async function findCustomersOptions (): Promise<CustomersOption[]> {
const connect = await pool.query<CustomersOption>('SELECT id, name, email FROM customers ORDER BY name');

return connect.rows;
}