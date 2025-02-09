import { cancelSubscriptionInDatabase } from "@/lib/database";
import type { PaddleSubscriptionEvent } from "@/lib/types";

/**
 * Handles the subscription.canceled event from Paddle.
 * @param eventData - The event data from Paddle.
 */
export async function subscriptionCancel(eventData: PaddleSubscriptionEvent) {
  try {
    // Extract relevant data from the event
    const { subscription_id, status, cancellation_effective_date } = eventData;

    // Cancel the subscription in the database
    await cancelSubscriptionInDatabase(subscription_id, {
      status,
      cancellationEffectiveDate: cancellation_effective_date,
    });

    console.log(`✅ Subscription ${subscription_id} canceled successfully.`);
  } catch (error) {
    console.error(`❌ Failed to cancel subscription ${eventData.subscription_id}:`, error);
    throw error;
  }
}