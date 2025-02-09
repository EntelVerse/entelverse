import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { initPaddle, openCheckout } from "@/lib/paddle";
import { Loader2, AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert/alert";
const plans = [
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
const SubscriptionToggle = ({ isYearly, onToggle }) => (_jsxs("div", { className: "flex space-x-4 mb-6", children: [_jsx(Button, { variant: !isYearly ? "primary" : "secondary", onClick: () => onToggle(false), children: "Monthly" }), _jsx(Button, { variant: isYearly ? "primary" : "secondary", onClick: () => onToggle(true), children: "Yearly (Save 20%)" })] }));
export default function SubscriptionPage() {
    const [isYearly, setIsYearly] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeSubscription, setActiveSubscription] = useState(null);
    const [error, setError] = useState(null);
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
            }
            catch (err) {
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
    const handleSubscribe = async (plan) => {
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
        }
        catch (error) {
            setError("Failed to start checkout process. Please try again later.");
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("div", { className: "container mx-auto max-w-6xl px-4 py-8", children: [_jsx("h1", { className: "text-4xl font-bold text-center mb-8", children: "Choose Your Subscription" }), error && (_jsxs(Alert, { variant: "destructive", className: "mb-6", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: error })] })), _jsx(SubscriptionToggle, { isYearly: isYearly, onToggle: setIsYearly }), _jsx("div", { className: "grid md:grid-cols-2 gap-8", children: plans.map((plan) => (_jsxs(Card, { className: "relative", children: [_jsxs(CardHeader, { children: [_jsx("h2", { className: "text-2xl font-bold", children: plan.name }), _jsx("p", { className: "text-gray-600", children: plan.description })] }), _jsxs(CardContent, { children: [_jsxs("p", { className: "text-3xl font-semibold mb-4", children: ["$", plan.price[isYearly ? "yearly" : "monthly"], _jsxs("span", { className: "text-lg text-gray-600", children: ["/", isYearly ? "year" : "month"] })] }), _jsx("ul", { className: "space-y-2", children: plan.features.map((feature) => (_jsxs("li", { className: "flex items-center", children: [_jsx(Check, { className: "h-5 w-5 text-green-500 mr-2" }), _jsx("span", { children: feature })] }, feature))) })] }), _jsx(CardFooter, { children: _jsx(Button, { className: "w-full", variant: "default", size: "lg", onClick: () => handleSubscribe(plan), disabled: isLoading || Boolean(activeSubscription), children: isLoading ? _jsx(Loader2, { className: "animate-spin mr-2" }) : plan.buttonText }) })] }, plan.id))) })] }));
}
