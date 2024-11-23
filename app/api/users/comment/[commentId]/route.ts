import {  currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {params}:{
    req: Request
    params:{commentId: string}
}){
    try {
       const loggedInUser = await currentUser()
     
       const {content} = await req.json()


       if(!loggedInUser){
        return new NextResponse("unauthorized")
       }

       const commentInDb = await db.comment.findUnique({
        where:{
            id: params.commentId
        }
       })

       if(commentInDb?.userId !== loggedInUser.id){
        return new NextResponse("unauthorized")
       }
      

       const UpdatedComment = await db.comment.update({
        where:{
            id: params.commentId
        },
        data:{
         content   
        }
       })
       return NextResponse.json(UpdatedComment);
    } catch (error) {
        console.log("[USER_ID]", error);
    
    return new  NextResponse("Internal Error", {status:500})
    }
}