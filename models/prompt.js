import mongoose from "mongoose";
const promptSchema = new mongoose.Schema({
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    prompt:{
        type:String,
    },
    tag:{
        type:String,
    }
})

const Prompt = mongoose.models.Prompt || mongoose.model('Prompt',promptSchema);
export default Prompt; 