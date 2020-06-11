const mongoose = require("mongoose");
var matery = require("../models/matery");
var mongo = require('mongodb');

module.exports = {
    materyRegistration: async(req, res)  =>  {
        try {
            var query = {};
            query['matery'] = req.body.matery;
            const materyObj = new matery(query);
            const result = await materyObj.save();
            res.status(200).json(result);
        } catch (err) {
            console.log({ err });
            res.status(400).json({ message: err.message });
        }
    },
    getmatery: (req, res)  =>  { 
        matery.find()
        .exec((err, result) => {
            if (err)
                res.status(400).send(err);
            else
                res.status(200).json(result);
        });
    },
    updatematery: (req, res)  =>  {
        var query = {};
        query['matery'] = req.body.description;

        let idformatery = new mongo.ObjectId(req.body._id);
        matery.findByIdAndUpdate(idformatery,query,{new: true}).
        exec((err,result)=>{
            console.log(result);
            if(result){
                res.status(200).send(result);
            } else{
                res.status(400).send(err);
            }
        });
    },
    deletematery: (req, res)  =>  {
        console.log(req.params.materyid);
        let idforidformatery = new mongo.ObjectId(req.params.materyid);
        matery.deleteOne({_id: idforidformatery}).
            exec((err,result)=>{
                console.log(result);
                if(result){
                    res.status(200).send(result);
                } else{
                    res.status(400).send(err);
                }
        });
    },
}