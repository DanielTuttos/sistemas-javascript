const mongoose=require('mongoose');

const {Schema}=mongoose;
const encriptacion=require('bcryptjs');

const UserSchema=new Schema({
    nombre:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    
    date:{type:Date, default:Date.now}
});

UserSchema.methods.encryptPassword=async(password)=>{
    const salt = await encriptacion.genSalt(10);
    const hash = encriptacion.hash(password,salt);
    return hash;
};

UserSchema.methods.matchPassword=async function (password){
    return await encriptacion.compare(password, this.password);

};

module.exports=mongoose.model('User',UserSchema);