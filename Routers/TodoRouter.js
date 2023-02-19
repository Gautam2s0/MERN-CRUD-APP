const express=require("express")
const {TodoModel}=require("../Modules/TodoModel")


const todoRouter=express.Router()

todoRouter.get("/",async(req,res)=>{
    try{
        const todos=await TodoModel.find()
        res.status(200).send(todos)
    }
    catch(err){
        res.status(400).send(err)
    }
})

todoRouter.post("/add",async(req,res)=>{
    const payload=req.body
    try{
        const todo=new TodoModel(payload)
        await todo.save()
        res.status(200).send({
            msg:"todo added successfully"
        })
    }
    catch(err){
        res.status(400).send(err)
    }
    
})

todoRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    try{
        await TodoModel.findByIdAndUpdate({_id:req.params.id},payload)
        res.status(200).send({
            msg:"todo update successfully"
        })
    }
    catch(err){
        res.status(400).send(err)
    }
    
})

todoRouter.delete("/delete/:id",async(req,res)=>{
    try{
        await TodoModel.findByIdAndDelete({_id:req.params.id})
        res.status(200).send({
            msg:"todo delete successfully"
        })
    }
    catch(err){
        res.status(400).send(err)
    }
    
    
})

module.exports={
    todoRouter
}