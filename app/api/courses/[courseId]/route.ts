import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST (
    req: Request,
    {params}: {params: {courseId: string}}
){
try {
    const user = await currentUser()
const {content} = await req.json();

    if(!user?.id){
return new NextResponse("Unauthorized", {status: 401})
    }

    const course= await db.course.findUnique({
        where: {
            id: params.courseId,
        }
    })

    if(!course){
        return new NextResponse("Not found", {status:401})
            }

    const ExistingCommentBySignedInUser = await db.comment.findFirst({
        where:{
            userId: user.id
        }
    })

//     if(ExistingCommentBySignedInUser?.userId === user.id){
// return new NextResponse("You can Not comment more Than One time", {status:401})
//     }

    if(ExistingCommentBySignedInUser?.courseId === course.id){
        return new NextResponse("You can Not comment more Than One time the same post", {status:401})
            }

    const comment = await db.comment.create({
        data:{
            userId: user.id,
            courseId: params.courseId,
            content,
            userName: user.name,
            userImage: user.image
        }
    })

    return NextResponse.json(comment)
} catch (error) {
    console.log("COMMENT_ID", error);
    return new NextResponse("Internal Error", {status: 500})  
}
}




export async function DELETE(
    req: Request,
    {params}: {params: {courseId: string}}
){
try {
    
    const user = await currentUser()

    if(!user?.id){
return new NextResponse("Unauthorized", {status: 401})
    }


    const course= await db.course.findUnique({
        where: {
            id: params.courseId,
            userId: user.id
        }
    })

    if(!course){
return new NextResponse("Not found", {status:401})
    }


    const courseDeleted = await db.course.delete({
        where: {
            id: params.courseId,
        }
    })

    return NextResponse.json(courseDeleted)
} catch (error) {
  console.log("COURSE_ID_DELETE", error);
   return new NextResponse("Internal Error", {status: 500}) 
}
}

export async function PATCH(
    req: Request,
    {params}: {params: {courseId: string}}
){
try {
    const user = await currentUser()
    const values = await req.json();

    if(!user?.id){
return new NextResponse("Unauthorized", {status: 401})
    }

    const course = await db.course.update({
        where: {
            id: params.courseId,
            userId: user.id
        },
        data:{
            ...values
        }
    })

    return NextResponse.json(course)
} catch (error) {
  console.log("COURSE_ID", error);
   return new NextResponse("Internal Error", {status: 500}) 
}
}