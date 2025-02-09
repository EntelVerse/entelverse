import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { initPaddle, openCheckout } from "@/lib/paddle";
import { Loader2, AlertCircle } from "lucide-react";
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
export default function SubscriptionPage() {
    const [isYearly, setIsYearly] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [paddleInitialized, setPaddleInitialized] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const initializePaddle = async () => {
            try {
                await initPaddle();
                setPaddleInitialized(true);
            }
            catch (err) {
                setError("Failed to initialize payment system.");
            }
        };
        initializePaddle();
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
            setError("Failed to start checkout process.");
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center p-6", children: [_jsx("h1", { className: "text-4xl font-bold mb-4", children: "Choose Your Subscription" }), error && (_jsxs("div", { className: "bg-red-100 text-red-700 p-4 rounded-md flex items-center mb-4", children: [_jsx(AlertCircle, { className: "mr-2" }), " ", error] })), _jsxs("div", { className: "flex space-x-4 mb-6", children: [_jsx("button", { onClick: () => setIsYearly(false), className: `px-4 py-2 rounded ${!isYearly ? "bg-blue-500 text-white" : "bg-gray-200"}`, children: "Monthly" }), _jsx("button", { onClick: () => setIsYearly(true), className: `px-4 py-2 rounded ${isYearly ? "bg-blue-500 text-white" : "bg-gray-200"}`, children: "Yearly (Save 20%)" })] }), _jsx("div", { className: "grid md:grid-cols-2 gap-8", children: plans.map((plan) => (_jsxs("div", { className: "border p-6 rounded-lg shadow-lg", children: [_jsx("h2", { className: "text-2xl font-bold", children: plan.name }), _jsx("p", { className: "text-gray-600", children: plan.description }), _jsxs("p", { className: "text-xl font-semibold my-2", children: ["$", plan.price[isYearly ? "yearly" : "monthly"], " / ", isYearly ? "year" : "month"] }), _jsx("ul", { className: "mb-4", children: plan.features.map((feature) => (_jsxs("li", { children: ["\u2705 ", feature] }, feature))) }), _jsx("button", { onClick: () => handleSubscribe(plan), disabled: isLoading, className: "bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 w-full", children: isLoading ? _jsx(Loader2, { className: "animate-spin mx-auto" }) : plan.buttonText })] }, plan.id))) })] }));
}
