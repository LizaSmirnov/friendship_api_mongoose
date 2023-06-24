const { Schema, model } = require('mongoose');
const { thoughtSchema } = require('./Thought');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
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

        thoughts: [{
            type:Schema.Types.ObjectId,
            ref: 'Thought',
        }],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        friendCount: {  
            type: Number,
            default: 0,
        },

    },
    {
        toJSON: {
            virtuals:true
        },
         id: false,
    }
);

const User = model('User', userSchema);

module.exports = User;