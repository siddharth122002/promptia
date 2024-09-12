import Prompt from "@/models/prompt";
import connectDB from "@/utils/dbconnect"
import { NextResponse } from "next/server"

export async function POST(req){
    const {prompt,tag,creator} = await req.json();
    try{
        await connectDB();
        const newPrompt = await Prompt.create({
            creator,
            prompt,
            tag,
        })
        // console.log("this is new prompt:-",newPrompt)
        await newPrompt.save();
        return NextResponse.json(newPrompt,{status:201})
    }catch(e){
        console.log("catch me aya")
        return NextResponse.json("failed",{status:404})
    }
}