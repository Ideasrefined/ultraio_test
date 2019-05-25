var Game = require('../models/game.js');
var Publisher = require('../models/publisher.js');

var GameController = {


create: (req,res,next)=>
{
    let gamePublisher = req.body.publisher;
    
    try{

    
    Publisher.findOne({name:gamePublisher},(err,pub)=>{
        if(err || !pub)
        {
            next(err);
        }
        else
        {

        
            let gamePublisherId = pub._id;
        
            let gameDetail = {title:req.body.title, price:req.body.price,
            publisher:gamePublisherId, tags:req.body.tags, release_date: req.body.release_date };

    
            var game = new Game(gameDetail);

            game.save(function (err) {
            if (err) {
                console.log("ERROR inserting publisher:" + err);
            return
            }
        
            res.status(201).json({message:req.body.title + " Game created"});
        });
     }
    })
    }
    catch(err)
    {
        next(err);
    }

    
},

update: (req,res,next)=>
{

    
    let gamePublisher = req.body.publisher;
    
    try
    {
        Publisher.findOne({name:gamePublisher},(err,pub)=>{
        if(err || !pub)
        {
            next(err)
        }
    
        let gamePublisherId = pub._id;
        

        let gameDetail = {title:req.body.title, price:req.body.price,
            publisher:gamePublisherId, tags:req.body.tags, release_date: req.body.release_date };


        Game.findOneAndUpdate({title:req.params.title}, 
            gameDetail,
            {omitUndefined:true}, 
            (err,docs)=>{
            if(err || !docs)
                res.status(404).json({message:"error updating document : " + err});
            else
                res.json({message:"Update success"});
            })
        })
    }
    catch(err)
    {
        next(err);
    }

},

index: (req,res,next)=>
{
    try{

    
    Game.find({},(err,docs)=>{
        if(err)
                next(err);
        else
                res.send(docs); 
        });
    }
    catch(err)
    {
        next(err);
    }
},

delete: (req,res,next)=>
{
    let gamePublisher = req.params.publisher;
    try
    {

    
        Publisher.findOne({name:gamePublisher},(err,pub)=>{
            if(err || !pub)
            {
                next(err);
            }
            else
            {
                let gamePublisherId = pub._id;
        Game.findOneAndDelete({title:req.params.title,publisher:gamePublisherId},
            (err,docs)=>{

                if(err || !docs)
                {       console.log("Error deleting object");
                        res.status(404).json({message:"Error deleting object" + err});
                }
                else
                {
                    res.json({message:" deleted successfully"});
                }
            
            
            });

            }
        
        
        })
    }
    catch(err)
    {
        next(err);
    }
},

getOne: (req,res,next)=> {
    try{

    
        Game.findOne({title:req.params.title})
        .populate({path:'publisher',match:{name:req.params.publisher}}).exec((err,docs)=>{
            if(err)
                    next(err);
                else if( !docs)
                {
                    res.status(404).json({message:"Game " + req.params.title + " not found"});
                }
                else
                    res.send(docs);
        });
    }
    catch(err)
    {
        next(err);
    }    
    
},

getPublisher: (req,res,next)=>{

    try{

    
    Game.findOne({title:req.params.title}).populate('publisher').exec((err,docs)=>{
        if(err)
            next(err);
        else if(!docs)
        {
            res.status(404).json({message:"Game not found"});
        }
        else
        {
            res.send(docs.publisher);
        }
    })
    }
    catch(err)
    {
        next(err);
    }

},

prune: (req,res,next)=>
{
    let pruning_date = new Date();
    let twelve_month_date = new Date();
    pruning_date.setMonth(pruning_date.getMonth() - 18);

    twelve_month_date.setMonth(twelve_month_date.getMonth() - 12 );

    try
    {
        
    
    Game.deleteMany({release_date: { $lt:pruning_date }},(err,docs)=>{
        if(err)
        {
            next(err);
        }
    });

    Game.updateMany({release_date: {$gte:pruning_date, $lte:twelve_month_date}},
        { $mul: {price:0.80} }  , (err,docs)=>{
            if(err)
            {    next(err);
                
            }
            else
            {
                res.json({message:"Pruning complete"});
            }
        } );
    }
    catch(err)
    {
        next(err);
    }
}

};

module.exports = GameController;