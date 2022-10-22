var mongoose=require('mongoose');
const {Schema} = require("mongoose");
var reclamation=new Schema({
    Date_de_creation:Date,
    Description:String,
    Valide: Boolean
},{ timestamps: true })

module.exports=mongoose.model('reclamations',reclamation);