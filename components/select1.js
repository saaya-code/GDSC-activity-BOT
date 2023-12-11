const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

const select = new StringSelectMenuBuilder()
    .setCustomId('first')
    .setPlaceholder('Select the activity type.')
    .addOptions(
        new StringSelectMenuOptionBuilder()
            .setLabel('Meeting')
            .setDescription('A committee/core team meeting.')
            .setValue('meeting'),
        new StringSelectMenuOptionBuilder()
            .setLabel('Workshop')
            .setDescription('A workshop for community members')
            .setValue('workshop'),
        new StringSelectMenuOptionBuilder()
            .setLabel('Session')
            .setDescription('A session for technical committe members')
            .setValue('session'),
        new StringSelectMenuOptionBuilder()
            .setLabel('Team building')
            .setDescription('A team building for the core team. ')
            .setValue('team building')
);
module.exports = select;