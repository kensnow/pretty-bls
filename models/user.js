const mongoose = require('mongoose')
const Schema = mongoose.Schema
const objectId = Schema.Types.ObjectId

const userSchema = new Schema({
    email: {
        type:String,
        trim: true,
        lowercase:true,
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength:6
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    favorites:[{
        c_id:{
            type: objectId,
            ref: 'Study' 
        },
        name: String,
        settings:{},
        url: String
    }]
})

module.exports = mongoose.model('User', userSchema)