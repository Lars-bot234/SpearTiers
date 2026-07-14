src/commands/Ticket/forceopen.js
import { SlashCommandBuilder, MessageFlags } from 'discord.js';
import { successEmbed } from '../../utils/embeds.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
    data: new SlashCommandBuilder()
        .setName('forceopen')
        .setDescription('Force open a tier test ticket.')
        .setDMPermission(false)

        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('User to open a ticket for')
                .setRequired(true)
        )

        .addStringOption(option =>
            option
                .setName('region')
                .setDescription('Region')
                .setRequired(true)
                .addChoices(
                    { name: 'EU', value: 'eu' },
                    { name: 'NA', value: 'na' },
                    { name: 'ASIA', value: 'asia' }
                )
        ),

    async execute(interaction) {

        const deferred = await InteractionHelper.safeDefer(interaction, {
            flags: MessageFlags.Ephemeral
        });

        if (!deferred) return;

        const user = interaction.options.getUser('user');
        const region = interaction.options.getString('region');

        await InteractionHelper.safeEditReply(interaction, {
            embeds: [
                successEmbed(
                    "Force Open",
                    `Ticket will be opened for ${user} in **${region.toUpperCase()}**`
                )
            ]
        });

    }
};
