const { schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            max_length:20,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: function(v){
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
                },
                message: props => `${props.value} is not a valid email address!`
        }
        },

        thoughts: [thoughtSchema],
    },
    {
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            getters:true
        },
    }
);

const Student = model('User', userSchema);

module.exports = User;