module.exports = async function announce (message, client) {
    if (message.author.bot) return;
    if (!message.content.startsWith('&announce')) return;
    if(!message.member.permissions.has('ADMINISTRATOR')) return;
    const announcementChannel = client.channels.cache.find(channel => channel.id == '783404401250795562')
    const currentChannel = message.channel;
    const seperatorString = "--------------------------------------------------".repeat(2)+"\n\n";
    message.reply("This is a preview of how the announcement would look like. If you want to send the announcement, react with ✅. If you want to cancel, react with ❌.\n\n")
    message.channel.send(seperatorString)
    const messageFollowUp = currentChannel.send({
        content: message.content.split(" ").slice(1).join(" "),
        files: message.attachments.map(attachment => attachment.url),
    })
    messageFollowUp.then(async (messageOne) => {
        await messageOne.react('✅');
        await messageOne.react('❌');
        const filter = (reaction, user) => {
            return ['✅', '❌'].includes(reaction.emoji.name) && user.id == message.author.id && !user.bot;
        };
        const collector = messageOne.createReactionCollector({  filter ,time: 60000 });
        collector.on('collect', async (reaction, user) => {
            console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
            if (reaction.emoji.name === '✅') {
                await currentChannel.send("Announcement sent!")
                await announcementChannel.send({
                    content: messageOne.content,
                    files: messageOne.attachments.map(attachment => attachment.url),
                })
            } else {
                await messageOne.delete();
                await currentChannel.send("Announcement cancelled!")
            }
        }
        );
    })

    
    
}