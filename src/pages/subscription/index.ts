import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { initPaddle, openCheckout } from "@/lib/paddle";
import type { PricingPlan } from "@/types/subscription";
import { Loader2, AlertCircle } from "lucide-react";

const plans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: { monthly: "0", yearly: "0" },
    description: "Perfect for getting started with AI Creator",
    features: ["5 conversations per day", "Access to 3 AI tools", "Basic analytics"],
    buttonText: "Get Started",
    paddleId: { monthly: "", yearly: "" }, // Free plan has no Paddle ID
  },
  {
    id: "pro",
    name: "Pro",
    price: { monthly: "19.99", yearly: "198.80" },
    description: "Enhanced features for professionals",
    features: ["Unlimited conversations", "Advanced analytics", "Priority support"],
    buttonText: "Subscribe Now",
    paddleId: {
      monthly: process.env.NEXT_PUBLIC_PRICE_PRO_MONTHLY ?? "",
      yearly: process.env.NEXT_PUBLIC_PRICE_PRO_YEARLY ?? "",
    },
  },
];

export default function SubscriptionPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paddleInitialized, setPaddleInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initializePaddle = async () => {
      try {
        await initPaddle();
        setPaddleInitialized(true);
      } catch (err) {
        setError("Failed to initialize payment system.");
      }
    };
    initializePaddle();
  }, []);

  const handleSubscribe = async (plan: PricingPlan) => {
    if (plan.id === "basic") {
      router.push("/signup");
      return;
    }

    if (!paddleInitialized) {
      setError("Payment system is not ready.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const priceId = isYearly ? plan.paddleId.yearly : plan.paddleId.monthly;
      if (!priceId) {
        throw new Error("Missing Paddle price ID. Check your .env variables.");
      }

      await openCheckout(priceId);
    } catch (error) {
      setError("Failed to start checkout process.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-4">Choose Your Subscription</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md flex items-center mb-4">
          <AlertCircle className="mr-2" /> {error}
        </div>
      )}

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setIsYearly(false)}
          className={`px-4 py-2 rounded ${!isYearly ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Monthly
        </button>
        <button
          onClick={() => setIsYearly(true)}
          className={`px-4 py-2 rounded ${isYearly ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Yearly (Save 20%)
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <div key={plan.id} className="border p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">{plan.name}</h2>
            <p className="text-gray-600">{plan.description}</p>
            <p className="text-xl font-semibold my-2">
              ${plan.price[isYearly ? "yearly" : "monthly"]} / {isYearly ? "year" : "month"}
            </p>
            <ul className="mb-4">
              {plan.features.map((feature) => (
                <li key={feature}>✅ {feature}</li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan)}
              disabled={isLoading}
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 w-full"
            >
              {isLoading ? <Loader2 className="animate-spin mx-auto" /> : plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
