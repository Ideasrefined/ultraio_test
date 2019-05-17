var Game = require('../models/game.js');
var Publisher = require('../models/publisher.js');

exports.create = (req,res)=>
{
    let gamePublisher = req.body.publisher;
    Publisher.findOne({name:gamePublisher},(err,pub)=>{
        if(err || !pub)
        {
            res.status(404).send("Publisher " + gamePublisher + " not found");
            return;
        }
    
        let gamePublisherId = pub._id;
    
    let gameDetail = {title:req.body.title, price:req.body.price,
        publisher:gamePublisherId, tags:req.body.tags, release_date: req.body.release_date };

   
    var game = new Game(gameDetail);

    game.save(function (err) {
    if (err) {
        console.log("ERROR inserting publisher:" + err);
      return
    }
    
    res.status(201).send(req.body.title + " Game created");
    });
})

    
}

exports.update = (req,res)=>
{

    
    let gamePublisher = req.body.publisher;
    Publisher.findOne({name:gamePublisher},(err,pub)=>{
        if(err || !pub)
        {
            res.status(404).send("Publisher " + gamePublisher + " not found");
            return;
        }
    
    let gamePublisherId = pub._id;
    

    let gameDetail = {title:req.body.title, price:req.body.price,
        publisher:gamePublisherId, tags:req.body.tags, release_date: req.body.release_date };


    Game.findOneAndUpdate({title:req.params.title}, 
        gameDetail,
        {omitUndefined:true}, 
        (err,docs)=>{
        if(err || !docs)
            res.status(404).send("error updating document : " + err);
        else
            res.send("Update success");
        })
    })
}

exports.index =  (req,res)=>
{
    Game.find({},(err,docs)=>{
        if(err)
                res.send("Error occured in Game listing:" + err);
        else
                res.send(docs); 
        });
}

exports.delete = (req,res)=>
{
    let gamePublisher = req.params.publisher;
    Publisher.findOne({name:gamePublisher},(err,pub)=>{
        if(err || !pub)
        {
            res.status(404).send("Publisher " + gamePublisher + " not found");
            return;
        }
    
    let gamePublisherId = pub._id;
    Game.findOneAndDelete({title:req.params.title,publisher:gamePublisherId},
        (err,docs)=>{

            if(err || !docs)
            {       console.log("Error deleting object");
                    res.status(404).send("Error deleting object" + err);
            }
            else
            {
                res.send(" deleted successfully");
            }
        
        
        });
    })
}

exports.getOne = (req,res) => {
    Game.findOne({title:req.params.title})
    .populate({path:'publisher',match:{name:req.params.publisher}}).exec((err,docs)=>{
        if(err)
                res.status(404).send("an error occured");
            else if( !docs)
            {
                res.status(404).send("Game " + req.params.title + " not found");
            }
            else
            res.send(docs);
    });
        
    
}

exports.getPublisher = (req,res)=>{
    Game.findOne({title:req.params.title}).populate('publisher').exec((err,docs)=>{
        if(err)
            res.status(404).send("An error occured");
        else if(!docs)
        {
            res.status(404).send("Game not found");
        }
        else
        {
            res.send(docs.publisher);
        }
    })
}

exports.prune = (req,res)=>{
    let pruning_date = new Date();
    let twelve_month_date = new Date();
    pruning_date.setMonth(pruning_date.getMonth() - 18);

    twelve_month_date.setMonth(twelve_month_date.getMonth() - 12 );

    Game.deleteMany({release_date: { $lt:pruning_date }},(err,docs)=>{
        if(err)
        {
            res.status(404).send("Error occured");
            return;
        }
    });

    Game.updateMany({release_date: {$gte:pruning_date, $lte:twelve_month_date}},
        { $mul: {price:0.80} }  , (err,docs)=>{
            if(err)
            {    res.status(404).send("Error Occured in pruning:update : " + err);
                return;
            }
            else
            {
                res.send("Pruning complete");
            }
        } );

}