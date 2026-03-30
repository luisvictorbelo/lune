import { Injectable } from "@nestjs/common";
import { NamespacedConfigType } from "@proventuslabs/nestjs-zod";
import { appConfig } from "./config/app.config.js";
import { ConfigService } from "@nestjs/config";
import { PinoLogger } from "nestjs-pino";

@Injectable()
export class AppService {
    constructor(
        private configService: ConfigService<NamespacedConfigType<typeof appConfig>, true>,
        private readonly logger: PinoLogger
    ) {
        this.logger.setContext(AppService.name);
    }

    getAppConfig() {
        this.logger.debug('Fetching app configuration');
        return {
            port: this.configService.get('app.port', { infer: true }),
            node_env: this.configService.get('app.node_env', { infer: true })
        }
    }
}