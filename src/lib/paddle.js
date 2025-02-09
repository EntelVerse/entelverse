let isInitialized = false;
let initializationPromise = null;
/**
 * ✅ Initialize Paddle.js
 */
export async function initPaddle() {
    if (isInitialized)
        return;
    if (initializationPromise)
        return initializationPromise;
    initializationPromise = new Promise((resolve, reject) => {
        try {
            const vendorId = import.meta.env.VITE_PADDLE_VENDOR_ID;
            if (!vendorId) {
                console.warn("⚠️ Paddle Vendor ID is missing! Ensure VITE_PADDLE_VENDOR_ID is set in .env");
                return reject(new Error("❌ Paddle Vendor ID is missing!"));
            }
            if (window.Paddle) {
                console.log("✅ Paddle already loaded.");
                isInitialized = true;
                return resolve();
            }
            const script = document.createElement("script");
            script.src = "https://cdn.paddle.com/paddle/paddle.js";
            script.async = true;
            script.defer = true;
            script.onload = () => {
                try {
                    if (!window.Paddle) {
                        throw new Error("❌ Paddle failed to load");
                    }
                    // ✅ Correct Paddle Setup function
                    window.Paddle.Setup({
                        vendor: parseInt(vendorId, 10),
                        eventCallback: (data) => {
                            console.log("🔔 Paddle Event:", data);
                        },
                    });
                    console.log(`✅ Paddle initialized successfully with Vendor ID: ${vendorId}`);
                    isInitialized = true;
                    resolve();
                }
                catch (error) {
                    console.error("❌ Failed to initialize Paddle:", error);
                    reject(error);
                }
            };
            script.onerror = () => {
                reject(new Error("❌ Failed to load Paddle.js"));
            };
            document.body.appendChild(script);
        }
        catch (error) {
            reject(error);
        }
    });
    return initializationPromise;
}
/**
 * 🛒 Open Paddle Checkout
 */
export async function openCheckout(priceId, p0) {
    try {
        await initPaddle();
        if (!window.Paddle) {
            throw new Error("❌ Paddle is not initialized");
        }
        if (!priceId) {
            throw new Error("❌ Missing priceId! Check your .env variables.");
        }
        console.log(`📌 Debug: Received priceId -> ${priceId}`);
        // 🛑 Fix: Remove non-numeric characters & prevent leading zeros
        const productId = priceId.replace(/\D/g, "").replace(/^0+/, ""); // Remove non-digits & leading zeros
        console.log(`✅ Extracted Product ID: ${productId}`);
        // Correct Parent URL Encoding
        const parentUrl = encodeURIComponent(window.location.href);
        const referringDomain = encodeURIComponent(window.location.hostname);
        const checkoutUrl = `https://buy.paddle.com/paddlejs?ccsURL=https://checkout-service.paddle.com/create/checkout/product/${productId}/?product=${productId}&parentURL=${encodeURIComponent(window.location.href)}&referring_domain=${encodeURIComponent(window.location.hostname)}&display_mode=overlay&vendor=${import.meta.env.VITE_PADDLE_VENDOR_ID}&checkout_initiated=${Date.now()}&popup=true&paddle_js=true&is_popup=true`;
        console.log("🔗 Paddle Checkout URL:", checkoutUrl);
        // Open Paddle checkout as an iframe
        const iframe = document.createElement("iframe");
        iframe.id = "paddle-checkout";
        iframe.className = "paddle-frame paddle-frame-overlay";
        iframe.name = "paddle_frame";
        iframe.frameBorder = "0";
        iframe.allow = "payment https://buy.paddle.com https://subscription-management.paddle.com;";
        iframe.style.cssText = `
      z-index: 2147483647;
      display: block;
      background-color: transparent;
      border: 0px transparent;
      overflow: hidden auto;
      visibility: visible;
      margin: 0px;
      padding: 0px;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      position: fixed;
    `;
        iframe.src = checkoutUrl;
        document.body.appendChild(iframe);
    }
    catch (error) {
        console.error("❌ Checkout error:", error);
    }
}
/**
 * 🔄 Upgrade or Change a Subscription Plan
 */
export async function updateSubscription(subscriptionId, newPriceId) {
    try {
        const response = await fetch(`https://api.paddle.com/subscriptions/${subscriptionId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_PADDLE_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                items: [{ priceId: newPriceId, quantity: 1 }],
                prorationBillingMode: "prorated_immediately",
            }),
        });
        const data = await response.json();
        console.log("✅ Subscription Updated:", data);
        return data;
    }
    catch (error) {
        console.error("❌ Subscription Update Error:", error);
    }
}
/**
 * ⏳ Extend the Billing Period of a Subscription
 */
export async function extendBillingPeriod(subscriptionId, newBillingDate) {
    try {
        const response = await fetch(`https://api.paddle.com/subscriptions/${subscriptionId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_PADDLE_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nextBilledAt: newBillingDate,
                prorationBillingMode: "prorated_next_billing_period",
            }),
        });
        const data = await response.json();
        console.log("✅ Billing Period Extended:", data);
        return data;
    }
    catch (error) {
        console.error("❌ Billing Period Extension Error:", error);
    }
}
