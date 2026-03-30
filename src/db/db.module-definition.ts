import { ConfigurableModuleBuilder } from '@nestjs/common';
import { DbOptions } from './interfaces/db-option.interface.js';

export const PG_CONNECTION = Symbol('pg-connection');

export const {
    ConfigurableModuleClass: ConfigurableDatabaseModule,
    MODULE_OPTIONS_TOKEN: DATABASE_OPTIONS,
} = new ConfigurableModuleBuilder<DbOptions>()
    .setClassMethodName('forRoot')
    .build();
