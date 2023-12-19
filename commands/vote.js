const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
        .setDescription('Creates a vote for users to vote on.')
        .addStringOption(option => option.setName('question').setDescription('The question to ask in the vote.').setRequired(true))
        .addStringOption(option => option.setName('options').setDescription('The options to vote on.').setRequired(true))
        .addIntegerOption(option => option.setName('duration').setDescription('The duration of the vote in minutes.').setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('The role to ping when the vote is over.').setRequired(false)),
        //.addChannelOption(option => option.setName('channel').setDescription('The channel to send the vote in.').setRequired(false))
        //.addBooleanOption(option => option.setName('anonymous').setDescription('Whether or not the vote should be anonymous.').setRequired(false))
        async execute(interaction, client) {
            const userAdmin = client.users.cache.get('398147766687236107');
            // get the options values 
            const question = interaction.options.getString('question');
            const options = interaction.options.getString('options');
            const duration = interaction.options.getInteger('duration');
            const role = interaction.options.getRole('role');
            //const channel = interaction.options.getChannel('channel');
            //const anonymous = interaction.options.getBoolean('anonymous');
            // split the options into an array
            const optionsArray = options.split(',');
            // create the embed
            const embed = {
                color: 0x0099ff,
                title: question,
                description: `Vote by reacting with the corresponding emoji.\n The vote will end in __${duration} minute${duration==1 ? "": "s"}__.`,
                fields: [],
                timestamp: new Date(),
                thumbnail:{url: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-dsc/events/small-logo.png'},
                footer: {
                    text: `made with ❤️ by ${userAdmin.username}`,
                    icon_url: userAdmin.avatarURL(),
                }
            };
            // add the options to the embed
            emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣','8️⃣','9️⃣']

            for (let i = 0; i < optionsArray.length; i++) {
                    embed.fields.push({
                        name: emojis[i],
                        value: optionsArray[i],
                        inline: true,
                    });       
            }
            // send the embed
            const message = await interaction.reply({ embeds: [embed], fetchReply: true });
            // add the buttons
            for (let i = 0; i < optionsArray.length; i++) {
                await message.react(`${i + 1}️⃣`);
            }
            // create the filter
            const filter = (reaction, user) => {
                return reaction.emoji.name >= '1️⃣' && reaction.emoji.name <= '9️⃣' && !user.bot;
            }
            // create the collector
            const collector = message.createReactionCollector({ filter, time: duration * 60000 });
            // create the results array
            const results = [];
            // on collect
            collector.on('collect', (reaction, user) => {
                // add the reaction to the results array
                results.push(reaction.emoji.name);
            }
            );
            // on end
            collector.on('end', collected => {
                // create the results embed
                const resultsEmbed = {
                    color: 0x0099ff,
                    title: question,
                    description: `The vote has ended.`,
                    fields: [],
                    timestamp: new Date(),
                    thumbnail:{url: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-dsc/events/small-logo.png'},
                    footer: {
                        text: `made with ❤️ by ${userAdmin.username}`,
                        icon_url: userAdmin.avatarURL(),
                    }
                };
                // add the options to the embed
                for (let i = 0; i < optionsArray.length; i++) {
                    resultsEmbed.fields.push({
                        name: `${i + 1}.`,
                        value: `**${optionsArray[i]} - ${results.filter(result => result === `${i + 1}️⃣`).length} votes**`,
                    });
                }
                // send the results embed
                interaction.editReply({ embeds: [resultsEmbed] });
                // ping the role
                if (role) {
                    interaction.channel.send({ content: `${role}`, embeds: [resultsEmbed] });
                }
            }
            );


    }
};