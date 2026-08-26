import { Guild } from '../entities/guild.entity.js';

export abstract class GuildRepository {
    abstract findbyId(guildId: string): Promise<Guild | null>;
    abstract save(guild: Guild): Promise<void>;
    abstract update(guild: Guild): Promise<void>;
}
