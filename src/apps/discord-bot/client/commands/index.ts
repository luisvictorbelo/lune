import { REST, Routes } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';

const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readFileSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith('.ts'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = import(filePath);

        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
            );
        }
    }
}

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(
            `Started refreshing ${commands.length} application (/) commands.`,
        );

        const data = await rest.put(
            Routes.applicationGuildCommands(
                process.env.BOT_CLIENT_ID,
                process.env.BOT_GUILD_ID,
            ),
            { body: commands },
        );
        console.log(
            `Successfully refreshed application (/) commands with ${data.length} commands.`,
        );
    } catch (error) {
        console.error(error);
    }
})();
