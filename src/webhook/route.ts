import crypto from "crypto";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { subscriptionCancel } from "@/lib/data/subscription/subscription-cancel";
import { subscriptionCreate } from "@/lib/data/subscription/subscription-create";
import { subscriptionUpdate } from "@/lib/data/subscription/subscription-update";
import { isPaddleEvent, isPaddleSubscriptionEvent } from "@/lib/typeguards";

/**
 * ✅ Secure Paddle Webhook Signature Validation
 */
async function isValidSignature(requestBody: string, secretKey: string, signature: string): Promise<boolean> {
  if (!signature || !secretKey) return false;

  const parts = signature.split(";");
  const signatureParts = Object.fromEntries(
    parts.map((part) => part.split("=")).filter(([_, value]) => value)
  );

  const { ts, h1 } = signatureParts;
  if (!ts || !h1) return false;

  const payloadWithTime = `${ts}:${requestBody}`;
  const computedHash = crypto.createHmac("sha256", secretKey).update(payloadWithTime).digest("hex");

  // Use timingSafeEqual to prevent timing attacks
  return crypto.timingSafeEqual(Buffer.from(computedHash, "hex"), Buffer.from(h1, "hex"));
}

/**
 * ✅ Paddle Webhook Handler
 */
export async function POST(request: NextRequest) {
  try {
    // 🔍 Extract headers and body
    const signature = request.headers.get("paddle-signature");
    const rawRequestBody = await request.text();
    const privateKey = process.env.PADDLE_NOTIFICATION_WEBHOOK_SECRET;

    // 🛑 Validate required parameters
    if (!signature || !rawRequestBody || !privateKey) {
      console.warn("⚠️ Missing webhook parameters:", { signature, hasBody: !!rawRequestBody, hasKey: !!privateKey });
      return NextResponse.json({ status: 400, message: "Missing required parameters" }, { status: 400 });
    }

    // 🔐 Validate Paddle webhook signature
    const isValid = await isValidSignature(rawRequestBody, privateKey, signature);
    if (!isValid) {
      console.warn("⚠️ Invalid Paddle signature received.");
      return NextResponse.json({ status: 401, message: "Invalid signature" }, { status: 401 });
    }

    // 📝 Parse the event payload
    let eventData;
    try {
      eventData = JSON.parse(rawRequestBody);
    } catch (parseError) {
      console.error("❌ Failed to parse webhook JSON:", parseError);
      return NextResponse.json({ status: 400, message: "Invalid JSON format" }, { status: 400 });
    }

    // 🔍 Validate event format
    if (!isPaddleEvent(eventData)) {
      console.warn("⚠️ Received an invalid event format:", eventData);
      return NextResponse.json({ status: 400, message: "Invalid event format" }, { status: 400 });
    }

    // 📌 Process Paddle Subscription Events
    if (isPaddleSubscriptionEvent(eventData)) {
      switch (eventData.event_type) {
        case "subscription.created":
          console.log("🔔 Handling subscription.created event...");
          await subscriptionCreate(eventData);
          break;
        case "subscription.updated":
          console.log("🔔 Handling subscription.updated event...");
          await subscriptionUpdate(eventData);
          break;
        case "subscription.canceled":
          console.log("🔔 Handling subscription.canceled event...");
          await subscriptionCancel(eventData);
          break;
        default:
          console.warn(`⚠️ Unhandled event type: ${eventData.event_type}`);
          return NextResponse.json({ status: 400, message: "Unhandled event type" }, { status: 400 });
      }
    }

    // ✅ Successfully processed event
    return NextResponse.json({ status: 200, message: "Event processed successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    return NextResponse.json({ status: 500, message: "Internal server error" }, { status: 500 });
  }
}