require("dotenv").config();
const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');
//const formatDate = require("../helpers/formatDate")
const activity = require("../models/activity");
const authorIconUrl = "https://cdn.discordapp.com/avatars/398147766687236107/37aff03cdd4d18240e9c1696b405683f.png";
const gdscIconUrl = "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-dsc/contentbuilder/GDG-Bevy-ChapterThumbnail.png"

module.exports = {
    data: new SlashCommandBuilder()
        .setName('consult')
        .setDescription('Returns an embed with all current registered activites.'),
    async execute(interaction, client) {
        const currentDate = new Date();
        const allActivities = await activity.find({
            date:{
                $gte:currentDate
            }
        })
        let i = 1;
        const embed = new EmbedBuilder()
        .setTitle(`There are ${allActivities.length} Upcoming events.`)
        .setFooter({text: "made with ❤️ by saaya2504", iconURL:authorIconUrl})
        .setDescription("This list contains all currently registered activities")
        .setThumbnail(gdscIconUrl)
        .setColor(0x0099FF)
        allActivities.forEach(act=>{
            embed.addFields({name: `**${i++})** ${act.activity_type}`, value: `**Time** : ${act.date} \n **details** : ${act.details || "None."}`})
            
        })
        interaction.reply({content:"Here's a list of the requested activities",embeds: [embed]})
    }
};