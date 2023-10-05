const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const effectSchema = new Schema({
    model: { type: String, required: true },
    // manufacturer
    // category
    description: { type: String, required: true },
    price: { type: Number, required: true },
});

effectSchema.virtual('url').get(function () {
    return `/catalog/effect/${this._id}`;
});

module.exports = mongoose.model('Effect', effectSchema);
