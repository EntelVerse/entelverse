import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Check, Zap, CreditCard, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { initPaddle, openCheckout } from '../../lib/paddle';
const plans = [
    {
        id: 'basic',
        name: 'Basic',
        price: { monthly: '0', yearly: '0' },
        description: 'Perfect for getting started with AI Creator',
        features: [
            '5 conversations per day',
            'Access to 3 AI tools',
            'Basic features',
            'Community access',
            '7 days history',
            'Basic analytics'
        ],
        buttonText: 'Get Started',
        paddleId: {
            monthly: '', // Free plan has no Paddle ID
            yearly: ''
        }
    },
    {
        id: 'pro',
        name: 'Pro',
        price: { monthly: '19.99', yearly: '198.80' },
        description: 'Enhanced features for creative professionals',
        features: [
            'Unlimited conversations',
            'Access to all AI tools',
            'Advanced features',
            'Priority support',
            'No ads',
            'Advanced analytics'
        ],
        buttonText: 'Get Started',
        recommended: true,
        paddleId: {
            monthly: import.meta.env.VITE_PRICE_PRO_MONTHLY,
            yearly: import.meta.env.VITE_PRICE_PRO_YEARLY
        }
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        price: { monthly: 'Custom', yearly: 'Custom' },
        description: 'Custom solutions for organizations',
        features: [
            'Everything in Pro',
            'Custom AI models',
            'API access',
            'Advanced analytics',
            'Dedicated support',
            'Custom branding'
        ],
        buttonText: 'Contact Sales',
        paddleId: {
            monthly: '', // Custom plan has no fixed Paddle ID
            yearly: ''
        }
    }
];
const comparisonFeatures = [
    {
        name: 'AI Conversations',
        basic: '5/day',
        pro: 'Unlimited',
        enterprise: 'Unlimited'
    },
    {
        name: 'AI Tools',
        basic: '3 tools',
        pro: 'All tools',
        enterprise: 'Custom tools'
    },
    {
        name: 'History Retention',
        basic: '7 days',
        pro: '30 days',
        enterprise: 'Unlimited'
    },
    {
        name: 'Support',
        basic: 'Community',
        pro: 'Priority',
        enterprise: 'Dedicated'
    },
    {
        name: 'Analytics',
        basic: 'Basic',
        pro: 'Advanced',
        enterprise: 'Custom'
    },
    {
        name: 'API Access',
        basic: '❌',
        pro: '❌',
        enterprise: '✅'
    }
];
export function SubscriptionPage() {
    const { t } = useLanguage();
    const [isYearly, setIsYearly] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [paddleInitialized, setPaddleInitialized] = useState(false);
    useEffect(() => {
        const initializePaddleSDK = async () => {
            try {
                await initPaddle();
                setPaddleInitialized(true);
            }
            catch (error) {
                console.error('Failed to initialize Paddle:', error);
                setError('Failed to initialize payment system. Please try again later.');
            }
        };
        initializePaddleSDK();
    }, []);
    const handleSubscribe = async (plan) => {
        if (plan.id === 'basic') {
            window.location.href = '/signup';
            return;
        }
        if (plan.id === 'enterprise') {
            window.location.href = '/contact';
            return;
        }
        if (!paddleInitialized) {
            setError('Payment system is not ready. Please try again in a moment.');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const priceId = isYearly ? plan.paddleId.yearly : plan.paddleId.monthly;
            if (!priceId) {
                console.error(`❌ Missing Paddle price ID for ${plan.name}.`);
                setError("Subscription cannot be processed. Contact support.");
                return;
            }
            await openCheckout(priceId, {
                settings: {
                    theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
                    displayMode: 'overlay',
                    locale: navigator.language,
                    successUrl: `${window.location.origin}/success`,
                    closeOnSuccess: true
                }
            });
        }
        catch (error) {
            console.error('Subscription error:', error);
            setError('Failed to start checkout process. Please try again later.');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen pt-24 pb-16", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("div", { className: "inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-xl mb-4", children: _jsx(CreditCard, { className: "w-8 h-8 text-blue-500" }) }), _jsx("h1", { className: "text-4xl font-bold mb-4", children: "Choose Your Plan" }), _jsx("p", { className: "text-xl text-gray-600 dark:text-gray-400", children: "Get the perfect plan for your creative needs" })] }), error && (_jsxs("div", { className: "max-w-md mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-center flex items-center justify-center gap-2", children: [_jsx(AlertCircle, { size: 20 }), _jsx("span", { children: error })] })), _jsxs("div", { className: "flex justify-center items-center gap-4 mb-12", children: [_jsx("button", { onClick: () => setIsYearly(false), className: `px-4 py-2 rounded-lg transition-colors ${!isYearly ? 'bg-blue-500/10 text-blue-500' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`, children: "Monthly" }), _jsxs("button", { onClick: () => setIsYearly(true), className: `px-4 py-2 rounded-lg transition-colors ${isYearly ? 'bg-blue-500/10 text-blue-500' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`, children: ["Yearly", _jsx("span", { className: "ml-2 text-sm text-green-500", children: "Save 20%" })] })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-8 mb-16", children: plans.map((plan) => (_jsxs("div", { className: `relative rounded-2xl p-8 ${plan.recommended
                            ? 'bg-blue-500/10 dark:bg-blue-500/5 border-2 border-blue-500/50 ring-4 ring-blue-500/10'
                            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`, children: [plan.recommended && (_jsx("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2", children: _jsx("span", { className: "bg-blue-500 text-white px-4 py-1 rounded-full text-sm", children: "Recommended" }) })), _jsxs("div", { className: "text-center mb-8", children: [_jsx("h3", { className: "text-2xl font-bold mb-2", children: plan.name }), _jsxs("div", { className: "flex items-baseline justify-center gap-1", children: [plan.price[isYearly ? 'yearly' : 'monthly'] !== 'Custom' && (_jsx("span", { className: "text-sm", children: "$" })), _jsx("span", { className: "text-4xl font-bold", children: plan.price[isYearly ? 'yearly' : 'monthly'] }), plan.price[isYearly ? 'yearly' : 'monthly'] !== 'Custom' && (_jsxs("span", { className: "text-gray-500", children: ["/", isYearly ? 'year' : 'mo'] }))] }), _jsx("p", { className: "text-gray-600 dark:text-gray-400 mt-2", children: plan.description })] }), _jsx("ul", { className: "space-y-4 mb-8", children: plan.features.map((feature) => (_jsxs("li", { className: "flex items-center gap-3", children: [_jsx(Check, { size: 20, className: "text-green-500 flex-shrink-0" }), _jsx("span", { children: feature })] }, feature))) }), _jsx("button", { onClick: () => handleSubscribe(plan), disabled: isLoading, className: `w-full py-3 px-4 rounded-lg transition-colors ${plan.recommended
                                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                    : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { size: 20, className: "animate-spin" }), _jsx("span", { children: "Processing..." })] })) : (plan.buttonText) })] }, plan.id))) }), _jsxs("section", { className: "mb-16", children: [_jsx("h2", { className: "text-2xl font-bold text-center mb-8", children: "Features Comparison" }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-gray-200 dark:border-gray-700", children: [_jsx("th", { className: "py-4 px-6 text-left", children: "Features" }), _jsx("th", { className: "py-4 px-6 text-left", children: "Basic" }), _jsx("th", { className: "py-4 px-6 text-left", children: "Pro" }), _jsx("th", { className: "py-4 px-6 text-left", children: "Enterprise" })] }) }), _jsx("tbody", { children: comparisonFeatures.map((feature) => (_jsxs("tr", { className: "border-b border-gray-200 dark:border-gray-700", children: [_jsx("td", { className: "py-4 px-6", children: feature.name }), _jsx("td", { className: "py-4 px-6", children: feature.basic }), _jsx("td", { className: "py-4 px-6", children: feature.pro }), _jsx("td", { className: "py-4 px-6", children: feature.enterprise })] }, feature.name))) })] }) })] }), _jsx("section", { children: _jsxs("div", { className: "bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 text-center", children: [_jsx(Zap, { className: "w-12 h-12 text-blue-500 mx-auto mb-4" }), _jsx("h2", { className: "text-2xl font-bold mb-4", children: "Need a Custom Solution?" }), _jsx("p", { className: "text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto", children: "Contact our sales team to discuss your specific requirements and get a tailored solution for your organization." }), _jsx("a", { href: "mailto:sales@entelverse.com", className: "inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors", children: "Contact Sales" })] }) })] }) }));
}
