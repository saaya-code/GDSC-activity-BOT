const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder,ModalBuilder,TextInputBuilder,TextInputStyle,ComponentType, time } = require('discord.js');
require("dotenv").config();
const select1 = require("../components/select1");
const select2 = require("../components/select2");
const formatDate = require("../helpers/formatDate");
const activity = require("../models/activity");
const webHookHandler = require("../helpers/webHookHandler")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('A guide used to register activities.')
        .addStringOption(Option =>
            Option
            .setName("day")
            .setDescription("Enter the day of the activity.")
            .setRequired(true)
        )
        .addStringOption(Option=>{
            Option
            .setName("month")
            .setDescription("Enter the month of the activity.")
            .setRequired(true)  
            for(i = 1;i<=12;i++)
                Option.addChoices({ name: `${i}`, value: `${i}` })
            return Option; 
        })
        .addStringOption(Option=>
            Option
            .setName("activity_time")
            .setDescription("Enter the time as hh:mm format (24 hours)")
            .setRequired(true))
        
        .addStringOption(Option=>
            Option
            .setName("details")
            .setDescription("Set the description for the activity.")
            .setRequired(false)
            ),
        async execute(interaction, client) {
            const data = {};
            const channel = interaction.channel;
            const day = interaction.options.getString("day")
            const month = interaction.options.getString("month")
            const activity_time = interaction.options.getString("activity_time")
            const formatedDate = formatDate({day, month, activity_time})
            data.date = formatedDate;
            data.details = interaction.options.getString("details");
            const row1 = new ActionRowBuilder().addComponents(select1);
            const row2 = new ActionRowBuilder().addComponents(select2) 
            const response = await interaction.reply({
                content: 'Choose your activity type.',
                components: [row1,row2],
            });
		    const collectorFilter = i => i.user.id === interaction.user.id;
            const collector = response.createMessageComponentCollector({ componentType: ComponentType.StringSelect});

            collector.on('collect', async i => {
            if (i.values){
                if(i.customId == 'first'){
                    data["activity_type"] = i.values[0];
                    i.reply(`${i.values[0]} is selected successfully`);
                }
                if(i.customId == 'second'){
                    data["concerned_committes"] = i.values;
                    i.reply("Concerned committees applied successfully.")
                }
                if(data.activity_type && data.concerned_committes){
                    collector.stop();
                }
            }
            });
            collector.on("end", async (collected)=>{
                if(data.activity_type && data.concerned_committes){
                    try{
                        const newActivity = new activity(data);
                        res = await newActivity.save(); 
                        channel.send({content:`A new ${data.activity_type} has been successfully registered`,ephemeral: true})
                        console.log(res)
                        webHookHandler(data);
                    }catch(err){
                        channel.send({content:`An error has occured please contact me hh`,ephemeral:true })
                    }
                    
                }
            })
        

    }
};