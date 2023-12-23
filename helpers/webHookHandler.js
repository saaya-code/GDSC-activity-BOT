require("dotenv").config();

const webHookers = {
    "TECH": {webhookUrl:process.env.TECH_webhook, roleId:"830900803254222938"},
    "TM":   {webhookUrl:process.env.TM_webhook, roleId:"792837124315152405"},
    "MKT":  {webhookUrl: process.env.MKT_webhook, roleId:"791432358607585291"},
    "EER":  {webhookUrl:process.env.EER_webhook, roleId:"792837038570471426"}
}

module.exports = function({activity_type, date, details, concerned_committes}){
  const newDetails = details || "No details were provided."
      for(com of concerned_committes){
        const embed = {
          "content": `Hello <@&${webHookers[com].roleId}> a new ${activity_type} has been added.`,
          "embeds": [
            {
              "title": `A new ${activity_type} was added.`,
              "description": newDetails,
              "fields": [
                {
                  name: 'Date : ',
                  value: date,
                },
              ],
              "color": 5814783,
              "footer": {
                "text": "made with ❤️ by saaya2504",
                "icon_url": "https://cdn.discordapp.com/avatars/398147766687236107/37aff03cdd4d18240e9c1696b405683f.png?size=1024"
              }
            }
          ],
          "attachments": []
        }
        fetch(webHookers[com].webhookUrl,{
            method:"POST",
            body:JSON.stringify(embed),
            headers:{
                "Content-Type":"Application/json"
            }
        }).then((res)=>{
            console.log("done");
        })
      }
}