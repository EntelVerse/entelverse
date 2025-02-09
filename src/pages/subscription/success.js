import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRouter } from "next/router";
import { Check } from "lucide-react";
export default function SubscriptionSuccess() {
    const router = useRouter();
    return (_jsx("div", { className: "min-h-screen flex flex-col items-center justify-center p-6", children: _jsxs("div", { className: "bg-green-100 p-6 rounded-md shadow-lg", children: [_jsx(Check, { className: "text-green-500 w-12 h-12 mx-auto" }), _jsx("h1", { className: "text-3xl font-bold mt-4", children: "Subscription Successful" }), _jsx("p", { className: "text-gray-700 mt-2", children: "Your subscription has been activated." }), _jsx("button", { onClick: () => router.push("/dashboard"), className: "mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600", children: "Go to Dashboard" })] }) }));
}
