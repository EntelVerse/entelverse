import React, { createContext, useContext, useEffect, useState } from 'react';
import { initPaddle } from '../../lib/paddle';

interface SubscriptionContextType {
  isLoading: boolean;
  error: Error | null;
  isInitialized: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializePaddle = async () => {
      try {
        await initPaddle();
        setIsInitialized(true);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize Paddle'));
      } finally {
        setIsLoading(false);
      }
    };

    initializePaddle();
  }, []);

  return (
    <SubscriptionContext.Provider value={{ isLoading, error, isInitialized }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}