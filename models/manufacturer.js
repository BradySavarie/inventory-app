const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const manufacturerSchema = new Schema({
    name: { type: String, required: true, minLength: 2, maxLength: 100 },
});

manufacturerSchema.virtual('url').get(function () {
    return `/catalog/manufacturer/${this.id}`;
});

module.exports = mongoose.model('Manufacturer', manufacturerSchema);
