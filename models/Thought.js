const { Schema, model } = require('mongoose');

const ThoughtSchema= new Schema(
    {
        thoughtText: {
            type: String, 
            required: true, 
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String, 
            required: true
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction'
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

const Thought= model('Thought', ThoughtSchema)
module.exports= Thought;