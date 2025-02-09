import { createSubscriptionInDatabase } from "@/lib/database";
import type { PaddleSubscriptionEvent } from "@/lib/types";

/**
 * Handles the subscription.created event from Paddle.
 * @param eventData - The event data from Paddle.
 */
export async function subscriptionCreate(eventData: PaddleSubscriptionEvent) {
  try {
    // Extract relevant data from the event
    const { subscription_id, status, next_bill_date, user_id, plan_id } = eventData;

    // Create the subscription in the database
    await createSubscriptionInDatabase({
      subscriptionId: subscription_id,
      status,
      nextBillDate: next_bill_date,
      userId: user_id,
      planId: plan_id,
    });

    console.log(`✅ Subscription ${subscription_id} created successfully.`);
  } catch (error) {
    console.error(`❌ Failed to create subscription ${eventData.subscription_id}:`, error);
    throw error;
  }
}