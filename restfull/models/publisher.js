
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var publisherSchema = new Schema(
{
        name : {type:String, required: true, maxlength: 100, unique:true},
        siret: {type:Number},
        phone: {type:String},

});



module.exports = mongoose.model('Publisher',publisherSchema);


