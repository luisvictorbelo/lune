import { Client, GatewayIntentBits } from 'discord.js';
import { infoCommand } from './commands/info.command.js';

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

const commands = new Map<string, any>();
commands.set(infoCommand.data.name, infoCommand);

client.on('ready', () => {
    console.log(`Bot ready: ${client.user?.tag}`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) return;

    await command.execute(interaction);
});

client.login(process.env.DISCORD_TOKEN);
