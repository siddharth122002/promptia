import Prompt from "@/models/prompt";
import connectDB from "@/utils/dbconnect"
import { NextResponse } from "next/server"

export async function GET(req){
    try{
        await connectDB();
        const allPrompts = await Prompt.find({}).populate('creator');
        console.log("allPrompts");
        return NextResponse.json(allPrompts,{status:201});

    }catch(e){
        return NextResponse("failed")
    }
}