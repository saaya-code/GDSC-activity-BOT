function format({day, month, activity_time}){
    
    activity_time.length == 4 ? activity_time = "0"+activity_time : activity_time = activity_time
    month.length == 1 ? month = "0"+ month : month = month
    day.length == 1 ? day = "0"+day : month = month

    const l = `2023-${month}-${day}T${activity_time}:00.000+00:00`
    console.log(l)
    const date = new Date(l);
    return date;

}
module.exports = format;