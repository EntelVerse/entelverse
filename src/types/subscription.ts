export interface PricingPlan {
  id: string;
  name: string;
  price: {
    monthly: string;
    yearly: string;
  };
  description: string;
  features: string[];
  buttonText: string;
  recommended?: boolean;
  paddleId: {
    monthly: string;
    yearly: string;
  };
}

export interface PaddleCheckoutOptions {
  settings: {
    displayMode: 'overlay' | 'inline';
    theme: 'light' | 'dark';
    locale?: string;
    successUrl?: string;
    closeOnSuccess?: boolean;
  };
  items: Array<{
    priceId: string;
    quantity: number;
  }>;
  customData?: Record<string, any>;
}