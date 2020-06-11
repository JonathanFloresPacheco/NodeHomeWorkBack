var mongoose = require('mongoose');
var Schema = mongoose.Schema;

listJobsSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    matery: {
        type: Schema.Types.ObjectId,
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        required: true
    },
    updatedOn: {
        type: Date,
        default: Date.now()
    },
    bandera: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('listjobs', listJobsSchema);