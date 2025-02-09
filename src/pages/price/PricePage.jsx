import React from 'react';
import { openCheckout } from '../../lib/paddle';
const plans = [
    {
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
            monthly: 'pri_01jhkdxzh8wezmwa2mpzp4ffg2',
            yearly: 'pri_01jhke0amzgthb3hc3tmwj7rd7'
        }
    },
    {
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
// Rest of the component remains the same, just update the button click handler:
const handleSubscribe = async (plan) => {
    if (plan.name === 'Basic') {
        // Handle free plan signup
        window.location.href = '/signup';
        return;
    }
    if (plan.name === 'Enterprise') {
        // Handle enterprise plan inquiry
        window.location.href = '/contact';
        return;
    }
    try {
        const priceId = isYearly ? plan.paddleId.yearly : plan.paddleId.monthly;
        await openCheckout(priceId);
    }
    catch (error) {
        console.error('Subscription error:', error);
        // Handle error appropriately
    }
};
// Update the button in the pricing cards to use handleSubscribe:
<button onClick={() => handleSubscribe(plan)} className={`w-full py-3 px-4 rounded-lg transition-colors ${plan.recommended
        ? 'bg-blue-500 hover:bg-blue-600 text-white'
        : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'}`}>
  {plan.buttonText}
</button>;
