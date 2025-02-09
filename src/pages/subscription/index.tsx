import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { initPaddle, openCheckout } from "@/lib/paddle";
import type { PricingPlan } from "@/types/subscription";
import { Loader2, AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert/alert";

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

const SubscriptionToggle: React.FC<{ isYearly: boolean; onToggle: (value: boolean) => void }> = ({ isYearly, onToggle }) => (
  <div className="flex space-x-4 mb-6">
    <Button variant={!isYearly ? "primary" : "secondary"} onClick={() => onToggle(false)}>
      Monthly
    </Button>
    <Button variant={isYearly ? "primary" : "secondary"} onClick={() => onToggle(true)}>
      Yearly (Save 20%)
    </Button>
  </div>
);

export default function SubscriptionPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSubscription, setActiveSubscription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paddleInitialized, setPaddleInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const initializePaddle = async () => {
      try {
        await initPaddle();
        if (mounted) {
          setPaddleInitialized(true);
        }
      } catch (err) {
        if (mounted) {
          setError("Failed to initialize payment system.");
        }
      }
    };

    initializePaddle();

    return () => {
      mounted = false;
    };
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

    if (activeSubscription) {
      setError("You already have an active subscription.");
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
      setError("Failed to start checkout process. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Choose Your Subscription</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <SubscriptionToggle isYearly={isYearly} onToggle={setIsYearly} />

      <div className="grid md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <Card key={plan.id} className="relative">
            <CardHeader>
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <p className="text-gray-600">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold mb-4">
                ${plan.price[isYearly ? "yearly" : "monthly"]}
                <span className="text-lg text-gray-600">/{isYearly ? "year" : "month"}</span>
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant="default"
                size="lg"
                onClick={() => handleSubscribe(plan)}
                disabled={isLoading || Boolean(activeSubscription)}
              >
                {isLoading ? <Loader2 className="animate-spin mr-2" /> : plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}