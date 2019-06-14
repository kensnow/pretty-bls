const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
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
        chartId:{
            type: objectId,
            ref: 'Study' 
        },
        chartSettings:{}
    }]
})

userSchema.pre('save', function(next){
    const user = this
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err)
        user.password = hash
        next()
    })
})

userSchema.methods.checkPassword = function(passwordAttempt, cb) {
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.withoutElement = function (...elArr) {
    const user = this.toObject()
    elArr.forEach(el => delete user[el])
    return user
}

module.exports = mongoose.model('User', userSchema)