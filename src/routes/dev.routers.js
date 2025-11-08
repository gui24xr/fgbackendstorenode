import express from "express";
import makeJsonOwner from "../../test/makejsonowner.js";

const devRouter = express.Router()

devRouter.get("/dev/makejsonowner/:ownerId", async (req,res, next)=>{
   try{
    const {ownerId} = req.params
    if (!ownerId) throw new Error('ownerId is required')
    const jsonResult = await makeJsonOwner(ownerId)
    return res.status(200).json(jsonResult)
    }catch(error){
        res.status(500).json({ message: error.message })
    }
})

export default devRouter