const { Schema, model } = require('mongoose');

const UserSchema= new Schema(
    {
        username: {
            type: String, 
            required: true, 
            trim: true,
            unique: true
        },
        email: {
            type: String, 
            required: true, 
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
        virtuals: true,
        getters: true
        },
        id: false
    }
)

const User= model('User', UserSchema)
module.exports= User;