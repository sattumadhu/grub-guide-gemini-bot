
export interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

export interface FoodItem {
  name: string;
  description: string;
  image?: string;
}

export interface Restaurant {
  name: string;
  location: string;
  rating?: number;
  description?: string;
}
