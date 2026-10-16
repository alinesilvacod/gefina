import { Pool } from 'pg'

if (!process.env.DATABASE_URL) 
    throw new Error('a variável DATABASE_URL não esta disponivel.');

const pool = new Pool ({connectionString:process.env.DATABASE_URL})

export default pool;