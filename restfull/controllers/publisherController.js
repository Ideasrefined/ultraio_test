var Publisher = require('../models/publisher.js');

var publisherController= {

create: (req,res,next)=>
{
    let publisherdetail = {name:req.body.name,siret:req.body.siret,phone:req.body.phone };

   
    var publisher = new Publisher(publisherdetail);

        try
        {
                publisher.save( (err) =>{
                        console.log(err);
                if (err) {
                        next(err);
                }
                else{
                res.status(201).json({message:req.body.name + " publisher created"});
                
                }
                });
        }
        catch(err)
        {
                next(err)
        }

        
},

update: (req,res,next)=>
{
        try
        {
                Publisher.findOneAndUpdate({name:req.params.name}, 
                {name:req.body.name,siret:req.body.siret,phone:req.body.phone},
                {omitUndefined:true}, 
                (err,docs)=>{
                if(err || !docs)
                        next(err);
                else
                        res.json({message:"Update success"});
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

        
        Publisher.find({},(err,docs)=>{
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
        try{

        
                Publisher.findOneAndDelete({name:req.params.name},(err,docs)=>{

                if(err || !docs)
                {     next(err);
                }
                else
                {
                        res.json({message:" deleted successfully"});
                }
                
                
        });
        }
        catch(err)
        {
                next(err);
        }
}

};

module.exports = publisherController;