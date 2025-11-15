import corsesModel from '../models/corses.model.js';
import status from '../utils/httpText.status.js';
import asyncWrapper from '../middleware/asyncWrapper.js'
import appErrors from '../utils/appErrors.js';

const getCorses=asyncWrapper( async (req,res)=>{
    const corses=await corsesModel.find();
    res.json(new status.Success({corses}));
});



const getCorseById=async (req,res,next)=>{
    const id=req.params.id;
    const corse=await corsesModel.findById(
        id
    );
    if(!corse){
        const error=appErrors.create("fail","not found",404)
        next(error);
    }else
    res.json(new status.Success(corse));
}


const addCorse=asyncWrapper(async (req,res)=>{
    const body=req.body;
    console.log(body);
    const corse=corsesModel(body)
    await corsesModel.insertOne(corse);
    res.json(new status.Success(corse));
}) ;


const updateCorse=asyncWrapper( async (req,res)=>{
    const id=req.params.id;
    let corse=await corsesModel.findById(id);
    if(!corse){
        return res.status(404).json(new status.Fail("Corse Not Found"))
    }
    const updatedCorse = {
    
        ...req.body
    };

    corse= await corsesModel.findByIdAndUpdate(id, {$set: updatedCorse});
    res.json(new status.Success(corse));
});


const deleteCorse=asyncWrapper( async (req,res)=>{
    const id=req.params.id;
    try{

        const corse =await corsesModel.findById(id);
        if(!corse ){
            return res.status(404).json(new status.Fail( "Corse not found"));
        }
     const deletedCorse=   await corsesModel.deleteOne(corse);
        res.json(new status.Success(deleteCorse));
    }catch(error){
        return res.status(400).json(new status.Error(error))
    }
});


export {
    getCorses,
    getCorseById,
    addCorse,
    updateCorse,
    deleteCorse
}