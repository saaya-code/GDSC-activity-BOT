const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

const select = new StringSelectMenuBuilder()
    .setCustomId('second')
    .setPlaceholder('Select the concerned committees')
    .addOptions(
        new StringSelectMenuOptionBuilder()
            .setLabel('TM')
            .setDescription('Team management')
            .setValue('TM'),
        new StringSelectMenuOptionBuilder()
            .setLabel('EER')
            .setDescription('Events and External relations')
            .setValue('EER'),
        new StringSelectMenuOptionBuilder()
            .setLabel('MKT')
            .setDescription('Marketing')
            .setValue('MKT'),
        new StringSelectMenuOptionBuilder()
            .setLabel('TECH')
            .setDescription('Technical')
            .setValue('TECH')
);
select.setMaxValues(4);
module.exports = select;