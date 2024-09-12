import Prompt from "@/models/prompt";
import connectDB from "@/utils/dbconnect";
import { NextResponse } from "next/server";

export async function GET(req,{params}){
    await connectDB();
   const id = params.id
    try{
        const creatorPrompts = await Prompt.find({
            creator:id
        }).populate('creator')
        // console.log(creatorPrompts)
        return NextResponse.json(creatorPrompts)
    }catch(e){
        console.log(e);
    }
}
export async function DELETE(req, { params }){
    console.log(params.id)
    try {
        await connectDB()
        await Prompt.findByIdAndDelete(params.id)
    
        return NextResponse.json('prompt deleted')
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};