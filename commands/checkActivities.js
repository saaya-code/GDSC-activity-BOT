require("dotenv").config();
const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');
//const formatDate = require("../helpers/formatDate")



module.exports = {
    data: new SlashCommandBuilder()
        .setName('consult')
        .setDescription('Returns an embed with all current registered activites.'),
    async execute(interaction, client) {
        let i = 0;
        fetch(`${process.env.API_BASE_LINK}/getActivites`).then((res)=>{
                res.json().then((data)=>{
                    const embed = new EmbedBuilder()
                    .setTitle("All registered activites")
                    for(activity of data){
                        i++;
                        if (i==20)
                        break;
                        let {activity_type, date} = activity;
                        embed.addFields(({name: activity_type, value: new Date(date).toString()}))
                    }
                    
                   interaction.reply({content:"Command successfully run", embeds:[embed]})
                })
            
        })
    }
};