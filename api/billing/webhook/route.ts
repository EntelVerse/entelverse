import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { subscriptionCancel } from "@/lib/data/subscription/subscription-cancel";
import { subscriptionCreate } from "@/lib/data/subscription/subscription-create";
import { subscriptionUpdate } from "@/lib/data/subscription/subscription-update";
import { isPaddleEvent, isPaddleSubscriptionEvent } from "@/lib/typeguards";

async function isValidSignature(requestBody: string, secretKey: string, signature: string) {
  const parts = signature.split(";");
  const signatureParts = Object.fromEntries(
    parts.map((part) => part.split("=")).filter(([_, value]) => value)
  );

  const { ts, h1 } = signatureParts;
  if (!ts || !h1) return false;

  const payloadWithTime = `${ts}:${requestBody}`;
  const computedHash = crypto.createHmac("sha256", secretKey).update(payloadWithTime).digest("hex");

  return computedHash === h1;
}

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("paddle-signature");
    const rawRequestBody = await request.text();
    const privateKey = process.env.PADDLE_NOTIFICATION_WEBHOOK_SECRET;

    if (!signature || !rawRequestBody || !privateKey) {
      return NextResponse.json({ status: 400, message: "Missing required parameters" }, { status: 400 });
    }

    const isValid = await isValidSignature(rawRequestBody, privateKey, signature);
    if (!isValid) {
      return NextResponse.json({ status: 401, message: "Invalid signature" }, { status: 401 });
    }

    const eventData = JSON.parse(rawRequestBody);
    if (!isPaddleEvent(eventData)) {
      return NextResponse.json({ status: 400, message: "Invalid event format" }, { status: 400 });
    }

    if (isPaddleSubscriptionEvent(eventData)) {
      switch (eventData.event_type) {
        case "subscription.created":
          await subscriptionCreate(eventData);
          break;
        case "subscription.updated":
          await subscriptionUpdate(eventData);
          break;
        case "subscription.canceled":
          await subscriptionCancel(eventData);
          break;
        default:
          return NextResponse.json({ status: 400, message: "Unhandled event type" }, { status: 400 });
      }
    }

    return NextResponse.json({ status: 200, message: "Event processed" }, { status: 200 });
  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    return NextResponse.json({ status: 500, message: "Internal server error" }, { status: 500 });
  }
}
