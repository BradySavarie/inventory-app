const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const effectInstanceSchema = new Schema({
    effect: { type: Schema.Types.ObjectId, ref: 'Effect', required: true },
    condition: {
        type: String,
        required: true,
        enum: [
            'Brand New',
            'Used - Like New',
            'Used - Light Wear',
            'Used - Heavy Wear',
        ],
        default: 'Brand New',
    },
});

effectInstanceSchema.virtual('url').get(function () {
    return `/catalog/effectInstance/${this._id}`;
});

module.exports = mongoose.model('EffectInstance', effectInstanceSchema);
