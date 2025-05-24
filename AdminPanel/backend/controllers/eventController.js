import Event from "../models/Event.js";

//get all events
export const getAllEvents=async(req,res)=>{
    try{
        const events=await Event.find();
        if(!events || events.length==0){
            return res.status(404).json({message:"No events found"})
        }
        return res.status(200).json({events});
    }catch(err){
        return res.status(500).json({message:"Internal Server Error"})
    }
}