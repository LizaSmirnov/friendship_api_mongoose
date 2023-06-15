const {schema, models} = require('mongoose');
const reactionSchema = require('./Reaction');

const reactionSchema = new schema(
    {
        reactionId: {
            type: schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const Reaction = model('Reaction', reactionSchema);
module.exports = Reaction;
