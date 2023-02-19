const mongoose=require("mongoose")

const TodoShema=mongoose.Schema({
    title:String,
    complete:Boolean
})

const TodoModel=mongoose.model("Todos",TodoShema)

module.exports={
    TodoModel
}