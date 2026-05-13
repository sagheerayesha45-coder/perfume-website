export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  note: string;
  description: string;
  longDesc: string;
  rating: number;
  reviews: number;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
}

export interface CartItem extends Product {
  quantity: number;
}