let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CatSchema = new Schema(
    {
        name: { type: String, required: true },
        age: { type: Number, required: true, min: 0, max: 30 },
        createdAt: { type: Date, default: Date.now }
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Cat', CatSchema);
