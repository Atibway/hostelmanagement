import { currentRole, currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const loggedInUser = await currentUser();
        const UserRole = await currentRole();
        const { role, description } = await req.json();  // Destructure both role and description together

        if (!loggedInUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (UserRole === "USER") {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        // Update User role Only by Authorized User
        if (role) {
            if (loggedInUser.email !== "ainebyoonaatiidu@gmail.com") {
                return new NextResponse("Unauthorized", { status: 403 });
            }

            const UserInDb = await db.user.findUnique({
                where: { id: params.userId }
            });

            if (!UserInDb) {
                return new NextResponse("User not found", { status: 404 });
            }

            const UpdatedUser = await db.user.update({
                where: { id: params.userId },
                data: { role }
            });

            return NextResponse.json(UpdatedUser);
        }

        // Update or create description
        if (description) {
            const UpdatedUser = await db.user.upsert({
                where: { id: params.userId },
                update: { description },
                create: { description }
            });

            return NextResponse.json(UpdatedUser);
        }

    } catch (error) {
        console.log("[USER_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
