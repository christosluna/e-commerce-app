
// Define the CartItem type
interface CartItem {
    id: number;
    title: string;
    description: string;
    price: number;
    currency: string;
    image: string;
    rating: number;
    quantity: number;
  }
  
  // Define the state type
  interface CounterState {
    value: number;
    items: CartItem[];
  }

  export type {
    CartItem,
    CounterState,
  }