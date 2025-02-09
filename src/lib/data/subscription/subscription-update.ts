import { updateSubscriptionInDatabase } from "@/lib/database";
import type { PaddleSubscriptionEvent } from "@/lib/types";

/**
 * Handles the subscription.updated event from Paddle.
 * @param eventData - The event data from Paddle.
 */
export async function subscriptionUpdate(eventData: PaddleSubscriptionEvent) {
  try {
    // Extract relevant data from the event
    const { subscription_id, status, next_bill_date } = eventData;

    // Update the subscription in the database
    await updateSubscriptionInDatabase(subscription_id, {
      status,
      nextBillDate: next_bill_date,
    });

    console.log(`✅ Subscription ${subscription_id} updated successfully.`);
  } catch (error) {
    console.error(`❌ Failed to update subscription ${eventData.subscription_id}:`, error);
    throw error;
  }
}