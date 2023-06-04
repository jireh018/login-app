import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide name'],
        trim:true,
        minLength:3,
        maxLength:50,
    },
    email:{
        type:String,
        unique:true,
        required:[true, 'Please provide email'],
        validate:{
            validator: validator.isEmail,
            message: 'Please provide valid email',
        },
    },
    password:{
        type:String,
        required: [true, 'please provide password'],
        //select:false,
        trim:true,
        minLength:6,
    },
    role:{
        type:String,
        enum:['admin', 'user'],
        default:'user',
    },
    verificationToken:String,
    isVerified:{
        type:Boolean,
        default:false,
    },
    verified:Date,
    passwordToken: {
        type: String,
    },
    passwordTokenExpirationDate: {
        type: Date,
    },
})

UserSchema.pre('save', async function (next){
    if(!this.isModified('password')) return//salt only if password modified or created
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.comparePassword = async function (userPassword){
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch
}

export default mongoose.model('User', UserSchema)