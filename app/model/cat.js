let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CatSchema = new Schema(
    {
        name: { type: String, required: true },
        age: {
            type: Number,
            required: [ true, 'Every cat has an age' ],
            min: [ 0, 'This cat is too negative all the time.' ],
            max: [ 30, 'Oldest cat alive is 28, wtf.' ]
        },
        createdAt: { type: Date, default: Date.now }
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Cat', CatSchema);
