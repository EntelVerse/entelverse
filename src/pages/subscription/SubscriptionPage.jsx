import React, { useState, useEffect } from 'react';
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
    return (<div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-xl mb-4">
            <CreditCard className="w-8 h-8 text-blue-500"/>
          </div>
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Get the perfect plan for your creative needs
          </p>
        </div>

        {error && (<div className="max-w-md mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-center flex items-center justify-center gap-2">
            <AlertCircle size={20}/>
            <span>{error}</span>
          </div>)}

        {/* Billing Toggle */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <button onClick={() => setIsYearly(false)} className={`px-4 py-2 rounded-lg transition-colors ${!isYearly ? 'bg-blue-500/10 text-blue-500' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            Monthly
          </button>
          <button onClick={() => setIsYearly(true)} className={`px-4 py-2 rounded-lg transition-colors ${isYearly ? 'bg-blue-500/10 text-blue-500' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            Yearly
            <span className="ml-2 text-sm text-green-500">Save 20%</span>
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (<div key={plan.id} className={`relative rounded-2xl p-8 ${plan.recommended
                ? 'bg-blue-500/10 dark:bg-blue-500/5 border-2 border-blue-500/50 ring-4 ring-blue-500/10'
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`}>
              {plan.recommended && (<div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                    Recommended
                  </span>
                </div>)}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  {plan.price[isYearly ? 'yearly' : 'monthly'] !== 'Custom' && (<span className="text-sm">$</span>)}
                  <span className="text-4xl font-bold">
                    {plan.price[isYearly ? 'yearly' : 'monthly']}
                  </span>
                  {plan.price[isYearly ? 'yearly' : 'monthly'] !== 'Custom' && (<span className="text-gray-500">
                      /{isYearly ? 'year' : 'mo'}
                    </span>)}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (<li key={feature} className="flex items-center gap-3">
                    <Check size={20} className="text-green-500 flex-shrink-0"/>
                    <span>{feature}</span>
                  </li>))}
              </ul>

              <button onClick={() => handleSubscribe(plan)} disabled={isLoading} className={`w-full py-3 px-4 rounded-lg transition-colors ${plan.recommended
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}>
                {isLoading ? (<>
                    <Loader2 size={20} className="animate-spin"/>
                    <span>Processing...</span>
                  </>) : (plan.buttonText)}
              </button>
            </div>))}
        </div>

        {/* Features Comparison */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Features Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-4 px-6 text-left">Features</th>
                  <th className="py-4 px-6 text-left">Basic</th>
                  <th className="py-4 px-6 text-left">Pro</th>
                  <th className="py-4 px-6 text-left">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature) => (<tr key={feature.name} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-4 px-6">{feature.name}</td>
                    <td className="py-4 px-6">{feature.basic}</td>
                    <td className="py-4 px-6">{feature.pro}</td>
                    <td className="py-4 px-6">{feature.enterprise}</td>
                  </tr>))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Enterprise CTA */}
        <section>
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 text-center">
            <Zap className="w-12 h-12 text-blue-500 mx-auto mb-4"/>
            <h2 className="text-2xl font-bold mb-4">Need a Custom Solution?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Contact our sales team to discuss your specific requirements and get a tailored solution for your organization.
            </p>
            <a href="mailto:sales@entelverse.com" className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Contact Sales
            </a>
          </div>
        </section>
      </div>
    </div>);
}
