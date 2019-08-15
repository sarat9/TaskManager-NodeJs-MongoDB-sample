const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Age should be a positive number")
            }
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Please enter a Valid Email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password should not be text "password"')
            }
        }
    },
    avatar: {
        type: Buffer
    }
}, {
        timestamps: true
    })

//virtualproperty
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.statics.findByCredentials = async function (email, password) {
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new Error('User Not Found')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Invalid User Credentials')
    }
    return user;
}


//Using UserSchema to use a middleware before saving to encrypt password
userSchema.pre('save', async function (next) {
    //Method gets called everytime before calling save
    console.log("Middleware before save got called for Encryption")
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})


const User = mongoose.model('User', userSchema)

module.exports = User;