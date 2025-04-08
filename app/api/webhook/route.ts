import { db } from "@/lib/db";
import stripe from "@/lib/stripe";

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        console.error("Error verifying Stripe signature:", error.message);
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    console.log("Webhook event type:", event.type);

    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;
    const hostelId = session?.metadata?.hostelId;

    if (event.type === "checkout.session.completed") {
        if (!userId || !hostelId) {
            console.error("Missing metadata:", { userId, hostelId });
            return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
        }

        try {
            await db.booking.update({
              where: {
                userId_hostelId: {
                  userId,
                  hostelId
                }
              },
                data: { 
                isPaid: true,
                isCompleted:true
                },
            });
            console.log("Booking successfully created for user:", userId, "and hostel:", hostelId);
        } catch (error: any) {
            console.error("Error creating booking:", error.message);
            return new NextResponse(`Database Error: ${error.message}`, { status: 500 });
        }
    } else {
        console.warn(`Unhandled event type: ${event.type}`);
        return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`, { status: 200 });
    }

    return new NextResponse(null, { status: 200 });
}