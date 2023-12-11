const mongoose = require("mongoose");


const activitySchema = new mongoose.Schema({
    activity_type:{
        type: String,
        required: true,
        enum: ["event", "meeting","workshop","session", "team building"]
    },
    date:{
        type: Date,
        required: true,
    },
    details:{
        type: String
    },
    concerned_committes:{
        type: [String],
        enum: ["TM","EER","MKT","TECH"]
    }
})


module.exports = mongoose.model('activity', activitySchema);
