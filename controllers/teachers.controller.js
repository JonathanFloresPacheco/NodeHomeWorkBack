const mongoose = require("mongoose");
var teachers = require("../models/teachers");
var mongo = require('mongodb');
var materypopulate = require("../models/matery");

module.exports = {
    teachersRegistration: async(req, res)  =>  {
        try {
            var query = {};
            query['name'] = req.body.name;
            query['lastname'] = req.body.lastname;
            query['matery'] = new mongo.ObjectId(req.body.matery);
            const teachersObj = new teachers(query);
            const result = await teachersObj.save();
            res.status(200).json(result);
        } catch (err) {
            console.log({ err });
            res.status(400).json({ message: err.message });
        }
    },
    getteachers: (req, res)  =>  { 
        teachers.find()
        .exec((err, result) => {
            materypopulate.populate(result, { path: "matery" }, function(err, result) {
            if (err)
                res.status(400).send(err);
            else
                res.status(200).json(result);
            });
        });
    },
    updateteachers: (req, res)  =>  {
        var query = {};
        query['name'] = req.body.name;
        query['lastname'] = req.body.lastname;
        query['matery'] = new mongo.ObjectId(req.body.matery);

        let idforteachers= new mongo.ObjectId(req.body._id);
        teachers.findByIdAndUpdate(idforteachers,query,{new: true}).
        exec((err,result)=>{
            console.log(result);
            if(result){
                res.status(200).send(result);
            } else{
                res.status(400).send(err);
            }
        });
    },
    deleteteachers: (req, res)  =>  {
        console.log(req.params.teachersid);
        let idforteachers = new mongo.ObjectId(req.params.teachersid);
        teachers.deleteOne({_id: idforteachers}).
            exec((err,result)=>{
                console.log(result);
                if(result){
                    res.status(200).send(result);
                } else{
                    res.status(400).send(err);
                }
        });
    },
    filterSearchTeachers: (req,res) =>{
        var query = {};
        console.log(req.body);
        if (req.body.matery)
                query['matery'] = new mongo.ObjectId(req.body.matery)
        console.log(JSON.stringify(query));
        teachers.find(query)
            .exec((err, result) => {
                if (err)
                    res.status(400).send(err);
                else
                    res.status(200).json(result);
            });
    }
}