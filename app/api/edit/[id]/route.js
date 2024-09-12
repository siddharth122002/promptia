import connectDB from "@/utils/dbconnect";
import { NextResponse } from "next/server";

export async function PATCH(req,{params}){
    await connectDB();
    console.log(params)
    try{
        return NextResponse.json("ok")
    }catch(e){
        console.log(e);
    }
}