import Festival from '../models/Festival.js';

export const getAllFestivals=async(req,res)=>{
    try{
        const festivals=await Festival.find();
        if(!festivals || festivals.length===0){
            return res.status(404).json({message:"No festivals found"});
        }
        return res.status(200).json({festivals});
    }catch(err){
        return res.status(500).json({message:"Internal Server Error"});
    }
}