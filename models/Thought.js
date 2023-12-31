const {Schema, model} = require('mongoose');
const { reactionSchema } = require('./Reaction');
const moment = require('moment');
const dateFormat = (timestamp) => moment(timestamp).format('LLL');
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);
module.exports = {Thought, thoughtSchema}
