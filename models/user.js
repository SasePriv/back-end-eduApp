const {schema, model, Schema} = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    name: {type:String, required: true},
    password: {type: String, required: true},
    // online_status: {type: String, default: "inactive", enum: ['inactive', 'activo']},
    profile_image: {type: String, default: "userProfileImages.jpg"},
    // phone_number: {type: Number},
    email_Verification: {type: String, enum: ['no', 'yes'], default: "no"},
    date_birth: {type: String},
    gender: {type: String, enum: ['male', 'female'], required: true},
    // type_of_membreship: {type: String, enum: ['free', 'pay'], default: 'free'}
    type_of_user: {type: String, enum: ['admin', 'teacher', 'user'], default: 'user'},
    status_teacher: {type: String, enum: ['inactive', 'active'], default: 'inactive'}
}, {
    timestamps:true
})
    
UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

module.exports = model('User', UserSchema)