let isInitialized = false;
let initializationPromise: Promise<void> | null = null;


export async function initPaddle(): Promise<void> {
  if (isInitialized) return;
  if (initializationPromise) return initializationPromise;

  initializationPromise = new Promise((resolve, reject) => {
    try {
      const vendorId = import.meta.env.VITE_PADDLE_VENDOR_ID;
      if (!vendorId) {
        console.warn('⚠️ Paddle Vendor ID is missing! Ensure VITE_PADDLE_VENDOR_ID is set in .env');
        return reject(new Error('❌ Paddle Vendor ID is missing!'));
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.paddle.com/paddle/paddle.js';
      script.async = true;
      script.defer = true;

      script.onload = () => {
        try {
          if (!window.Paddle) {
            throw new Error('❌ Paddle failed to load');
          }

          // ✅ Correct Paddle Setup function
          window.Paddle.Setup({
            vendor: parseInt(vendorId, 10),
            eventCallback: (data: any) => {
              console.log("🔔 Paddle Event:", data);
            }
          });

          console.log(`✅ Paddle initialized successfully with Vendor ID: ${vendorId}`);
          isInitialized = true;
          resolve();
        } catch (error) {
          console.error('❌ Failed to initialize Paddle:', error);
          reject(error);
        }
      };

      script.onerror = () => {
        reject(new Error('❌ Failed to load Paddle.js'));
      };

      document.body.appendChild(script);
    } catch (error) {
      reject(error);
    }
  });

  return initializationPromise;
}

/**
 * 🛒 Open Paddle Checkout
 */
export async function openCheckout(priceId: string) {
  try {
    console.log("📌 Debug: Received priceId ->", priceId)
    await initPaddle();

    if (!window.Paddle) {
      throw new Error('❌ Paddle is not initialized');
    }
    if (!priceId) {
      throw new Error('❌ Missing priceId! Check your .env variables.');
    }

    console.log(`📌 Vendor ID: ${import.meta.env.VITE_PADDLE_VENDOR_ID}`);
    console.log(`🛒 Opening Paddle checkout for price ID: ${priceId}`);

    await window.Paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      settings: {
        displayMode: 'overlay',
        locale: navigator.language,
        successUrl: `${window.location.origin}/success`,
        closeOnSuccess: true
      }
    });
  } catch (error) {
    console.error("❌ Checkout error:", error);
  }
}

/**
 * 🔄 Upgrade or change a subscription plan
 */
export async function updateSubscription(subscriptionId: string, newPriceId: string) {
  try {
    const response = await fetch(`https://api.paddle.com/subscriptions/${subscriptionId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_PADDLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: [{ priceId: newPriceId, quantity: 1 }],
        prorationBillingMode: "prorated_immediately"
      })
    });

    const data = await response.json();
    console.log("✅ Subscription Updated:", data);
    return data;
  } catch (error) {
    console.error("❌ Subscription Update Error:", error);
  }
}

/**
 * ⏳ Extend the billing period of a subscription
 */
export async function extendBillingPeriod(subscriptionId: string, newBillingDate: string) {
  try {
    const response = await fetch(`https://api.paddle.com/subscriptions/${subscriptionId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_PADDLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nextBilledAt: newBillingDate,
        prorationBillingMode: "prorated_next_billing_period"
      })
    });

    const data = await response.json();
    console.log("✅ Billing Period Extended:", data);
    return data;
  } catch (error) {
    console.error("❌ Billing Period Extension Error:", error);
  }
}