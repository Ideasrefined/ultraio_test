var Publisher = require('../models/publisher.js');

exports.create = (req,res) =>
{
    let publisherdetail = {name:req.body.name,siret:req.body.siret,phone:req.body.phone };

   
    var publisher = new Publisher(publisherdetail);

    publisher.save( (err) =>{
    if (err) {
        res.status(404)("ERROR inserting publisher:" + err);
      return
    }
    //console.log('New Publisher: ' + publisher);
});


        res.status(201).send(req.body.name + " Publisher created");
}

exports.update = (req,res) =>
{

        Publisher.findOneAndUpdate({name:req.params.name}, 
            {name:req.body.name,siret:req.body.siret,phone:req.body.phone},
            {omitUndefined:true}, 
            (err,docs)=>{
            if(err || !docs)
                res.status(404).send("error updating document");
            else
                res.send("Update success");
        })
}

exports.index = (req,res)=>
{
        Publisher.find({},(err,docs)=>{
        if(err)
                res.send("Error occured in publishers listing:" + err);
        else
                res.send(docs); 
        });

}
exports.delete = (req,res)=>
{
        Publisher.findOneAndDelete({name:req.params.name},(err,docs)=>{

        if(err || !docs)
        {       console.log("Error deleting object");
                res.status(404).send("Error deleting object");
        }
        else
        {
            res.send(" deleted successfully");
        }
        
        
    });
}

