import { Inject, Injectable } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { PG_CONNECTION } from './db.module-definition.js';
import { schema } from './schema.js';

@Injectable()
export class DrizzleService {
    public db: NodePgDatabase<typeof schema>;
    constructor(@Inject(PG_CONNECTION) private pgPool: Pool) {
        this.db = drizzle(this.pgPool, { schema: schema });
    }
}
