import { Module } from '@nestjs/common';
import { EnvService } from '@/env/env.service.js';

@Module({
  providers: [EnvService],
  exports: [EnvService]
})
export class EnvModule { }
