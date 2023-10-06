const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    category: {
        type: String,
        required: true,
        enum: ['Boost', 'Overdrive', 'Distortion', 'Fuzz', 'Delay', 'Reverb'],
        default: 'Boost',
    },
});

categorySchema.virtual('url').get(function () {
    return `/catalog/category/${this.id}`;
});

module.exports = mongoose.model('Category', categorySchema);
