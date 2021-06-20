const { Schema, model } = require('mongoose');

const UserSchema= new Schema(
    {
        username: {

        }
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