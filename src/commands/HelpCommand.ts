import {ChatInputCommandInteraction, CacheType} from 'discord.js';
import Command from '@/commands/Command';
import {bot} from '@/index';

export const HelpCommand = new Command<ChatInputCommandInteraction<CacheType>>({
    name: 'help',
    description: 'pls help!',
    run: async (interaction) => {
        await interaction.reply(
            bot
                ?.getCommands()
                .filter(({name}) => name !== 'help')
                .map(({name, description}) => `\`/${name}\` - ${description}`)
                .join('\n') ?? '',
        );
    },
});
