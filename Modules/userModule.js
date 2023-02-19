const mongoose=require("mongoose")

const UserShema=mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const UserModel=mongoose.model("users",UserShema)

module.exports={
    UserModel
}