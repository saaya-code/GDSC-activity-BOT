const webHookers = {
    "TECH": {webhookUrl:"https://discord.com/api/webhooks/1167172830937489488/V3x72wAH_DJzgEmF5KSAluUmgEnvxL8Y7s-X6uXFUdY-uKooGHBn6DzI7hINABvu5OFF", roleId:"830900803254222938"},
    "TM":  {webhookUrl:"https://discord.com/api/webhooks/1167173163109601300/qWT0AQNoC1P7o354_Qn0yO097OE2edTrVm9Bhh_xSbHse0NLvG3iol59X0i5EABeFIE1", roleId:"792837124315152405"},
    "MKT": {webhookUrl: "https://discord.com/api/webhooks/1167173320047874079/h9-aCxN4HUyZYGMu6qIdH3SRp1ydYvg5Ee_8iALQq9Pd-PxCRNp0XHg1cBfb366fvD4J", roleId:"791432358607585291"},
    "EER":  {webhookUrl:"https://discord.com/api/webhooks/1167173456987697244/_SWvmGfCbBk7scQbzOr2-5HgwyvpgxfevhwoHOA_BidfRm8Cto1HtDH8OU8Q7-8qiLhq", roleId:"792837038570471426"}
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