var mongoose = require('mongoose');
var Schema = mongoose.Schema;

teachersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    matery: {
        type: Schema.Types.ObjectId,
        required: true
    },
    updatedOn: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('teachers', teachersSchema);