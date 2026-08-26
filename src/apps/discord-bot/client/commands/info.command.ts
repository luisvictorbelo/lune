import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const infoCommand = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get info about the server'),

    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply(
            `This server is called ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members!`,
        );
    },
};
