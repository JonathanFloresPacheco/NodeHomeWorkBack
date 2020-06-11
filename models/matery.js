var mongoose = require('mongoose');
var Schema = mongoose.Schema;

materySchema = new Schema({
    matery: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('matery', materySchema);