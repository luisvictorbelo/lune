import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres'; // Use your specific driver import
import { migrate } from 'drizzle-orm/node-postgres/migrator'; // Use your specific migrator import
import { Pool } from 'pg';

dotenv.config({ path: '.env.local' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

const main = async () => {
    try {
        await migrate(db, { migrationsFolder: './drizzle' });
        console.log('Migration completed');
        await pool.end(); // Close the pool after migration
    } catch (error) {
        console.error('Error during migration:', error);
        process.exit(1);
    }
};

main();
