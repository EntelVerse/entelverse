declare global {
  interface Window {
    Paddle: {
      Initialize: (options: {
        token: string;
      }) => void;
      Checkout: {
        open: (options: any) => Promise<any>;
      };
    };
  }
}

export interface PaddleEvent {
  event: string;
  eventData: any;
  checkoutData?: {
    'paddlejs-version': string;
    display_mode: string;
    method: string;
    product: string;
    [key: string]: any;
  };
}

export {};