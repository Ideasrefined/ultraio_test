var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var gameSchema = new Schema(
{

        title:          {type:String , required: true, maxlength: 100},
        price:          {type:Number},
        publisher:      {type:Schema.Types.ObjectId, ref: 'Publisher', required:true},
        tags:           [{type:String}],
        release_date:   {type:Date}
}
);


module.exports = mongoose.model('Game',gameSchema);

