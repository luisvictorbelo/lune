import { Global, Module } from '@nestjs/common';
import { DrizzleService } from './drizzle.service.js';
import { DbOptions } from './interfaces/db-option.interface.js';
import { Pool } from 'pg';
import {
    ConfigurableDatabaseModule,
    DATABASE_OPTIONS,
    PG_CONNECTION,
} from './db.module-definition.js';
@Global()
@Module({
    exports: [DrizzleService],
    providers: [
        DrizzleService,
        {
            provide: PG_CONNECTION,
            inject: [DATABASE_OPTIONS],
            useFactory: (dbOptions: DbOptions) => {
                return new Pool({
                    host: dbOptions.host,
                    port: dbOptions.port,
                    user: dbOptions.user,
                    password: dbOptions.password,
                    database: dbOptions.database,
                });
            },
        },
    ],
})
export class DatabaseModule extends ConfigurableDatabaseModule {}
