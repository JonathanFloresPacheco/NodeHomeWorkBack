const mongoose = require("mongoose");
var listjobs = require("../models/listjobs");
var mongo = require('mongodb');
var materypopulate = require("../models/matery");
var teacherspopulate = require("../models/teachers");

module.exports = {
    homeworkRegistration: async(req, res)  =>  {
        try {
            var query = {};
            query['description'] = req.body.description;
            query['matery'] = new mongo.ObjectId(req.body.matery);
            query['teacher'] = new mongo.ObjectId(req.body.teacher);
            query['bandera'] = true;
            const listObj = new listjobs(query);
            const result = await listObj.save();
            res.status(200).json(result);
        } catch (err) {
            console.log({ err });
            res.status(400).json({ message: err.message });
        }
    },
    gethomework: (req, res)  =>  { 
        listjobs.find()
        .exec((err, result) => {
            materypopulate.populate(result, { path: "matery" }, function(err, result) {
                teacherspopulate.populate(result, { path: "teacher" }, function(err, result) {
                    if (err)
                        res.status(400).send(err);
                    else
                        res.status(200).json(result);
                });
        });
    });
    },
    updatehomework: (req, res)  =>  {
        var query = {};
        query['description'] = req.body.description;
        query['matery'] = new mongo.ObjectId(req.body.matery);
        query['teacher'] = new mongo.ObjectId(req.body.teacher);
        query['bandera'] = req.body.bandera;

        let idforHomework = new mongo.ObjectId(req.body._id);
        listjobs.findByIdAndUpdate(idforHomework,query,{new: true}).
        exec((err,result)=>{
            console.log(result);
            if(result){
                res.status(200).send(result);
            } else{
                res.status(400).send(err);
            }
        });
    },
    deletehomework: (req, res)  =>  {
        console.log("Llego a deletehomework");
        console.log(req.params.homeworkid);
        let idforHomework = new mongo.ObjectId(req.params.homeworkid);
        listjobs.deleteOne({_id: idforHomework}).
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